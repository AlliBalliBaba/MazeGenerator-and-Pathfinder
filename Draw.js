var shift = 2;

function drawMaze(thisMaze) {
    setup();
    stroke(25);
    var i, j;
    for (i = 0; i < mazeX; i++) {
        for (j = 0; j < mazeY; j++) {
            drawCell(thisMaze.cellGrid[i][j], 0)
            drawCell(thisMaze.cellGrid[i][j], canvasX + 10)
            drawCell(thisMaze.cellGrid[i][j], 2 * canvasX + 20)
        }
    }
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
    line(x, y, nextX, nextY)
}

function drawIntersection(x, y, shiftX) {
    cellX = x * gridSizeX + shiftX;
    cellY = y * gridSizeY;
    noStroke();
    fill(200, 200, 0, 100);
    rect(cellX + shift, cellY + shift, gridSizeX - shift, gridSizeY - shift);
}

function showResult(solver, shiftX) {
    if (solver.current.parent != null) {
        drawSolution(solver.current.x, solver.current.y, solver.current.parent.x, solver.current.parent.y, shiftX);
        solver.current = solver.current.parent;
        solver.pathSize++;
        solver.displayPathLength();
    }
}