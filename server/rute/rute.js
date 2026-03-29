import express from "express";
import { Prijava, Odjava } from "../kontroleri/korisnickiKontroler.js";
import {
  ProveraAutentifikacije,
  ProveraOvlascenja,
} from "../posrednici/autentifikacija.js";
const ruter = express.Router();

ruter.post("/prijava", Prijava);
ruter.post("/odjava", Odjava);

ruter.get("/admin", ProveraAutentifikacije, ProveraOvlascenja, (req, res) => {
  res.json({
    Poruka: "Dobrodosao, " + req.session.korisnik.ime + " na admin panel.",
  }); // povlaci se podatak iz sesije kada se ulogujemo pod poljem ime. Naziv korisnickog imena u sesiji smo postavili da bude "ime" u kontroleru
});
ruter.get("/pocetna", ProveraAutentifikacije, (req, res) => {
  res.json({
    Poruka: "Dobrodosao, " + req.session.korisnik.ime + " na pocetnu stranu.",
  });
});

export default ruter;
