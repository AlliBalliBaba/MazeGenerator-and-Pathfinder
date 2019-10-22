//Maze Cell
class Cell {
    constructor(X, Y) {
        this.x = X;
        this.y = Y;
        this.left = false, this.right = false, this.up = false, this.down = false;
        this.visited = false;
        this.forbidden = false;
    }
}

//for solving with diffusion
class SimpleNode {
    constructor(X, Y, Parent, PathLength) {
        this.x = X;
        this.y = Y;
        this.parent = Parent;
        this.pathlength = PathLength;
    }
}

//for solving with Maze Router
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

//for solving with A*
var globalID = 0;
class AStarNode {
    constructor(X, Y, Parent, Astar) {
        this.x = X;
        this.y = Y;
        this.h = Math.sqrt((Astar.end.x - this.x) * (Astar.end.x - this.x) + (Astar.end.y - this.y) * (Astar.end.y - this.y));
        this.parent == null ? this.g = 0 : this.g = Parent.g + 1;
        this.f = this.g + this.h;
        this.parent = Parent;
        this.closed = false;
        this.ID = globalID;
        globalID++;
    }
}