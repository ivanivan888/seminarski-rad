import express from "express";
import session from "express-session";
import { sesija } from "./konfiguracije/konfiguracijePodataka.js";
import ruter from "./rute/rute.js";

const app = express(); //inicijalizacija expressa u aplikaciji
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // omogucavanje upotrebe json fajlova sa expressom
app.use(
  session({
    // konfiguracija sesije
    secret: sesija,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/a", ruter); // endpoint za sve rute

export default app;
