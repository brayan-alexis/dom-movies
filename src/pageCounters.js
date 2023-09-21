export { 
    setTrendingPageCounter, 
    getTrendingPageCounter, 
    setGenrePageCounter, 
    getGenrePageCounter, 
    setSearchPageCounter, 
    getSearchPageCounter,
    setMaxPage,
    getMaxPage,
};

let maxPage;
let trendingPageCounter = 1; 
let genrePageCounter = 1; 
let searchPageCounter = 1;

function setTrendingPageCounter(newPage) {
  trendingPageCounter = newPage;
}

function getTrendingPageCounter() {
    return trendingPageCounter;
}

function setGenrePageCounter(newPage) {
    genrePageCounter = newPage;
}

function getGenrePageCounter() {
    return genrePageCounter;
}

function setSearchPageCounter(newPage) {
    searchPageCounter = newPage;
}

function getSearchPageCounter() {
    return searchPageCounter;
}

function setMaxPage(newMaxPage) {
    maxPage = newMaxPage;
}

function getMaxPage() {
    return maxPage;
}