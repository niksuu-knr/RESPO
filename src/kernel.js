/**
 * SPS-2000 KERNEL - MASTER VERSION
 * Sisältää muistinhallinnan ja pysyvyyden (LocalStorage)
 */
const SPS2000_Kernel = {
    // Tietokanta: Lataa selaimesta tai käytä oletusta
    db: JSON.parse(localStorage.getItem('sps2000_storage')) || {
        PLU: { 101: { name: "KAHVI", price: 2.50 }, 102: { name: "PULLA", price: 3.00 } },
        Config: { tax: 0.14 }
    },
    
    // RAM-muisti: Aktiivinen tila
    RAM: { mode: "REG", subtotal: 0, items: [] },

    // Pysyvyys: Tallennus
    save: () => {
        localStorage.setItem('sps2000_storage', JSON.stringify(SPS2000_Kernel.db));
        console.log("SYSTEM: ASETUKSET TALLENNETTU");
    },

    // Ohjelmointi: Päivitä tuotetietokantaa lennosta
    programPLU: (id, name, price) => {
        SPS2000_Kernel.db.PLU[id] = { name: name, price: price };
        SPS2000_Kernel.save();
    }
};
