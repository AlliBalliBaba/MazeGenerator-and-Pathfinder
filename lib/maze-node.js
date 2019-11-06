class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//Maze Cell
class Cell extends Point{
    constructor(x, y) {
        super(x,y);
        this.left = false, this.right = false, this.up = false, this.down = false;
        this.visited = false;
        this.forbidden = false;
    }
}

//for solving with diffusion
class SimpleNode extends Point{
    constructor(x, y, Parent, PathLength) {
        super(x,y);
        this.parent = Parent;
        this.pathlength = PathLength;
    }
}

//for solving with Maze Router
class MazeNode extends Point{
    constructor(x, y, Parent, Solver) {
        super(x,y);
        this.distance = Math.sqrt((x - Solver.end.x) * (x - Solver.end.x) + (y - Solver.end.y) * (y - Solver.end.y));
        this.parent = Parent;
        this.pathLength;
        Parent == null ? this.pathLength = 0 : this.pathlength = Parent.PathLength + 1;
        this.visited = false;
    }
}

//for solving with A*
var globalID = 0;
class AStarNode extends Point{
    constructor(x, y, Parent, Astar) {
        super(x,y);
        this.h = Math.sqrt((Astar.end.x - this.x) * (Astar.end.x - this.x) + (Astar.end.y - this.y) * (Astar.end.y - this.y));
        this.parent == null ? this.g = 0 : this.g = Parent.g + 1;
        this.f = this.g + this.h;
        this.parent = Parent;
        this.closed = false;
        this.ID = globalID;
        globalID++;
    }
}