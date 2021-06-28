import Queue from "./Queue.js";
// Solo movimientos horizontales / verticales
// quiero que se mueva con vecinos adyacentes
var yMoves = [1, -1, 0, 0];
var xMoves = [0, 0, 1, -1];
var i = 0;

export class BFS{
    constructor(start, end, allCoords){
        this.start = start;
        this.end = end;
        this.allCoords = allCoords;
        this.sizeX = allCoords.length;
        this.sizeY = allCoords[0].length;
        this.visited = new Array(this.sizeX);
        for(let i = 0; i<this.sizeX; i++)
            this.visited[i] = new Array(this.sizeY);

        for(let i = 0; i<this.sizeX; i++)
            for(let j = 0; j <this.sizeY; j++)
                this.visited[i][j] = false;

        this.qX = new Queue();
        this.qY = new Queue();
        this.qX.enqueue(start.i);
        this.qY.enqueue(start.j);
        this.visited[start.i][start.j] = true;
    }
    animationVisited(x, y, color){
        this.allCoords[x][y].setColor(color);
        this.allCoords[x][y].draw();
        clearTimeout(setTimeout(()=>{this.animationVisited(x, y, color)}, 1000));
    }
    traversal(){
        while(!this.qX.empty()){
            let sX = this.qX.front().data;
            let sY = this.qY.front().data;
            this.qX.dequeue();
            this.qY.dequeue();
            if(sX == this.end.i && sY == this.end.j){
                return true;
            }
            for(let i = 0; i<4;i++){
                let nX = sX + xMoves[i];
                let nY = sY + yMoves[i];
                if(nX < this.sizeX && nX >= 0 && nY>=0 && nY<this.sizeY && !this.visited[nX][nY] && !this.allCoords[nX][nY].getIsOn()){
                    this.visited[nX][nY] = true;
                    this.qX.enqueue(nX);
                    this.qY.enqueue(nY);
                    if(nX != this.end.i || nY != this.end.j){
                        this.allCoords[nX][nY].setIsOn(true);
                        this.animationVisited(nX, nY, "orange");
                    }
                }
            }
            // asthetics
            if((sX != this.start.i || sY != this.start.j) && (sX != this.end.i || sY != this.end.j)){
                this.allCoords[sX][sY].setIsOn(true);
                this.animationVisited(sX, sY, "grey");
            }
        }
        return false;
    }
};