import {Grid} from "./abstractionGrid/Grid.js";
import {Square, Pcoor} from "./abstractionGrid/Square.js";
import {BFS} from "./algorithms/Bfs.js";
import {Astart} from "./algorithms/Astart.js";
import { RecursiveDivision } from "./generateMaze/RecursiveDivision.js";

const debug = true;
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// buttons
const clearBtn = document.getElementById("clear");
const playBtn = document.getElementById("play");
const generateBtn = document.getElementById("generate");
const rebootBtn = document.getElementById("reboot");
// size of top container - header
const cPad = parseInt(getComputedStyle(document.querySelector("header")).height)||0; // top del container
const menuContainer = document.getElementById("menu");
// width of menu container
const menuContainer_width = menuContainer.offsetWidth;
let selectVal = document.getElementById("myselect").value;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight-cPad;

console.log(canvas.width,canvas.height, cPad);

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
var trackX, trackY, i, j, bestPath, k;
var myHash = {};


function init(){
    allCoords = g.build(coordsStart, coordsEnd);
    coordsStart = g.start;
    coordsEnd = g.end;
}

function clearMe(){
    let n = allCoords.length;
    let m = allCoords[0].length;
    for(let i = 0; i < n; i++){
        for(let j = 0; j <m; j++){
            if(!allCoords[i][j].getisObstacle() && ((i != coordsStart.i || j != coordsStart.j)&&(i != coordsEnd.i || j != coordsEnd.j))){
                allCoords[i][j].setIsOn(false);
                allCoords[i][j].setColor("black");
                allCoords[i][j].draw();
            }
        }
    }
}

function generateMaze(){
    let rd = new RecursiveDivision(allCoords, coordsStart, coordsEnd);
    let k = 1;
    console.log(rd.grid);
    console.log(rd.hashMap);
    console.log(rd.NUM);
    animationMaze(rd.grid, rd.hashMap, k, rd.NUM);
}

function loopGrid(grid, k, x, y, n, m, howMove){
    if(x < n && y < m){
        if(grid[x][y] == k){
            allCoords[x][y].setIsObstacle(true);
            allCoords[x][y].setColor("black");
            allCoords[x][y].draw();
        }
        if(howMove){
            x++;
            setTimeout(()=>{
                loopGrid(grid, k, x, y, n, m, howMove)
            }, 20);
        }else{
            y++;
            setTimeout(()=>{
                loopGrid(grid, k, x, y, n, m, howMove)
            }, 20);
        }
    }else{
        return;
    }
}

function animationMaze(grid, hash, k, NUM){
    if(k > NUM){
        return;
    }else{
        let x = hash[k].i;
        let y = hash[k].j;
        let n = grid.length;
        let m = grid[0].length;
        console.log("k, x, y: ",k,",", x,",", y);
        console.log("n, m: ", n, ", ", m);
        if(x == -1){
            loopGrid(grid, k, 0, y, n, m, true);
        }else if(y == -1){
            loopGrid(grid, k, x, 0, n, m, false);
        }
        setTimeout(()=>{
            k++;
            animationMaze(grid, hash, k, NUM);
        }, 10);
    }
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
    }else console.log("It's not possible to find end node!");
    animateAll(algorithm, ans);
}

async function animateAll(algorithm, ans){
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
    if(p && ans){
        setTimeout(()=>{
            animationBestPath(j);
        }, 700);
    }else{
        console.log("Crear modal de no lograr encontrar el nodo final");
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

// touch
canvas.addEventListener("touchstart", (e) => {
    if (e.clientX !== undefined || e.clientY !== undefined){
        let c = mappingClient(e.clientX, e.clientY);
        currentState = myDraw(c.x, c.y);
        drawing = true;
    }
})

canvas.addEventListener("mousemove", (e) => {
    if(drawing){
        let c = mappingClient(e.clientX, e.clientY);
        myDraw(c.x, c.y, currentState);
    }
})

// touch event
canvas.addEventListener("touchmove", (e) => {
    if(drawing && (e.clientX !== undefined || e.clientY !== undefined)){
        let c = mappingClient(e.clientX, e.clientY);
        myDraw(c.x, c.y, currentState);
    }
})

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    currentStatePrincipalNodes = false;
})

// touch event
canvas.addEventListener("touchend", (e) => {
    drawing = false;
    currentStatePrincipalNodes = false;
})

init();

clearBtn.addEventListener("click", (e)=>clearMe());
playBtn.addEventListener("click", (e)=>{
    selectVal = document.getElementById("myselect").value;
    solve(selectVal)
});
generateBtn.addEventListener("click", (e) => generateMaze());
rebootBtn.addEventListener("click", (e) => init());