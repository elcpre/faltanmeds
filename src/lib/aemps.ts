
import { AEMPSResponse, DrugStatus, ProblemaSuministro } from './types';

const BASE_URL = 'https://cima.aemps.es/cima/rest';

const SHORTAGE_TYPES: Record<number, string> = {
    1: "Consultar Nota Informativa",
    2: "Suministro solo a hospitales",
    3: "El médico debe determinar alternativa",
    4: "Desabastecimiento Temporal",
    5: "Existe alternativa (mismo principio/vía)",
    6: "Existen alternativas (mismos principios/vía)",
    7: "Solicitar como medicamento extranjero",
    8: "Suministro Restringido (casos sin alternativa)",
    9: "Distribución Controlada (unidades limitadas)"
};

function inferShortageType(observ: string): string | null {
    if (!observ) return null;
    const lower = observ.toLowerCase();

    if (lower.includes("existe/n otro/s") || lower.includes("mismo principio activo")) return SHORTAGE_TYPES[5];
    if (lower.includes("desabastecimiento temporal")) return SHORTAGE_TYPES[4];
    if (lower.includes("suministro irregular")) return SHORTAGE_TYPES[4];
    if (lower.includes("extranjero")) return SHORTAGE_TYPES[7];
    if (lower.includes("nota informativa")) return SHORTAGE_TYPES[1];

    return null;
}

export async function getActiveShortages(): Promise<ProblemaSuministro[]> {
    try {
        // Fetch all active supply problems
        // /psuministro returns the list.
        const response = await fetch(`${BASE_URL}/psuministro`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`AEMPS API Error: ${response.statusText}`);
        }

        const data: AEMPSResponse = await response.json();
        return data.resultados || [];
    } catch (error) {
        console.error('Failed to fetch shortages:', error);
        return [];
    }
}

