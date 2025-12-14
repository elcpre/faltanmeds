
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const HOSPITAL_FILE = path.join(__dirname, '../data/hospitales/CNH_2025.xlsx');
const OUTPUT_FILE = path.join(__dirname, '../public/data/health-centers.json');

// Geocoding helper
async function searchNominatim(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'FaltanMeds-Script/1.0' } });
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
    } catch (e) {
        console.error(`Geocode error for ${query}`, e);
    }
    return null;
}

// Geocoding helper with Fallbacks
async function geocode(name, address, city) {
    // Strategy 1: Accurate Address (Cleaned)
    const cleanAddr = address.replace(/-$/, '').trim(); // Remove trailing hyphen commonly found in CNH
    let coords = await searchNominatim(`${cleanAddr}, ${city}, Spain`);
    if (coords) return coords;

    // Strategy 2: POI Name + City (Often better for Hospitals)
    // "Hospital Garcia Orcoyen, Estella"
    coords = await searchNominatim(`${name}, ${city}, Spain`);
    if (coords) return coords;

    return null;
}

// Sleep helper
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
    console.log("Processing Data with Geocoding...");
    const results = [];

    // 1. Process Hospitals (CNH)
    if (fs.existsSync(HOSPITAL_FILE)) {
        console.log("Reading Excel:", HOSPITAL_FILE);
        const workbook = XLSX.readFile(HOSPITAL_FILE);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Use sheet_to_json
        const records = XLSX.utils.sheet_to_json(sheet);

        if (records.length > 0) {
            console.log(`Found ${records.length} records. Starting geocoding...`);

            // Limit for testing? No, user wants real data.
            // But we must be careful. Let's do batches?
            // Let's do a loop.

            let processed = 0;
            // Filter only valid records first
            // Note: Keys are 'Nombre Centro', 'Dirección', 'Municipio' (Title Case)
            const validRecords = records.filter(r => r['Nombre Centro'] || r['Nombre'] || r['NOMBRE CENTRO']);

            for (const r of validRecords) {
                const name = r['Nombre Centro'] || r['Nombre'] || r['NOMBRE CENTRO'];
                const address = r['Dirección'] || r['Domicilio'] || r['DOMICILIO'] || '';
                const city = r['Municipio'] || r['MUNICIPIO'] || '';

                // Skip if no address
                if (!address) continue;

                // Rate limit: 1 request per second
                await sleep(1000);

                process.stdout.write(`[${++processed}/${validRecords.length}] Geocoding: ${name.substring(0, 20)}... `);

                const coords = await geocode(name, address, city);

                if (coords) {
                    console.log("MATCH");
                    results.push({
                        name: name,
                        type: 'HOSPITAL',
                        lat: coords.lat,
                        lng: coords.lng,
                        city: city,
                        address: address
                    });
                } else {
                    console.log("FAIL");
                    // Add fallback?
                }

                // Save progress every 20
                if (processed % 20 === 0) {
                    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
                }
            }
        }
    } else {
        console.warn(`Missing file: ${HOSPITAL_FILE}`);
    }

    // Final Write
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`Done! Written ${results.length} valid geocoded records to ${OUTPUT_FILE}`);
}

run();
