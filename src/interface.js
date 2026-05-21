const UI = {
    initKeyboard: function() {
        console.log("UI: Piirretään näppäimistöä...");
        const kb = document.getElementById('keyboard');
        if (!kb) {
            console.error("Virhe: #keyboard elementtiä ei löydy!");
            return;
        }
        
        kb.innerHTML = ''; // Tyhjennä
        const buttons = ["KAHVI", "PULLA", "PRG-EDIT", "CASH", "MODE"];
        
        buttons.forEach(btnText => {
            let b = document.createElement('div');
            b.className = 'key';
            b.innerText = btnText;
            b.onclick = () => {
                if(btnText === "PRG-EDIT") UI.enterProgrammingMode();
                else console.log(btnText + " painettu");
            };
            kb.appendChild(b);
        });
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
