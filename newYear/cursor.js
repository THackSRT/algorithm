

export default class Cursor {
    
    constructor (color = 'white') {
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.type = 'cursor';
        this.size = 10;
    }

    init (canvas) {
        canvas.canvas.addEventListener('mousemove', (event) => {
            this.x = -(canvas.width / 2 - event.clientX);
            this.y = (canvas.height / 2 - event.clientY);
        });
    }


    draw (canvas) {
        canvas.drawCircle(this.x, this.y, this.size, this.color);
    }

    setSize (size) { this.size = size; }
    get positions () {
        return {
            x: this.x,
            y: this.y,
            z: 0,
        }
    }
}