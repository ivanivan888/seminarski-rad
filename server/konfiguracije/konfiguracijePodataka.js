import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dirname ne mozemo koristiti kada koristimo module metod tako da moramo napraviti alternativni path pomocu "laznog dirname"

export const baza = path.join(__dirname, "../podaci/korisnici.json");
export const sesija = path.join(__dirname, "../podaci/sesija.json");
