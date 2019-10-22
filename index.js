var currentMaze;
var pathfinder;
const pathfinders= [SimpleSolver,AStarSolver,MazeRouter];

let canvas;
var canvasX = 500, canvasY = 500;

var mazeX = 50, mazeY = 50;
var mazeStart = 3, mazeComplexity = 300;
var gridSizeX, gridSizeY = 1;
var solveCounter = 0, solveSpeed = 5, active = false;



//set up canvas
function setup() {
    ReadHtmlValues();
    if(screen.width< canvasX){
        canvasX=screen.width;
        canvasY=screen.width;
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
    if (active) {
        solveSpeed = document.getElementById("speedSlider").value * 0.1;
        solveCounter += solveSpeed;
        if (solveCounter > 1) {
            for (var i = 1; i < solveCounter; i++) {
                pathfinder.solve();
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
    let id=document.getElementById("finderselect").value;
    console.log(id)
    if (id<0){ return; }
    document.getElementById("solveButton").disabled = true;
    pathfinder = new pathfinders[id](mazeStart, currentMaze.endPos);
    active = true;
}

function ReadHtmlValues() {
    mazeX = Math.floor(document.getElementById("sizeSlider").value);
    mazeY = Math.floor(document.getElementById("sizeSlider").value);
    mazeX > 75 ? shift = 1 : shift = 2;
    mazeComplexity = Math.floor(100 - document.getElementById("complexitySlider").value) * mazeX * mazeX / 200;
    document.getElementById("length").innerHTML = "-- <br> --";
}