var currentMaze;
var pathfinder;
const pathfinders = [SimpleSolver, AStarSolver, MazeRouter];

let canvas;
var canvasX = 500,
    canvasY = 500;

var mazeX = 25,
    mazeY = 25;
var startX = 0.5,
    startY = 0,
    endX = 0.5,
    endY = mazeY - 1;
mazeComplexity = 300;
var gridSizeX, gridSizeY = 1;
var solveCounter = 0,
    solveSpeed = 5,
    active = false;

//set up canvas
function setup() {
    readHtmlValues();
    if (screen.width - 20 < canvasX) {
        canvasX = screen.width - 20;
        canvasY = screen.width - 20;
    }
    canvas = createCanvas(canvasX, canvasY);
    canvas.parent('canvas1');
    background(245);
    gridSizeX = canvasX / mazeX;
    gridSizeY = canvasY / mazeY;
    active = false;
    simplePathfinder = null;
    aStarPathfinder = null;
    mazePathfinder = null;
}

// function called every frame
function draw() {
    if (!active) return;
    solveSpeed = document.getElementById("speedSlider").value * 0.1;
    solveCounter += solveSpeed;
    if (solveCounter > 1) {
        for (var i = 1; i < solveCounter; i++) {
            pathfinder.solve();
        }
        solveCounter = 0;
    }
}

function createNewMaze() {
    setup();
    document.getElementById("solveButton").disabled = false;
    currentMaze = new Maze(mazeX, mazeY, Math.floor(startX * mazeX), startY, Math.floor(endX * mazeX), mazeY - 1);
    currentMaze.generate();
    drawMaze(currentMaze);
    disableButton(false, "solveButton");
    disableButton(true, "resetButton");
}

function startSolver() {
    let id = document.getElementById("finderselect").value;
    if (id < 0 || !currentMaze) return;
    disableButton(true, "solveButton");
    disableButton(false, "resetButton");
    pathfinder = new pathfinders[id](currentMaze.start, currentMaze.end);
    active = true;
}

function resetSolver() {
    setup();
    drawMaze(currentMaze);
    disableButton(false, "solveButton");
    disableButton(true, "resetButton");
}

function mouseClicked() {
    if (mouseX > canvasX / mazeX && mouseX < canvasX - canvasX / mazeX && mouseY > 0 && mouseY < canvasY) {
        if (mouseY < canvasY / mazeY * 2) {
            startX = mouseX / (canvasX + 0.5);
            createNewMaze();
        }
        if (mouseY > canvasY - canvasY / mazeY * 2) {
            endX = mouseX / (canvasX + 0.5);
            createNewMaze();
        }
    }
}

function readHtmlValues() {
    mazeX = Math.floor(document.getElementById("sizeSlider").value);
    mazeY = Math.floor(document.getElementById("sizeSlider").value);
    mazeX > 75 ? shift = 1 : shift = 2;
    mazeComplexity = Math.floor(100 - document.getElementById("complexitySlider").value) * mazeX * mazeX / 200;
    document.getElementById("length").innerHTML = "-- <br> --";
}