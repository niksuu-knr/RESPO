/**
 * SAM4s SPS-2000 CORE - VAIHE 4: RAPORTOINTIMOOTTORI
 * Tämä moduuli huolehtii Z-raportin generoinnista ja RAM-nollauksesta.
 */

const ReportingEngine = {
    // Generoi raportin ja nollaa kassan (Z-Report)
    runZReport: () => {
        if (SPS2000_Kernel.RAM.Mode !== "REP") {
            console.error("SYSTEM: RAPORTTI VAIN REP-TILASSA");
            return;
        }

        const data = SPS2000_Kernel.RAM.Financials;
        
        // 1. Luodaan raportti "tulosteena"
        const report = `
        --- Z-RAPORTTI ---
        KASSA: ${SPS2000_Kernel.Config.RegisterID}
        BRUTTOMYYNTI: ${data.GrossSales.toFixed(2)} €
        NETTOMYYNTI:  ${data.NetSales.toFixed(2)} €
        VEROT YHT:    ${data.TotalTax.toFixed(2)} €
        ------------------
        `;

        console.log(report);

        // 2. RAM-muistin nollaus (Tämä simuloi NVRAM-nollausta)
        SPS2000_Kernel.RAM.Financials = {
            GrossSales: 0,
            NetSales: 0,
            TotalTax: 0,
            VoidCount: 0
        };

        // 3. Päivitetään kassan tila
        console.log("SYSTEM: Z-RAPORTTI VALMIS. KASSA NOLLATTU.");
    },

    // X-raportti (Vain lukee tiedot, ei nollaa)
    runXReport: () => {
        console.log("--- X-RAPORTTI (VAIN LUKU) ---");
        console.log(SPS2000_Kernel.RAM.Financials);
    }
};

// Logiikka visuaalisena mallina:
//
