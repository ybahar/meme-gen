'use strict';
let gCanvas;
let gCtx;
let gCurrLine;
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
    onCreateLine();
}

function onCreateLine(){
    let newLine = createLine();
    gCurrLine = newLine;
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
    gCurrLine.txt = lastWord;
    console.log(gCurrLine);
    drawText(gCurrLine, 20, 20);
}

function drawText() {
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = gCurrLine.color;
    gCtx.font = `${gCurrLine.size}px Arial`;
    gCtx.strokeText(gCurrLine.txt, gCurrLine.position.x, gCurrLine.position.y);
}

function onLineSelect(id){
    gCurrLine = getLineById(id);
}

function increaseFontSize() {
    gCurrLine.size += 3;
}

function decreaseFontSize() {
    gCurrLine.size -= 3;
}

function changeColor(color) {
    console.log(`${color}`)
    console.log(gCurrLine)
    gCurrLine.color = `${color}`;
}

function onCanvasClicked(ev) {
    const {offsetX, offsetY} = ev;
}

function getCanvasWidth(){
    return gCanvas.width;
}
