export default class MinHeap{
    constructor(capacity = 0){
        this.heap_size = 0;
        this.capacity = capacity;
        this.arr = new Array(capacity);
    }
    parent(i) {return (i-1)/2;}
    leftChild(i){return (2*i+1);}
    rightChild(i){return (2*i+2);}
}