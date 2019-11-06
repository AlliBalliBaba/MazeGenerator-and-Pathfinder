var counter = 0;

class Maze {

    //Initialize all cells in the maze
    constructor(sizeX, sizeY, xStart, yStart, xEnd, yEnd) {

        if (xStart <= 0) xStart = 1;
        if (xEnd <= 0) xEnd = 1;
        if (xStart >= sizeX - 1) xStart = sizeX - 2;
        if (xEnd >= sizeX - 1) xEnd = sizeX - 2;

        this.start = new Point(xStart, yStart);
        this.end = new Point(xEnd, yEnd);
        this.cellGrid = new Array(sizeX);
        this.openCells = [];
        this.endPos = sizeX - 4;

        for (var i = 0; i < sizeX; i++) {
            this.cellGrid[i] = new Array(sizeY);
            for (var j = 0; j < sizeY; j++) {
                this.cellGrid[i][j] = new Cell(i, j);
            }
        }

        //Mark outer cells as visited and forbidden
        for (var i = 0; i < sizeX; i++) {
            this.cellGrid[i][0].visited = true, this.cellGrid[i][0].forbidden = true;
            this.cellGrid[i][mazeY - 1].visited = true, this.cellGrid[i][mazeY - 1].forbidden = true;
        }
        for (var j = 0; j < sizeY; j++) {
            this.cellGrid[0][j].visited = true, this.cellGrid[0][j].forbidden = true;
            this.cellGrid[mazeX - 1][j].visited = true, this.cellGrid[mazeX - 1][j].forbidden = true;
        }

    }

    //Generate the maze
    generate() {
        this.openCells.push(this.cellGrid[this.start.x][this.start.y + 1]);
        this.cellGrid[this.start.x][this.start.y + 1].visited = true;
        while (this.openCells.length != 0) {
            this.current = this.openCells.pop();
            while (this.current != null) {
                counter++;
                var nextCell = this.selectRandomNeighbor();
                this.removeWalls(this.current, nextCell);
                this.current = nextCell;
            }
        }
        this.makeStartAndEnd();
        this.destroyRandomWalls(Math.floor(mazeComplexity));
    }


    //Select 1 of the 4 neighbors randomly, return null if all neighbors are visited
    selectRandomNeighbor() {
        var neighborList = [];
        this.checkNeighbor(this.current.x + 1, this.current.y, neighborList);
        this.checkNeighbor(this.current.x - 1, this.current.y, neighborList);
        this.checkNeighbor(this.current.x, this.current.y + 1, neighborList);
        this.checkNeighbor(this.current.x, this.current.y - 1, neighborList);

        if (neighborList.length == 0) {
            return null;
        } else {
            var randomNumber = Math.floor(Math.random() * neighborList.length);
            this.openCells.push(neighborList[randomNumber]);
            neighborList[randomNumber].visited = true;
            return neighborList[randomNumber];
        }
    }

    checkNeighbor(xPos, yPos, List) {
        if (!this.cellGrid[xPos][yPos].visited) {
            List.push(this.cellGrid[xPos][yPos])
        }
    }

    //remove the walls between 2 cells
    removeWalls(previous, next) {
        if (previous, next != null) {
            if (next.x == previous.x) {
                next.y < previous.y ? (next.up = true, previous.down = true) : (next.down = true, previous.up = true);
            } else {
                next.x < previous.x ? (next.right = true, previous.left = true) : (next.left = true, previous.right = true);
            }
        }
    }

    //remove the walls for the starting and ending position
    makeStartAndEnd() {
        this.removeWalls(this.cellGrid[this.start.x][this.start.y], this.cellGrid[this.start.x][this.start.y + 1]);
        this.removeWalls(this.cellGrid[this.end.x][this.end.y], this.cellGrid[this.end.x][this.end.y - 1]);
        this.cellGrid[this.start.x][this.start.y].forbidden = false;
        this.cellGrid[this.end.x][this.end.y].forbidden = false;
    }

    //Destroy random walls in the maze to give it multiple possible solutions
    destroyRandomWalls(amount) {
        for (var i = 0; i < amount; i++) {
            var thisCell = this.cellGrid[randomInteger(2, mazeX - 2)][2, randomInteger(2, mazeY - 2)];
            var nextCell;
            var rand = Math.random();
            if (rand < 0.5) {
                rand < 0.25 ? nextCell = this.cellGrid[thisCell.x - 1][thisCell.y] : nextCell = this.cellGrid[thisCell.x + 1][thisCell.y];
            } else {
                rand < 0.75 ? nextCell = this.cellGrid[thisCell.x][thisCell.y - 1] : nextCell = this.cellGrid[thisCell.x][thisCell.y + 1];

            }
            this.removeWalls(thisCell, nextCell);
        }
    }
}