'use strict';

let gCurrLine;
let gFonts = ['impact', 'pacifico'];

function onInit() {
    createCanvas();
    createImages();
    renderImages();
    renderTopFiveSearches()
    renderFonts();
    renderDataList();
}

function renderImages(filteredImages) {
    let images = (!filteredImages) ? getImages() : filteredImages;
    let strHtml = ``;
    images.forEach(image =>
        strHtml += `<a href="#canvas"><img data-id="${image.id}" src="${image.url}" onclick="setMemeImg(this)"></img></a>`
    );
    document.querySelector('.gallery-container').innerHTML = strHtml;
}


function renderFonts() {
    let strHTML = ``;
    gFonts.forEach(font => {
        strHTML += `<option onclick="onFontChange('${font}')" style="font-family: ${font}">${font}</option>`
    });
    document.querySelector('.font-select').innerHTML = strHTML;
}
function onFillColorSelect(color) {
    gCurrLine.fillColor = color;
    writeOnCanvas();
}
function onFontChange(font) {
    gCurrLine.font = font;
    writeOnCanvas();

}
function openFontArea() {
    document.querySelector('.font-select').classList.toggle('open');
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
    addSearch123(elImg);
    renderCanvas(elImg);
    initCanvasForMeme();
}


function addSearch123(elImg) {
    let searchWord = document.getElementById('search-input').value
    if (searchWord) {
        document.getElementById('search-input').value = ''
        checkSearchedWord(elImg, searchWord);
        renderTopFiveSearches()
        renderImages()
    }
}
function onLineDelete() {
    deleteLine(gCurrLine.id);
    renderLineSelect();
    onLineSelect();
    writeOnCanvas();
}

function renderTopFiveSearches() {
    let topFiveSearches = calcTopFiveSearches()
    let strHTML = topFiveSearches.map(word =>
        `<p onClick="onFilterimage(this.innerText)" style='font-size:${word[1] * 13}px'>${word[0]}</p>`)
    document.querySelector('.topSearches').innerHTML = strHTML.join('');
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onFilterimage(txt) {
    let filteredImages = (txt === '') ? txt : filterImagesByKeywords(txt.toLowerCase());
    renderImages(filteredImages);
}

function onLineSelect(id, line) {
    gCurrLine = (line) ? line : getLineById(id);
    document.querySelector('.meme-text').value = gCurrLine.txt;
    document.querySelector('.line-select').value = gCurrLine.id;
}

function increaseFontSize() {
    gCurrLine.size += 3;
    if (gCurrLine.size >= 30) gCurrLine.position.y = gCurrLine.position.y + 4.5;
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


function renderDataList() {
    let elDataList = document.querySelector('datalist');
    let strHtml = '';
    let keywords = getAllKeywords();
    keywords.forEach(keyword => strHtml += `<option value="${keyword}">`);
    elDataList.innerHTML = strHtml;
}

function toggleContactModal() {
    document.querySelector('.contact-us').classList.toggle('open');
}

function contactUs() {
    let elForm = document.querySelector('.contact-us form');
    let name = elForm.querySelector('.contact-select').value;
    let contactInfo = (name === 'yarin') ? 'yarinb1@gmail.com' : 'orielshalem@gmail.com'
    let subject = elForm.querySelector('#email-subject').value;
    let emailBody = elForm.querySelector('#contact-body').value;
    window.location = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo}&su=${subject}&body=${emailBody}`;
}