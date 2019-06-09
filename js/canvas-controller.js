'use strict';
let gCanvas;
let gCtx;
let jihrContainer;
function createCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    jihrContainer = document.querySelector('.canvas-container');
}

function initCanvasForMeme() {
    onCreateLine();
    alignSelect('center');
    addEventListenersToCanvas();

}

function renderCanvas(elImg) {
    const { clientHeight, clientWidth } = jihrContainer;
    const { naturalHeight, naturalWidth } = elImg;

    if (naturalHeight > naturalWidth) {
        if (clientHeight >= naturalHeight) {
            gCanvas.width = naturalWidth;
            gCanvas.height = naturalHeight;
        } else {
            const imgRatio = naturalWidth / naturalHeight;

            gCanvas.width = clientHeight * imgRatio;
            gCanvas.height = clientHeight;
        }
    } else {
        if (clientWidth >= naturalWidth) {
            gCanvas.width = naturalWidth;
            gCanvas.height = naturalHeight;
        } else {
            const imgRatio = naturalHeight / naturalWidth;

            gCanvas.width = clientWidth;
            gCanvas.height = clientWidth * imgRatio;
        }
    }

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
    // handelers for touch events for dragging and line select
    gCanvas.addEventListener("touchstart", function (ev) {
        let touchEv = ev.touches[0];
        let coords = {
            clientX: touchEv.clientX,
            clientY: touchEv.clientY
        }
        onCanvasClicked(coords);
        //prevent scrolling when touching canvas
        if (gCurrLine.clicked.isClicked) {
            ev.preventDefault();
            return true;
        }
    }, false);
    gCanvas.addEventListener("touchmove", function (ev) {
        let touchEv = ev.touches[0];
        let coords = {
            clientX: touchEv.clientX,
            clientY: touchEv.clientY
        }
        dragLine(coords);
        //prevent scrolling when touching canvas
        if (gCurrLine.clicked.isClicked) {
            ev.preventDefault();
            return true;
        }

    }, false);
    gCanvas.addEventListener("touchend", onMouseRelease, false);


}