/**
 * SAM4s SPS-2000 KERNEL - In-App Programming Version
 */
const Kernel = {
    // 1. Ladataan data selaimen muistista (localStorage)
    db: JSON.parse(localStorage.getItem('sps2000_storage')) || {
        PLU: { 101: { name: "KAHVI", price: 2.50 } },
        Config: { tax: 0.14 }
    },

    // 2. Tallennetaan data selaimen muistiin (Tämä tekee kassasta "elävän")
    save: () => {
        localStorage.setItem('sps2000_storage', JSON.stringify(Kernel.db));
        console.log("SYSTEM: ASETUKSET TALLENNETTU");
    },

    // 3. Lisätään uusi PLU-tuote sovelluksen sisältä
    programPLU: (id, name, price) => {
        Kernel.db.PLU[id] = { name: name, price: price };
        Kernel.save();
    }
};
