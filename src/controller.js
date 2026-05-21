/**
 * SAM4s SPS-2000 CORE - VAIHE 3: INPUT CONTROLLER
 * Tämä moduuli yhdistää näppäimistön logiikan parseriin.
 */

const InputController = {
    // Käsittelee fyysisen näppäimen painalluksen
    handleKeyPress: (keyID, value = null) => {
        const mode = SPS2000_Kernel.RAM.Mode;

        // Esimerkki: PLU-näppäin
        if (keyID === 'PLU') {
            Parser.processPLU(value);
        }
        
        // Esimerkki: CASH-näppäin
        else if (keyID === 'CASH') {
            if (SPS2000_Kernel.RAM.ActiveReceipt.Items.length > 0) {
                Parser.finalizeSale();
            } else {
                console.log("SYSTEM: KUITTI ON TYHJÄ");
            }
        }
        
        // Esimerkki: MODE-vaihto (Sivu 18-24 hallinta)
        else if (keyID === 'MODE_SWITCH') {
            const modes = ['REG', 'PRG', 'REP', 'S'];
            let nextIndex = (modes.indexOf(mode) + 1) % modes.length;
            setSystemMode(modes[nextIndex]);
        }
    }
};

// SIMULAATIO: Näin syvällinen kassa toimii:
// 1. Käyttäjä painaa "101" + "PLU"
// 2. Controller välittää tiedon parserille
// 3. Parseri tarkistaa tilan ja päivittää RAM-muistin
