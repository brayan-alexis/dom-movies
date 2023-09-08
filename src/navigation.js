import { getTrendingMoviesPreview, getGenresPreview } from './main.js';

searchFormBtn.addEventListener('click', (event) => {
    // event.preventDefault();
    // // const searchFormInput = document.querySelector("#searchForm input");
    // const searchFormInput = document.querySelector(".search-form-input");
    // const searchQuery = searchFormInput.value;
    // console.log({searchQuery});
    // location.hash = `#search=${searchQuery}`;
    location.hash = '#search=';
});
arrowBack.addEventListener('click', (event) => {
    event.preventDefault();
    location.hash = '';
});

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    // if (location.hash.startsWith('#trends')) {
    //     trendsPage();
    // } else if (location.hash.startsWith('#search=')) {
    //     searchPage();
    // } else if (location.hash.startsWith('#movie=')) {
    //     movieDetailsPage();
    // } else if (location.hash.startsWith('#genre=')) {
    //     genrePage();
    // } else {
    //     homePage();
    // }

    location.hash.startsWith('#trends')    ? trendsPage()       :
    location.hash.startsWith('#search=')   ? searchPage()       :
    location.hash.startsWith('#movie=')    ? movieDetailsPage() :
    location.hash.startsWith('#category=') ? categoriesPage()   :
    homePage()
}

function homePage() {
    console.log('Home page');

    // Header
    headerSection.classList.remove('inactive');
    // headerSection.classList.remove('header-container--long');
    // headerSection.style.backgroundImage = '';
    arrowBack.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    // headerGenreTitle.classList.add('inactive');
    // searchForm.classList.remove('inactive');
    
    // Trending movies
    trendingPreviewSection.classList.remove('inactive');
    // trendingPreviewMovieList.classList.remove('inactive');
    // add generic section??
    // movieDetailSection.classList.add('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Check if the trending movies preview is empty and if so, get the data from the API
    const childrenCategoriesPreview = Array.from(trendingPreviewMovieList.children);
    if (!childrenCategoriesPreview.length){
        getTrendingMoviesPreview();
        getGenresPreview();
    }
}

function trendsPage() {
    console.log('Trends page');
}

function searchPage() {
    console.log('Search page');
}

function movieDetailsPage() {
    console.log('Movie details page');

    // Header
    // headerSection.classList.add('header-container--long');
    // headerSection.style.backgroundImage = '';
    headerSection.classList.add('inactive');
    arrowBack.classList.remove('inactive');
    // headerGenreTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    // Trending movies
    trendingPreviewSection.classList.add('inactive');
    // trendingPreviewMovieList.classList.add('inactive');
    // add generic section??

    movieDetailSection.classList.remove('inactive');
}

function genrePage() {
    console.log('Genre page');
}