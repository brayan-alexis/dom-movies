import { API_KEY } from "./secrets.js";
export { getTrendingMoviesPreview, getGenresPreview, getMoviesByGenre, getMoviesBySearch, getMovieDetails };

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
// async function getElementsAndFillList(path, parentElement, optionalConfig = {}) {
//     const { data } = await api(path, optionalConfig);
//     const elements = data.results;
//     // console.log({data, elements});

//     elements.forEach((element) => {
//         const elementContainer = ce("div");
//         elementContainer.classList.add("element-container");

//         const elementImg = ce("img");
//         elementImg.classList.add("element-img");
//         elementImg.alt = element.title;
//         elementImg.src = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
//         elementContainer.appendChild(elementImg);

//         const elementTitle = ce("h3");
//         elementTitle.classList.add("element-title");
//         elementTitle.textContent = element.title;
//         elementContainer.appendChild(elementTitle);

//         const elementReleaseDate = ce("p");
//         elementReleaseDate.classList.add("element-release-date");
//         elementReleaseDate.textContent = `📅 ${element.release_date}`;
//         elementContainer.appendChild(elementReleaseDate);
        
//         parentElement.appendChild(elementContainer);
//     });
// }

async function createGenericMovies(movies, parentElement) {
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
    } );
}

// Call to API
async function getTrendingMoviesPreview() {
    const { data } = await api("/trending/movie/day");
    const movies = data.results;
    console.log({data, movies});

    movies.forEach((movie) => {
        const trendingPreviewMovieList = document.querySelector("#trendingPreview .trending-preview-movie-list");

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

        const movieReleaseDate = ce("p");
        movieReleaseDate.classList.add("movie-release-date");
        movieReleaseDate.textContent = `📅 ${movie.release_date}`;
        movieCard.appendChild(movieReleaseDate);
        
        trendingPreviewMovieList.appendChild(movieCard);
    });
}

async function getGenresPreview() {
    const { data } = await api("/genre/movie/list");
    const genres = data.genres;
    // console.log({data, genres});

    genres.forEach((genre) => {
        const trendingPreviewMovieList = document.querySelector("#genresPreview .genres-preview-list");

        const genreContainer = ce("div");
        genreContainer.classList.add("genre-container");

        const genreTitle = ce("h3");
        genreTitle.classList.add("genre-title");
        genreTitle.setAttribute("id", genre.id);
        const genreTitleText = document.createTextNode(genre.name);

        genreTitle.appendChild(genreTitleText);
        genreContainer.appendChild(genreTitle);
        trendingPreviewMovieList.appendChild(genreContainer);
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

async function getMoviesByGenre(genreId) {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: genreId,
        }
    });
    
    const movies = data.results;
    // console.log({data, movies});

    // createGenericMovies(movies, genericMovieList);
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
        
        const genreSection = document.querySelector("#genre .genre-movies-list");
        genreSection.appendChild(movieCard);
    });
}

async function getMoviesBySearch(searchQuery) {
    searchQuery = decodeURI(searchQuery);
    const { data } = await api('/search/movie', {
        params: {
            query: searchQuery,
        }
    });
    
    const movies = data.results;

    createGenericMovies(movies, genericMovieList);

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

async function getMovieDetails(movieId) {
    const { data } = await api(`/movie/${movieId}`);
    const movie = data;
    console.log({data, movie});

    const movieDetailImg = ce("img");
    movieDetailImg.classList.add("movie-detail-img");
    movieDetailImg.alt = movie.title;
    movieDetailImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    movieDetailImgContainer.appendChild(movieDetailImg);

    const movieDetailTitle = ce("h2");
    movieDetailTitle.classList.add("movie-detail-title");
    movieDetailTitle.textContent = movie.title;
    movieDetailInfoContainer.appendChild(movieDetailTitle);
    
    const movieDetailRating = ce("p");
    movieDetailRating.classList.add("movie-detail-rating");
    movieDetailRating.textContent = `⭐ ${movie.vote_average}`;
    movieDetailInfoContainer.appendChild(movieDetailRating);
    
    const movieDetailReleaseDate = ce("p");
    movieDetailReleaseDate.classList.add("movie-detail-release-date");
    movieDetailReleaseDate.textContent = `📅 ${movie.release_date}`;
    movieDetailInfoContainer.appendChild(movieDetailReleaseDate);

    const movieDetailOverview = ce("p");
    movieDetailOverview.classList.add("movie-detail-overview");
    movieDetailOverview.textContent = movie.overview;
    movieDetailInfoContainer.appendChild(movieDetailOverview);
}