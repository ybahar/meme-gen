'use service';
let gLineId = 1;
var gMeme = {
    selectedImgId: 5,
    txts: []
}


function createLine() {
    // start at top for first / bottom for last / and account for font size of previous line 
    //change to switch
    let y = !(gMeme.txts.length) ? 45 : (gMeme.txts.length === 1) ?
        getCanvasHeight() - 90 : (gMeme.txts.length === 2) ? gMeme.txts[0].position.y + 45 : getLineById().position.y + 45
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
            isClicked : false
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
    console.log(coords)
    return gMeme.txts.find(line => {
        let xDiff = line.position.x - coords.x;
        let txtDimensions = gCtx.measureText(line.txt)
        if (line.align === 'center'){
        if (Math.abs(xDiff) > txtDimensions.width / 2) {
            return false;
        }
        } else {
            if (Math.abs(xDiff) > (txtDimensions.width)) {
                return false
            }
            
        }
        if (line.position.y < coords.y || line.position.y - line.size > coords.y) return false;
        else return true;

})
}
function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }