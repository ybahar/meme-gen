'use strict';
let gLineId = 1;
var gMeme = {
    selectedImgId: 5,
    txts: []
}
let gImages = []
let gSearches = {}

function createLine() {
    let newLine = {
        id: gLineId,
        txt: '',
        size: 16,
        align: 'center',
        color: 'white',
        position: {
            y: gLineId * 20,
            x: getCanvasWidth() / 2
        }
    }
    gMeme.txts.push(newLine);
    gLineId++;
    return newLine
}

function createImages() {
    createImage('001', ['']);
    createImage('002', ['president', 'trump']);
    createImage('003', ['baby', 'kid', 'qute']);
    createImage('004', ['dog', 'animal']);
    createImage('005', ['baby', 'animal', 'qute']);
    createImage('006', []);
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

function getLineIdxById(id) {
    return gMeme.txts.findIndex(line => id === line.id + '')
}

function getLineById(id) {
    let idx = getLineIdxById(id);
    return gMeme.txts[idx];
}


function filterImagesByKeywords(txt) {
    return gImages
        .filter(img => img.keywords
            .find(image => image
                .includes(txt))
        )
}

function getMeme() {
    return gMeme;
}

function findFrequentSearch(words) {
    // let res = words.reduce((acc, word) => {
    //     (!acc[word]) ? acc[word] = 1 : acc[word]++;
    //     return acc
    // }, {})
//     let mostShownCount = Math.max(...Object.values(res));
//     let mostOften = []
//     for (let x in res) {
//         if (res[x] === mostShownCount) mostOften.push({ num: +x, quantity: res[x] })
//     }
//     return mostOften;
}

function addSearch(txt) {
    (!gSearches[txt]) ? gSearches[txt] = 1 : gSearches[txt]++;
}

function calcSearches()