'use strict';
console.log('new mobile drag test with mouse event idea final version  2.5 ');
let gCanvas;
let gCtx;
function createCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');

}

function initCanvasForMeme() {
    onCreateLine();
    alignSelect('center');

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

    // console.log(offsetX , offsetY);
    let coords = getMousePos(gCanvas, ev);
    // let line = findLineByPos(offsetX,offsetY); //testing mobile friendly version 
    let line = findLineByPos(coords);
    if (line) {
        onLineSelect(null, line);
        gCurrLine.clicked.isClicked = true;
        gCurrLine.clicked.offsetX = coords.x;
        gCurrLine.clicked.offsetY = coords.y;
    }
    // console.log(line);


}

function dragLine(ev) {
    if (!gCurrLine || !gCurrLine.clicked.isClicked) return;
    let coords = getMousePos(gCanvas, ev);
    gCurrLine.position.x += (coords.x - gCurrLine.clicked.offsetX);
    gCurrLine.position.y += (coords.y - gCurrLine.clicked.offsetY);
    gCurrLine.clicked.offsetX = coords.x;
    gCurrLine.clicked.offsetY = coords.y;
    writeOnCanvas();
}

function onMouseRelease() {
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

function getCanvasHeight() {
    return gCanvas.height;
}


function addEventListenersToCanvas() {
    gCanvas.addEventListener("touchstart", function (ev) {
        let touchEv = ev.touches[0];
        let coords = {
            clientX: touchEv.clientX,
            clientY: touchEv.clientY
        }
        onCanvasClicked(coords);
    }, false);
    gCanvas.addEventListener("touchmove", function (ev) {
        let touchEv = ev.touches[0];
        let coords = {
            clientX: touchEv.clientX,
            clientY: touchEv.clientY
        }
        dragLine(coords);
    }, false);
    gCanvas.addEventListener("touchend", onMouseRelease, false);

    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
}