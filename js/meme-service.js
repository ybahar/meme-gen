'use service';
let gLineId = 1;
var gMeme = {
    selectedImgId: 5,
    txts: []
}


function createLine() {
    // start at top for first / bottom for last / and account for font size of previous line 
    let y = !(gMeme.txts.length) ? 45 : (gMeme.txts.length === 1) ?
        getCanvasHeight() - 90 : (gMeme.txts.length === 2) ? gMeme.txts[0].position.y + 45 : getLineById().position.y + 45
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

function findLineByPos(x, y) {
    return gMeme.txts.find(line => {
        let xDiff = line.position.x - x;
        let txtDimensions = gCtx.measureText(line.txt)
        if (line.align === 'center')
        if (Math.abs(xDiff) > txtDimensions.width ) {
            return false;
        } else {
            if (Math.abs(xDiff) > ((line.size / 2) * line.txt.length)) {
                return false
            }
            
        }
        if (line.position.y < y || line.position.y - txtDimensions.height > y) return false;
        else return true;
        /* FINDINGS : average line length is a little less then half
         the font size * number of letters (spaces included) */
        // if (line.align === 'center')
        //     if (Math.abs(xDiff) > ((line.size / 4) * line.txt.length)) {
        //         return false; // starting from the center of the line and checking to both sides abs(x-oX) < fontsize / 4;
        //     } else {
        //         if (Math.abs(xDiff) > ((line.size / 2) * line.txt.length)) {
        //             return false
        //         }

        //     }
        // if (line.position.y < y || line.position.y - line.size > y) return false;
        // else return true;
    // }

})
}