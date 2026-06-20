// TODO tomorrow save state here insated 

export const gamePlay = {
		playGround: {width: 800, height: 600},
		player: {},	
		spawnedMobs: [],
		aliveMobs: 55,
		bricks: new Map(), 
		direction: 1,
		rays: [],
		shots: 0,
		exps: [],
		mobs : [{name: "squid_", col: "cyan", points: 30}, {name: "crab_", col: "violet", points: 20}, {name: "octpus_", col: "green", points: 10}, {name: "ufo_", points: 150, col: "red", isUfo : true}]
}



export const keysstate = {
    left : false,
    right : false , 

}
