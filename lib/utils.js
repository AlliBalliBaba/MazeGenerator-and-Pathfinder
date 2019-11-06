//create an empty 2D Array
function createEmptyGrid(xSize, ySize) {
    var NodeGrid = new Array(xSize);
    var i, j;
    for (i = 0; i < xSize; i++) {
        NodeGrid[i] = new Array(ySize);
        for (j = 0; j < ySize; j++) {
            NodeGrid[i][j] = null;
        }
    }
    return NodeGrid;
}

//return a random integer between min (included) and max (excluded)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//binary search for sorted array 
function binarySearch(array, element, compareFunction) {
    var m = 0;
    var n = array.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = compareFunction(element, array[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if (cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

//return a specific element from the sorted array (ID-comparison)
function binarySearchForElement(array, element, compareFunction) {
    var index = binarySearch(array, element, compareFunction);

    if (array[index].ID == element.ID) {
        return index;
    } else {
        var downCounter = index;
        var upCounter = index;
        while (array[index].ID != element.ID) {
            if (downCounter > 0) {
                downcounter--;
            }
            index = downCounter;
            if (array[index].ID == element.ID) {
                break;
            }
            if (upCounter < ar.length - 1) {
                upcounter++;
            }
            index = upCounter;
        }
    }
    return index;
}

function addToSortedArray(array, element, compareFunction) {
    var index = binarySearch(array, element, compareFunction);
    if (index < 0) {
        index = -index - 1;
    }
    array.splice(index, 0, element);
}

function removeFromSortedArray(array, element, compareFunction) {
    var index = binarySearchForElement(array, element, compareFunction);
    if (index >= 0) {
        array.splice(index, 1);
    }
}

function fComparer(e1, e2) {
    return e1.f - e2.f;
}

function distanceComparer(e1, e2) {
    return e1.distance - e2.distance;
}

function disableButton(boolean, buttonName){
    document.getElementById(buttonName).disabled = boolean;
    document.getElementById(buttonName).hidden = boolean;
}