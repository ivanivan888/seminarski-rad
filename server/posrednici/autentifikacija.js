import chalk from "chalk";

export const ProveraAutentifikacije = (req, res, next) => {
  if (!req.session.korisnik) {
    // ukoliko ne postoji sesija uraditi sledece:
    console.log(chalk.red("Niste ulogovani!"));
    return res.status(401).json("Niste ulogovani!");
  }
  next();
};

export const ProveraOvlascenja = (req, res, next) => {
  if (req.session.korisnik.tip !== "admin") {
    //ukoliko u sesiji korisnik nema tip koji je jednak "admin" uraditi sledece:
    console.log(chalk.red("Nemate adminska ovlascenja!"));
    return res.status(403).json("Nemate ovlascen pristup!");
  }
  next(); // next sluzi da ukoliko je kod iznad nevalidan program nastavlja sa radom
};
