class Pathfinder{

    constructor(start, end){
        this.start = start;
        this.end = end;
        this.pathSize = 0;
        this.steps = 0;
        this.open = [];
        this.Nodes = createEmptyGrid(mazeX, mazeY);
    }

    displayPathLength() {
        document.getElementById("length").innerHTML = "steps: " + String(this.steps) + " <br> length of path: " + String(this.pathSize);
    }

    showResult() {
        while (this.current.parent != null) {
            drawSolution(this.current.x, this.current.y, this.current.parent.x, this.current.parent.y, 0);
            this.current = this.current.parent;
            this.pathSize++;
        }
        this.displayPathLength();
    }

}