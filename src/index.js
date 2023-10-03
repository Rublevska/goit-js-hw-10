import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.select.addEventListener('change', onSearch);
getBreeds();

function onSearch(evt) {
  showElement(refs.loader);
  hideElement(refs.catInfo);
  const selectedBreed = evt.currentTarget.value;
  getImages(selectedBreed);
}
вш;

function getBreeds() {
  fetchBreeds()
    .then(result => {
      createSelectList(result.data);
      showElement(refs.select);
      hideElement(refs.loader);
      getImages(refs.select.value);
    })
    .catch(error => {
      showError();
      hideElement(refs.select);
      hideElement(refs.loader);
      hideElement(refs.catInfo);
    });
}

function createSelectList(dataArr) {
  const markup = dataArr
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  refs.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: refs.select,
  });
}

function getImages(breed) {
  fetchCatByBreed(breed)
    .then(result => {
      createMarcup(result.data);
      hideElement(refs.loader);
      showElement(refs.catInfo);
    })
    .catch(error => {
      showError();
      hideElement(refs.loader);
      hideElement(refs.catInfo);
    });
}

function createMarcup(dataArr) {
  const { name, description, temperament } = dataArr[0].breeds[0];
  const markup = `<img src=${dataArr[0].url} alt=${name} width="300"/>
              <div class='cat-description'>
              <h2>${name}</h2>
              <p>${description}</p>
              <p>
              <b>Temperament: </b>${temperament}</p>
              </div>`;
  refs.catInfo.innerHTML = markup;
}

function showElement(element) {
  element.classList.remove('hidden');
}

function hideElement(element) {
  element.classList.add('hidden');
}

function showError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-top',
      timeout: 5000,
      width: '400px',
      failure: {
        background: '#fff',
        textColor: '#ff5549',
        notiflixIconColor: '#ff5549',
      },
    }
  );
}
