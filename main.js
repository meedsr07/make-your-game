//import { movMobs,  shout, movRays, cleanRays}  from "./game.js"
import { gamePlay as G } from "./app/state.js"
import {spawnMobs, spawnShield } from "./app/scene.js"



function startGame() {	
	G.playGround.element  = document.createElement("div") 
	G.playGround.element.id = "container"


	
	spawnMobs()

	document.body.appendChild(G.playGround.element)
	spawnShields()
	requestAnimationFrame(gameLoop)
//	spawenplayer()
}




function gameLoop(timestamp) {
	requestAnimationFrame(gameLoop)
}
