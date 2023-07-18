const cardsList = document.querySelector('.cards__list');
const cardsSelect = document.querySelector('.cards__select');

const url = 'dbHeroes.json';

const getData = async url => {
    const response = await fetch(url);
    return await response.json();
};

const checkProperty = item => (item ? `${item}` : 'unknown');

const createMovieItems = arr => {
    const movies = arr.sort();
    let res = '';

    for (let i = 0; i < movies.length; i++) {
        res += `<li class="card__movies-item">${movies[i]}</li>`;
    }

    return res;
};

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
                ${data.movies ? createMovieItems(data.movies) : 'none'}
            </ul>
        </div>
    `);

    return elem;
};

const createSelectOptions = data => {
    const movies = [];

    data.forEach(item => {
        if (item.movies) {
            for (let i = 0; i < item.movies.length; i++) {
                if (!movies.includes(item.movies[i].trim())) {
                    movies.push(item.movies[i].trim());
                }
            }
        }
    });

    movies.sort();

    movies.forEach(movie => {
        const elem = document.createElement('option');
        elem.value = movie;
        elem.textContent = movie;

        cardsSelect.append(elem);
    });
};

const sortCards = data => {
    const id = cardsSelect.options[cardsSelect.selectedIndex].value;
    const moviesByType = [];

    cardsList.innerHTML = '';

    data.forEach(item => {
        if (id !== 'all') {
            if (item.movies) {
                for (let i = 0; i < item.movies.length; i++) {
                    if (item.movies[i].trim() === id) {
                        moviesByType.push(item);
                    }
                }
            }
        } else {
            cardsList.append(createElement(item));
        }
    });

    moviesByType.forEach(item => {
        cardsList.append(createElement(item));
    });
};

getData(url)
    .then(data => {
        data.forEach(item => {
            cardsList.append(createElement(item));
        });

        createSelectOptions(data);

        cardsSelect.addEventListener('change', () => sortCards(data));
    })
    .catch(error => console.log(error));
