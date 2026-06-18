// TODO tomorrow save state here insated 

export const gamePlay = {
		playGround: {width: 800, height: 600},
		player: {},	
	//	bullet:  {active: false, x: 0, y: 0, element: null},
		spawnedMobs: [],
		aliveMobs: 55,
		bricks: new Map(), 
		direction: 1,
		rays: [],
		functionsQueue: [],
		expQueue: [],
		mobs : [{name: "squid_", points: 30, ufo: false}, {name: "crab_", points: 20, ufo : false}, {name: "octpus_", points: 10, ufo : false}, {name: "ufo_", points: 150, ufo : true}]
}



export const keysstate = {
    left : false,
    right : false , 

}
