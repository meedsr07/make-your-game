import { moveMobs}  from "./game.js"
import { gamePlay as G, keysstate } from "./app/state.js"
import {spawnMobs, spawnShields } from "./app/scene.js"
import * as player  from "./app/player.js"
import { checkBulletEnemyCollision } from "./app/collision.js";




function startGame() {	
//	G.score  = document.createElement("p") 
	//G.textContent = 0 
	G.playGround.element  = document.createElement("div") 
	G.playGround.element.id = "container"
	//G.playGround.element.appendChild(G.score)
	
	spawnMobs()

	document.body.appendChild(G.playGround.element)

	spawnShields()
	player.spawnPlayer()
	requestAnimationFrame(gameLoop)
	
}


let moveInterval = 50 
let lastTime = 0 
let start = 0 
function gameLoop(timestamp) {
	if (!lastTime) {
			start = lastTime = timestamp
			
	}
	if (timestamp-lastTime >= moveInterval) {
		moveMobs()
		lastTime = timestamp
	}
	if (keysstate.bullet) {
		player.spawenBullet()
		keysstate.bullet = false
	}
    if (keysstate.left) {
        player.moveLeft()
    }
    if (keysstate.right) {
        player.moveRight()
    }

    player.updateBullets();
    checkBulletEnemyCollision();
    
	// G.score.textContent = (timestamp-start) / 1000
	requestAnimationFrame(gameLoop)
}





startGame() 
