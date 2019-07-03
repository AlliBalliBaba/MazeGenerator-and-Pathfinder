class MazeRouter {

    // Explores the most "productive" path
    // At every intersection, choose the path with the closest distance to the goal
    // follow the path until a dead end is encountered
    // return to the most intersection closest to the goal and continue
    // this algorithm most closely resembles an actual person trying to traverse a maze

    constructor(startPos, endPos) {
        this.start = new Point(startPos, 0);
        this.end = new Point(endPos, mazeY - 1);
        this.Nodes = createEmptyGrid(mazeX, mazeY);
        this.pathSize = 0;
        this.paths = 0;
        this.steps = 0;
        this.pathfound = false;
        this.intersections = [];

        //set starting node as current node
        this.current = new MazeNode(this.start.x, this.start.y, null, this);
        this.current.visited = true;
    }

    //Solve step by step
    solve() {
        if (!this.pathfound) {
            //draw on the canvas
            drawCheck(this.current.x, this.current.y, canvasX * 2 + 20);
            this.displayPathLength();

            // set current node to a neighboring node 
            this.current = this.checkNeighbors(this.current.x, this.current.y)

            //check if a dead end was hit. Choose an intersection
            if (this.current == null) {
                this.current = this.intersections.shift();
            }
            //check if the goal was reached
            if (this.current.y == this.end.y && this.current.x == this.end.x) {
                this.pathfound = true;
            }
            this.steps++;
        } else {
            showResult(this, canvasX * 2 + 20);
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
        //if there are more than 1 paths, add node to intersections for later use
        if (this.paths > 1) {
            addToSortedArray(this.intersections, this.current, distanceComparer)
            drawIntersection(this.current.x, this.current.y, canvasX * 2 + 20)
        }
        return bestNode;
    }

    //Check if the node was already visited and compare it to the best node
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

    displayPathLength() {
        document.getElementById("length3").innerHTML = "steps: " + String(this.steps) + " <br> length of path: " + String(this.pathSize);
    }
}

class MazeNode {
    constructor(X, Y, Parent, Solver) {
        this.x = X;
        this.y = Y;
        this.distance = Math.sqrt((X - Solver.end.x) * (X - Solver.end.x) + (Y - Solver.end.y) * (Y - Solver.end.y));
        this.parent = Parent;
        this.pathLength;
        Parent == null ? this.pathLength = 0 : this.pathlength = Parent.PathLength + 1;
        this.visited = false;
    }

}