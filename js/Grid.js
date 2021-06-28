import {Square, Pcoor} from "./Square.js";

export default class Grid{
    constructor(c, w, h, size){
        this.c = c;
        this.w = w, this.h = h;
        this.size = size;
        // floor -> |0
        this.maxSizeW_floor = (this.w/this.size)|0; // max range x
        this.maxSizeH_floor = (this.h/this.size)|0; // max range y
        let sti  = ((this.maxSizeW_floor/2)|0) - 3, stj  = ((this.maxSizeH_floor/2)|0);
        let endi = ((this.maxSizeW_floor/2)|0) + 3, endj = ((this.maxSizeH_floor/2)|0);
        this.start = {i:sti, j:stj};
        this.end = {i:endi, j:endj};
    }
    build(start = undefined, end = undefined){
        if(start !== "undefined" && end !== "undefined"){
            this.start = start;
            this.end = end;
        }
        let allCoords = [[]];
        let sq;

        for(let i = 0; i < this.maxSizeW_floor; i++){
            allCoords[i] = [];
            let i_x = i*this.size;
            for(let j = 0; j < this.maxSizeH_floor; j++){
                let j_y = j*this.size;
                if(i == this.start.i && j == this.start.j){
                    sq = new Pcoor(this.c, i_x, j_y, this.size, "red", true);
                }else if(i == this.end.i && j == this.end.j){
                    sq = new Pcoor(this.c, i_x, j_y, this.size, "green", false);
                }else{
                    sq = new Square(this.c, i_x, j_y, this.size, "black");
                }
                sq.draw();
                allCoords[i][j] = sq;
            }
        }
        return allCoords;
    }
}