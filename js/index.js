import {Grid} from "./Grid.js";
import {Square, Pcoor} from "./Square.js";
import {BFS} from "./Bfs.js";
import {Astart} from "./Astart.js";

const debug = false;

const canvasBox = document.querySelector(".myCanvas");
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const clearBtn = document.getElementById("clear");
const playBtn = document.getElementById("play");
const cPad = parseInt(getComputedStyle(document.querySelector("header")).height)||0; // top del container
if(debug) console.log("Size of pad for element header: ", cPad);
const menuContainer = document.getElementById("menu");
const menuContainer_width = menuContainer.offsetWidth; // ancho de barra menu
if(debug) console.log("Size of menu container: ", menuContainer_width);
let selectVal = document.getElementById("myselect").value;

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
var trackX, trackY, i, j, bestPath;
var myHash = {};

function init(){
    allCoords = g.build(coordsStart, coordsEnd);
    coordsStart = g.start;
    coordsEnd = g.end;
}

function solve(){
    let algorithm;
    let ans;
    if(selectVal == "bfs"){
        algorithm = new BFS(coordsStart, coordsEnd, allCoords);
        ans = algorithm.traversal();
    }else if(selectVal == "A"){
        algorithm = new Astart(coordsStart, coordsEnd, allCoords);
        ans = algorithm.traversal();
    }
    if(ans){
        console.log("The start node reach end node!");
        bestPath = algorithm.reconstructPath();
        animateAll(algorithm);
    }else console.log("It's not possible to find end node!");
}

async function animateAll(algorithm){
    trackX = algorithm.qX_track.createArr();
    trackY = algorithm.qY_track.createArr();
    let n = trackX.length;
    for(let k = 0; k < n; k++){
        myHash[trackX[k] + " " + trackY[k]] = 0;
    }
    i = 0;
    j = 0;
    let p = await animationVisited(i);
    console.log(p);
    if(p){
        setTimeout(()=>{
            animationBestPath(j);
        }, 700);
    }
}

function animationBestPath(j){
    return new Promise(resolve => {
        if(j >= bestPath["finalPathX"].length - 1){
            return resolve(true);
        }else{
            let x = parseInt(bestPath["finalPathX"][j]);
            let y = parseInt(bestPath["finalPathY"][j]);
            allCoords[x][y].setColor("yellow");
            allCoords[x][y].draw();
            j++;
            setTimeout(()=>{animationBestPath(j)}, 6);
        }
    });
}

function animationVisited(i){
    return new Promise((resolve)=>{
        if(i > trackX.length){
            resolve(true);
            return;
        }else{
            i++;
            let x = trackX[i];
            let y = trackY[i];
            // Si es primera vez: Orange
            if((typeof x !== 'undefined')&&(typeof y !== 'undefined')&&(x != coordsStart.i || y != coordsStart.j) && (x != coordsEnd.i || y != coordsEnd.j)){
                if (myHash[x + " " + y] == 0){
                    allCoords[x][y].setColor("orange");
                    myHash[x + " " + y]+=1;
                }
                // Si ya fue visto: Grey
                else{
                    allCoords[x][y].setColor("grey");
                    myHash[x + " " + y]+=1;
                }
                allCoords[x][y].draw();
            }
            setTimeout(()=>{
                animationVisited(i).then(() => {
                    resolve(true);
                })
            }, 1);
        }
    });
}

let myDraw = (x, y, currentState = true) => {
    let i = (x/size)|0;
    let j = (y/size)|0;
    if(debug) console.log("i: ", i, "; j: ", j);
    if(allCoords[i][j].getIsCoor() && !currentStatePrincipalNodes){
        if (drawing && currentState){
            // Si presiono por primera vez
            // y el valor de mi coordenada es falso (es decir, cuadrante a pintar)
            // Entonces solo quiero pintar
            allCoords[i][j].setIsObstacle(true);
        }else if(drawing && !currentState){
            // Si presiono por primera vez
            // y el cuadrante es true (pintado)
            // entonces, quiero borrar siempre
            allCoords[i][j].setIsObstacle(false);
            currentState = false;
        }else if (allCoords[i][j].getisObstacle()){
            allCoords[i][j].setIsObstacle(false);
            currentState = false;
        }else{
            allCoords[i][j].setIsObstacle(true);
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
                allCoords[i][j] = new Pcoor(c, allCoords[i][j].x, allCoords[i][j].y, size, "red", true,1);
                coordsStart = {i, j};
            }else{
                allCoords[i][j] = new Pcoor(c, allCoords[i][j].x, allCoords[i][j].y, size, "green", false,0);
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
    if(debug) console.log("pre: ", x, y);
    //x-=(menuContainer_width+size);
    y-=cPad;
    if(debug) console.log("post: ", x, y);
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
playBtn.addEventListener("click", (e)=>{
    selectVal = document.getElementById("myselect").value;
    solve(selectVal)
});