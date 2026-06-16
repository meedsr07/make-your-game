//import { spawenplayer, moveLeft, moveRight } from "./player.js"




function createMob(mob, x, y) {
				let obj = {
				mob: mob,
				v: 1,
				element: div,
				
				x: x,
				y: y,
				alive: true,  // may not keep	
		}
		return obj
} 














 
const movInterval = 100
const fireInterval = 800
const raysInterval = 200 
let lastTime = 0 
let  cur = 0
let fireTimer = 0
let raysTimer = 0 

 function loop(timeStamp) {
	if (!lastTime) lastTime = timeStamp
	let d = timeStamp-lastTime	
	lastTime = timeStamp
	cur+= (d)
	fireTimer += d 
	raysTimer += d
	if (raysTimer >= raysInterval) {
		movRays()
		raysTimer = 0
	} 
	if (cur >= movInterval) {
		if (fireTimer >= fireInterval) {
				
		shout()
				fireTimer = 0
		} 		
	
			movMobs() 
		cur = 0
	} 	
	 cleanRays() 	

	requestAnimationFrame(loop)

}



requestAnimationFrame(startGame)



