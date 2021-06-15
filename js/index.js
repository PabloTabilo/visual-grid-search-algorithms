import Grid from "./Grid.js";

let myWidth = 900;
let myHeight = 600;

const canvas = document.querySelector('canvas');
//canvas.width = innerWidth;
//canvas.height = innerHeight;
canvas.width = myWidth;
canvas.height = myHeight;
const c = canvas.getContext('2d');
const clearBtn = document.getElementById("clear");
const container = document.querySelector(".container");
const cPad = parseInt(getComputedStyle(container).paddingTop)||0; // top del container

const menuContainer = document.getElementById("menu");
const menuContainer_width = menuContainer.offsetWidth; // ancho de barra menu

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
    console.log("i: ", i, "; j: ", j);
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

let mappingClient = (x, y) =>{
    x-=(menuContainer_width+size);
    y-=cPad;
    return {x, y};
}

canvas.addEventListener("mousedown", (e) => {
    let c = mappingClient(e.clientX, e.clientY);
    currentState = myDraw(c.x, c.y);
    drawing = true;
})

canvas.addEventListener("mousemove", (e) => {
    if(drawing){
        let c = mappingClient(e.clientX, e.clientY);
        myDraw(c.x, c.y, currentState);
    }
})

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
})

init();

clearBtn.addEventListener("click", (e)=>init());