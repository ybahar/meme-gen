'use strict';
let gImages = []
let gSearches = {
    'five': 5,
    'one': 1,
    'six': 0,
    'three': 0,
    'thirty': 0,
    'twelve': 0,
    'fifteen': 0,
    'eight': 0,
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
        .filter(img => img.keywords
            .find(image => image
                .includes(txt))
        )
}

function addSearch(txt) {
    (!gSearches[txt]) ? gSearches[txt] = 1 : gSearches[txt]++;
}

function calcTopFiveSearches() {
    let sortedValues = sortByNum(Object.values(gSearches))
    let mostOften = [];
    let counter = 0
    while (counter < 5) {
        let currWordCount = sortedValues.shift()
        for (let searchWord in gSearches) {
            if (gSearches[searchWord] === currWordCount) {
                mostOften.push({ word: searchWord, quantity: gSearches[searchWord] })
                counter++;
            }
        }
    }
    return mostOften;
}

function checkSearchedWord(elImg, word) {
    let imgKeywords = getImageById(elImg.dataset.id).keywords;
    let similarWord = imgKeywords.filter(keyword=>keyword.includes(word));
    console.log(similarWord[0])
    addSearch(similarWord[0]);
}