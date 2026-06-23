import { moveMobs, shot, moveRays, cleanExps}  from "./game.js"
import { gamePlay as G, keysstate } from "./app/state.js"
import {spawnMobs, spawnShields, spawenUfo, moveUfo } from "./app/scene.js"
import * as player  from "./app/player.js"
import { checkBulletEnemyCollision } from "./app/collision.js";
import { Timer } from "./app/timer.js";





const timers =  {
	moveMobs: new Timer(800),
	moveUfo: new Timer(50),
	shotMob: new Timer(1500),
	spawenUfo: new Timer((1500 + Math.random() * 1500), true)
}


let start = 0
let animationId = null

function startGame() {	
	G.score  = document.createElement("p") 
	G.score.textContent = 0 
	G.playGround.element  = document.createElement("div") 
	G.playGround.element.id = "container"
	G.playGround.element.appendChild(G.score)
	
	spawnMobs()

	document.body.appendChild(G.playGround.element)

	spawnShields()
	player.spawnPlayer()
	requestAnimationFrame(gameLoop)	
}


function pause() {
	// add pause state 
	cancelAnimationFram(animationId)
	// add a counter to get paused time
	animationId = null
}

function resume() {
	for (let  val of timers.values ) {
		val.lastTime = performance.now()
	}	
	animationId = requestAnimationFrame(gameLoop)
}



 
function gameLoop(timestamp) {
	const { interval, step } = getSpeed()	
	if (!start) start = timestamp
	timers.moveMobs.edit(interval)
	cleanExps(timestamp) 
	moveRays()
	player.updateBullets();
    	checkBulletEnemyCollision();
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
		
	if (timers.moveMobs.tick(timestamp)) {
		moveMobs(step)	
	}
	if (timers.shotMob.tick(timestamp)) {
		shot()	
	}
	if (timers.moveUfo.tick(timestamp)) {
		moveUfo()	
	}
	if ( !G.ufo && timers.spawenUfo.tick(timestamp)) {
		if (G.shots >= 10) {
			spawenUfo()	
			G.shots = 0
		}
	}
	G.score.textContent = (timestamp-start) / 1000
	animationId = requestAnimationFrame(gameLoop)
}


function getSpeed() {
    const ratio = ( G.aliveMobs / 55) * 0.50 
    
    const interval = 100 + (700 * ratio)  
    const step =  (5+ 20 ) //Math.floor(5 + (20 * (1 - ratio))) 
   	 
    return { interval, step }
}

startGame() 
