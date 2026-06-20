import {gamePlay as G}  from "./app/state.js"





export  function shot() {
 	let rev = [...G.spawnedMobs].reverse() 
	let closedOne = null 
	for (let row of rev) {
		for (let mob of row[0]) {
			if ( mob.alive &&  ( !closedOne || Math.abs(closedOne.x-G.player.x) > Math.abs(mob.x-G.player.x)   ) )  {
				closedOne = mob
			} 
		}
	}
	let ray = {height: 10, width:10 } 
	ray.element = document.createElement("div")
	//ray.name = "ray_"+rand(1, 3)+"_"
	ray.element.classList.add("bullet")
	ray.element.style.position = "absolute"
	ray.element.classList.add("red")
	ray.element.style.left = "0px" 
	ray.element.style.top = "0px"
	ray.x = closedOne.x+20
	ray.y = closedOne.y+20
	ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`
	G.rays.push(ray) 
	G.playGround.element.appendChild(ray.element)
}

function killPlayer(ray) {
		 const hit = 
			    ray.x < G.player.x+6 + G.player.width-6  &&
   				ray.x + ray.width > G.player.x+6  &&
			    ray.y < G.player.y +G.player.height &&
			    ray.y + ray.height > G.player.y;
                    if (hit) {
                    ray.element.style.display = "none";// Todo later:
					alert("failed")
                    return
                }
	
}
function hitShield(b) {
    for (let py = b.y+b.height; py >=  b.y + b.height/2; py--) {
        for (let px = b.x; px <= b.x + b.width/2; px++) {
            const key = `${px},${py}`;
            if (G.bricks.has(key)) {
                G.bricks.get(key).element.remove();
                G.bricks.delete(key);
                b.element.style.display = "none";
					G.rays.splice(G.rays.indexOf(b), 1)	
                    return true;
            }
        }
    }
}



function overridShields(mob) {
			if (!mob.alive) return 
			for (let [key, brick] of G.bricks) { // must update to handle map

					if ( ( (brick.x+3) >=  mob.x &&  (brick.x+3) <= mob.x+40) && ( (brick.y+3) >=  mob.y &&  (brick.y+3) <= mob.y+32)) {
						G.bricks.delete(key)
						brick.element.remove()

					}
			}
}


export function  moveRays() {
	for (let i = 0; i < G.rays.length; i++ ) {
			let ray = G.rays[i]
			if ( ((ray.y+20)+ 4) > 600 ) { 
			//	destroyRay(ray, "red")
				G.rays.splice(i, 1)
				i--	
				ray.element.remove()
				continue 
				//return 
			}
			if (hitShield(ray) || killPlayer(ray) || hitBullet(ray, i)) {
					continue 
			} 
			ray.y += 3
			ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`	
	} 
}

function hitBullet(ray, i ) {
	if (!G.bullet) return 
	if (ray.y + ray.height <= G.bullet.y+G.bullet.height && ray.y + ray.height >= G.bullet.y   && ray.x === G.bullet.x) {
		G.rays.splice(i, 1)
			
		ray.element.remove()
		G.bullet.element.remove()
		G.bullet = null
	} 
}


export function  cleanExps(timestamp) {
	for (let i = G.exps.length-1;  i >= 0    ; i--) {

		let exp = G.exps[i]

		
		if (exp.timer.tick(timestamp) ) {
			exp.element.remove()
			G.exps.splice(i, 1)
		}
	}	
				
}

export   function moveMobs(xOffset) {
		xOffset *= G.direction
	//	let xOffset = ( 5* G.direction) 
		let yOffset = 20
		let swip = false	
		let index  = 0 
		if (G.direction > 0) {
				index = 1
		}
	outer :	for (let row of G.spawnedMobs) {
			
		
			for (let mob of row[index]) {
		
				if (!mob.alive ) continue 		
				if (!mob.canMove(xOffset, "x", G.playGround.width)) { 
						swip = true 
						break outer 
					
				} 
				break
				overridShields(mob)

			}
		
		}
	if (swip) {
		G.direction *= -1
	}
	for (let row of G.spawnedMobs) {
			
		
			for (let mob of row[index]) {
				
				if (!swip) { 
					mob.move(xOffset, "x", G.playGround.width)
				} else {
					mob.move(yOffset, "y", G.playGround.height)
				} 
				overridShields(mob)

			}
		
		}

		 
}


const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
