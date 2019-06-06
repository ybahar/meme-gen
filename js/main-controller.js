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