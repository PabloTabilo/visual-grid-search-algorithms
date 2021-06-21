export class Square{
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
        if (this.isOn){
            this.c.fillStyle = this.color;
            this.c.fillRect(this.x, this.y, this.l, this.l);
        }else{
            this.c.strokeStyle = this.color;
            this.c.strokeRect(this.x, this.y, this.l, this.l);
        }
        this.c.fill();
    }
    setColor = (color) => this.color = color;
    setIsOn = (isOn) => this.isOn = isOn;
    getIsOn = () => this.isOn;
    setIsCoor = (isCoor) => this.isCoor = isCoor;
    getIsCoor = () => this.isCoor;
}

export class Pcoor extends Square{
    constructor(c, x, y, l, color, start){
        super(c, x, y, l, color, false, false);
        this.l = l;
        this.x = x;
        this.y = y;
        this.isCoor = false;
        this.start = start;
        this.color = color;
        this.c = c;
    }
    getIsStart(){
        return this.start;
    }
    draw(){
        this.c.clearRect(this.x, this.y, this.l, this.l);
        this.c.beginPath();
        this.c.fillStyle = this.color;
        this.c.fillRect(this.x, this.y, this.l, this.l);
        this.c.fill();
    }
}