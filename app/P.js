import { gamePlay as G } from "./state.js";
import { keysstate } from "./state.js";

export class Player {
    constructor() {
        const player = document.createElement('div')
        player.id = 'playership'
        G.playGround.element.append(player)

        this.width = 50
        this.height = 25
        this.speed = 6
        this.x = G.playGround.width / 2 - this.width / 2
        this.y = G.playGround.height - this.height - 5


        this.element = player
        this.x = x
        this.y = y

        player.style.position = "absolute";
        player.classList.add("cyan")
        player.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    moveLeft() {
        this.x -= this.speed
        this.updatePlayer()
    }

    moveRight() {
        this.x += this.speed
        this.updatePlayer()
    }

    updatePlayer() {
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x > G.playGround.width - this.width) {
            this.x = G.playGround.width - this.width
        }
        this.element.style.transform = `translate(${this.x}px ,${this.y})`
    }

}