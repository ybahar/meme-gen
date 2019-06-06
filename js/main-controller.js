'use strict';
let gCanvas;
let gCtx;
let gCurrLine;
let gFonts = ['impact', 'pacifico'];

function renderImages(filteredImages) {
    let images = (!filteredImages) ? getImages() : filteredImages;
    let strHtml = ``;
    images.forEach(image =>
        strHtml += `<img data-id="${image.id}" src="${image.url}" onclick="setElImg(this)"></img>`
    );
    document.querySelector('.gallery-container').innerHTML = strHtml;
}


function renderFonts() {
    let strHTML = ``;
    gFonts.forEach(font => {
        console.log('fonts entered')
        strHTML += `<option onclick="onFontChange('${font}')" style="font-family: ${font}">${font}</option>`
    });
    document.querySelector('.font-select').innerHTML = strHTML;
}

function onFontChange(font) {
    gCurrLine.font = font;
    writeOnCanvas();

}
function openFontArea() {
    document.querySelector('.font-select').classList.toggle('open');
}

function onInit() {
    createCanvas();
    createImages();
    renderImages();
    onCreateLine();
    alignSelect('center');
    renderTopFiveSearches()
    renderFonts();
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

function renderTopFiveSearches() {
    let topFiveSearches = calcTopFiveSearches()
    let strHTML = topFiveSearches.map(word =>
        `<p onClick="onFilterimage(this.innerText)" style='font-size:${word.quantity * 3}px'>${word.word}</p>`)
    document.querySelector('.topSearches').innerHTML = strHTML.join('');
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