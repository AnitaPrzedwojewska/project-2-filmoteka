import {
  fetchTrendingMovies,
  fetchSearchMovies,
  fetchMovieDetails,
  fetchMovieTrailers,
} from './js/api-tmdb';
import { renderGallery } from './js/markup';

const form = document.querySelector('#search-form');
const search = form.querySelector('#search-input');
const moviesGallery = document.querySelector('#movies-gallery');
console.log('moviesGallery: ', moviesGallery);

let searchWords;
let keywords;
let page;
let pages;

// send new words for new searching
// form.addEventListener('submit', showMoviesGallery);

showMovies();
// showGenres();

async function showMovies() {
  try {
    const page = 1;
    const keywords = 'marvel';
    const movieId = 693134;
    const moviesList = await fetchTrendingMovies(page);
    // const moviesList = await fetchSearchMovies(keywords, page);
    // const moviesList = await fetchMovieDetails(movieId);
    // const moviesList = await fetchMovieTrailers(movieId);
    console.log('results: ', moviesList.results);
    renderGallery(moviesList.results, moviesGallery);
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const keywords = getKeywords();
  showMoviesByKeywords(keywords);
});

function getKeywords() {
  const searchWords = form.searchQuery.value.trim(' ');
  if (!searchWords) {
    console.log(`You didn't enter what you are looking for...
    Please, try again.`);
    return;
  }
  return searchWords.toLowerCase().split(' ').join('+');
}

async function showMoviesByKeywords(keywords) {
  try {
    const page = 1;
    const moviesList = await fetchSearchMovies(keywords, page);
    renderGallery(moviesList.results, moviesGallery);
  } catch (error) {
    console.log(error);
  }
}
