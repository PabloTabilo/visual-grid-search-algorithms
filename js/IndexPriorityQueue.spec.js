import {IndexPriorityQueue} from "./IndexPriorityQueue.js";

test("The capacity must be 10 and have 1 element", () =>{
    let inst_ipq = new IndexPriorityQueue(10);
    inst_ipq.insert("a", 10);
    expect(inst_ipq.heap_size).toBe(1);
})