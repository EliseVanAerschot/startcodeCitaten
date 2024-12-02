import { alleCitaten } from "./citaten.js";

/*testcode om uit te teste of script werkt : console.log('Het werkt!!')*/

const citatenSectie = document.querySelector('.wrapper section.citaten');
console.log(citatenSectie);

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


function toonAantalCitaten(){
    document.querySelector('#aantalCitaten').innerText = `Totaal aantal citaten: ${alleCitaten.length}`;
}



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
    document.querySelector('#langsteCitaat').innerText = `Langste citaat: (${langsteCit.tekst.length} letters), auteur: ${langsteCit.auteur}, "${langsteCit.tekst}"`;
};

 
const nieuwCitaat = {
    titel: 'test',
    tekst: 'Test 1 2 3',
    auteur: 'IKKE',
    taal: 'nl',
};

/*Voeg nieuw citaat achteraan toe */
alleCitaten.push(nieuwCitaat);

const checkboxes = document.querySelectorAll('input[name=taal]');
  checkboxes.forEach((checkbox) => {checkbox.addEventListener('change', () => {
    citatenSectie.dispatchEvent(new CustomEvent('citatenUpdate'));
  });
});

function maakTalenLijst() {
    const alleTalen = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked){
            alleTalen.push(checkbox.value);
        }
    });
    return alleTalen;
}

citatenSectie.addEventListener('citatenUpdate', toonCitaten);

function toonCitaten() {
    const geslecteerdeTalen = maakTalenLijst();
    console.log(geslecteerdeTalen);
    document.querySelector('section.citaten').innerHTML = '';
    alleCitaten.forEach((cit) => {
        if (cit.tekst.includes(document.querySelector('form.zoektekst > input[type=text]').value) && geslecteerdeTalen.includes(cit.taal)){
            voegCitaatObjectToe(cit);
        }
    });
}

const telLetters = () => {
    const aantalLetters = document.querySelector('form.zoektekst > input[type=text]').value.length;
    document.querySelector('#aantalLetters').innerText = aantalLetters;
    toonCitaten();
};

document.querySelector('form.zoektekst > input').addEventListener('input',telLetters);

toonCitaten();
toonAantalCitaten();
toonLangsteCitaat();




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




