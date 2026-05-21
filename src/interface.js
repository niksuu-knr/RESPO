const UI = {
    initKeyboard: function() {
        console.log("UI: Piirretään näppäimistöä...");
        const kb = document.getElementById('keyboard');
        if (!kb) return;
        
        kb.innerHTML = '';
        
        for(let i = 1; i <= 40; i++) {
            let b = document.createElement('div');
            b.id = "key_" + i;
            
            // Määritellään värikoodit paikan mukaan
            if (i === 40) b.className = "key key-mod";     // MODE
            else if (i >= 32 && i <= 39) b.className = "key key-func"; // CASH/VOID
            else b.className = "key key-plu";              // Tuotteet
            
            b.innerText = "P" + i;
            b.onclick = () => UI.processAction(i);
            kb.appendChild(b);
        }
        console.log("UI: Näppäimistö piirretty.");
    },

    processAction: function(id) {
        // Tässä kutsutaan ohjelmointia jos painetaan MODE (P40)
        if (id === 40) {
            UI.enterProgrammingMode();
        } else {
            console.log("Painettu näppäintä: " + id);
        }
    },

    enterProgrammingMode: function() {
        const id = prompt("Syötä tuotenumero (esim 101):");
        const name = prompt("Syötä tuotteen nimi:");
        const price = prompt("Syötä hinta:");
        
        if(id && name && price) {
            if (typeof SPS2000_Kernel !== 'undefined') {
                SPS2000_Kernel.programPLU(id, name, parseFloat(price));
                alert("Tuote " + name + " tallennettu!");
            }
        }
    }
};
