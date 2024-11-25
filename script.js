import { alleCitaten } from "./citaten.js";

/*testcode om uit te teste of script werkt : console.log('Het werkt!!')*/

/* h1 aanpassen*/
document.querySelector('h1').innerText = 'Inspirerende citaten';

/*/* eerste citaat toevoegen */
/*const citaattitel1 = 'To be';
const citaattekst1 = "To be or not te be, that's the question";
const citaatauteur1 = 'William Shakespeare';
const citaattaal1 = 'en';
const artikel = document.createElement('article');
artikel.innerHTML = `<h2>${citaattitel1}</h2><p>${citaattekst1}</p><p class="auteur">${citaatauteur1}</p>`;
artikel.classList.add(`${citaattaal1}`);
document.querySelector('section.citaten').appendChild(artikel);*/

/* element verwijderen */
document.querySelector('#geencitaten').remove();



function voegCitaatObjectToe(cit){
    const citaatArtikel = document.createElement('article');
    citaatArtikel.innerHTML = `<h2>${cit.titel}</h2><p>${cit.tekst}</p><p class="auteur">${cit.auteur}</p>`;
    citaatArtikel.classList.add(`${cit.taal}`);
    document.querySelector('section.citaten').appendChild(citaatArtikel);

}
/*for (const citaat of alleCitaten ){
    voegCitaatObjectToe(citaat);
};*/



document.querySelector('#aantalCitaten').innerText += alleCitaten.length;

/*Zoek citaat met langste tekst 
function vindtLangsteCitaat() {
    let grootstelengte = 0;
    let langsteCitaat 
    for (const citaat of alleCitaten) {
        if (citaat.tekst.length > grootstelengte){
            grootstelengte = citaat.tekst.length
            langsteCitaat = citaat;
        }
    }
    return langsteCitaat;
}*/



/*Zoek citaat met langste tekst met foreach*/
const vindtLangsteCitaat2 = () => {
    let langsteCitaat = {tekst: ''};
    alleCitaten.forEach((citaat) => {
        if (citaat.tekst.length > langsteCitaat.tekst.length){
            langsteCitaat = citaat;
        }
    });
    return langsteCitaat;
};

function toonLangsteCitaat(){
    const langsteCit = vindtLangsteCitaat2();
    document.querySelector('#langsteCitaat').innerText += `(${langsteCit.tekst.length} letters), auteur: ${langsteCit.auteur}, "${langsteCit.tekst}"`;
};
toonLangsteCitaat();
 
const nieuwCitaat = {
    titel: 'test',
    tekst: 'Test 1 2 3',
    auteur: 'IKKE',
    taal: 'nl',
};

alleCitaten.push(nieuwCitaat);
console.log(alleCitaten);

alleCitaten.forEach(voegCitaatObjectToe);




/* kortere , betere notatie voor het toevoegen van de footer*/
document.body.insertAdjacentHTML('beforeend','<footer><p>&copy; 2024 - Elise</p></footer>');

/* click event: random kleur voor titel */
const h1Titel = document.querySelector('h1');
h1Titel.addEventListener('click', () => {
    const rood = Math.round(Math.random()*255);
    const groen = Math.round(Math.random()*255);
    const blauw = Math.round(Math.random()*255);
    h1Titel.style.color = `rgb(${rood},${groen},${blauw})`;
});

/* Toggle button voor drie kolommen */

const kolommenKnop = document.querySelector('#kolommen');
kolommenKnop.addEventListener('click', () => {
    document.querySelector('section.citaten').classList.toggle('driekol')
})



