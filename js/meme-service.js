'use service';
let gLineId = 1;
var gMeme = {
    selectedImgId: 5,
    txts: []
}


function createLine() {
    // start at top for first / bottom for last / and account for font size of previous line 
    let y = !(gMeme.txts.length) ? gLineId * 45 : (gMeme.txts.length === 1) ?
        getCanvasHeight() - 90 : (gLineId === 3) ? gMeme.txts[0].position.y + 45 : getLineById().position.y + 45
    let newLine = {
        id: gLineId,
        txt: '',
        size: 30,
        align: 'center',
        color: 'black',
        position: { 
            y: y,
            x: getCanvasWidth() / 2
        },
        font: 'impact'

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
