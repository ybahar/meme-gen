'use service';
let gLineId = 1;
var gMeme = {
    selectedImgId: 5,
    txts: []
}



function createLine() {
    // start at top for first / bottom for last / and account for font size of previous line 
    let y;
    switch (gMeme.txts.length) {
        case 0:
            y = 45;
            break;
        case 1:
            y = getCanvasHeight() - 90
            break;
        case 2:
            y = gMeme.txts[0].position.y + 45;
            break;
        default:
            console.log(gMeme.txts.length);
            y = getLineById().position.y + 45;
    }
    let newLine = {
        id: gLineId,
        txt: '',
        size: 30,
        align: 'center',
        color: 'black',
        fillColor: 'white',
        position: {
            y: y,
            x: getCanvasWidth() / 2
        },
        font: 'impact',
        clicked: {
            isClicked: false
        }

    }
    gMeme.txts.push(newLine);
    gLineId++;
}


function getLineIdxById(id) {
    return gMeme.txts.findIndex(line => +id === line.id)
}

function getLineById(id) {
    if (!id) {
        return gMeme.txts[gMeme.txts.length - 1];
    }
    let idx = getLineIdxById(id);
    return gMeme.txts[idx];
}

function deleteLine(id) {

    let idx = getLineIdxById(id);
    gMeme.txts.splice(idx, 1);
    if (!gMeme.txts.length) {
        createLine();
    }
}

function getMeme() {
    return gMeme;
}

function findLineByPos(coords) {
    return gMeme.txts.find(line => {
        let xDiff = line.position.x - coords.x;
        let txtDimensions = gCtx.measureText(line.txt)
        if (line.align === 'center') {
            if (Math.abs(xDiff) > txtDimensions.width / 2) {
                return false;
            }
        } else {
            (line.align === 'left')
            if (xDiff > (txtDimensions.width)) {
                return false
            } else if (-xDiff > (txtDimensions.width)) {
                return false;

            }
        }
        if (line.position.y < coords.y || line.position.y - line.size > coords.y) return false;
        else return true;

    })
}
function getMousePos(canvasDom, mouseEvent) {
    var canvasOffset = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - canvasOffset.left,
        y: mouseEvent.clientY - canvasOffset.top
    }
}