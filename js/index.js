const canvas = document.querySelector('canvas');
//canvas.width = innerWidth;
//canvas.height = innerHeight;
myWidth = 1000, myHeight = 600;
canvas.width = myWidth;
canvas.height = myHeight;
const c = canvas.getContext('2d');
const clearBtn = document.getElementById("clear");

class Square{
    constructor(x, y, l, color, isOn = false){
        this.x = x;
        this.y = y;
        this.l = l;
        this.color = color;
        this.isOn = isOn;
    }
    setIsOn = (isOn) => this.isOn = isOn;
    getIsOn = () => this.isOn;
    draw(){
        c.clearRect(this.x, this.y, this.l, this.l);
        c.beginPath();
        if (this.isOn){
            c.fillRect(this.x, this.y, this.l, this.l);
            c.fillStyle = "black";
        }else{
            c.strokeRect(this.x, this.y, this.l, this.l);
            c.strokeStyle = "black";
        }
        c.fill();
    }
}
class Grid{
    constructor(w, h, size){
        this.w = w, this.h = h;
        this.size = size;
        this.build();
    }
    build(){
        let ic = 0, jc = 0;
        for(let i = 0; i < this.w; i+=this.size){
            jc = 0;
            allCoords[ic] = [];
            for(let j = 0; j < this.h; j+=this.size){
                let sq = new Square(i,j,this.size,"white",false)
                sq.draw();
                allCoords[ic][jc] = sq;
                jc++;
            }
            ic++;
        }
    }
}

var x = 0, y = 0;
var allCoords = [[]];
var size = 30;
var drawing = false;

function init(){
    var g = new Grid(myWidth, myHeight, size);
    g.build();
}

myDraw = (x, y) => {
    i = (x/30)|0, j = (y/30)|0
    if (allCoords[i][j].getIsOn()){
        allCoords[i][j].setIsOn(false);
    }else{
        allCoords[i][j].setIsOn(true);
    }
    allCoords[i][j].draw();
}

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    x = e.clientX, y = e.clientY;
    console.log((x/30)|0,(y/30)|0);
    setInterval(myDraw(x, y), 1600);
})

canvas.addEventListener("mousemove", (e) => {
    if(drawing){
        x = e.clientX, y = e.clientY;
        console.log((x/30)|0,(y/30)|0);
        setInterval(myDraw(x, y), 1600);
        //requestAnimationFrame(animate);
    }
})

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
})

init();

clearBtn.addEventListener("click", (e)=>init());