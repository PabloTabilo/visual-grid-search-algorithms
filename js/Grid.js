import {Square, Pcoor} from "./Square.js";

export default class Grid{
    constructor(c, w, h, size){
        this.c = c;
        this.w = w, this.h = h;
        this.size = size;
    }
    build(){
        let allCoords = [[]];
        // floor -> |0
        let maxSizeW_floor = (this.w/this.size)|0; // max range x
        let maxSizeH_floor = (this.h/this.size)|0; // max range y

        let sti  = ((maxSizeW_floor/2)|0) - 3, stj  = ((maxSizeH_floor/2)|0);
        let endi = ((maxSizeW_floor/2)|0) + 3, endj = ((maxSizeH_floor/2)|0);

        let sq;

        for(let i = 0; i < maxSizeW_floor; i++){
            allCoords[i] = [];
            let i_x = i*this.size;
            for(let j = 0; j < maxSizeH_floor; j++){
                let j_y = j*this.size;
                if(i == sti && j == stj){
                    console.log(i, j);
                    sq = new Pcoor(this.c, i_x, j_y, this.size, "red", true);
                }else if(i == endi && j == endj){
                    console.log(i, j);
                    sq = new Pcoor(this.c, i_x, j_y, this.size, "green", false);
                }else{
                    sq = new Square(this.c, i_x, j_y, this.size, "black");
                }
                sq.draw();
                allCoords[i][j] = sq;
            }
        }
        console.log(allCoords);
        return allCoords;
    }
}