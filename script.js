import movMobs from "./game.js"


const layers = ["violet",  "green", "cyan", "violet", "yellow", "red", "cyan"]

const mobs = ["squid", "crab", "octpus"]

const spawnedMobs = [ ]



function createMob(name, x, y) {
		let div = document.createElement("div")	
		div.id = "alien"
		div.style.top = y+"px"
		div.style.left = x+"px"
		div.classList.add(name)
		console.log(y/85)
		let col = layers[Math.round(y/85)]
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
	for (let i = 0; i < mobs.length ; i++ ) {
			let j = 2
			if (i === 0) {
				j = 1  
			}
		for (let k = 0; k < j ; k++) {
			let row = []
			for (let m = 0; m < 11; m++) {

				let mob = createMob(mobs[i], initX+(m * (40)), initY+(line * (40)  )) 
				row.push(mob)
				fragment.appendChild(mob.element)

			}		
			spawnedMobs.push(row)

			line++
			container.appendChild(fragment) 	
			console.log(mobs[i])
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
		direction =  movMobs(spawnedMobs, direction, layers) 
	}
}

startGame()


await loop()

