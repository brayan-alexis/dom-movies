import { 
    getTrendingMoviesPreview, 
    getGenresPreview,
    getTrendingMovies, 
    getMoviesByGenre, 
    getMoviesBySearch,
    getMovieDetails
} from './main.js';

headerTitle.addEventListener('click', () => {
    location.hash = '';
});
arrowBack.addEventListener('click', () => {
    // event.preventDefault();
    // location.hash = '';

    console.log('hi');
    // Get the URL of the previous page
    const previousUrl = document.referrer;

    // Check if the previous URL belongs to the same application
    if (previousUrl.includes(location.hostname)) {
        // If it does, go back to the previous URL
        history.back();
    } else {
        // If it doesn't belong to the same application, redirect to the application's home
        window.location.href = '/'; // Replace '/' with the URL of your home page
    }
});
searchFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    location.hash = `#search=${searchFormInput.value}`;
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
    // searchForm.classList.remove('inactive');

    // Search
    searchSection.classList.remove('inactive');
    
    // Trending movies
    trendingPreviewSection.classList.remove('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Genres preview
    genresPreviewSection.classList.remove('inactive');

    // Generic
    genericList.classList.add('inactive');

    // Check if the trending movies preview is empty and if so, get the data from the API
    // const childrenCategoriesPreview = Array.from(trendingPreviewMovieList.children);
    // if (!childrenCategoriesPreview.length){
    //     getTrendingMoviesPreview();
    //     getGenresPreview();
    // }

    getTrendingMoviesPreview();
    getGenresPreview();
}

function trendsPage() {
    console.log('Trends page');

    // Header
    headerSection.classList.remove('inactive');
    arrowBack.classList.remove('inactive');
    // searchForm.classList.add('inactive');

    // Search
    searchSection.classList.add('inactive');
    
    // Trending movies
    trendingPreviewSection.classList.add('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Genres preview
    genresPreviewSection.classList.add('inactive');

    // Generic
    genericList.classList.remove('inactive');

    // Check if the trending movies preview is empty and if so, get the data from the API
    const childrenCategoriesPreview = Array.from(genericMovieList.children);
    if (!childrenCategoriesPreview.length){
        getTrendingMovies();
    } else {
        // Remove the movies from the previous category
        childrenCategoriesPreview.forEach((child) => {
            child.remove();
        });
        // Get the movies from the new category
        getTrendingMovies();
    }
}

function searchPage() {
    console.log('Search page');

    // Header
    headerSection.classList.remove('inactive');
    arrowBack.classList.remove('inactive');
    // searchForm.classList.remove('inactive');

    // Search
    searchSection.classList.remove('inactive');

    // Trending movies
    trendingPreviewSection.classList.add('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Genres preview
    genresPreviewSection.classList.add('inactive');

    // Generic
    genericList.classList.remove('inactive');

    // Get the search query from the hash
    const searchQuery = decodeURI(location.hash.split('=')[1]);
    // const searchQuery = searchFormInput.value;
    // searchFormInput.value = searchQuery;
    getMoviesBySearch(searchQuery);
}

function movieDetailsPage() {
    console.log('Movie details page');

    // Header
    headerSection.classList.add('inactive');
    arrowBack.classList.remove('inactive');
    searchForm.classList.add('inactive');

    // Trending movies
    trendingPreviewSection.classList.add('inactive');

    // Movie details
    movieDetailSection.classList.remove('inactive');

    // Genres preview
    genresPreviewSection.classList.add('inactive');

    // Generic
    genericList.classList.add('inactive');

    // Get the movie id from the hash
    const movieId = location.hash.split('=')[1];

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
    // searchForm.classList.add('inactive');

    // Search
    searchSection.classList.add('inactive');
    
    // Trending movies
    trendingPreviewSection.classList.add('inactive');

    // Movie details
    movieDetailSection.classList.add('inactive');

    // Genres preview
    genresPreviewSection.classList.add('inactive');

    // Generic
    genericList.classList.remove('inactive');

    const [genreId, genreTitle] = location.hash.split('=')[1].split('_'); // Get the genre id and title from the hash

    genericMovieTitle.textContent = genreTitle; // Set the genre title in the header

    getMoviesByGenre(genreId);
}