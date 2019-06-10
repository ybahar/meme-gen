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
    createImage('012', ['sing','woman']);
    createImage('013', ['bald']);
    createImage('014', ['kids','funny']);
    createImage('015', ['trump','president']);
    createImage('016', ['baby','surprised']);
    createImage('017', ['dog','animal']);
    createImage('018', ['president','obama']);
    createImage('019', ['kiss','boxers']);
    createImage('020', ['decaprio']);
    createImage('021', ['metrix']);
    createImage('022', ['rings']);
    createImage('023', ['x-man']);
    createImage('024', ['president','putin']);
    createImage('025', ['toy story']);
    createImage('026', ['idiot']);
    createImage('027', []);
    createImage('028', ['smart']);
    createImage('029', ['game of thrones']);
    createImage('030', ['fire']);
    createImage('031', ['game of thrones']);
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