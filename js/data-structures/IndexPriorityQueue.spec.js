import {IndexPriorityQueue} from "./IndexPriorityQueue.js";

describe("Test index priority queue class", () => {

    test("Check basic characterictics of ipq like the capacity must be 10 and have 1 element", () =>{
        let inst_ipq = new IndexPriorityQueue(10);
        inst_ipq.insert("a", 10);
        expect(inst_ipq.heap_size).toBe(1);
    });

    test("Check the states of IPQ - sink & swim implementation - do inset & poll", () =>{
        let inst_ipq = new IndexPriorityQueue(20);
        inst_ipq.insert("a", 12);
        inst_ipq.insert("b", 16);
        inst_ipq.insert("c", 2);
        inst_ipq.insert("d", 22);
        inst_ipq.insert("e", 14);
        inst_ipq.loopMe();
        inst_ipq.poll();
        inst_ipq.loopMe();
        expect(inst_ipq.heap_size).toBe(4);
    });
});