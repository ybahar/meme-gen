'use strict';

let gCurrLine;
let gFonts = ['impact', 'pacifico'];

function renderImages(filteredImages) {
    let images = (!filteredImages) ? getImages() : filteredImages;
    let strHtml = ``;
    images.forEach(image =>
        strHtml += `<img data-id="${image.id}" src="${image.url}" onclick="setMemeImg(this)"></img>`
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
    createLine();
    onLineSelect();
    renderLineSelect();
}

function renderLineSelect() {
    let elSelect = document.querySelector('.line-select');
    let strHTML = '';
    let meme = getMeme();
    let i = 1;
    meme.txts.forEach(line => {
        strHTML += `<option value="${line.id}">${i++}</option>`
    })
    elSelect.innerHTML = strHTML;
    document.querySelector('.line-select').value = gCurrLine.id;

}

// change to onElImg
function setMemeImg(elImg) {
    getMeme().img = elImg;
    let searchWord = document.querySelector('.image-search').value
    if (searchWord) {
        document.querySelector('.image-search').value = ''
        checkSearchedWord(elImg, searchWord);
        renderTopFiveSearches()
        renderImages()
    }
    renderCanvas(elImg);
}
function onLineDelete() {
    deleteLine(gCurrLine.id);
    onLineSelect();
    writeOnCanvas();
    renderLineSelect();

}


function renderTopFiveSearches() {
    let topFiveSearches = calcTopFiveSearches()
    let strHTML = topFiveSearches.map(word =>
        `<p onClick="onFilterimage(this.innerText)" style='font-size:${word.quantity * 13}px'>${word.word}</p>`)
    document.querySelector('.topSearches').innerHTML = strHTML.join('');
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onFilterimage(txt) {
    let filteredImages = (txt === '') ? txt : filterImagesByKeywords(txt);
    renderImages(filteredImages);
}

function onLineSelect(id) {
    gCurrLine = getLineById(id);
    document.querySelector('.meme-text').value = gCurrLine.txt;
}

function increaseFontSize() {
    gCurrLine.size += 3;
    if(gCurrLine.size >= 30) gCurrLine.position.y = gCurrLine.position.y + 4.5;
    writeOnCanvas();
}

function decreaseFontSize() {
    gCurrLine.size -= 3;
    if (gCurrLine.size > 30) gCurrLine.position.y = gCurrLine.position.y - 4.5;
    writeOnCanvas();
}

function changeColor(color) {
    gCurrLine.color = `${color}`;
    writeOnCanvas()
}
