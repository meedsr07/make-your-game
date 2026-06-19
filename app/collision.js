import { gamePlay as G } from "./state.js";


export function checkBulletEnemyCollision() {
		if (!G.bullet) return 	
		let bullet = G.bullet 
		if (hitShield(bullet)  ) {
            return 
        }
        // get the position of the bullet part of the screen
        // loop  in  enemies in the G.spawnedMobs array  
        for (let r = 0; r < G.spawnedMobs.length; r++) {
            let row = G.spawnedMobs[r][0];
			let rowR = G.spawnedMobs[r][1];

            for (let m = 0; m < row.length; m++) {
				
                let enemy = row[m];
                if (!enemy.alive) continue;

                // check if the bullet rectangle intersects with the enemy rectangle
				 const hit = 
			    G.bullet.x < enemy.x + enemy.width  &&
   				G.bullet.x + G.bullet.width > enemy.x  &&
			    G.bullet.y < enemy.y + enemy.height &&
			    G.bullet.y + G.bullet.height > enemy.y;
                    if (hit) {

                    bullet.element.remove();

                    enemy.kill();
					G.aliveMobs--
                    G.bullet = null;
              

                    return
                }
            }
        }
	if (G.ufo) {
		let enemy = G.ufo 
					 const hit = 
			    G.bullet.x < enemy.x + enemy.width  &&
   				G.bullet.x + G.bullet.width > enemy.x  &&
			    G.bullet.y < enemy.y + enemy.height &&
			    G.bullet.y + G.bullet.height > enemy.y;
                    if (hit) {

                    bullet.element.remove();

                    enemy.kill();
					G.aliveMobs--
			G.ufo = null
                    G.bullet = null;
			   }

	}
	
	
}


/* function hitRays(b) {
	
	for (let j = 0 ; j < G.rays.length ; j++ ) {
			let ray = G.rays[j]
			if ( b.x >= ray.x && ray.x <= (ray.x + ray.width/2) && b.y <= ray.y  ) {
					b.element.remove();
					ray.element.remove()
					G.rays.splice(j, 1)	
			} 
	} 
    
}*/


function hitShield(b) {

    for (let py = b.y; py <= b.y + b.height/2; py++) {
        for (let px = b.x; px <= b.x + b.width/2; px++) {
            const key = `${px},${py}`;
            if (G.bricks.has(key)) {
                G.bricks.get(key).element.remove();
                G.bricks.delete(key);
                b.element.remove();
				if (b.sign) {
					G.rays.splice(b, 1)	
				} else {
	            	G.bullet = null;
				}
                    return true;
            }
        }
    }
}
/* export function Score() {
    const Score = document.createElement('div')
    Score.id = 'score'
    Score.textContent = 'Score : 0'
    document.body.append(Score)
}

function updateScore(enemy) {
    if (enemy.name === "squid") {
        G.currentScore += 25;
    }

    if (enemy.name === "crab") {
        G.currentScore += 15;
    }

    if (enemy.name === "octpus") {
        G.currentScore += 10;
    }

    const score = document.getElementById('score');
    score.textContent = `Score : ${G.currentScore}`;
}*/
