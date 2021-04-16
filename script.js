'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
    `;

    btn.setAttribute('hidden', 'true');

    countriesContainer.insertAdjacentHTML('beforeend', html);
}

const renderError = function(err) {
    countriesContainer.insertAdjacentText('beforeend', err);
};

const getCurPos = function() {
    return new Promise(function(resolve, reject) {

        navigator.geolocation.getCurrentPosition(resolve, reject);              

    });
};

const whereAmI = function() {
    getCurPos().then(pos => {
        console.log(pos);
        const {latitude: lat , longitude: lng} = pos.coords;

        return fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    })
    .then(res => {
        if(!res.ok)
            throw new Error('Problem with Geocoding');

        return res.json();
    })
    .then(data => {
        const country = data.country;

        return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    })
    .then(res => {
        if (!res.ok)
            throw new Error(`Country not found (${res.status})`)

        return res.json();
    })
    .then(data => {
        countriesContainer.innerHTML = '';

        renderCountry(data[0]);

        const neighbour = data[0].borders[0];

        if(!neighbour) return;

        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(res => {
        if(!res.ok)
            throw new Error(`Country not found (${res.status})`);

        return res.json()
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
        renderError(`Something went wrong ${err.message}`)
    }).finally(() => {

        countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener('click', whereAmI);