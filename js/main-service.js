'use strict';
let gLineId = 1;
var gMeme = {
    selectedImgId: 5,
    txts: []
}

let gImages = []

function createLine() {
    let newLine = {
        id: gLineId,
        txt: '',
        size: 16,
        align: 'center',
        color: 'white',
        position: {
            y: gLineId * 20,
            x: getCanvasWidth() / 50
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
            .find(image => image === txt)
        )
}

function getMeme() {
    return gMeme;
}