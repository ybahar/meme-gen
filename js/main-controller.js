'use strict';
let gCanvas;
let gCtx;

function renderImages() {
    let images = getImages();
    let strHtml = ``;
    images.forEach(image => {
        strHtml += `<img data-id="${image.id}" src="${image.url}" onclick="renderCanvas(this)"></img>`
    });
    document.querySelector('.gallery-container').innerHTML = strHtml;
}


function onInit() {
    createCanvas();
    createImages();
    renderImages();
}

function createCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = window.innerWidth - 50
    gCanvas.height = window.innerHeight - 100
}

function renderCanvas(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function writeOnCanvas(lastWord) {
    drawText(lastWord, 20, 20)
}

function drawText() {
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = '';
    gCtx.font = `${gCurrLine.size}px Arial`;
    gCtx.strokeText(gCurrLine.txt, gCurrLine.position.x, gCurrLine.position.y);
}

function increaseFontSize() {
    gCurrLine.size += 3;
}

function decreaseFontSize() {
    gCurrLine.size -= 3;
}

function changeColor(color) {
    gCurrLine.color = `${color}`;
}

function onCanvasClicked(ev) {
    let {offsetX, offsetY} = ev
}