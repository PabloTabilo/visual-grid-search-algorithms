import {Grid} from "./Grid.js";
import 'jest-canvas-mock';

describe("Test Grid class using canvas", ()=>{
    let canvas = document.createElement("canvas");
    let size = 20;
    canvas.width = 1280;
    canvas.height = 720;
    let c = canvas.getContext('2d');
    test("Structure Check start & end node", ()=>{
        let g = new Grid(c, canvas.width, canvas.height, size);
        let res = g.build({i:0,j:0}, {i:size-1,j:size-1});
        // Start
        expect(res[0][0]["color"]).toBe("red");
        expect(res[0][0]["isCoor"]).toBe(false);
        // End
        expect(res[size-1][size-1]["color"]).toBe("green");
        expect(res[size-1][size-1]["isCoor"]).toBe(false);
    });
    test("Structure Check random node", ()=>{
        let g = new Grid(c, canvas.width, canvas.height, size);
        let res = g.build({i:0,j:0}, {i:size-1,j:size-1});
        // Random node
        expect(res[2][5]["color"]).toBe("black");
        expect(res[2][5]["isCoor"]).toBe(true);
    });
});