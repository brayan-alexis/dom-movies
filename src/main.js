import { API_KEY } from "./secrets.js";
export { 
    getTrendingMoviesPreview, 
    getGenresPreview,
    getTrendingMovies, 
    getMoviesByGenre, 
    getMoviesBySearch, 
    getMovieById as getMovieDetails 
};

window.addEventListener('load', getGenresInMenu, false); // Load the genres in the menu

const ce = (element) => document.createElement(element); // ce = Create element

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        api_key: API_KEY,
    },
});

// Get the SVG element and the menu list container
const svgElement = document.querySelector(".menuSVG");
const headerMenuListContainer = document.querySelector(".header-menu-list-container");
// Show menu on click
svgElement.addEventListener('click', () => {
    svgElement.classList.add('jello-horizontal'); // Add the animation class
    headerMenuListContainer.classList.toggle("inactive"); // Toggle the class to show the menu
    headerMenuListContainer.classList.toggle("scale-up-vertical-top");

    // Remove the animation class after 0.5 seconds
    setTimeout(() => {
        svgElement.classList.remove('jello-horizontal');
    }, 500); // 500 milliseconds = 0.5 seconds
});

// Utils
function fillTrendingMoviesPreview(movies) {
    // Add onlick event to the movie cards
    trendingPreviewMovieList.addEventListener('click', (event) => {
        const movieCard = event.target.closest(".movie-img"); // Find the closest ancestor that matches the selector

        if (movieCard) {
            const movieId = movieCard.dataset.movieId; // Get the movie ID from the data attribute
            location.hash = `#movie=${movieId}`;
        }
    });

    movies.forEach((movie) => {
        const movieCard = ce("div");
        movieCard.classList.add("movie-card");
        
        const movieImg = ce("img");
        movieImg.classList.add("movie-img");
        movieImg.alt = movie.title;
        movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        movieImg.dataset.movieId = movie.id; // Add the movie ID to the data attribute
        movieCard.appendChild(movieImg);

        const movieTitle = ce("h3");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);

        const movieReleaseDate = ce("p");
        movieReleaseDate.classList.add("movie-release-date");
        movieReleaseDate.textContent = `📅 ${movie.release_date}`;
        movieCard.appendChild(movieReleaseDate);
        
        trendingPreviewMovieList.appendChild(movieCard);
    });
}

async function updateGenericMoviesList(movies, parentElement) {
    // Check if the generic movies list is empty
    const existingMovieCards = Array.from(parentElement.children);
    if (!existingMovieCards.length) {
        fillGenericMoviesList(movies, parentElement);
    } else {
        // Remove the previous generic movies
        existingMovieCards.forEach((movieCard) => {
            movieCard.remove();
        });
        // Fill the generic movies list with the new movies
        fillGenericMoviesList(movies, parentElement);
    }
}

function fillGenericMoviesList(movies, parentElement) {
    movies.forEach((movie) => {
        const movieCard = ce("div");
        movieCard.classList.add("movie-card");

        const movieImg = ce("img");
        movieImg.classList.add("movie-img");
        movieImg.alt = movie.title;
        movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        movieImg.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });
        movieCard.appendChild(movieImg);

        const movieTitle = ce("h3");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);
        
        parentElement.appendChild(movieCard);
    });
}


// Calls to API
async function getTrendingMoviesPreview() {
    const { data } = await api("/trending/movie/day");
    const movies = data.results;
    console.log({data, movies});

    // Check if the trending movies list is empty
    const existingMovieCards = Array.from(trendingPreviewMovieList.children);
    if (!existingMovieCards.length) {
        fillTrendingMoviesPreview(movies);
    } else {
        // Remove the previous trending movies
        existingMovieCards.forEach((movieCard) => {
            movieCard.remove();
        });
        // Fill the trending movies list with the new movies
        fillTrendingMoviesPreview(movies);
    }
}

async function getGenresPreview() {
    const { data } = await api("/genre/movie/list");
    const genres = data.genres;
    // console.log({data, genres});

    genres.forEach((genre) => {
        const trendingPreviewMovieList = document.querySelector("#genresPreview .genres-preview-list");

        // const genreContainer = ce("div");
        // genreContainer.classList.add("genres-container");

        const genreTitle = ce("h3");
        genreTitle.classList.add("genre-title");
        genreTitle.setAttribute("id", genre.id);
        const genreTitleText = document.createTextNode(genre.name);

        genreTitle.appendChild(genreTitleText);
        genresContainer.appendChild(genreTitle);
        trendingPreviewMovieList.appendChild(genresContainer);
    });
}

async function getGenresInMenu() {
    const { data } = await api("/genre/movie/list");
    const genres = data.genres;
    
    genres.forEach((genre) => {
        const genreList = document.querySelector(".header-menu-genres-list");
        
        const genreListItem = ce("li");
        genreListItem.classList.add("header-menu-list-item");
        genreListItem.textContent = genre.name; 
        genreListItem.setAttribute("id", genre.id);
        genreListItem.addEventListener('click', () => {
            location.hash = `#genre=${genre.id}_${genre.name}`;
        });
        genreList.appendChild(genreListItem);

    });
}

