/**
 * SAM4s SPS-2000 CORE - VAIHE 1: TIETOKANTARUNKO
 * Tämä koodi simuloi kassan sisäistä prosessoria ja muistia.
 */

const SPS2000_Kernel = {
    // 1. PYSYVÄ MUISTI (Non-Volatile Settings)
    Config: {
        RegisterID: "01",
        TaxRates: { 1: 0.14, 2: 0.24 }, // ALV 14% ja 24%
        ReceiptHeader: ["KAHVILA TESTI", "TESTIKUJA 1", "02600 ESPOO"]
    },

    // 2. KIIHTYVÄ MUISTI (RAM - Myyntitapahtumat)
    RAM: {
        Mode: "REG", // REG, PRG, REP, S
        CurrentClerk: null,
        ActiveReceipt: {
            Items: [], // Lista tuotteista
            Subtotal: 0,
            TaxTotal: 0
        },
        // Finanssirekisterit (ne, jotka nollautuvat Z-raportissa)
        Financials: {
            GrossSales: 0,
            NetSales: 0,
            TotalTax: 0,
            VoidCount: 0
        }
    },

    // 3. TUOTETIETOKANTA (PLU)
    PLU_Database: {
        // Esimerkki: PLU 101, Nimi, Hinta, Veroryhmä
        101: { name: "KAHVI", price: 2.50, taxGroup: 1 },
        102: { name: "PULLA", price: 3.00, taxGroup: 1 }
    }
};

// Ytimen perusfunktio tilan vaihtoon (SIVU 18-24 logiikka alkaa tästä)
function setSystemMode(mode) {
    if (["REG", "PRG", "REP", "S"].includes(mode)) {
        SPS2000_Kernel.RAM.Mode = mode;
        console.log(`SYSTEM: MODE CHANGED TO ${mode}`);
    }
}

// Alustetaan ydin
console.log("SPS-2000 Kernel Initialized. Database Ready.");
