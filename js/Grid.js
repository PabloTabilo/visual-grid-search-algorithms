import Square from "./Square.js";

export default class Grid{
    constructor(c, w, h, size){
        this.c = c;
        this.w = w, this.h = h;
        this.size = size;
        this.build();
    }
    build(){
        let allCoords = [[]];
        let sti = ((((this.w/this.size)|0)/2)|0 ) - 3, stj = (((this.h/this.size)|0)/2)|0;
        let endi = ((((this.w/this.size)|0)/2)|0 ) + 3, endj = (((this.h/this.size)|0)/2)|0;
        console.log(sti, stj);
        console.log(endi, endj);
        let ic = 0, jc = 0;
        let sq;
        for(let i = 0; i < this.w; i+=this.size){
            jc = 0;
            allCoords[ic] = [];
            for(let j = 0; j < this.h; j+=this.size){
                if(ic == sti && jc == stj){
                    console.log(ic, jc);
                    sq = new Square(this.c,i,j,this.size,"red",true,false);
                }else if(ic == endi && jc == endj){
                    console.log(ic, jc);
                    sq = new Square(this.c,i,j,this.size,"green",true,false);
                }else{
                    sq = new Square(this.c,i,j,this.size,"black");
                }
                sq.draw();
                allCoords[ic][jc] = sq;
                jc++;
            }
            ic++;
        }
        return allCoords;
    }
}