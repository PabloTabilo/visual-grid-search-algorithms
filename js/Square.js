export default class Square{
    constructor(c, x, y, l, color = "black", isOn = false, isCoor=true){
        this.c = c;
        this.x = x;
        this.y = y;
        this.l = l;
        this.color = color;
        this.isOn = isOn;
        this.isCoor = isCoor;
    }
    draw(){
        this.c.clearRect(this.x, this.y, this.l, this.l);
        this.c.beginPath();
        if(!this.isCoor){
            this.c.fillRect(this.x, this.y, this.l, this.l);
            this.c.fillStyle = this.color;
        }else{
            if (this.isOn){
                this.c.fillRect(this.x, this.y, this.l, this.l);
                this.c.fillStyle = this.color;
            }else{
                this.c.strokeRect(this.x, this.y, this.l, this.l);
                this.c.strokeStyle = this.color;
            }
        }
        this.c.fill();
    }
    setColor = (color) => this.color = color;
    setIsOn = (isOn) => this.isOn = isOn;
    getIsOn = () => this.isOn;
    setIsCoor = (isCoor) => this.isCoor = isCoor;
    getIsCoor = () => this.isCoor;
}

class Pcoor extends Square{
    constructor(c, x, y, l, color, start = true, isCoor = false){
        this.l = l;
        this.x = x;
        this.y = y;
        this.isCoor = isCoor;
        this.start = start;
        this.color = color;
        this.c = c;
        super(c, x, y, l, this.color, false, this.isCoor);
    }
    draw(){
        this.c.clearRect(this.x, this.y, this.l, this.l);
        this.c.beginPath();
        this.c.fillRect(this.x, this.y, this.l, this.l);
        this.c.fillStyle = this.color;
        this.c.fill();
    }
    drag(){

    }
}