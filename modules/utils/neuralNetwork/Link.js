import { sigmoid } from "./activateFunction.js";


export default class Link {

    constructor(id, from, to) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.weight = Math.random() * 2 - 1;

        this.learningRate = 0.1;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    correctWeight() {
        this.weight += this.to.error * this.from.value * this.learningRate;
    }

    copy() {
        let link = new Link(this.id, this.from, this.to);
            link.setWeight(this.weight);
        return link;
    }

    mutate(rate) {
        let r = Math.random();
        if (r < rate) {
            this.weight = Math.random() - 0.5;
        }
    }

    static crossover(links1, links2) {
        let links = [];
        for (let i = 0; i < links1.length; i++) {
            let link1 = links1[i];
            let link2 = links2[i];
            let link = new Link(link1.id, link1.from, link1.to);
                link.weight = Math.random() < 0.5 ? link1.weight : link2.weight;
            links.push(link);
        }
        return links;
    }

    serialize() {
        return {
            id: this.id,
            from: this.from.id,
            to: this.to.id,
            weight: this.weight
        };
    }

    static deserialize(json) {
        return new Link(json.id, json.from, json.to, json.weight);
    }

    static getLink(links, from, to) {
        for (let link of links) {
            if (link.from.id === from.id && link.to.id === to.id) {
                return link;
            }
        }
        return null;
    }

    print() {
        console.log("Link " + this.id + " :");
        console.log("from : ", this.from.id, "| to : ", this.to.id, "| weight : ", this.weight);
    }

    draw(canvas, height = 1, fromCount = 1, toCount = 1) {
        // col = col * (height / count) + (height - count) / (2 * count);
        let color = this.weight * this.from.value > 0.25 ? "#0f0" : (this.weight * this.from.value < -0.25 ? "#f00" : "#fff");

        let fromY = this.from.getCol();
            fromY = fromY * (height / fromCount) + (height - fromCount) / (2 * fromCount);
        let fromX = this.from.getRow();
        let toY = this.to.getCol();
            toY = toY * (height / toCount) + (height - toCount) / (2 * toCount);
        let toX = this.to.getRow();
        canvas.drawRegularLine(fromX, fromY, toX, toY, color);

        // draw weight
        let x = (fromX + toX) / 2;
        let y = (fromY + toY) / 2;
        canvas.drawWeight(x, y, Math.round(this.weight * 1000) / 1000);
    }
}