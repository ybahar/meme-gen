'use strict'

function sortByNum(items) {
    return items.sort((a, b) => b - a);
}

function sortByName(items) {
    items.sort((a, b) => {
        var txtA = a.txt.toUpperCase(); // ignore upper and lowercase
        var txtB = b.txt.toUpperCase(); // ignore upper and lowercase
        return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
    });
}
