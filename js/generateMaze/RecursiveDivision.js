
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
export class RecursiveDivision{
    constructor(allCoords, start, end){
        this.NUM = 0;
        this.allCoords = allCoords;
        this.start = start;
        this.end = end;
        this.n = allCoords.length;
        this.m = allCoords[0].length;
        this.grid = new Array(this.n);
        for(let i = 0; i<this.n; i++){
            this.grid[i] = new Array(this.m).fill(0);
        }
        this.hashMap = {};
        this.divide(0, 0, this.n, this.m, this.chooseOrientation(this.n, this.m));
        this.grid[this.start.i][this.start.j] = 0;
        this.grid[this.end.i][this.end.j] = 0
    }
    chooseOrientation(width, height){
        if(width < height){
            // Horizontal
            return "horizontal";
        }else if(width > height){
            // vertical
            return "vertical";
        }else{
            if(Math.random() >= .5) return "horizontal";
            else return "vertical";
        }
    }
    divide(x, y, width, height, orientation){
        if(width <= 2 || height <= 2)
            return;
        if(orientation == "horizontal"){
            // Las murallas seleccionadas
            let wy = getRandomInt(y, y + (height-1));
            this.NUM++;
            for(let i = x; i<x+width;i++){
                this.grid[i][wy] = this.NUM;
            }
            // Gap zone
            for(let i = 0; i<5; i++){
                this.grid[getRandomInt(x, x + (width-1))][wy] = 0;
            }
            this.hashMap[this.NUM] = {i : -1, j: wy};
            this.divide(x, y, width, wy-y+1, this.chooseOrientation(width, wy-y+1));
            this.divide(x, wy+1, width, y+height-wy-1, this.chooseOrientation(width, y+height-wy-1));
        }else{
            // Las murallas seleccionadas
            let wx = getRandomInt(x, x + (width-1));
            this.NUM++;
            for(let i = y; i<y+height;i++){
                this.grid[wx][i] = this.NUM;
            }
            // gapZone
            for(let i = 0; i < 5; i++){
                this.grid[wx][getRandomInt(y, y + (height-1))] = 0;
            }
            this.hashMap[this.NUM] = {i: wx, j : -1};
            this.divide(x, y, wx-x+1, height, this.chooseOrientation(wx-x+1, height));
            this.divide(wx+1, y, x+width-wx-1, height, this.chooseOrientation(x+width-wx-1, height));
        }
    }
    seeGrid(){
        console.table(this.grid);
    }
}