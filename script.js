/*testcode om uit te teste of script werkt : console.log('Het werkt!!')*/

/* h1 aanpassen*/
document.querySelector('h1').innerText = 'Inspirerende citaten';

/* eerste citaat toevoegen */
const citaattitel1 = 'To be';
const citaattekst1 = "To be or not te be, that's the question";
const citaatauteur1 = 'William Shakespeare';
const citaattaal1 = 'en';
const artikel = document.createElement('article');
artikel.innerHTML = `<h2>${citaattitel1}</h2><p>${citaattekst1}</p><p class="auteur">${citaatauteur1}</p>`;
artikel.classList.add(`${citaattaal1}`);
document.querySelector('section.citaten').appendChild(artikel);

/* element verwijderen */
document.querySelector('#geencitaten').remove();

/*nieuw citaat toevoegen*/
const citaattitel2 = 'Vandaag';
const citaattekst2 = "Wat je vandaag moet doen, moet je doen zoals je morgen denkt dat je het had moeten doen.";
const citaatauteur2 = 'Toon Hermans';
const citaattaal2 = 'nl';
const artikel2 = document.createElement('article');
artikel2.innerHTML = `<h2>${citaattitel2}</h2><p>${citaattekst2}</p><p class="auteur">${citaatauteur2}</p>`;
artikel2.classList.add(`${citaattaal2}`);
document.querySelector('section.citaten').appendChild(artikel2);



function voegCitaatToe(titel, tekst, auteur, taal){
    const citaatArtikel = document.createElement('article');
    citaatArtikel.innerHTML = `<h2>${titel}</h2><p>${tekst}</p><p class="auteur">${auteur}</p>`;
    citaatArtikel.classList.add(`${taal}`);
    document.querySelector('section.citaten').appendChild(citaatArtikel);

}
voegCitaatToe('Penser', 'Je pense, donc je suis.', 'René Descartes', 'fr');