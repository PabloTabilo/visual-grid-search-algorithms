import { RecursiveDivision } from "./RecursiveDivision";

describe("Testing recursive division class", ()=>{
    test("Check division", () =>{
        let size = 20;
        let gridExample = new Array(size);
        for(let i = 0; i<size; i++){
            gridExample[i] = new Array(size).fill(0);
        }
        let rd = new RecursiveDivision(gridExample, {i:0, j:0}, {i:size-1, j:size-1});
        expect(rd.n).toBe(20);
    });
});