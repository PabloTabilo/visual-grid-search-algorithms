import {Queue} from './Queue.js';

describe("Check Queue structure", ()=>{
    let q;
    beforeEach(() =>{
        q = new Queue();
    });

    test("Check empty", () =>{
        expect(q.empty()).toBe(true);
    });

    test("Check basic characterictics of queue", () =>{
        q.enqueue(2);
        q.enqueue(12);
        q.enqueue(22);
        q.dequeue();
        expect(q.front()["data"]).toBe(12);
    });
});