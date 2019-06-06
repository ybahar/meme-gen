
'use strict';

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
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth - 50
        canvas.height = window.innerHeight - 100
}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function writeOnCanvas(lastWord) {
    
}

