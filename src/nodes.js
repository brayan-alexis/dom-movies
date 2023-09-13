const $ = (id) => document.getElementById(id); // $ = getElementById
const qs = (selector) => document.querySelector(selector); // qs = querySelector

// Sections
const headerSection = $("header");
const trendingPreviewSection = $("trendingPreview");
const searchSection = qs(".search-section");
const genresPreviewSection = $("genresPreview");
const movieDetailSection = qs(".movie-detail-container");

// Containers & Lists
const headerMenuListContainer = qs(".header-menu-list-container");
const headerMenuList = qs(".header-menu-list");
const searchForm = qs(".search-form");
const trendingPreviewMovieList = qs(".trending-preview-movie-list");
const movieDetailImgContainer = qs(".movie-detail-img-container");
const movieDetailInfoContainer = qs(".movie-detail-info-container");
const genresContainer = qs(".genres-container");
const relatedMoviesList = qs(".related-movies-list");
const arrowBack = qs(".arrow-back-container");

// Elements
const headerTitle = qs(".header-title");
const searchFormInput = $("seachFormInput");
const searchFormBtn = $('searchBtn');


//Generic
const genericList = $("genericList");
const genericMovieList = qs(".generic-movie-list");
const genericMovieTitle = qs(".generic-movie-title");

