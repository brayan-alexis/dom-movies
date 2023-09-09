import { 
    getTrendingMoviesPreview, 
    getGenresPreview, 
    getMoviesByGenre, 
    getMoviesBySearch,
    getMovieDetails
} from './main.js';

searchFormBtn.addEventListener('click', (event) => {
    // event.preventDefault();
    location.hash = `#search=${searchFormInput.value}`;
});
arrowBack.addEventListener('click', (event) => {
    event.preventDefault();
    location.hash = '';
});

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    location.hash.startsWith('#trends')    ? trendsPage()       :
    location.hash.startsWith('#search=')   ? searchPage()       :
    location.hash.startsWith('#movie=')    ? movieDetailsPage() :
    location.hash.startsWith('#genre=')    ? genrePage()        :
    location.hash.startsWith('#popular')   ? popularPage()      :
    homePage()
}

function homePage() {
    console.log('Home page');

    // Header
    headerSection.classList.remove('inactive');
    arrowBack.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    // headerGenreTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    
    // Trending movies
    trendingPreviewSection.classList.remove('inactive');
    // trendingPreviewMovieList.classList.remove('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Genre page
    genreSection.classList.add('inactive');

    // Generic
    genericList.classList.add('inactive');

    // Check if the trending movies preview is empty and if so, get the data from the API
    const childrenCategoriesPreview = Array.from(trendingPreviewMovieList.children);
    if (!childrenCategoriesPreview.length){
        getTrendingMoviesPreview();
        getGenresPreview();
    }
}

function trendsPage() {
    console.log('Trends page');

    // // Header
    // headerSection.classList.remove('inactive');
    // arrowBack.classList.remove('inactive');
    // headerTitle.classList.remove('inactive');
    // // headerGenreTitle.classList.add('inactive');

    // // Trending movies
    // trendingPreviewSection.classList.remove('inactive');
    // // trendingPreviewMovieList.classList.remove('inactive');

    // // Movie details
    // movieDetailSection.classList.add('inactive');

    // // Genre page
    // genreSection.classList.add('inactive');

    // // Generic
    // genericList.classList.add('inactive');
    
    // getMovieDetails();
}

function searchPage() {
    console.log('Search page');

    // Header
    headerSection.classList.remove('inactive');
    arrowBack.classList.remove('inactive');
    // headerGenreTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    // Trending movies
    trendingPreviewSection.classList.add('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Genre page
    genreSection.classList.add('inactive');

    // Search
    // searchResultsContainer.classList.remove('inactive');

    // Generic
    genericList.classList.remove('inactive');

    // Get the search query from the hash
    const searchQuery = decodeURI(location.hash.split('=')[1]);
    genericMovieTitle.textContent = `Search results for "${searchQuery}"`;
    searchFormInput.value = searchQuery;
    getMoviesBySearch(searchQuery);
}

function movieDetailsPage() {
    console.log('Movie details page');

    // Header
    headerSection.classList.add('inactive');
    arrowBack.classList.remove('inactive');
    // headerGenreTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    // Trending movies
    trendingPreviewSection.classList.add('inactive');
    // trendingPreviewMovieList.classList.add('inactive');

    // Movie details
    movieDetailSection.classList.remove('inactive');

    // Genre page
    genreSection.classList.add('inactive');

    // Generic
    genericList.classList.add('inactive');

    // Get the movie id from the hash
    const movieId = location.hash.split('=')[1];
    // getMovieDetails(movieId);

    // Check if the movie details are empty and if so, get the data from the API
    const childrenMovieDetails = Array.from(movieDetailInfoContainer.children);
    const childrenMovieImg = Array.from(movieDetailImgContainer.children);
    if (!childrenMovieDetails.length && !childrenMovieImg.length){
        getMovieDetails(movieId);
    } else {
        // Remove the movie details from the previous movie
        childrenMovieDetails.forEach((child) => {
            child.remove();
        });
        childrenMovieImg.forEach((child) => {
            child.remove();
        });
        // Get the movie details from the new movie
        getMovieDetails(movieId);
    }
}

function genrePage() {
    console.log('Genre page');

    // Header
    headerSection.classList.remove('inactive');
    headerMenuListContainer.classList.add("inactive");
    arrowBack.classList.remove('inactive');
    // headerGenreTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    // Search
    searchResultsContainer.classList.add('inactive');
    
    // Trending movies
    trendingPreviewSection.classList.add('inactive');
    
    // Genre page
    genreSection.classList.remove('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Generic
    // genericList.classList.remove('inactive');
    genericList.classList.add('inactive');

    // const genreId = location.hash.split('=')[1].split('_')[0]; // Get the genre id from the hash
    // const genreTitle = location.hash.split('=')[1].split('_')[1]; // Get the genre title from the hash
    const [genreId, genreTitle] = location.hash.split('=')[1].split('_'); // Get the genre id and title from the hash

    headerGenreTitle.textContent = genreTitle; // Set the genre title in the header

    // console.log({genreId});

    // Check if the genre page is empty and if so, get the data from the API
    const childrenGenrePage = Array.from(genreMoviesList.children);
    if (!childrenGenrePage.length){
        getMoviesByGenre(genreId);
    } else {
        // Remove the movies from the previous genre
        childrenGenrePage.forEach((child) => {
            child.remove();
        });
        // Get the movies from the new genre
        getMoviesByGenre(genreId);
    }
}