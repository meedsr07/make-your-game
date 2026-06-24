import { gamePlay as G } from "./state.js";


export function checkBulletEnemyCollision() {

    if (!G.bullet) return
    let bullet = G.bullet
    // if the bullet collided with a shield
    if (hitShield(bullet)) {
        return
    }
    // looping for the enemy arr
    for (let r = 0; r < G.spawnedMobs.length; r++) {
        let row = G.spawnedMobs[r][0];

        for (let m = 0; m < row.length; m++) {

            let enemy = row[m];
            // skip the enemy if he dead 
            if (!enemy.alive) continue;

            // check if the bullet rectangle intersects with the enemy rectangle
            const hit =
                G.bullet.x < enemy.x + enemy.width &&
                G.bullet.x + G.bullet.width > enemy.x &&
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
            G.bullet.x < enemy.x + enemy.width &&
            G.bullet.x + G.bullet.width > enemy.x &&
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




function hitShield(b) {

    for (let py = b.y; py <= b.y + b.height / 2; py++) {
        for (let px = b.x; px <= b.x + b.width / 2; px++) {
            const key = `${px},${py}`;
            if (G.bricks.has(key)) {
                G.bricks.get(key).element.remove();
                G.bricks.delete(key);
                b.element.remove();
                G.bullet = null;
                return true;
            }
        }
    }
}
