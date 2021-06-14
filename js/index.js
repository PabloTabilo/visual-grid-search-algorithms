import Grid from "./Grid.js";
import Square from "./Square.js";

let myWidth = 1000;
let myHeight = 600;

const canvas = document.querySelector('canvas');
//canvas.width = innerWidth;
//canvas.height = innerHeight;
canvas.width = myWidth;
canvas.height = myHeight;
const c = canvas.getContext('2d');
const clearBtn = document.getElementById("clear");

var x = 0, y = 0;
var allCoords = [[]];
var size = 30;
var drawing = false;
var currentState = true;

function init(){
    var g = new Grid(c, myWidth, myHeight, size);
    allCoords = g.build();
}

let myDraw = (x, y, currentState = true) => {
    let i = (x/size)|0;
    let j = (y/size)|0;
    if(allCoords[i][j].getIsCoor()){
        if (drawing && currentState){
            // Si presiono por primera vez
            // y el valor de mi coordenada es falso (es decir, cuadrante a pintar)
            // Entonces solo quiero pintar
            allCoords[i][j].setIsOn(true);
        }else if(drawing && !currentState){
            // Si presiono por primera vez
            // y el cuadrante es true (pintado)
            // entonces, quiero borrar siempre
            allCoords[i][j].setIsOn(false);
            currentState = false;
        }else if (allCoords[i][j].getIsOn()){
            allCoords[i][j].setIsOn(false);
            currentState = false;
        }else{
            allCoords[i][j].setIsOn(true);
        }
        allCoords[i][j].setColor("black");
        allCoords[i][j].draw();
        return currentState;
    }
}

canvas.addEventListener("mousedown", (e) => {
    x = e.clientX, y = e.clientY;
    console.log((x/size)|0,(y/size)|0);
    currentState = myDraw(x, y);
    drawing = true;
})

canvas.addEventListener("mousemove", (e) => {
    if(drawing){
        x = e.clientX, y = e.clientY;
        console.log((x/size)|0,(y/size)|0);
        myDraw(x, y, currentState);
        //requestAnimationFrame(animate);
    }
})

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
})

init();

clearBtn.addEventListener("click", (e)=>init());