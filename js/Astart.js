import {IndexPriorityQueue} from "./IndexPriorityQueue.js";
import {Queue} from "./Queue.js";

var yMoves = [1, -1, 0, 0];
var xMoves = [0, 0, 1, -1];

const debug = false;

export class Astart{
    constructor(start, end, allCoords){
        this.start = start; // i,j
        this.end = end; // i,j
        this.allCoords = allCoords;
        this.n = this.allCoords.length;
        this.m = this.allCoords[0].length;
        this.totalC = 0;
        this.visited = new Array(this.n);
        for(let i = 0; i<this.n; i++)
            this.visited[i] = new Array(this.m);

        for(let i = 0; i<this.n; i++)
            for(let j = 0; j <this.m; j++)
                this.visited[i][j] = false;

        this.heuristicCalc();
        this.ipq = new IndexPriorityQueue(this.n * this.m);
        this.ipq.insert(this.start.i+"-"+this.start.j, this.allCoords[this.start.i][this.start.j].cost);
        this.visited[start.i][start.j] = true;

        this.qX_track = new Queue();
        this.qY_track = new Queue();
    }
    heuristicCalc(){
        for(let i = 0; i<this.n;i++){
            for(let j = 0; j<this.m; j++){
                if((i != this.start.i || j != this.start.j)&&(i != this.start.i || j != this.start.j)){
                    let cost = (i - this.end.i)*(i - this.end.i) + (j - this.end.j)*(j - this.end.j);
                    this.allCoords[i][j].cost = cost
                }
            }
        }
    }
    traversal(){
        while(!this.ipq.empty()){
            if(debug) console.log("----- loop not empty IPQ: ");
            if(debug) this.ipq.loopMe();
            let curr = this.ipq.front(); // id, c
            this.totalC += curr.c;
            let cX = Number(curr.id.split("-")[0]);
            let cY = Number(curr.id.split("-")[1]);
            if(debug) console.log("-------- poll on IPQ >> cX: ", cX, "; cY: ", cY, "cost: ", curr.c);
            this.ipq.poll();
            if(debug) this.ipq.loopMe();

            this.qX_track.enqueue(cX);
            this.qY_track.enqueue(cY);
            if(cX == this.end.i && cY == this.end.j){
                return true;
            }
            for(let i = 0; i<4;i++){
                let nX = cX + xMoves[i];
                let nY = cY + yMoves[i];
                if(nX < this.n && nX >= 0 && nY>=0 && nY<this.m && !this.visited[nX][nY] && !this.allCoords[nX][nY].getisObstacle()){
                    this.visited[nX][nY] = true;
                    if(debug) console.log(">>neight - cX: ", nX, "; cY: ", nY, "; cost: ", this.allCoords[nX][nY].cost);
                    if(nX == this.end.i && nY == this.end.j){
                        this.totalC += this.allCoords[nX][nY].cost;
                        return true;
                    }
                    this.qX_track.enqueue(nX);
                    this.qY_track.enqueue(nY);
                    this.ipq.insert(nX+"-"+nY, this.allCoords[nX][nY].cost);
                    if(nX != this.end.i || nY != this.end.j){
                        this.allCoords[nX][nY].setIsOn(true);
                    }
                }
            }
            this.qX_track.enqueue(cX);
            this.qY_track.enqueue(cY);
            if((cX != this.start.i || cY != this.start.j) && (cX != this.end.i || cY != this.end.j)){
                this.allCoords[cX][cY].setIsOn(true);
            }
        }
        return false;
    }
}