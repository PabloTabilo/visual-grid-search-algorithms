import {Queue} from "../data-structures/Queue.js";
var yMoves = [1, -1, 0, 0];
var xMoves = [0, 0, 1, -1];

export class DFS{
    constructor(start, end, allCoords){
        this.start = start;
        this.end = end;
        this.allCoords = allCoords;
        this.found = false;

        this.sizeX = allCoords.length;
        this.sizeY = allCoords[0].length;
        this.visited = new Array(this.sizeX);
        for(let i = 0; i<this.sizeX; i++)
            this.visited[i] = new Array(this.sizeY);

        for(let i = 0; i<this.sizeX; i++)
            for(let j = 0; j <this.sizeY; j++)
                this.visited[i][j] = false;

        this.qX_track = new Queue();
        this.qY_track = new Queue();
        this.prev = {};
    }
    traversal(){
        for(let i = 0; i<4; i++){
            let cX = this.start.i + xMoves[i];
            let cY = this.start.j + yMoves[i];
            if(this.validEdge(cX, cY)){
                this.prev[cX+"-"+cY] = this.start.i+"-"+this.start.j;
                this.visited[cX][cY] = true;
                this.qX_track.enqueue(cX);
                this.qY_track.enqueue(cY);
                return this.dfsVisit(cX, cY);
            }
        }
    }
    validEdge(x, y){
        let res = false;
        if(x < this.sizeX && x >= 0 && y >= 0 && y < this.sizeY){
            if(this.allCoords[x][y] !== "undefined")
                res = !this.allCoords[x][y].getisObstacle();
        }
        return  res;
    }
    checkValid(x, y){
        if(this.validEdge(x, y)){
            return !this.visited[x][y];
        }
    }
    dfsVisit(x, y){
        if(x == this.end.i && y == this.end.j){
            this.found = true;
            return true;
        }else{
            this.qX_track.enqueue(x);
            this.qY_track.enqueue(y);
            if(x != this.end.i || y != this.end.j){
                this.allCoords[x][y].setIsOn(true);
            }
            let done = false;
            let i = 0;
            while(!done && i < 4){
                let next_x = x + xMoves[i];
                let next_y = y + yMoves[i];
                if(this.checkValid(next_x, next_y)){
                    this.prev[next_x+"-"+next_y] = x+"-"+y;
                    this.visited[next_x][next_y] = true;
                    done = this.dfsVisit(next_x, next_y);
                }
                i++;
            }
        return done;
        }
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
}