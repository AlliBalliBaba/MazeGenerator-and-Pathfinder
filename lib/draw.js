var shift = 2;

function drawMaze(thisMaze) {
    stroke(25);
    var i, j;
    for (i = 0; i < thisMaze.cellGrid.length; i++) {
        for (j = 0; j < thisMaze.cellGrid[0].length; j++) {
            drawCell(thisMaze.cellGrid[i][j], 0)
        }
    }
    drawUpArrow(thisMaze.end.x*gridSizeX,thisMaze.end.y*gridSizeY);
    drawDownArrow(thisMaze.start.x*gridSizeX,thisMaze.start.y*gridSizeY);
}

function drawCell(thisCell, shiftX) {
    cellX = thisCell.x * gridSizeX + shiftX;
    cellY = thisCell.y * gridSizeY;
    if (thisCell.forbidden) {
        fill(1);
        rect(cellX, cellY, gridSizeX, gridSizeY);
    } else {
        if (!thisCell.left) {
            line(cellX + 1, cellY, cellX + 1, cellY + gridSizeY);
        }
        if (!thisCell.right) {
            line(cellX + gridSizeX - 1, cellY, cellX + gridSizeX - 1, cellY + gridSizeY);
        }
        if (!thisCell.up) {
            line(cellX, cellY + gridSizeY - 1, cellX + gridSizeX, cellY + gridSizeY - 1);
        }
        if (!thisCell.down) {
            line(cellX, cellY + 1, cellX + gridSizeX, cellY + 1);
        }
    }
}

function drawCheck(x, y, shiftX) {
    x = x * gridSizeX + shiftX;
    y = y * gridSizeY;

    noStroke();
    fill(22, 204, 0, 100);
    rect(x + shift, y + shift, gridSizeX - shift, gridSizeY - shift);
}

function drawSolution(x, y, nextX, nextY, shiftX) {
    x = (x + 0.5) * gridSizeX + shiftX;
    y = (y + 0.5) * gridSizeY;
    nextX = (nextX + 0.5) * gridSizeX + shiftX;
    nextY = (nextY + 0.5) * gridSizeY;
    stroke(256, 0, 0);
    mazeX >60? strokeWeight(1) : strokeWeight(3);
    line(x, y, nextX, nextY)
}

function drawIntersection(x, y, shiftX) {
    x = x * gridSizeX + shiftX;
    y = y * gridSizeY;
    noStroke();
    fill(200, 200, 0, 100);
    rect(x + shift, y + shift, gridSizeX - shift, gridSizeY - shift);
}

function drawDownArrow(x,y){
    fill(0,0,0,50)
    noStroke();
    triangle(x, y, x + gridSizeX, y, x + gridSizeX*0.5, y+gridSizeY*0.75);
}

function drawUpArrow(x,y){
    fill(0,0,0,50)
    noStroke();
    triangle(x, y+gridSizeY, x + gridSizeX, y+gridSizeY, x + gridSizeX*0.5, y+gridSizeY*0.25);
}