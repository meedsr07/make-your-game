import movMobs from "./game.js"
import { gamePlay as G } from "./state.js"





function createMob(name, x, y) {
		let div = document.createElement("div")	
		div.id = "alien"
		div.style.top = y+"px"
		div.style.left = x+"px"
		div.classList.add(name)
		console.log(y/85)
		let col = G.layers[Math.round(y/85)]
		div.classList.add(col) 
		
		div.classList.add(name+"_1") 
		div.style.display = "block"
		let mob = {
				name: name,
				v: 1,
				col: col,
				element: div,
				
				x: x,
				y: y,
				alive: true,  // may not keep	
		}
		return mob
} 



function startGame() {	

	let element = document.createElement("div") 
	element.id = "container"
	let fragment = document.createDocumentFragment()	


	
	spawnMobs(element)


	element.appendChild(fragment)	
	document.body.appendChild(element)
}




function spawnMobs(container) {
	//let offset = 2 
	let initX = 180
	let initY = 85
	let line = 0
	let fragment = 	document.createDocumentFragment()
	for (let i = 0; i < G.mobs.length ; i++ ) {
			let j = 2
			if (i === 0) {
				j = 1  
			}
		for (let k = 0; k < j ; k++) {
			let row = []
			for (let m = 0; m < 11; m++) {

				let mob = createMob(G.mobs[i], initX+(m * (40)), initY+(line * (40)  )) 
				row.push(mob)
				fragment.appendChild(mob.element)

			}		
			G.spawnedMobs.push(row)

			line++
			container.appendChild(fragment) 	
			fragment = 	document.createDocumentFragment()
		} 
			
	}   	
}



const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loop() {
	let direction = 1 
	while (true) {
		await sleep(300)
		console.log("called")
		movMobs() 
	}
}

startGame()


await loop()

