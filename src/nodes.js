const $ = (id) => document.getElementById(id); // $ = getElementById
const qs = (selector) => document.querySelector(selector); // qs = querySelector

// Sections
const headerSection = $("header");
const trendingPreviewSection = $("trendingPreview");
const searchSection = qs(".search-section");
const genresPreviewSection = $("genresPreview");
const popularSection = $("popular");
const topRatedSection = $("topRated");
const upcomingSection = $("upcoming");
const movieDetailSection = qs(".movie-detail-container");
const favoritesSection = $("favorites");

// Containers & Lists
const headerMenuListContainer = qs(".header-menu-list-container");
const headerMenuList = qs(".header-menu-list");
const headerMenuListHome = qs(".header-menu-list-home");
const headerMenuListFavorites = qs(".header-menu-list-favorites");
const trendingPreviewMovieList = qs(".trending-preview-movie-list");
const popularList = qs(".popular-list");
const topRatedList = qs(".top-rated-list");
const upcomingList = qs(".upcoming-list")
const movieDetailImgContainer = qs(".movie-detail-img-container");
const movieDetailInfoContainer = qs(".movie-detail-info-container");
const genresContainer = qs(".genres-container");
const relatedMoviesList = qs(".related-movies-list");
const arrowBack = qs(".arrow-back-container");
const favoritesList = qs(".favorites-list");

// Elements
const svgElement = qs(".menuSVG");
const headerTitle = qs(".header-title");
const headerFavorites = qs(".header-favorites");
const searchFormInput = $("seachFormInput");
const searchFormBtn = $('searchBtn');
const trendingPreviewViewAll = qs(".trending-preview-view-all");
const movieFavoriteBtn = qs(".movie-favorite-button");

//Generic
const genericList = $("genericList");
const genericMovieList = qs(".generic-movie-list");
const genericMovieTitle = qs(".generic-movie-title");
