export { 
    setTrendingPageCounter, 
    getTrendingPageCounter, 
    setGenrePageCounter, 
    getGenrePageCounter, 
    setSearchPageCounter, 
    getSearchPageCounter 
};

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