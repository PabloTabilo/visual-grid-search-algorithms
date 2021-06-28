import Grid from "./Grid.js";
import {Square, Pcoor} from "./Square.js";
import {BFS} from "./Bfs.js";

let myWidth = 900;
let myHeight = 600;

const canvasBox = document.querySelector(".myCanvas");
console.log(canvasBox.width, innerWidth, innerWidth*.05);
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const clearBtn = document.getElementById("clear");
const playBtn = document.getElementById("play");
const cPad = parseInt(getComputedStyle(document.querySelector("header")).height)||0; // top del container
console.log(cPad);
const menuContainer = document.getElementById("menu");
const menuContainer_width = menuContainer.offsetWidth; // ancho de barra menu
console.log(menuContainer_width);

//canvas.width = innerWidth;
//canvas.height = innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight-cPad;

var allCoords = [[]];
var size = 20;
var drawing = false;
var currentState = true;
var g = new Grid(c, canvas.width, canvas.height, size);
var currentStatePrincipalNodes = false;
var saveNode;
var saveNodePos;
var coordsStart = g.start;
var coordsEnd = g.end;

function init(){
    allCoords = g.build(coordsStart, coordsEnd);
    coordsStart = g.start;
    coordsEnd = g.end;
}

async function solve(){
    let bfs = new BFS(coordsStart, coordsEnd, allCoords);
    const found = bfs.traversal();
    console.log(found);
    if(found) console.log("The start node reach end node!");
    else console.log("It's not possible to find end node!");
}

let myDraw = (x, y, currentState = true) => {
    let i = (x/size)|0;
    let j = (y/size)|0;
    //console.log("i: ", i, "; j: ", j);
    if(allCoords[i][j].getIsCoor() && !currentStatePrincipalNodes){
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
    }else if(!currentStatePrincipalNodes){
        // Se que estoy seleccionando un nodo start o end
        // variable que registre que el usuario
        // esta cambiando el estado / posicion del nodo start o end
        currentStatePrincipalNodes = true;
        saveNode = allCoords[i][j]
        saveNodePos = {i, j};
        return false;
    }else{
        // Ahora estamos modificando el estado del nodo start / end
        // esta arrastrando objeto
        if(i != saveNodePos.i || j != saveNodePos.j){
            allCoords[saveNodePos.i][saveNodePos.j] = new Square(c, saveNode.x, saveNode.y, size, "black");
            if(saveNode.getIsStart()){
                allCoords[i][j] = new Pcoor(c, allCoords[i][j].x, allCoords[i][j].y, size, "red", true);
                coordsStart = {i, j};
            }else{
                allCoords[i][j] = new Pcoor(c, allCoords[i][j].x, allCoords[i][j].y, size, "green", false);
                coordsEnd = {i, j};
            }
            allCoords[saveNodePos.i][saveNodePos.j].draw();
            allCoords[i][j].draw();
            saveNodePos = {i, j};
            saveNode = allCoords[i][j]
        }
        return false;
    }
}

let mappingClient = (x, y) =>{
    console.log("pre: ", x, y);
    //x-=(menuContainer_width+size);
    y-=cPad;
    console.log("post: ", x, y);
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
    currentStatePrincipalNodes = false;
})

init();

clearBtn.addEventListener("click", (e)=>init());
playBtn.addEventListener("click", (e)=>solve());