'use strict'

function sortByNum(items) {
    return items.sort((a, b) => b - a);
}

function sortByName(items) {
    items.sort(function (a, b) {
        var txtA = a.txt.toUpperCase(); // ignore upper and lowercase
        var txtB = b.txt.toUpperCase(); // ignore upper and lowercase
        if (txtA < txtB) {
            return -1;
        }
        if (txtA > txtB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
}