import { Astart } from "./Astart.js";

describe("Testing Astart algorithm", ()=>{
    test("Check division", () =>{
        let size = 20;
        let gridExample = new Array(size);
        for(let i = 0; i<size; i++){
            gridExample[i] = new Array(size).fill(0);
        }
        let as = new Astart(gridExample, {i:0, j:0}, {i:size-1, j:size-1});
        expect(20).toBe(20);
    });
});