'use strict';
let gCanvas;
let gCtx;


function test(){
    createImages();
    renderImages();
}
function renderImages(){
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
        let gCanvas = document.getElementById('canvas');
        let ctx = gCanvas.getContext('2d');
        gCanvas.width = window.innerWidth - 50
        gCanvas.height = window.innerHeight - 100
}

function renderCanvas(img) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function writeOnCanvas(lastWord) {
    
}

