const $ = (id) => document.getElementById(id); // $ = getElementById
const qs = (selector) => document.querySelector(selector); // qs = querySelector

// Sections
const headerSection = $("header");
const trendingPreviewSection = $("trendingPreview");
const searchSection = qs(".search-section");
const genresPreviewSection = $("genresPreview");
const movieDetailSection = qs(".movie-detail-container");
const favoritesSection = $("favorites");

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
const favoritesList = qs(".favorites-list");

// Elements
const svgElement = qs(".menuSVG");
const headerTitle = qs(".header-title");
const searchFormInput = $("seachFormInput");
const searchFormBtn = $('searchBtn');
const trendingPreviewViewAll = qs(".trending-preview-view-all");

//Generic
const genericList = $("genericList");
const genericMovieList = qs(".generic-movie-list");
const genericMovieTitle = qs(".generic-movie-title");
