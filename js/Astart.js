export default class Astart{
    constructor(start, end, allCoords){
        this.start = start; // i,j
        this.end = end; // i,j
        this.allCoords = allCoords;
        this.heuristicCalc();
    }
    heuristicCalc(){
        let n = allCoords.length;
        let m = allCoords.length[0];
        for(let i = 0; i<n;i++){
            for(let j = 0; j<m; j++){
                if((i != this.start.i || j != this.start.j)&&(i != this.start.i || j != this.start.j)){
                    allCoords[i][j].cost = Math.sqrt(Math.pow(i - this.end.i, 2) + Math.pow(j - this.end.j, 2));
                }
            }
        }
    }
    traverse(){
        
    }
}