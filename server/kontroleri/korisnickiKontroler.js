// middleware za autentifikaciju
import chalk from "chalk";
import { PrijavaKorisnika } from "../modeli/korisnickiModel.js"; // funkcija koju smo eksportovali iz modela

export const Prijava = async (req, res) => {
  try {
    const { korisnickoIme, lozinka } = req.body; // konstante koje izvlacimo iz body gde zapravo unosimo podatke (postman)

    const korisnik = await PrijavaKorisnika(korisnickoIme, lozinka); // po pokusaju prijave korisnika koristimo funkciju PrijavaKorisnika koja je asinhrona i zato imamo prefiks "await"

    if (!korisnik) {
      console.log(chalk.red("Pogresni kredencijali!"));
      return res.status(401).json("Pogresni kredencijali.");
    }

    // sesiji dodeljujemo kredencijale sa imenom, id-em i tipom korisnika koje posle mozemo koristiti
    req.session.korisnik = {
      // koristimo sesije kako bi ostali prijavljeni na serveru i kako bi sprecili odjavljivanje pri promeni rute
      id: korisnik.id,
      ime: korisnik.korisnickoIme,
      tip: korisnik.tip,
    };

    res.status(200).json({
      user: req.session.korisnik,
      poruka: "Uspesna prijava",
    });
  } catch (greska) {
    console.log(chalk.red(greska));
    res.status(500).json("Greska na serveru!");
  }
};

export const Odjava = async (req, res) => {
  try {
    req.session.destroy(); //unistavanje sesije i odjavljivanje
    res.clearCookie("connect.sid"); // skidanje cookieja da bi sledeci korisnik mogao koristiti svoj ukoliko je ulogovan na istom racunaru
    res.json("Uspesna odjava!");
  } catch (greska) {
    console.log(chalk.red(greska));
    return res.status(500).json("Greska pri odjavi!");
  }
};
