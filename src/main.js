import { API_KEY } from "./secrets.js";
export { getTrendingMoviesPreview, getGenresPreview };

window.addEventListener('load', getGenres, false); // Load the genres in the menu

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
        movieCard.appendChild(movieImg);

        const movieTitle = ce("h3");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);

        // const movieVoteAvg = ce("p");
        // movieVoteAvg.classList.add("movie-vote-avg");
        // movieVoteAvg.textContent = `⭐ ${movie.vote_average}`;
        // movieCard.appendChild(movieVoteAvg);

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

async function getGenres() {
    const { data } = await api("/genre/movie/list");
    const genres = data.genres;
    
    genres.forEach((genre) => {
        const genreList = document.querySelector(".header-menu-genres-list");
        
        const genreListItem = ce("li");
        genreListItem.classList.add("header-menu-list-item");
        genreListItem.textContent = genre.name;
        genreList.appendChild(genreListItem);

    });
}
// getGenres();
