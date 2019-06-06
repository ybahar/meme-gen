function onInit() {
createCanvas();
}

function createCanvas() {    
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth - 50
        canvas.height = window.innerHeight - 100
}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}