'use service';
let gLineId = 1;
var gMeme = {
    selectedImgId: 5,
    txts: []
}


function createLine() {
    let newLine = {
        id: gLineId,
        txt: '',
        size: 30,
        align: 'center',
        color: 'black',
        position: {
            y: gLineId * 20,
            x: getCanvasWidth() / 2
        },
        align: 'center',
        font: 'impact'

    }
    gMeme.txts.push(newLine);
    gLineId++;
}


function getLineIdxById(id) {
    return gMeme.txts.findIndex(line => +id === line.id)
}

function getLineById(id) {
    if(!id){
        return gMeme.txts[gMeme.txts.length-1];
    }
    let idx = getLineIdxById(id);
    return gMeme.txts[idx];
}

function deleteLine(id){
    
    let idx = getLineIdxById(id);
    gMeme.txts.splice(idx,1);
    if(!gMeme.txts.length){
        createLine();
    }
}

function getMeme() {
    return gMeme;
}
