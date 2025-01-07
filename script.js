import { alleCitaten } from "./citaten.js";

/*testcode om uit te teste of script werkt : console.log('Het werkt!!')*/

const citatenSectie = document.querySelector('.wrapper section.citaten');
console.log(citatenSectie);
const update = new CustomEvent('citatenUpdate');

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
    const deleteKnop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    deleteKnop.setAttribute('viewBox', '0 0 24 24');
    deleteKnop.setAttribute('fill', 'none');
    deleteKnop.setAttribute('width', '30px');
    deleteKnop.setAttribute('heigth', '30px');
    deleteKnop.innerHTML = '<path d="M10 11V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    citaatArtikel.insertAdjacentElement('afterbegin', deleteKnop);
    document.querySelector('section.citaten').appendChild(citaatArtikel);
    deleteKnop.addEventListener('click', 
        () => {
            //console.log('geklikt op ' + cit.titel )
            verwijderCitaat(cit.titel);
        });
};
/*for (const citaat of alleCitaten ){
    voegCitaatObjectToe(citaat);
};*/


function toonAantalCitaten(){
    document.querySelector('#aantalCitaten').innerText = `Totaal aantal citaten: ${alleCitaten.length}`;
};



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

function verwijderCitaat(verwijderTitel){
    const plaats = alleCitaten.findIndex(cit => cit.titel === verwijderTitel
    );
    alleCitaten.splice(plaats,1);
    citatenSectie.dispatchEvent(new CustomEvent('citatenUpdate'));
};

function toonMelding(soort, melding){
    document.querySelector('#feedback').innerHTML =`<p class="${soort}">${melding}</p>`
}

function controleerTaal(taal) {
    const geldigeTalen = ['nl','en', 'fr','la', 'sv'];
    return geldigeTalen.includes(taal);
}

function voegToe(){
    const nieuwCitaat = {
    titel: document.querySelector('#titel').value,
    tekst: document.querySelector('#citaat').value,
    auteur: document.querySelector('#auteur').value,
    taal: document.querySelector('#taal').value,
    };

    if(nieuwCitaat.titel && nieuwCitaat.tekst && nieuwCitaat.auteur && nieuwCitaat.taal && controleerTaal(nieuwCitaat.taal))
        {   
            const alleTitels = [];
            alleCitaten.forEach((cit) => {alleTitels.push(cit.titel); });
            console.log(alleTitels);
            if (!alleTitels.includes(nieuwCitaat.titel)){
                alleCitaten.push(nieuwCitaat);
                citatenSectie.dispatchEvent(update);
                toonMelding('succes', 'Nieuw citaat toegevoegd.');
            }else {
                toonMelding('fout', 'Deze titel bestaat al!')
            }
        } else {
            toonMelding('fout', 'Niet alle velden ingevuld of ongeldige taal! Nieuw citaat niet toegevoegd.');
        }
    
};

document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();
    voegToe();
});

const checkboxes = document.querySelectorAll('input[name=taal]');
  checkboxes.forEach((checkbox) => {checkbox.addEventListener('change', () => {
    citatenSectie.dispatchEvent(update);
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
    document.querySelector('section.citaten').innerHTML = '';
    alleCitaten.forEach((cit) => {
        if (cit.tekst.includes(document.querySelector('form.zoektekst > input[type=text]').value) && geslecteerdeTalen.includes(cit.taal)){
            voegCitaatObjectToe(cit);
        }
    });
    toonAantalCitaten();
    toonLangsteCitaat();
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

const toonTijd = () => {
    const nu = new Date();
    const uur = nu.getHours();
    const minuten = String(nu.getMinutes()).padStart(2,'0');
    const seconden = String(nu.getSeconds()).padStart(2,'0');
    const opties ={
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const dag = nu.toLocaleDateString('nl-NL', opties);
    document.querySelector('footer').innerHTML = `<p> ${dag} &mdash; ${uur}:${minuten}:${seconden}</p>`
};

const intervalTijd = setInterval(toonTijd, 1000);

