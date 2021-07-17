
class Node{
    constructor(data, prev = null, next=null){
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

export class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    enqueue(data){
        if(this.size == 0){
            let instNode = new Node(data);
            this.head = instNode;
            this.tail = instNode;
        }else{
            let instNode = new Node(data, null, this.tail);
            this.tail.prev = instNode;
            this.tail = instNode;
        }
        this.size++;
    }
    dequeue(){
        if(this.size == 0){
            throw "Men, the Queue is empty";
        }else{
            this.head.data = null;
            this.head = this.head.prev
        }
        this.size--;
    }
    loop(){
        let init = this.head;
        while(init != null){
            console.log(init.data, " ");
            init = init.prev;
        }
    }
    createArr(){
        let arr = [];
        let init = this.head;
        while(init != null){
            arr.push(init.data);
            init = init.prev;
        }
        return arr;
    }
    front = () => this.head;
    back = () => this.tail;
    empty = () => this.size == 0;
}