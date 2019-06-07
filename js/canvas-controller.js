'use strict';

let gCanvas;
let gCtx;

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

function onLineSelect(id) {
    gCurrLine = getLineById(id);
    document.querySelector('.meme-text').value = gCurrLine.txt;
}

function increaseFontSize() {
    gCurrLine.size += 3;
    writeOnCanvas()
}

function decreaseFontSize() {
    gCurrLine.size -= 3;
    writeOnCanvas()
}

function changeColor(color) {
    gCurrLine.color = `${color}`;
    writeOnCanvas()
}

function onCanvasClicked(ev) {
    const { offsetX, offsetY } = ev;
}

function getCanvasWidth() {
    return gCanvas.width;
}


function moveLine(keyboardEvent) {
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