async function getTrendingMovies(){
    const { data } = await api("/trending/movie/day");
    const movies = data.results;
    // console.log({data, movies});

    updateGenericMoviesList(movies, genericMovieList);
}

async function getMoviesByGenre(genreId) {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: genreId,
        }
    });
    
    const movies = data.results;
    // console.log({data, movies});

    updateGenericMoviesList(movies, genericMovieList);
    // movies.forEach((movie) => {
    //     const movieCard = ce("div");
    //     movieCard.classList.add("movie-card");

    //     const movieImg = ce("img");
    //     movieImg.classList.add("movie-img");
    //     movieImg.alt = movie.title;
    //     movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    //     movieImg.addEventListener('click', () => {
    //         location.hash = `#movie=${movie.id}`;
    //     });
    //     movieCard.appendChild(movieImg);

    //     const movieTitle = ce("h3");
    //     movieTitle.classList.add("movie-title");
    //     movieTitle.textContent = movie.title;
    //     movieCard.appendChild(movieTitle);
        
    //     const genreSection = document.querySelector("#genre .genre-movies-list");
    //     genreSection.appendChild(movieCard);
    // });
}

async function getMoviesBySearch(searchQuery) {
    // searchQuery = decodeURI(searchQuery);
    const { data } = await api('/search/movie', {
        params: {
            query: searchQuery,
        }
    });
    const movies = data.results;

    genericMovieTitle.textContent = `Search results for "${searchQuery}"`;
    updateGenericMoviesList(movies, genericMovieList);

    // movies.forEach((movie) => {
    //     const movieCard = ce("div");
    //     movieCard.classList.add("movie-card");

    //     const movieImg = ce("img");
    //     movieImg.classList.add("movie-img");
    //     movieImg.alt = movie.title;
    //     movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    //     movieCard.appendChild(movieImg);

    //     const movieTitle = ce("h3");
    //     movieTitle.classList.add("movie-title");
    //     movieTitle.textContent = movie.title;
    //     movieCard.appendChild(movieTitle);

    //     searchResultsList.appendChild(movieCard);
    // });
}

async function getMovieById(movieId) {
    const { data: movie } = await api(`/movie/${movieId}`);
    // console.log(movie);

    const movieDetailImg = ce("img");
    movieDetailImg.classList.add("movie-detail-img");
    movieDetailImg.alt = movie.title;
    movieDetailImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieDetailImgContainer.appendChild(movieDetailImg);

    const movieDetailTitle = ce("h2");
    movieDetailTitle.classList.add("movie-detail-title");
    movieDetailTitle.textContent = movie.title;
    movieDetailInfoContainer.appendChild(movieDetailTitle);

    // Container for the release date y runtime
    const movieDetailReleaseRuntimeContainer = ce("div");
    movieDetailReleaseRuntimeContainer.classList.add("movie-detail-release-runtime-container");

    const movieDetailRelease = ce("p");
    movieDetailRelease.classList.add("movie-detail-release-date");
    movieDetailRelease.textContent = `📅 ${movie.release_date}`;
    movieDetailInfoContainer.appendChild(movieDetailRelease);

    const movieDetailSpan = ce("span");
    movieDetailSpan.classList.add("movie-detail-span");
    movieDetailSpan.textContent = " | ";
    movieDetailInfoContainer.appendChild(movieDetailSpan);

    const movieDetailRuntime = ce("p");
    movieDetailRuntime.classList.add("movie-detail-runtime");
    movieDetailRuntime.textContent = `⏱️ ${movie.runtime} min`;
    movieDetailInfoContainer.appendChild(movieDetailRuntime);
    
    movieDetailReleaseRuntimeContainer.appendChild(movieDetailRelease);
    movieDetailReleaseRuntimeContainer.appendChild(movieDetailSpan);
    movieDetailReleaseRuntimeContainer.appendChild(movieDetailRuntime);
    movieDetailInfoContainer.appendChild(movieDetailReleaseRuntimeContainer);

    const movieDetailRating = ce("p");
    movieDetailRating.classList.add("movie-detail-rating");
    movieDetailRating.textContent = `⭐ ${movie.vote_average}`;
    movieDetailInfoContainer.appendChild(movieDetailRating);

    const movieDetailOverview = ce("p");
    movieDetailOverview.classList.add("movie-detail-overview");
    movieDetailOverview.textContent = movie.overview;
    movieDetailInfoContainer.appendChild(movieDetailOverview);

    getRelatedMovies(movieId);
}

async function getRelatedMovies(movieId) {
    const { data } = await api(`/movie/${movieId}/similar`);
    const relatedMovies = data.results;

    // Check if the related movies list is empty
    const childrenRelatedMovies = Array.from(relatedMoviesList.children);
    if (!childrenRelatedMovies.length) {
        updateGenericMoviesList(relatedMovies, relatedMoviesList);
        
    } else {
        // Remove the related movies from the previous movie
        childrenRelatedMovies.forEach((child) => {
            child.remove();
        });
        // Get the related movies from the new movie
        updateGenericMoviesList(relatedMovies, relatedMoviesList);
    }
    
}