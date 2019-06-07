'use strict';

let gCanvas;
let gCtx;
let isMouseClicked = false;
function createCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
   
}

function initCanvasForMeme(){
    onCreateLine();
    alignSelect('center');


}

function renderCanvas(elImg) {
    gCanvas.width = elImg.naturalWidth;
    gCanvas.height = elImg.naturalHeight;
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function writeOnCanvas(lastWord) {
    let meme = getMeme();
    if (lastWord || lastWord === '') {
        gCurrLine.txt = lastWord;
    }
    if (meme.img) {
        renderCanvas(meme.img);
    }
    meme.txts.forEach(line => {
        drawText(line);
    })
}

function drawText(line) {
    gCtx.textAlign = line.align;
    gCtx.beginPath();
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.strokeText(line.txt, line.position.x, line.position.y);
    gCtx.closePath();
}

function alignSelect(alignment) {
    gCurrLine.align = alignment;
    switch (alignment) {
        case 'left':
            gCurrLine.position.x = 0;
            break;
        case 'center':
            gCurrLine.position.x = getCanvasWidth() / 2;
            break;
        case 'right':
            gCurrLine.position.x = getCanvasWidth();
            break;
    }
    writeOnCanvas()
}


function onCanvasClicked(ev) {
    const { offsetX, offsetY } = ev;
    let line = findLineByPos(offsetX,offsetY);
    if(line){
        onLineSelect(null , line);
        isMouseClicked = true;
    }


}

function dragLine(ev){
    if(!isMouseClicked) return;
 gCurrLine.position.x = ev.offsetX;
 gCurrLine.position.y = ev.offsetY;
 writeOnCanvas();
}

function onMouseRelease(){
    isMouseClicked = false;
}
function getCanvasWidth() {
    return gCanvas.width;
}


function moveLine(keyboardEvent) {
    if ([37, 38, 39, 40].indexOf(keyboardEvent.keyCode) > -1) {

        keyboardEvent.preventDefault();
    }
    switch (keyboardEvent.code) {
        case 'ArrowUp':
            gCurrLine.position.y -= 20;
            break;
        case 'ArrowDown':
            gCurrLine.position.y += 20;
            break;
        case 'ArrowLeft':
            gCurrLine.position.x -= 20;
            break;
        case 'ArrowRight':
            gCurrLine.position.x += 20;
            break;
        default: return null;
    }
    writeOnCanvas();
}

 function getCanvasHeight(){
     return gCanvas.height;
 }