
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function scrapeProspectus(url) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Find Section 1: Indications
        // Usually <h2 ...>1. Qué es ...</h2>
        // Or find by ID if standard... CIMA uses IDs like "p-1", "p-2" often? 
        // Let's dump all h2 text to match.

        // Strategy: Get full text, split by headers
        const fullText = doc.body.textContent;

        // Regex for Section 1
        const r1 = /1\.\s*(?:Qué es|Qué son).*?(?:y para qué se utiliza|y para qué se utilizan)/i;
        const r2 = /2\.\s*(?:Qué necesita|Qué debe|Antes de)/i;

        const matchStart = fullText.match(r1);
        const matchEnd = fullText.match(r2);

        if (matchStart && matchEnd) {
            const startIdx = matchStart.index + matchStart[0].length;
            const endIdx = matchEnd.index;
            const text = fullText.substring(startIdx, endIdx).trim();
            console.log("--- FOUND TEXT ---");
            console.log(text.substring(0, 500));
        } else {
            console.log("--- NO MATCH ---");
            console.log("Start Match:", matchStart);
            console.log("End Match:", matchEnd);
        }

    } catch (e) {
        console.error(e);
    }
}

// URL for Aciclovir
scrapeProspectus("https://cima.aemps.es/cima/dochtml/p/85222/P_85222.html");
