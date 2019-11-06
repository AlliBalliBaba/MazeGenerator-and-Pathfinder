class AStarSolver extends Pathfinder{

    // A* pathfinding algorythm

    constructor(start, end) {
        super(start, end);

        //push starting node to open nodes
        this.open.push(new AStarNode(this.start.x, this.start.y, null, this));
        this.Nodes[this.start.x][this.start.y] = this.open[0];
        this.open[0].closed = true;
    }


    //Solve step by step
    solve() {
        if (this.open.length != 0) {
            //set current node to the first node in the sorted list
            this.current = this.open.shift();

            // check neighbor nodes
            this.checkNeighbors(this.current.x, this.current.y);

            //draw on the canvas
            drawCheck(this.current.x, this.current.y, 0);
            this.displayPathLength();

            //check if the goal was reached
            if (this.current.y == this.end.y && this.current.x == this.end.x) {
                this.open = [];
            }
            this.steps++;
        } else {
            this.showResult();
            active=false;
        }
    }

    //Check the 4 neighbors of the current node, if there are no walls
    checkNeighbors(x, y) {
        this.current.closed = true;
        if (currentMaze.cellGrid[x][y].down) {
            this.checkNode(x, y - 1);
        }
        if (currentMaze.cellGrid[x][y].right) {
            this.checkNode(x + 1, y);
        }
        if (currentMaze.cellGrid[x][y].left) {
            this.checkNode(x - 1, y);
        }
        if (currentMaze.cellGrid[x][y].up) {
            this.checkNode(x, y + 1);
        }
    }

    //Check if Node was already visited, use binary search to sort the open list according to the f-value
    checkNode(i, j) {
        var neighbor = this.Nodes[i][j];
        if (neighbor == null) {
            neighbor = new AStarNode(i, j, this.current, this);
            addToSortedArray(this.open, neighbor, fComparer);
        } else if (!neighbor.closed) {
            var tempG = this.current.g + 1;
            if (tempG < neighbor.g) {
                this.removeFromSortedArray(this.open, neighbor, fComparer);
                neighbor = new AStarNode(i, j, this.current, this);
                this.addToSortedArray(this.open, neighbor, fComparer);
            }
        }
        this.Nodes[i][j] = neighbor;
    }

}