#include <stdio.h> // osnovne komande za ulaz i izlaz
#include <stdlib.h> // dodatne komande
#include <string.h> // rad sa stringovima

// Struktura jednog čvora u povezanoj listi odnosno šema šta struktura sadrži
typedef struct Cvor {
    char ime[50];          // naziv middleware servisa
    float verzija;         // verzija servisa
    struct Cvor* sledeci;  // pokazivač na sledeći element
} Cvor; // Identifikator pristupanja

// Dodavanje novog čvora na početak liste
Cvor* dodaj(Cvor* glava, char ime[], float verzija)
{
    Cvor* novi = (Cvor*)malloc(sizeof(Cvor)); // alokacija memorije
    strcpy(novi->ime, ime);
    novi->verzija = verzija;
    novi->sledeci = glava; // novi pokazuje na staru glavu
    return novi;
}

// Funkcija za ispisivanje cele liste
void ispisiListu(Cvor* glava) // void je tip jer ne vraća ništa
{
    while (glava != NULL)
    {
        printf("Middleware: %s | Verzija: %.1f\n", glava->ime, glava->verzija); // .1f zaokruživanje decimale
        glava = glava->sledeci;
    }
}

// Funkcija čuvanja liste u fajl
void sacuvajUFajl(Cvor* glava)
{
    FILE* fajl = fopen("middleware.txt", "w"); // otvaranje fajla za pisanje, "w" - pisanje (write)
    while (glava != NULL)
    {
        fprintf(fajl, "%s %.1f\n", glava->ime, glava->verzija);
        glava = glava->sledeci;
    }
    fclose(fajl); // zatvaranje fajla
}

// Učitavanje podataka iz fajla u listu
Cvor* ucitajIzFajla()
{
    FILE* fajl = fopen("middleware.txt", "r"); // otvaranje fajla za čitanje
     if (!fajl) return NULL; // ako fajl ne postoji
    Cvor* glava = NULL;
    char ime[50];
    float verzija;

    // citamo red po red iz fajla
    while (fscanf(fajl, "%s %f", ime, &verzija) == 2)
    {
        glava = dodaj(glava, ime, verzija); // dodajemo u listu
    }

    fclose(fajl);
    return glava;
}

// Glavni program gde se pozivaju funkcije
int main() {
    Cvor* lista = NULL;

    // Dodavanje middleware komponenti
    lista = dodaj(lista, "Autentifikacija", 1.0);
    lista = dodaj(lista, "Logovanje", 2.1);
    lista = dodaj(lista, "Placanje", 3.5);

    printf("Lista pre cuvanja:\n");
    ispisiListu(lista);

    sacuvajUFajl(lista);
    lista = NULL;     // Brisanje liste iz memorije
    lista = ucitajIzFajla();     // Učitavanje podatke iz fajla

    printf("\nLista ucitana iz fajla:\n");
    ispisiListu(lista);

    printf("\n--------------------------------");
    printf("\nPritisnite bilo koje dugme kako bi zavrsili proces.\n");
    getchar();

    return 0;
}
