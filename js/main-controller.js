
'use strict';
let gCanvas;
let gCtx;

function renderImages(){
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
    
}

