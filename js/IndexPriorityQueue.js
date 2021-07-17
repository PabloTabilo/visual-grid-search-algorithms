const INF = 99999;
const debug = false;
export class IndexPriorityQueue{
    constructor(capacity){
        this.heap_size = 0; // current numbers of elements
        this.capacity = capacity; // size of heap
        this.values = {}; // values of heap
        this.pm = {}; // position from [ki] to node at
        this.im = new Array(capacity); // from positions of [nodes at] to ki
        for(let i = 0; i < capacity; i++){
            this.im[i] = INF;
        }
    }
    empty(){return this.heap_size == 0;}
    parent(i) {return ((i-1)/2)|0;}
    leftChild(i){return (2*i+1);}
    rightChild(i){return (2*i+2);}
    front(){return {id: this.im[0], c: this.values[this.im[0]]}}
    poll(){
        // copiar last element on position  0
        // apply sink;
        let id0 = this.im[0];
        this.im[0] = this.im[this.heap_size-1];
        this.pm[this.im[this.heap_size-1]] = 0;

        this.values[id0] = INF;
        this.im[this.heap_size-1] = INF;
        this.pm[id0] = -1;

        this.heap_size--;
        this.sink(0);
    }
    // up node i until hi is satisfied
    swim(i){
        while(this.parent(i) >= 0 && this.values[this.im[this.parent(i)]] > this.values[this.im[i]]){
            if(debug) console.log("i: ", i, "; this.im[i]: ", this.im[i], "; this.values[this.im[i]]: ", this.values[this.im[i]]);
            if(debug) console.log("this.parent(i): ", this.parent(i), "; this.im[this.parent(i)]: ", this.im[this.parent(i)], "; this.values[this.im[this.parent(i)]]", this.values[this.im[this.parent(i)]]);
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    // down node i until leaf node
    sink(i){
        while (true){
            let left = this.leftChild(i);
            let right = this.rightChild(i);
            let smallest = left;
            if(debug) console.log(i, this.im[i], " - ",left, right, this.im[right], this.im[left]);
            if(right <= this.heap_size-1 && this.values[this.im[right]] < this.values[this.im[left]]){
                smallest = right;
            }
            if(smallest > this.heap_size-1 || this.values[this.im[smallest]] > this.values[this.im[i]]){
                break;
            }
            this.swap(i, smallest);
            i = smallest;
        }
    }
    swap(i, down){
        // swap values
        this.pm[this.im[i]] = down;
        this.pm[this.im[down]] = i;

        let temp = this.im[i];
        this.im[i] = this.im[down];
        this.im[down] = temp;
    }
    insert(id, cost){
        if(this.heap_size == this.capacity){
            // Crear new arr with double capacity
            let t_im = this.im;
            this.im = new Array(2*this.capacity);

            for(let i = 0; i < capacity; i++){
                this.im[i] = INF;
            }

            this.capacity = 2*this.capacity;
            for(let i = 0; i < t_im.length; i++){
                this.im[i] = t_im[i];
            }
        }
        this.heap_size++;
        let i = this.heap_size - 1;
        if(debug) console.log("id, cost, i: ", id,", " ,cost, ", ", i);
        this.values[id] = cost;
        this.pm[id] = this.heap_size-1;
        this.im[this.heap_size-1] = id;
        this.swim(i);
    }
    update(id, cost){
        let i = this.hashMap[id];
        this.values[i] = cost;
        this.sink(i);
        this.swim(i);
    }
    loopMe(){
        console.log("loop every item on heap: ");
        console.log("Cost: ", this.values);
        console.log("pm: ", this.pm);
        console.log("im: ", this.im);
        console.log("this.heap_size: ", this.heap_size);
    }
}