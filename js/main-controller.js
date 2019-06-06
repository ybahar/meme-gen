'use strict';
let gCanvas;
let gCtx;


function test() {
    createImages();
    renderImages();
}
function renderImages() {
    let images = getImages();
    let strHtml = ``;
    images.forEach(image => {
        strHtml += `<img data-id="${image.id}" src="${image.url}" ></img>`
    });
    document.querySelector('.gallery-container').innerHTML = strHtml;
}


function onInit() {
    createCanvas();
}

function createCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = window.innerWidth - 50
    gCanvas.height = window.innerHeight - 100
}

function renderCanvas(img) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
}

function writeOnCanvas(lastWord) {
    gCtx.clearRect(0, 0, gCanvas.width, 50)
    drawText(lastWord, 20, 20)
}

function drawText(txt, x, y) {
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'green'
    gCtx.font = "17px Arial";
    // ctx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}