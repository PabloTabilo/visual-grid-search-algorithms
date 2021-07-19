export class RecursiveDivision{
    constructor(allCoords, start, end){
        this.allCoords = allCoords;
        this.start = start;
        this.end = end;
        this.n = allCoords.length;
        this.m = allCoords[0].length;
        this.divide(allCoords, 0, 0, n, m, "horizontal");
    }
    chooseOrientation(width, height){
        if(width < height){
            // Horizontal
            return "horizontal";
        }else if(height < width){
            // vertical
            return "vertical";
        }else{
            // random
            let coin = Math.random();
            if(coin >= .5) return "horizontal";
            else return "vertical";
        }
    }
    divide(allCoords, x, y, width, height, orientation){
        if(width <= 2 && height <= 2)
            return;
        // Sacamos dos valores aleatorios que no seran pintados de negro
        // Ademas siempre start y end no pueden sser pintados
    }
}