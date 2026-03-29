import fs from "fs";
import { baza } from "../konfiguracije/konfiguracijePodataka.js";

const PretraziKorisnike = () => {
  const podaci = fs.readFileSync(baza, "utf-8");
  return JSON.parse(podaci);
}; // ucitavanje i prevod jsona, potom unos podataka u konstantu kao objekat

export const PrijavaKorisnika = (ime, lozinka) => {
  const korisnici = PretraziKorisnike();
  return korisnici.find(
    // pretraga korisnika, svaki korisnik se pretrazuje posebno redom dok se ne poklope uneto korisnicko ime i lozinka
    (korisnik) => korisnik.korisnickoIme === ime && korisnik.lozinka === lozinka
  );
};
