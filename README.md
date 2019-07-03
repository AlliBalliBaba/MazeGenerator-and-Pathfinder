# MazeGenerator and Pathfinding algorithms
A maze generator with 3 different pathfinding algorithms to solve the maze in javascript.

Try it out here: https://alliballibaba.github.io/MazeGenerator-and-Pathfinder/

##The Maze Generator
The maze generator is an implementation of the **Depth-first Search** algorithm. The alorithm guarantuees, 
that every cell of the maze is accessible and there is just a single path to the ending. To create multiple
paths to the ending I randomly removed walls in the maze.

##Simple Pathfinder
The simple pathfinder checks every adjacent cell randomly until it reaches the end. This method is quite
inefficient, but it most often gives the shortest path, since most cells are explored.

##A* Pathfinder
The A* pathfinder stores all adjacent nodes and explores the nodes with the lowest f-value first. The f-value 
is simply the sum of the path from the start to the node and the direct distance to the goal.

#Maze Router Pathfinder
The Maze Router most resembles an actual person trying to traverse the maze. At every intersection choose the path
with the smallest distance to the goal. Paths in the maze are explored until a dead end is hit. When a dead end is
hit, return to the intersection closest to the goal.


