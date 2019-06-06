'use strict';
let gCanvas;
let gCtx;
let gCurrLine;
function renderImages() {
    let images = getImages();
    let strHtml = ``;
    images.forEach(image => {
        strHtml += `<img data-id="${image.id}" src="${image.url}" onclick="setElImg(this)"></img>`
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

function setElImg(elImg){
    gMeme.img = elImg;
    renderCanvas(elImg);
}

function renderCanvas(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function writeOnCanvas(lastWord) {
    let meme = getMeme();
    gCurrLine.txt = lastWord;
    if(meme.img){
        renderCanvas(meme.img);
    }
    meme.txts.forEach(line=> {
        drawText(line);
    })
}

function drawText(line) {
    gCtx.beginPath();
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = line.color;
    gCtx.font = `${line.size}px Arial`;
    gCtx.strokeText(line.txt, line.position.x, line.position.y);
    gCtx.closePath();
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
