class MazeRouter extends Pathfinder{

    // At every intersection, choose the path with the closest distance to the goal

    constructor(start, end) {
        super(start, end);
        this.pathfound = false;

        //set starting node as current node
        this.current = new MazeNode(this.start.x, this.start.y, null, this);
        this.current.visited = true;
    }

    //Solve step by step
    solve() {
        if (!this.pathfound) {
            //draw on the canvas
            drawCheck(this.current.x, this.current.y, 0);
            this.displayPathLength();

            // set current node to a neighboring node 
            this.current = this.checkNeighbors(this.current.x, this.current.y)

            //check if a dead end was hit. Choose an intersection
            if (this.current == null) {
                this.current = this.open.shift();
            }
            //check if the goal was reached
            if (this.current.y == this.end.y && this.current.x == this.end.x) {
                this.pathfound = true;
            }
            this.steps++;
        } else {
            this.showResult();
            active=false;
        }
    }


    //Check the 4 neighbors of the current node, if there are no walls
    checkNeighbors(x, y) {
        this.current.visited = true;
        var bestNode = null;
        this.paths = 0;
        if (currentMaze.cellGrid[x][y].down) {
            bestNode = this.checkNode(x, y - 1, bestNode);
        }
        if (currentMaze.cellGrid[x][y].right) {
            bestNode = this.checkNode(x + 1, y, bestNode);
        }
        if (currentMaze.cellGrid[x][y].left) {
            bestNode = this.checkNode(x - 1, y, bestNode);
        }
        if (currentMaze.cellGrid[x][y].up) {
            bestNode = this.checkNode(x, y + 1, bestNode);
        }
        //if there are more than 1 paths, add node to open intersections for later use
        if (this.paths > 1) {
            addToSortedArray(this.open, this.current, distanceComparer)
            drawIntersection(this.current.x, this.current.y, 0)
        }
        return bestNode;
    }

    checkNode(i, j, bestNode) {
        var neighbor = this.Nodes[i][j];
        if (neighbor == null) {
            neighbor = new MazeNode(i, j, this.current, this);
            this.Nodes[i][j] = neighbor;
        } else if (neighbor.pathLength < this.current.parent.pathLength) {
            this.current.parent = neighbor;
            this.current.pathLength = neighbor.pathLength + 1;
        }
        this.paths++;
        return this.compareNodes(bestNode, neighbor)
    }

    //compare nodes at an intersection, choose unvisited nodes with low distance to goal preferrably
    compareNodes(bestNode, thisNode) {
        if (thisNode.visited) {
            this.paths--;
            return bestNode;
        } else if (bestNode == null) {
            return thisNode;
        } else if (bestNode.distance > thisNode.distance) {
            return thisNode;
        } else {
            return bestNode;
        }
    }

}