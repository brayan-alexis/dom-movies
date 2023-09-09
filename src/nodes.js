const $ = (id) => document.getElementById(id); // $ = getElementById
const qs = (selector) => document.querySelector(selector); // qs = querySelector

// Sections
const headerSection = $("header");
const trendingPreviewSection = $("trendingPreview");
const movieDetailSection = qs(".movie-detail-container");
const genreSection = $("genre");

// Containers & Lists
const headerMenuListContainer = qs(".header-menu-list-container");
const headerMenuList = qs(".header-menu-list");
const searchForm = qs(".search-form");
const trendingPreviewMovieList = qs(".trending-preview-movie-list");
const genreMoviesList = qs(".genre-movies-list");
const searchResultsContainer = qs(".search-results-container");
const searchResultsList = qs(".search-results-list");
// const movieDetailContainer = qs(".movie-detail-container");
const movieDetailImgContainer = qs(".movie-detail-img-container");
const movieDetailInfoContainer = qs(".movie-detail-info-container");

// Elements
const arrowBack = qs(".arrow-back-container");
const headerTitle = qs(".header-title");
const headerGenreTitle = qs(".genre-title");

const searchFormInput = $("seachFormInput");
const searchFormBtn = $('searchBtn');

//Generic
const genericList = $("genericList");
const genericMovieList = qs(".generic-movie-list");
const genericMovieTitle = qs(".generic-movie-title");

