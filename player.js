import { gamePlay } from "./state.js";

export function Spawenplayer() {
    const gamebox = document.getElementById('container')
    const player = document.createElement('div')
    player.id = 'playership'
    gamebox.append(player)

    const gameWidth = 800;
    const gameHeight = 600;
    const playerSize = 50;

    const x = gameWidth / 2 - playerSize / 2;

    const y = gameHeight - playerSize;

    gamePlay.player = {
        element: player,
        x: x,
        y: y,
        speed: 5
    };

    player.style.position = "absolute";
    player.classList.add("cyan")
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
}
Spawenplayer()


export function moveLeft() {
    gamePlay.player.x -= gamePlay.player.speed;
    updatePlayer();
}

export function moveRight() {
    gamePlay.player.x += gamePlay.player.speed;
    updatePlayer();
}

function updatePlayer() {
    if (gamePlay.player.x < 0) {
        gamePlay.player.x = 0;
    }

    if (gamePlay.player.x > 750) {
        gamePlay.player.x = 750;
    }
    gamePlay.player.element.style.left = gamePlay.player.x + "px";
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }
});