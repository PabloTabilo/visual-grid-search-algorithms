import {Queue} from "../data-structures/Queue.js";
// Solo movimientos horizontales / verticales
// quiero que se mueva con vecinos adyacentes
var yMoves = [1, -1, 0, 0];
var xMoves = [0, 0, 1, -1];

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

        this.qX_track = new Queue();
        this.qY_track = new Queue();

        this.prev = {};
        this.found = false;
    }
    traversal(){
        while(!this.qX.empty()){
            let sX = this.qX.front().data;
            let sY = this.qY.front().data;
            this.qX.dequeue();
            this.qY.dequeue();

            this.qX_track.enqueue(sX);
            this.qY_track.enqueue(sY);
            if(sX == this.end.i && sY == this.end.j){
                return true;
            }

            for(let i = 0; i<4;i++){
                let nX = sX + xMoves[i];
                let nY = sY + yMoves[i];
                if(nX < this.sizeX && nX >= 0 && nY>=0 && nY<this.sizeY && !this.visited[nX][nY] && !this.allCoords[nX][nY].getisObstacle()){
                    this.visited[nX][nY] = true;
                    this.qX.enqueue(nX);
                    this.qY.enqueue(nY);
                    this.prev[nX+"-"+nY] = sX+"-"+sY;
                    if(nX == this.end.i && nY == this.end.j){
                        this.found = true;
                    }
                    if(!this.found){
                        this.qX_track.enqueue(nX);
                        this.qY_track.enqueue(nY);
                    }
                    if(nX != this.end.i || nY != this.end.j){
                        this.allCoords[nX][nY].setIsOn(true);
                    }
                }
            }
            this.qX_track.enqueue(sX);
            this.qY_track.enqueue(sY);
            // asthetics
            if((sX != this.start.i || sY != this.start.j) && (sX != this.end.i || sY != this.end.j)){
                this.allCoords[sX][sY].setIsOn(true);
            }
        }
        return false;
    }
    reconstructPath(){
        if(this.found){
            let at = this.end.i+"-"+this.end.j;
            let finalPathX = [this.end.i];
            let finalPathY = [this.end.j];
            while(this.prev[at] != this.start.i+"-"+this.start.j){
                let i = this.prev[at].split("-")[0];
                let j = this.prev[at].split("-")[1];
                finalPathX.push(i);
                finalPathY.push(j);
                at = this.prev[at];
            }
            finalPathX = finalPathX.reverse();
            finalPathY = finalPathY.reverse();
            return {finalPathX, finalPathY};
        }else{
            return "Path not found!";
        }
    }
};