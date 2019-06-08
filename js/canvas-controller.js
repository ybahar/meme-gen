'use strict';
console.log('new mobile drag test with mouse event idea test 1 ');
let gCanvas;
let gCtx;
function createCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
   
}

function initCanvasForMeme(){
    onCreateLine();
    alignSelect('center');
    gCanvas.addEventListener("touchstart", function (ev){
        let touchEv = ev.touches[0];
        let mouseEv = new mouseEvent('mousedown',{
            clientX : touchEv.clientX,
            clientY : touchEv.clientY
        })
        gCanvas.dispatchEvent(mouseEv);
       } , false);
    gCanvas.addEventListener("touchmove", function (ev){
        let touchEv = ev.touches[0];
        let mouseEv = new mouseEvent('mousemove',{
            clientX : touchEv.clientX,
            clientY : touchEv.clientY
        })
        gCanvas.dispatchEvent(mouseEv);
       } , false);
       gCanvas.addEventListener("touchend" , onMouseRelease,false);
}

function renderCanvas(elImg) {
    gCanvas.width = elImg.naturalWidth;
    gCanvas.height = elImg.naturalHeight;
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
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.strokeText(line.txt, line.position.x, line.position.y);
    gCtx.fillText(line.txt, line.position.x, line.position.y);
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

function onCanvasClicked(ev) {
    if(!ev.touches){
        var { offsetX, offsetY } = ev;
    }

    console.log(offsetX , offsetY);
    let coords= getMousePos(gCanvas,ev);
    // let line = findLineByPos(offsetX,offsetY); //testing mobile friendly version 
    let line = findLineByPos(coords);
    if(line){
        onLineSelect(null , line);
        gCurrLine.clicked.isClicked = true;
        gCurrLine.clicked.offsetX = offsetX;
        gCurrLine.clicked.offsetY = offsetY;
    }
    // console.log(line);


}

function dragLine(ev){
    if(!gCurrLine || !gCurrLine.clicked.isClicked) return;
    if(ev.touches){
       var offsetX = ev.touches[0].screenX; 
       var offsetY = ev.touches[0].screenY; 
    } else {
        var {offsetX , offsetY } = ev;
    }
 gCurrLine.position.x += (offsetX - gCurrLine.clicked.offsetX);
 gCurrLine.position.y += (offsetY - gCurrLine.clicked.offsetY);
 gCurrLine.clicked.offsetX = ev.offsetX;
 gCurrLine.clicked.offsetY = ev.offsetY;
 writeOnCanvas();
}

function onMouseRelease(){
    gCurrLine.clicked.isClicked = false;
    gCurrLine.clicked.offsetX = null;
    gCurrLine.clicked.offsetY = null;
}

function getCanvasWidth() {
    return gCanvas.width;
}


function moveLine(keyboardEvent) {
    if (!gCurrLine) return
    if ([37, 38, 39, 40].indexOf(keyboardEvent.keyCode) > -1) {

        keyboardEvent.preventDefault();
    }
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

 function getCanvasHeight(){
     return gCanvas.height;
 }



        // gCanvas.addEventListener('tochmove', function(ev){
    //         console.log('touch move');
    //         let offsetX = ev.touches[0].screenX - gCanvas.clietLeft * devicePixelRatio;
    //         let offsetY = ev.touches[0].screenY - gCanvas.clientTop * devicePixelRatio;
    //         dragLine({offsetX,offsetY});
    //         ev.preventDefault();
    //         return false;
    //     })
    //     // gCanvas.addEventListener('tochend', function(){
    //         console.log('touch end');
    //        onMouseRelease();
    //        return false;
    //    }

 