import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_WUwXDg6qXTB5DkYat9xJ1iaDirm3kPGhMWep74pxoDSp6NvdYFgVfZ69QUP2BUNy';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
    return response;
  });
}

export { fetchBreeds, fetchCatByBreed };
