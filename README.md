# SAM4s SPS-2000 Firmware Simulator

Tämä projekti on modulaarinen simulaatio SAM4s SPS-2000 -kassajärjestelmästä. Projektin tavoitteena on mallintaa kassan "syvä" logiikka – mukaan lukien RAM-muistin hallinta, tilakohtainen parser-moottori ja raportointijärjestelmä – noudattaen alkuperäisen laitteen ohjekirjan sääntöjä (sivut 18-24).

## Arkkitehtuuri
Järjestelmä on jaettu erillisiin moduuleihin, jotka simuloivat oikean kassan firmware-rakennetta:



### Moduulikuvaus
- **Kernel (`kernel.js`):** Hallitsee kassan "elävää muistia" (RAM) ja pysyviä asetuksia (Database).
- **Parser (`parser.js`):** Toimii "aivoina". Tulkkaa näppäinkomennot (esim. `101` + `PLU`) ja suorittaa verolaskennan.
- **Controller (`controller.js`):** Valvoo "Tila-konetta" (State Machine). Estää laittomat toiminnot (esim. myynti PRG-tilassa).
- **Reporting (`reports.js`):** Hoitaa tilinpäätösprosessin (Z-raportointi) ja RAM-muistin nollauksen.
- **Interface (`interface.js`):** Käyttöliittymäkerros, joka yhdistää fyysiset 40 painiketta logiikkaan.

## Käyttöohjeet
1. **Kloonaa repositorio:** `git clone [URL]`
2. **Avaa index.html:** Käytä modernia selainta.
3. **Kassatoiminnot:**
   - Käytä MODE-näppäintä vaihtaaksesi REG, PRG, REP ja S-tilojen välillä.
   - Syötä tuotenumerot ja paina PLU-painikkeita myyntiä varten.
   - Käytä raportointimoduulia (REP-tilassa) nollataksesi päivän myynnit.

## Ohjelmiston "Syvyys"
Tämä simulaattori noudattaa SPS-2000:n arkkitehtuuria:
- **Tilanvalvonta:** Kassa reagoi eri tavoin riippuen valitusta tilasta.
- **Transaktiopuskuri:** Myynti ei siirry "historiaan" ennen kuin se on finalisoitu (CASH/CHECK).
- **Z-nollaus:** Raportointimoottori tyhjentää RAM-tietokannan täysin, mikä simuloi todellista tilinpäätöstä.

---
*Projekti kehitetty SPS-2000 huolto-ohjekirjan sivujen 18-24 pohjalta.*
