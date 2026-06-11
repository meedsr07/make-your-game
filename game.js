import {gamePlay as G}  from "./state.js"







export  default function movMobs() {
		let xOffset = (5* G.direction) 
		let yOffset = 40
		let swip = false	
		// TO DO HANDLING WHEN IT touch shilds or ground
		for (let row of G.spawnedMobs) {
			let rowCopy = row
			if (G.direction > 0) {
				rowCopy = [...row].reverse() 
			}
		
			for (let mob of rowCopy) {
			if (!mob.alive) {
				continue
			}

			mob.element.style.left = '0px'
 			mob.element.style.top  = '0px'
			
			if (mob.v ===  1)  {
					mob.element.classList.remove(mob.name+"_1")
					mob.element.classList.add(mob.name+"_2")
					mob.v = 2
			} else {
				mob.element.classList.remove(mob.name+"_2")
				mob.element.classList.add(mob.name+"_1")
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
			let mobs = [...G.spawnedMobs].reverse()
			for (let row of mobs) {
			
			for (let mob of row) {
				if (!mob.alive) {
					continue
				}	
			
	
			if (mob.v ===  1)  {
					mob.element.classList.remove(mob.name+"_1")
					mob.element.classList.add(mob.name+"_2")
					mob.v = 2
			} else {
				mob.element.classList.remove(mob.name+"_2")
				mob.element.classList.add(mob.name+"_1")
				mob.v = 1
			}	
			if ( ( mob.y+40 + yOffset) > 600)  {
				console.log("does this called")
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
