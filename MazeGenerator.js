var counter = 0;

class Maze {

    //Initialize all cells in the maze
    constructor(sizeX, sizeY, startX) {

        this.cellGrid = new Array(sizeX);
        this.openCells = [];
        this.startPos = startX;
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
        this.openCells.push(this.cellGrid[this.startPos][1]);
        this.cellGrid[this.startPos][1].visited = true;
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
        this.removeWalls(this.cellGrid[this.startPos][0], this.cellGrid[this.startPos][1]);
        this.removeWalls(this.cellGrid[this.endPos][mazeY - 1], this.cellGrid[this.endPos][mazeY - 2]);
        this.cellGrid[this.startPos][0].forbidden = false;
        this.cellGrid[this.endPos][mazeY - 1].forbidden = false;
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

//Contains information about maze position, wall position and wheter the call was already visited.
class Cell {
    constructor(X, Y) {
        this.x = X;
        this.y = Y;
        this.left = false, this.right = false, this.up = false, this.down = false;
        this.visited = false;
        this.forbidden = false;
    }
}