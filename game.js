import {gamePlay as G}  from "./state.js"





export  function shout() {
 	let rev = [...G.spawnedMobs].reverse() 
	let closedOne = null 
	for (let row of rev) {
		for (let mob of row[0]) {
			if ((!closedOne && mob.alive) || ( mob.alive && Math.abs(closedOne.x-G.player.x) > Math.abs(mob.x-G.player.x)   ) )  {
				closedOne = mob
			} 
		}
	}
	let ray = {} 
	ray.element = document.createElement("div")
	ray.element.id = "ray"
	ray.element.classList.add("ray_1")
	ray.element.style.position = "absolute"
	ray.element.style.left = 0 
	ray.element.style.top = 0
	ray.x = closedOne.x
	ray.y = closedOne.y+40
	ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`
	ray.col = G.layers[Math.round(ray.y/85) ]  || "red"
	ray.element.classList.add(ray.col)
	G.rays.push(ray) 
	G.playGround.appendChild(ray.element)
}


function destroyShield(ray) {
		let shield = null 
		let head = {x: ray.x+1, y: ray.y+20  } 
		
		for (let sh of G.shields) {
				if ( Math.abs(sh.x-head.x) <= (6 * 6) &&  Math.abs(sh.y-head.y) <= (6*4)  ) {

						console.log("fuckyou")
						shield = sh 
						break 
				}
		}
		if (!shield) {
				return 
		}
		let queue = [] 
		let makeExp = false
		 for (let brick of shield.bricks) {
				if ( Math.abs((brick.x)-head.x) <= 8   &&  Math.abs((brick.y)-(head.y)) <= 20 ) {
				if ( Math.abs((brick.x)-head.x) === 0 &&  Math.abs((brick.y)-(head.y)) <= 10    ) {
						makeExp = true
						
				}
					queue.push(brick) 
				}
		 }
		if (makeExp === true) {
				destroyRay(ray)
				for (let br of queue) {
						shield.bricks.splice(shield.bricks.indexOf(br), 1)
						br.element.remove()
					
				} 
		} else {
			return false
		}
		return true 
	
}

export function  movRays() {
	for (let ray of G.rays ) {
			if ( ((ray.y+20)+ 1) > 600 ) { 
				destroyRay(ray)
				return 
			}
			if (destroyShield(ray)) {
					return 
			} 
			ray.y += 1
			
			ray.element.classList.remove(ray.col)
			ray.col = G.layers[Math.round(ray.y/85) ]   || "red" 
			ray.element.classList.add(ray.col)
			ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`	
	} 
}

function  destroyRay(ray) {

		G.rays.splice(G.rays.indexOf(ray), 1)
		ray.element.remove()
		let exp = document.createElement("div")
		exp.classList.add("ray_exp")
		exp.style.position = "absolute"
		exp.style.left = 0
		exp.style.right = 0
		exp.style.transform =  `translate(${ray.x}px, ${ray.y}px)`	
		exp.classList.add(ray.col)
		G.playGround.appendChild(exp)
		G.expQueue.push(exp)
}

export function  cleanRays() {
		let i = 0 
		for (let exp of G.expQueue)  {
			exp.remove()		
		}
		G.expQueue.length = 0
}

export   function movMobs() {
		let xOffset = (5* G.direction) 
		let yOffset = 40
		let swip = false	

		for (let row of G.spawnedMobs) {
			let index  = 0 
			if (G.direction > 0) {
				index = 1
			}
		
			for (let mob of row[index]) {
		
			if (!mob.alive) {
				continue
			}
			if ( mob.element.style.left !== '0px' ) { 
				mob.element.style.left = '0px'
 				mob.element.style.top  = '0px'
			}
			if (mob.v ===  1)  {
					mob.element.classList.replace(mob.name+"_1", mob.name+"_2")
					mob.v = 2
			} else {
				mob.element.classList.replace(mob.name+"_2", mob.name+"_1")
				mob.v = 1
			}	
			if ((( mob.x+40 + xOffset) > 800) || ( (mob.x + (xOffset + 10) ) <= 0 ) ) {
				swip = true 
				
				break			
			} else {
				mob.x += xOffset 
				mob.element.style.transform = `translate(${mob.x}px, ${mob.y}px)`
			}

		}
		
		}
		if (swip) {
				if (G.direction === 1) {
					G.direction = -1 
				} else {
					G.direction = 1
				}
			for (let row of G.reversedMobs) {
			
			for (let mob of row[0]) {
				if (!mob.alive) {
					continue
				}	
			
	
			if (mob.v ===  1)  {
					mob.element.classList.replace(mob.name+"_1", mob.name+"_2")
					mob.v = 2
			} else {
				mob.element.classList.replace(mob.name+"_2", mob.name+"_1")
				mob.v = 1
			}
			if ( ( mob.y+40 + yOffset) > 600)  {
				mob.element.display = "none"
				break			
			} else {
				mob.y += yOffset 
				mob.element.style.transform = `translate(${mob.x}px, ${mob.y}px)`
				mob.element.classList.remove(mob.col)
				mob.col = G.layers[Math.round(mob.y/85)]
				mob.element.classList.add(mob.col)

			}
		}
		}
		} 
}
