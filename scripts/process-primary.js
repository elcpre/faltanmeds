
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

const CENTROS_FILE = path.join(__dirname, '../data/Centros sanitarios/2025_C__Catalogo_de_Centros_AP_txt/SIAP_CENTROS.txt');
const OUTPUT_FILE = path.join(__dirname, '../public/data/health-centers-primary.json');

// Nominatim Geocoding Helper (Same as Hospital Script)
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

// Geocode with Fallbacks
async function geocode(name, address, city, zip) {
    const cleanAddr = address.replace(/-$/, '').trim();

    // Strategy 1: Addr + City + Zip (Zip helps for Primary Care in villages)
    let coords = await searchNominatim(`${cleanAddr}, ${zip} ${city}, Spain`);
    if (coords) return coords;

    // Strategy 2: Addr + City
    coords = await searchNominatim(`${cleanAddr}, ${city}, Spain`);
    if (coords) return coords;

    // Strategy 3: Name + City (Less reliable for "Consultorio Local", but good for "Centro de Salud X")
    coords = await searchNominatim(`${name}, ${city}, Spain`);
    if (coords) return coords;

    return null;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
    console.log("Processing Primary Care Centers...");

    if (!fs.existsSync(CENTROS_FILE)) {
        console.error("Missing file:", CENTROS_FILE);
        return;
    }

    // Read raw text (it has quote-semicolon format)
    const content = fs.readFileSync(CENTROS_FILE, 'latin1'); // Likely windows-1252/latin1 based on "SNCHEZ" in preview

    // CSV Parse
    const records = csv.parse(content, {
        delimiter: ';',
        trim: true,
        skip_empty_lines: true,
        relax_quotes: true
    });

    console.log(`Found ${records.length} centers.`);

    const results = [];
    let processed = 0;

    // Process loop
    for (const r of records) {
        // Based on analysis:
        // Col 4: Name
        // Col 6: Address
        // Col 7: City
        // Col 11: Zip

        const name = r[4];
        const address = r[6];
        const city = r[7];
        const zip = r[11];

        if (!name || !address) continue;

        await sleep(1000); // 1s delay
        process.stdout.write(`[${++processed}/${records.length}] Geocoding: ${name.substring(0, 15)}... `);

        const coords = await geocode(name, address, city, zip);

        if (coords) {
            console.log("MATCH");
            results.push({
                name: name,
                type: 'PRIMARY_CARE', // Distinct type
                lat: coords.lat,
                lng: coords.lng,
                city: city,
                address: address
            });
        } else {
            console.log("FAIL");
        }

        // Save periodically
        if (processed % 20 === 0) {
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`Done! Saved to ${OUTPUT_FILE}`);
}

run();
