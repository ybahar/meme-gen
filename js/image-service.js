'use strict';
let gImages = []
let gSearches = {
    'five': 5,
    'one': 1,
    'fifteen': 6,
    'eight': 3,
}

function createImages() {
    createImage('001', ['cinderella']);
    createImage('002', ['president', 'trump']);
    createImage('003', ['baby', 'kid', 'qute']);
    createImage('004', ['dog', 'animal']);
    createImage('005', ['baby', 'animal', 'qute']);
    createImage('006', ['cat']);
    createImage('007', ['magician', 'evil']);
    createImage('008', ['kid', 'evil']);
    createImage('009', ['haim','good']);
    createImage('010', ['idiot','what']);
    createImage('011', ['smart','idiot']);
    createImage('012', ['sing','']);
    createImage('013', []);
    createImage('014', []);
    createImage('015', []);
    createImage('016', []);
    createImage('017', []);
    createImage('018', []);
    createImage('019', []);
    createImage('020', []);
    createImage('022', []);
    createImage('023', []);
    createImage('024', []);
    createImage('025', []);
    createImage('026', []);
    createImage('027', []);
    createImage('028', []);
    createImage('029', []);
    createImage('030', []);
    createImage('031', []);
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