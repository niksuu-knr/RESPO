const UI = {
    initKeyboard: function() {
        const kb = document.getElementById('keyboard');
        kb.innerHTML = '';
        
        for(let i = 1; i <= 40; i++) {
            let b = document.createElement('div');
            b.id = "key_" + i;
            
            // Määritellään värikoodit paikan mukaan (SPS-2000 logiikka)
            if (i === 40) b.className = "key key-mod";     // MODE
            else if (i >= 32 && i <= 39) b.className = "key key-func"; // CASH/VOID
            else b.className = "key key-plu";              // Tuotteet
            
            b.innerText = "P" + i;
            b.onclick = () => UI.processAction(i);
            kb.appendChild(b);
        }
    },
    // ... loput funktiot samat kuin aiemmin ...
};
        console.log("UI: Näppäimistö piirretty.");
    },

    enterProgrammingMode: function() {
        const id = prompt("Syötä tuotenumero (esim 101):");
        const name = prompt("Syötä tuotteen nimi:");
        const price = prompt("Syötä hinta:");
        
        if(id && name && price) {
            // Varmistetaan että SPS2000_Kernel on olemassa
            if (typeof SPS2000_Kernel !== 'undefined') {
                SPS2000_Kernel.programPLU(id, name, parseFloat(price));
                alert("Tuote " + name + " tallennettu!");
            } else {
                console.error("Kernel ei löydy!");
            }
        }
    }
};
