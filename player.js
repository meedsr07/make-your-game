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
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
}
Spawenplayer()