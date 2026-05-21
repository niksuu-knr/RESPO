/**
 * UI: MASTER INTERFACE
 * Piirtää näppäimistön ja yhdistää logiikan
 */
const UI = {
    initKeyboard: () => {
        const kb = document.getElementById('keyboard');
        kb.innerHTML = ''; // Tyhjennä vanhat
        
        // Luodaan painikkeet (esimerkki)
        const keys = ["KAHVI", "PULLA", "PRG-EDIT", "CASH"];
        keys.forEach(k => {
            let b = document.createElement('div');
            b.className = 'key';
            b.innerText = k;
            b.onclick = () => UI.handleButton(k);
            kb.appendChild(b);
        });
    },

    handleButton: (action) => {
        if (action === "PRG-EDIT") {
            UI.enterProgrammingMode();
        } else {
            console.log("Käsitellään myynti: " + action);
        }
    },

    enterProgrammingMode: () => {
        const id = prompt("Syötä tuotenumero:");
        const name = prompt("Syötä tuotteen nimi:");
        const price = prompt("Syötä hinta:");
        
        if(id && name && price) {
            SPS2000_Kernel.programPLU(id, name, parseFloat(price));
            alert("Tuote " + name + " tallennettu pysyvästi!");
        }
    }
};