export async function getDrugStatus(id: string): Promise<DrugStatus | null> {
    // ID is 'cn' (Codigo Nacional)

    let shortageInfo: Partial<DrugStatus> = {
        isShortage: false,
        startDate: null,
        endDate: null,
        reason: null,
    };

    // 1. Check Shortage List first (Fastest for shortage status)
    try {
        const shortages = await getActiveShortages();
        const match = shortages.find(p => p.cn === id);

        if (match) {
            shortageInfo = {
                isShortage: true,
                startDate: new Date(match.fini).toLocaleDateString("es-ES"),
                endDate: new Date(match.ffin).toLocaleDateString("es-ES"),
                reason: match.observ,
            };
        }
    } catch (e) {
        console.warn("Failed checking active shortages list", e);
    }

    // 2. Fetch Rich Details (Always try this to get Label, Lab, Docs)
    try {
        let response = await fetch(`${BASE_URL}/medicamento?cn=${id}`, { next: { revalidate: 86400 } });

        // Fallback: If 'cn' query fails (e.g. returns 204 No Content), try 'nregistro'.
        // Some drugs (like Ozempic) use NRegistro as their primary ID in the API.
        if (!response.ok || response.status === 204) {
            const responseNReg = await fetch(`${BASE_URL}/medicamento?nregistro=${id}`, { next: { revalidate: 86400 } });
            if (responseNReg.ok && responseNReg.status !== 204) {
                response = responseNReg;
            }
        }

        if (response.ok && response.status !== 204) {
            const data = await response.json();

            // Extract Prospecto (Leaflet) URL (Type 2)
            const prospecto = data.docs?.find((d: any) => d.tipo === 2);
            const prospectoUrl = prospecto?.urlHtml || prospecto?.url;

            // Extract Ficha Tecnica (Technical Sheet) URL (Type 1)
            const ficha = data.docs?.find((d: any) => d.tipo === 1);
            const fichaUrl = ficha?.urlHtml || ficha?.url;

            // Extract Photos (Material + Pill)
            const photos = data.fotos?.map((f: any) => f.url) || [];

            // Double check shortage in "presentaciones" if we missed it above (redundancy)
            // Note: The main list is usually more up to date for "Active" status, but this detailed view has it too.

            // Similar Drugs (Alternatives) populated later or below
            // Fetch Alternatives (Client-side would be better for speed, but Server-side is requested for SSR)
            // Strategy: Nested fetch
            let alternatives: any[] = [];
            try {
                // If we have pactivos ID (e.g. from data.pactivos string... actually API uses ID for search)
                // Wait, data.pactivos is a STRING "IBUPROFENO". Search API needs "pactivos=...".
                // We might need to guess the ID or use the name? 
                // CIMA API for "medicamentos?nombre=[name]" returns list.
                // BEST PATH: Extract the "pactivos" ID from the response if available?
                // The provided JSON response for Detail didn't show "pactivos ID" directly at top level, only string.
                // However, "vtm" has "id". VTM is "Virtual Therapeutic Moeity" (~Active Ingredient).
                // Let's try searching via VTM if available, or name if not. 
                // Actually earlier curl showed: "atcs": ... "vtm": { "id": 7947003, "nombre": "ácido acetilsalicílico" }
                // Searching by VTM is robust. Let's try vtmId.

                // Use VTM Name (e.g. "aciclovir") for search. ID search is unreliable.
                const vtmName = data.vtm?.nombre || data.pactivos;
                if (vtmName) {
                    // Clean name (remove " mg", etc if present in pactivos string)
                    // Usually vtm.nombre is clean "aciclovir".
                    const queryName = encodeURIComponent(vtmName);
                    const altRes = await fetch(`${BASE_URL}/medicamentos?nombre=${queryName}`);

                    if (altRes.ok) {
                        const altData = await altRes.json();
                        const candidates = altData.resultados || [];

                        // Filter: Same Dose, Commercialized, Not Self
                        alternatives = candidates.filter((c: any) =>
                            c.comerc &&
                            c.dosis === data.dosis &&
                            c.nregistro !== id
                        ).slice(0, 12).map((c: any) => ({
                            cn: c.nregistro,
                            nombre: c.nombre,
                            lab: c.labtitular,
                            photo: (c.fotos && c.fotos.length > 0) ? c.fotos[0].url : undefined
                        }));
                    }
                }
            } catch (err) {
                console.warn("Failed fetching alternatives", err);
            }

            // Enhanced Incident Data
            // Fix: 'detalleProblemaSuministro' is inside the specific presentation in 'presentaciones' array.
            const presentation = data.presentaciones?.find((p: any) => p.cn === id);
            const detailShortage = presentation?.detalleProblemaSuministro || data.detalleProblemaSuministro;

            return {
                cn: id,
                nombre: data.nombre || `Medicamento ${id}`,
                pactivos: data.pactivos,
                labtitular: data.labtitular,
                dosis: data.dosis,
                prospectoUrl: prospectoUrl,
                fichaTecnicaUrl: fichaUrl,
                photos: photos,

                // Attributes
                hasPrescription: data.conreceta,
                isGeneric: data.generico,
                drivingWarning: data.conduc,
                monitored: data.triangulo,

                // Deep Enrichment
                prescriptionType: data.cpresc,
                adminRoute: (data.viasAdministracion && data.viasAdministracion.length > 0) ? data.viasAdministracion[0].nombre : null,
                excipients: (data.excipientes && data.excipientes.length > 0) ? data.excipientes.map((e: any) => e.nombre) : [],

                alternatives: alternatives,

                // Merge shortage info
                isShortage: shortageInfo.isShortage || false,
                startDate: shortageInfo.startDate || null,
                endDate: shortageInfo.endDate || null,
                reason: shortageInfo.reason || null,

                // Enhanced Incident Data
                shortageType: (detailShortage?.tipoProblemaSuministro && SHORTAGE_TYPES[detailShortage.tipoProblemaSuministro])
                    || (detailShortage?.observ && inferShortageType(detailShortage.observ))
                    || null,
                shortageNote: detailShortage?.observ || shortageInfo.reason || null,

                lastUpdated: new Date().toISOString()
            };
        }
    } catch (e) {
        console.warn("Could not fetch drug details", e);
    }

    // Fallback if detail fetch fails (e.g. API error) but we have shortage info
    if (shortageInfo.isShortage) {
        // We have shortage info but no details. Return what we have.
        return {
            cn: id,
            nombre: `Medicamento ${id} (Detalles no disponibles)`,
            isShortage: true,
            startDate: shortageInfo.startDate!,
            endDate: shortageInfo.endDate!,
            reason: shortageInfo.reason!,
            lastUpdated: new Date().toISOString()
        };
    }

    return null; // Totally failed
}

export async function searchDrugs(query: string): Promise<{ cn: string; nombre: string }[]> {
    if (!query || query.length < 3) return [];

    try {
        // CIMA Search Endpoint
        // Note: Using /medicamentos endpoint for list search
        const response = await fetch(`${BASE_URL}/medicamentos?nombre=${encodeURIComponent(query)}`);

        if (response.ok) {
            const data = await response.json();
            // API returns { resultados: [...] }
            return (data.resultados || []).slice(0, 10).map((item: any) => ({
                cn: item.cn || item.nregistro, // robust fallback
                nombre: item.nombre
            }));
        }
    } catch (e) {
        console.warn("Search failed", e);
    }
    return [];
}
