import { gamePlay as G } from "./state.js";


class Bullet {
    constructor(x, y) {
        if (G.Bullets) return
        this.element = document.createElement("div");
        this.element.classList.add("bullet");

        this.x = x;
        this.y = y;

        this.speed = 8;
        this.width = 10;
        this.height = 10;

        G.playGround.element.append(this.element);
        G.Bullets.push({ element: this.element, x: this.x, y: this.y, speed: this.speed, width : this.width , height : this.height})

        this.element.style.position = "absolute";
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    updateBullets() {
        if (G.Bullets) return
        this.y -= this.speed
        this.element.style.transform = `translate(${this.x}px ,${this.y}px)`
        if (this.y > 0) {
            this.element.remove() 
            G.Bullets = null
        }
    }
}