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
        speed: 10
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

function SpawenBullet() {
    const gamebox = document.getElementById('container')
    const bullet = document.createElement('div')
    bullet.id = 'bullet'
    gamebox.append(bullet)
    let shipX = gamePlay.player.x + 22
    let shipY = gamePlay.player.y
    gamePlay.Bullet.push({element : bullet , x : shipX , y : shipY , speed : 10})
    bullet.style.position = 'absolute'
    bullet.style.left = `${shipX}px`
    bullet.style.top = `${shipY}px`

}

function gameLoop() {
	updateBullets();

	requestAnimationFrame(gameLoop);
}

function updateBullets() {
	for (let i = 0; i < gamePlay.Bullet.length; i++) {
		let bullet = gamePlay.Bullet[i];

		bullet.y -= bullet.speed;

		bullet.element.style.top = bullet.y + "px";

		if (bullet.y < 0) {
			bullet.element.remove();
			gamePlay.Bullet.splice(i, 1);
			i--;
		}
	}
}

gameLoop();

document.addEventListener("keydown", (event) => {
    if (event.key === ' ') {
        SpawenBullet()
    }
    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }
});

