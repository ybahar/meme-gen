'use strict';
let gCanvas;
let gCtx;
let gCurrLine;

function renderImages(filteredImages) {
    let images = (!filteredImages) ? getImages() : filteredImages;
    let strHtml = ``;
    images.forEach(image =>
        strHtml += `<img data-id="${image.id}" src="${image.url}" onclick="setElImg(this)"></img>`
    );
    document.querySelector('.gallery-container').innerHTML = strHtml;
}



function onInit() {
    createCanvas();
    createImages();
    renderImages();
    onCreateLine();
    alignSelect('center');
}

function onCreateLine() {
    let newLine = createLine();
    gCurrLine = newLine;
    renderLineSelect();
}

function renderLineSelect() {
    let elSelect = document.querySelector('.line-select');
    let strHTML = '';
    let meme = getMeme();
    meme.txts.forEach(line => {
        console.log(line.id);
        strHTML += `<option value="${line.id}">${line.id}</option>`
    })
    elSelect.innerHTML = strHTML;

}
function createCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = window.innerWidth - 50
    gCanvas.height = window.innerHeight - 100
}

function setElImg(elImg) {
    getMeme().img = elImg;
    renderCanvas(elImg);
}

function renderCanvas(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function writeOnCanvas(lastWord) {
    let meme = getMeme();
    if (lastWord || lastWord === '') {
        gCurrLine.txt = lastWord;
        //MAKE THIS SHIT BETTER 
        // gCurrLine.position.x = getCanvasWidth() /2 -  lastWord.length* (gCurrLine.size/5);
        // gCtx.textAlign = 'center'
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
    gCtx.font = `${line.size}px Arial`;
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
}
function onLineSelect(id) {
    gCurrLine = getLineById(id);
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

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onFilterimage(txt) {
    let filteredImages = (txt === '') ? txt : filterImagesByKeywords(txt);
    renderImages(filteredImages);
}

