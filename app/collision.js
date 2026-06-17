import { gamePlay as G } from "./state.js";


export function checkBulletEnemyCollision() {
		if (!G.bullet) return 	
		let bullet = G.bullet 
        // get the position of the bullet part of the screen
        const bulletRect = bullet.element.getBoundingClientRect();
        // loop  in  enemies in the G.spawnedMobs array  
        for (let r = 0; r < G.spawnedMobs.length; r++) {
            let row = G.spawnedMobs[r][0];
			let rowR = G.spawnedMobs[r][1];

            for (let m = 0; m < row.length; m++) {
				
                let enemy = row[m];
				console.log(enemy)
                // if (!enemy || !enemy.element) continue;

                const enemyRect = enemy.element.getBoundingClientRect(); // this must be removed 
                // check if the bullet rectangle intersects with the enemy rectangle
                const hit =
                    bulletRect.left < enemyRect.right &&
                    bulletRect.right > enemyRect.left &&
                    bulletRect.top < enemyRect.bottom &&
                    bulletRect.bottom > enemyRect.top;

                if (hit) {
                    // remove DOM elements
                    bullet.element.remove();

                    enemy.kill();

                    // remove from arrays
                    G.bullet = null;
                   // row.splice(m, 1);
				//	rowR.splice(m, 1);

                 //  m--;

                    return
                }
            }
        }
}


export function Score() {
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
}
