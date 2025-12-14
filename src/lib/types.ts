
export interface ProblemaSuministro {
    cn: string; // Codigo Nacional
    nombre: string;
    activo: boolean;
    tipoProblemaSuministro: number;
    fini: number; // Timestamp start
    ffin: number; // Timestamp end (predicted)
    observ: string; // "Problemas de fabricación", etc.
}

export interface AEMPSResponse {
    totalFilas: number;
    pagina: number;
    tamanioPagina: number;
    resultados: ProblemaSuministro[];
}

export interface DrugDoc {
    tipo: number; // 2 = Leaflet/Prospecto
    url: string;
    urlHtml?: string;
    fecha: number;
}

export interface DrugPresentation {
    cn: string;
    nombre: string;
    detalleProblemaSuministro?: {
        fini: number;
        ffin: number;
        observ: string;
    };
}

export interface DrugPhoto {
    tipo: string; // "materialas" | "formafarmaceutica"
    url: string;
    fecha: number;
}

export interface DrugDetailResponse {
    nregistro: string;
    nombre: string;
    pactivos: string;
    labtitular: string;
    dosis: string;
    docs: DrugDoc[];
    fotos?: DrugPhoto[];
    presentaciones: DrugPresentation[];
    vtm: {
        nombre: string;
    };
    estado?: {
        aut: number; // Authorization timestamp
    };
    cpresc?: string; // Prescription conditions
    generico?: boolean;
    conreceta?: boolean;
}

export interface DrugStatus {
    cn: string;
    nombre: string;
    pactivos?: string;
    labtitular?: string;
    dosis?: string;
    prospectoUrl?: string;
    fichaTecnicaUrl?: string;
    photos?: string[];
    isShortage: boolean;
    startDate: string | null;
    endDate: string | null;
    reason: string | null;
    lastUpdated: string;
    hasPrescription?: boolean;
    isGeneric?: boolean;
    alternatives?: {
        cn: string;
        nombre: string;
        lab: string;
        photo?: string;
    }[];
    drivingWarning?: boolean; // conduc
    monitored?: boolean; // triangulo
    shortageType?: string; // Mapped text
    shortageNote?: string; // Official observations

    // Deep Enrichment
    prescriptionType?: string; // e.g. "Uso Hospitalario"
    adminRoute?: string; // e.g. "Vía Oral"
    excipients?: string[]; // List of names
}
