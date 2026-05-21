/**
 * SAM4s SPS-2000 CORE - VAIHE 2: PARSER MOOTTORI
 * Tämä moduuli prosessoi näppäinkomennot ja päivittää RAM-tietokantaa.
 */

const Parser = {
    // Käsittelee PLU-myynnin: esim. (101, PLU)
    processPLU: (pluID) => {
        if (SPS2000_Kernel.RAM.Mode !== "REG") {
            console.error("SYSTEM: MYYNTI VAIN REG-TILASSA");
            return;
        }

        const item = SPS2000_Kernel.PLU_Database[pluID];
        if (!item) {
            console.error("SYSTEM: PLU EI LÖYDY");
            return;
        }

        // Lasketaan vero (ohjekirjan mukainen logiikka)
        const taxRate = SPS2000_Kernel.SystemOptions.TaxRates[item.taxGroup];
        const taxAmount = item.price * taxRate;

        // Päivitetään RAM-tapahtumapuskuri
        const saleRecord = {
            name: item.name,
            price: item.price,
            tax: taxAmount
        };

        SPS2000_Kernel.RAM.ActiveReceipt.Items.push(saleRecord);
        SPS2000_Kernel.RAM.ActiveReceipt.Subtotal += item.price;
        SPS2000_Kernel.RAM.ActiveReceipt.TaxTotal += taxAmount;

        console.log(`PROCESSED: ${item.name} | Hinta: ${item.price} | Vero: ${taxAmount.toFixed(2)}`);
    },

    // Käsittelee kuitin finalisoinnin (Sivu 18: CASH)
    finalizeSale: () => {
        const receipt = SPS2000_Kernel.RAM.ActiveReceipt;
        
        // Siirretään RAM-tiedot pysyvään finanssirekisteriin
        SPS2000_Kernel.RAM.Financials.GrossSales += receipt.Subtotal;
        SPS2000_Kernel.RAM.Financials.TotalTax += receipt.TaxTotal;

        // Tyhjennetään puskuri
        SPS2000_Kernel.RAM.ActiveReceipt = { Items: [], Subtotal: 0, TaxTotal: 0 };
        console.log("SYSTEM: KUITTI VALMIS. RAM NOLLATTU.");
    }
};
