class SimpleSolver extends Pathfinder{

    // A simple solver, that checks all available paths randomly

    constructor(start, end) {
        super(start, end);

        //push starting node to open nodes
        this.open.push(new SimpleNode(this.start.x, this.start.y, null, 0));
        this.Nodes[this.start.x][this.start.y] = this.open[0];
    }

    //Solve step by step
    solve() {
        if (this.open.length != 0) {
            //set current node to random node in open list
            var ran = randomInteger(0, this.open.length);
            this.current = this.open[ran];
            this.open.splice(ran, 1);
            this.checkNeighbors(this.current.x, this.current.y)

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
        if (currentMaze.cellGrid[x][y].down) this.checkNode(x, y - 1);
        if (currentMaze.cellGrid[x][y].right) this.checkNode(x + 1, y);
        if (currentMaze.cellGrid[x][y].left) this.checkNode(x - 1, y);
        if (currentMaze.cellGrid[x][y].up) this.checkNode(x, y + 1);
    }

    //Check if the node was already visited. If it was visited, compare the pathlength to the currnet node parent's
    checkNode(i, j) {
        if (this.Nodes[i][j] == null) {
            this.Nodes[i][j] = new SimpleNode(i, j, this.current, this.current.pathlength + 1);
            this.open.push(this.Nodes[i][j]);
        } else if (this.Nodes[i][j].pathlength < this.current.parent.pathlength) {
            this.current.parent = this.Nodes[i][j];
            this.current.pathlength = this.Nodes[i][j].pathlength + 1;
        }
    }

}