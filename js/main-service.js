'use strict';

let gImages = []
console.log('hi');
function createImages(){
    createImage('001',[]);
    createImage('002',[]);
    createImage('003',[]);
    createImage('004',[]);
    createImage('005',[]);
    createImage('006',[]);
    createImage('007',[]);
    createImage('008',[]);
    createImage('009',[]);
    createImage('010',[]);
    createImage('011',[]);
    createImage('012',[]);
}

function createImage(id,keywords){
    let image = {
        id : id ,
        url :`img/${id}.jpg`,
        keywords : keywords
    }
    gImages.push(image);
}

function getImages(){
    return gImages;
}


