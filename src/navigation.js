import { getTrendingMoviesPreview, getGenresPreview } from './main.js';

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#genre=')) {
        genrePage();
    } else {
        homePage();
    }
}

function homePage() {
    console.log('Home page');

    // Header
    headerSection.classList.remove('header-container--long');
    headerSection.style.backgroundImage = '';
    arrowBack.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    // headerGenreTitle.classList.add('inactive');
    // searchForm.classList.remove('inactive');
    
    // Trending movies
    trendingPreviewSection.classList.remove('inactive');
    // trendingPreviewMovieList.classList.remove('inactive');

    getTrendingMoviesPreview();
    getGenresPreview();
}

function trendsPage() {
    console.log('Trends page');
}

function searchPage() {
    console.log('Search page');
}

function movieDetailsPage() {
    console.log('Movie details page');
}

function genrePage() {
    console.log('Genre page');
}