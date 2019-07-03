var currentMaze;
var simplePathfinder;
var aStarPathfinder;
var mazePathfinder;

let canvas;
var canvasX = 400;
var canvasY = 400;

var mazeX = 50;
var mazeY = 50;

var mazeStart = 3;
var mazeComplexity = 300;
var gridSizeX, gridSizeY = 1;
var solveCounter = 0;
var solveSpeed = 5;
var active = false;

//set up canvas and constants
function setup() {
    ReadHtmlValues();
    canvas = createCanvas(canvasX * 3 + 30, canvasY);
    canvas.parent('canvas1');
    background(245);
    gridSizeX = canvasX / mazeX;
    gridSizeY = canvasY / mazeY;
    active = false;
    simplePathfinder = null;
    aStarPathfinder = null;
    mazePathfinder = null;
}

//p5 function (is called every frame)
function draw() {
    if (active) {
        solveSpeed = document.getElementById("speedSlider").value * 0.1;
        solveCounter += solveSpeed;
        if (solveCounter > 1) {
            for (var i = 1; i < solveCounter; i++) {
                simplePathfinder.solve();
                aStarPathfinder.solve();
                mazePathfinder.solve();
            }
            solveCounter = 0;
        }
    }
}

function createNewMaze() {
    setup();
    document.getElementById("solveButton").disabled = false;
    currentMaze = new Maze(mazeX, mazeY, mazeStart)
    currentMaze.generate();
    drawMaze(currentMaze);

}

function startSolver() {
    document.getElementById("solveButton").disabled = true;
    simplePathfinder = new SimpleSolver(mazeStart, currentMaze.endPos);
    aStarPathfinder = new AStarSolver(mazeStart, currentMaze.endPos);
    mazePathfinder = new MazeRouter(mazeStart, currentMaze.endPos);
    active = true;
}

function ReadHtmlValues() {
    mazeX = Math.floor(document.getElementById("sizeSlider").value);
    mazeY = Math.floor(document.getElementById("sizeSlider").value);
    mazeX > 75 ? shift = 1 : shift = 2;
    mazeComplexity = Math.floor(100 - document.getElementById("complexitySlider").value) * mazeX * mazeX / 200;
    document.getElementById("length1").innerHTML = "--";
    document.getElementById("length2").innerHTML = "--";
    document.getElementById("length3").innerHTML = "--";
}