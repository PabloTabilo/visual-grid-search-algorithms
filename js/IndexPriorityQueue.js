const INF = 99999;
export default class IndexPriorityQueue{
    constructor(capacity){
        this.heap_size = 0; // current numbers of elements
        this.capacity = capacity; // size of heap
        this.hashMap = {}; // ID to Ki
        this.myids = {}; // Ki to ID
        this.values = new Array(capacity); // values of heap
        this.pm = new Array(capacity); // position from [ki] to node at
        this.im = new Array(capacity); // from positions of [nodes at] to ki
        for(let i = 0; i < capacity; i++){
            this.values[i] = INF;
            this.pm[i] = INF;
            this.im[i] = INF;
        }
    }
    empty(){return this.heap_size == 0;}
    parent(i) {return (i-1)/2;}
    leftChild(i){return (2*i+1);}
    rightChild(i){return (2*i+2);}
    front(){return {id: this.myids[this.im[0]], cost: this.values[this.im[0]]}}
    poll(){
        // copiar last element on position  0
        // apply sink;
        this.im[0] = this.heap_size-1;
        this.pm[this.heap_size-1] = 0;
        this.heap_size--;
        this.sink(0);
    }
    // up node i until hi is satisfied
    swim(i){
        while(this.im[this.parent(i)] != 0 && this.values[this.im[this.parent(i)]] > this.values[this.im[i]]){
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
            if(right <= this.heap_size-1 && this.values[right] < this.values[left]){
                smallest = right;
            }
            if(smallest > this.heap_size-1 && this.values[smallest] > this.values[this.im[i]]){
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
            let t_v = this.values;
            let t_pm = this.pm;
            let t_im = this.im;

            this.values = new Array(2*this.capacity);
            this.pm = new Array(2*this.capacity);
            this.im = new Array(2*this.capacity);

            for(let i = 0; i < capacity; i++){
                this.values[i] = INF;
                this.pm[i] = INF;
                this.im[i] = INF;
            }

            this.capacity = 2*this.capacity;
            for(let i = 0; i < t_v.length; i++){
                this.values[i] = t_v[i];
                this.pm[i] = t_pm[i];
                this.im[i] = t_im[i];
            }
        }
        this.heap_size++;
        let i = this.heap_size - 1;
        this.hashMap[id] = i;
        this.myids[i] = id;
        this.values[i] = cost;
        this.pm[i] = i;
        this.im[i] = i;
        this.swim(i);
    }
    update(id, cost){
        let i = this.hashMap[id];
        this.values[i] = cost;
        this.sink(i);
        this.swim(i);
    }
}