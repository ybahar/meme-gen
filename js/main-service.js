'use strict';
let gLineId=1;
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
        postion: {
            y: gLineId * 20,
            x: getCanvasWidth / 50
        }
    }
    gMeme.txts.push(newLine);
    gLineId++;


}
function createImages() {
    createImage('001', []);
    createImage('002', []);
    createImage('003', []);
    createImage('004', []);
    createImage('005', []);
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


