const $ = (id) => document.getElementById(id); // $ = getElementById
const qs = (selector) => document.querySelector(selector); // qs = querySelector

// Sections
const headerSection = $("header");
const trendingPreviewSection = $("trendingPreview");
const movieDetailSection = qs(".movie-detail-container");

// Containers & Lists
const searchForm = qs(".search-form");
const trendingPreviewMovieList = qs(".trending-preview-movie-list");

// Elements
const arrowBack = qs(".arrow-back-container");
const headerTitle = qs(".header-title");
// const headerGenreTitle = qs(".header-title--categoryView");

// const searchFormInput = $("searchForm input"); //Check if this is needed
const searchFormBtn = $('searchBtn');


