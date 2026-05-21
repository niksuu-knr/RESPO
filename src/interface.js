/**
 * UI: Hallintapaneeli (PRG-Tila)
 */
const UI = {
    // Ohjelmointi-funktio, jota kutsutaan PRG-tilassa
    enterProgrammingMode: () => {
        const id = prompt("Syötä tuotenumero:");
        const name = prompt("Syötä tuotteen nimi:");
        const price = prompt("Syötä hinta:");
        
        if(id && name && price) {
            Kernel.programPLU(id, name, parseFloat(price));
            alert("Tuote " + name + " tallennettu kassan muistiin!");
        }
    }
};
