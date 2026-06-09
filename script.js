
const layers = ["violet",  "green", "cyan", "violet", "yellow", "red"]


function createLayer(col, height) {
		let div = document.createElement("div")	
		div.style.width = "100%"
		div.style.backgroundColor = col
		div.style.height= ""+height+"px"
	return div

} 

function createMob(name, layer) {
		let div = document.createElement("div")	
		div.id = name
		div.style.width = "100%"
		div.style.backgroundImage = "url('assets/"+name+"')"
		div.style.height= "6px"
		return div

} 



function startGame() {	

	let element = document.createElement("div") 
	element.id = "container"
	let fragment = document.createDocumentFragment()	

	for (let layer of layers)  {
		let div  = createLayer(layer, 17) 	
		fragment.appendChild(div)
	}

	fragment.appendChild(createLayer("cyan", 10))


	element.appendChild(fragment)	
	document.body.appendChild(element)
}

const mobs = ["squid", "crab", "octpus"]

function spawnMobs(container) {
	let fragment =  	
	for (let i = 0; i < mobs.length() ; i++ ) {
			let j = 2
			if i === 2 {
				j = 1  
			}
		for (let k = 0; k < j ; k++) {
				
		} 
			
	}   	
}

startGame()
