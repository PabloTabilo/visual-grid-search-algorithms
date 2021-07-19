
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

export class MstKruskal{
    constructor(allCoords, start, end){
        // Need grid (matrix representation)
        // start & end for the algorithms no path on this points.
        this.allCoords = allCoords;
        this.n = allCoords.length;
        this.m = allCoords[0].length;
        this.start = start;
        this.end = end;
        // init data structure for mantain random numbers
        this.randAllCoords = new Array(this.n);
        for(let i=0; i < this.n; i++){
            this.randAllCoords[i] = new Array(this.m);
        }
    }
    generateRandom(){
        for(let i = 0; i<this.n; i++){
            for(let j = 0; j<this.m; j++){
                this.randAllCoords[i] = getRandomInt(1, 3000);
            }
        }
        this.randAllCoords[this.start.i][this.start.j] = 0;
        this.randAllCoords[this.end.i][this.end.j] = 0;
    }
}