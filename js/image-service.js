'use strict';
let gImages = []
let gSearches = {
    'five': 5,
    'one': 1,
    'six': 0,
    'three': 3,
    'thirty': 3,
    'twelve': 3,
    'fifteen': 6,
    'eight': 3,
}



function createImages() {
    createImage('001', ['']);
    createImage('002', ['president', 'trump']);
    createImage('003', ['baby', 'kid', 'qute']);
    createImage('004', ['dog', 'animal']);
    createImage('005', ['baby', 'animal', 'qute']);
    createImage('006', ['thirty']);
    createImage('007', []);
    createImage('008', []);
    createImage('009', []);
    createImage('010', []);
    createImage('011', []);
    createImage('012', []);
}

function createImage(id, keywords) {
    let image = {
        id: id,
        url: `img/${id}.jpg`,
        keywords: keywords
    }
    gImages.push(image);
}

function getImages() {
    return gImages;
}

function getImageById(id) {
    return gImages.find(image => id === image.id)
}

function filterImagesByKeywords(txt) {
    return gImages
        .filter(img => img.keywords.find(image => image.includes(txt)))
}

function addSearch(txt) {
    (!gSearches[txt]) ? gSearches[txt] = 1 : gSearches[txt]++;
}

function calcTopFiveSearches() {
    let sortable = [];
    for (let searchWord in gSearches) {
        if (gSearches[searchWord]) {
            sortable.push([searchWord, gSearches[searchWord]])
        }
    }
    sortable.sort((a, b) => b[1] - a[1]);
    return sortable.slice(0,5);
}

function checkSearchedWord(elImg, word) {
    let imgKeywords = getImageById(elImg.dataset.id).keywords;
    let similarWord = imgKeywords.filter(keyword => keyword === word);
    if (similarWord.length > 0) addSearch(similarWord[0]);
}

function getAllKeywords() {
    let keywords = [];
    gImages.forEach(img => keywords.push(...img.keywords))
    keywords = keywords.filter((keyword, index, self) => index === self.indexOf(keyword))
    return keywords
}

function getImageAsUrl(ev) {
    const [picture] = ev.target.files;
    return URL.createObjectURL(picture);
}