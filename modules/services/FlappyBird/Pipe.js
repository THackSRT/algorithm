

export default class Pipe {

    constructor(width, height, speed = 4) {
        this.width = width;
        this.height = height;

        this.spacing = 120;
        // randomly generate top between 1/6 and 3/4 of height
        this.top = Math.random() * (height - this.spacing * 1.5) + this.spacing / 2;
        this.bottom = this.top + this.spacing;

        this.x = width;
        this.w = 60;
        this.speed = speed;
    
        this.passed = false;
        this.highlight = false;
    }

    hits(bird) {
        let halfBirdHeight = bird.w / 2;
        let halfBirdwidth = bird.w / 2;
        if (bird.y - halfBirdHeight < this.top || bird.y + halfBirdHeight > this.bottom) {
          //if this.w is huge, then we need different collision model
          if (bird.x + halfBirdwidth > this.x && bird.x - halfBirdwidth < this.x + this.w) {
            this.highlight = true;
            this.passed = true;
            return true;
          }
        }
        this.highlight = false;
        return false;
    }

    pass(bird) {
        if (bird.x > this.x && !this.passed) {
          this.passed = true;
          return true;
        }
        return false;
    }


    show(canvas) {
        // draw top
        canvas.drawLongRect(this.x, 0 , this.w, this.top, '#fff');
        // draw bottom
        canvas.drawLongRect(this.x, this.bottom, this.w, this.height, '#fff');
    }

    offscreen() {
        return (this.x < -this.w);
    }

    update() {
        this.x -= this.speed;
    }

    isOut() {
        return this.x + this.width < 0;
    }

    isCollide(obj) {
        return (
            obj.x < this.x + this.width &&
            obj.x + obj.width > this.x &&
            obj.y < this.y + this.height &&
            obj.y + obj.height > this.y
        );
    }
}