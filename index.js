const cardsList = document.querySelector('.cards__list');
const moviesSelect = document.querySelector('.cards__select-movies');
const speciesSelect = document.querySelector('.cards__select-species');
const statusSelect = document.querySelector('.cards__select-status');
const selectWrapper = document.querySelector('.cards__select-wrapper');

const url = 'dbHeroes.json';

const getData = async url => {
    const response = await fetch(url);
    return await response.json();
};

const checkProperty = item => (item ? `${item}` : 'unknown');

const createElement = data => {
    const elem = document.createElement('li');
    elem.classList.add('cards__item', 'card');

    elem.insertAdjacentHTML('beforeend', `
        <div class="card__img-wrapper">
            <img class="card__img" src="./${data.photo}" alt="Photo of ${data.name}">
            <h2 class="card__title">Actor <span>${data.actors}</span></h2>
        </div> 
        <div class="card__body">
            <div class="card__names">
                <p>Name: <span class="cursive-text segregate-text">${data.name}</span></p>
                <p>Real Name: <span class="cursive-text segregate-text">${checkProperty(data.realName)}</span></p>
            </div>
            <ul class="card__specification">
                <li class="card__specification-item">Birthday: 
                    <span class="cursive-text segregate-text">${checkProperty(data.birthDay)}</span>
                </li>
                <li class="card__specification-item">Deathday: 
                    <span class="cursive-text segregate-text">${checkProperty(data.deathDay)}</span>
                </li>
                <li class="card__specification-item">Gender: 
                    <span class="cursive-text segregate-text">${checkProperty(data.gender)}</span>
                </li>
                <li class="card__specification-item">Species: 
                    <span class="cursive-text segregate-text">${checkProperty(data.species)}</span>
                </li>
                <li class="card__specification-item">Status: 
                    <span class="cursive-text segregate-text">${checkProperty(data.status)}</span>
                </li>
                <li class="card__specification-item">Citizenship: 
                    <span class="cursive-text segregate-text">${checkProperty(data.citizenship)}</span>
                </li>
            </ul>
        </div>
        <div class="card__movies-wrapper">
            <h3>Movies:</h3>
            <ul class="card__movies">
                ${data.movies ? data.movies.sort().map(el=>'<li class="card__movies-item">'+ el +'</li>').join('') : 'none'}
            </ul>
        </div>
    `);

    return elem;
};

const createSelectOptions = (data, type, select) => {
    const arr = [];

    data.forEach(item => {
        if (item[type]) {
            if (type === 'movies') {
                for (let i = 0; i < item[type].length; i++) {
                    if (!arr.includes(item[type][i].trim())) {
                        arr.push(item[type][i].trim());
                    }
                }
            } else {
                if (!arr.includes(item[type].trim())) {
                    arr.push(item[type].trim());
                }
            }
        }
    });

    arr.sort();

    arr.forEach(item => {
        const elem = document.createElement('option');
        elem.value = item;
        elem.textContent = item;

        select.append(elem);
    });
};

const sortCards = (evt, data) => {
    const targetType = evt.target.dataset.id;
    const type = evt.target.options[evt.target.selectedIndex].value;

    const arrByType = [];

    cardsList.innerHTML = '';

    data.forEach(item => {
        if (type !== 'all') {
            if (item[targetType]) {
                if (targetType === 'movies') {
                    for (let i = 0; i < item[targetType].length; i++) {
                        if (item[targetType][i].trim() === type) {
                            arrByType.push(item);
                        }
                    }
                } else {
                    if (item[targetType].trim() === type) {
                        arrByType.push(item);
                    }
                }
            }
        } else {
            cardsList.append(createElement(item));
        }
    });

    arrByType.forEach(item => {
        cardsList.append(createElement(item));
    });
};

getData(url)
    .then(data => {
        data.forEach(item => {
            cardsList.append(createElement(item));
        });

        createSelectOptions(data, 'movies', moviesSelect);
        createSelectOptions(data, 'species', speciesSelect);
        createSelectOptions(data, 'status', statusSelect);

        selectWrapper.addEventListener('change', (evt) => {
            if (evt.target.classList.contains('cards__select')) {
                sortCards(evt, data);
            }
        });
    })
    .catch(error => console.log(error));