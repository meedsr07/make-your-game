import { gamePlay as G, keysstate } from "./state.js";
// create the player and set the initial position of the player
export function spawnPlayer() {
    const gamebox = G.playGround 
    const player = document.createElement('div')
    player.id = 'playership'
    gamebox.element.append(player)

    
    const playerSize = 50;

    const x = G.playGround.width/8 - playerSize/2;

    const y = G.playGround.height - playerSize;

    G.player = {
        element: player,
        x: x,
        y: y,
        speed: 5
    };

    player.style.position = "absolute";
    player.classList.add("cyan")
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
}

export function moveLeft() {
    G.player.x -= G.player.speed;
    updatePlayer();
}
export function moveRight() {
    G.player.x += G.player.speed;
    updatePlayer();
}

// limit the player movement  and update the position of the player
function updatePlayer() {
    // limit the player movement to the game box
    if (G.player.x < 0) {
        G.player.x = 0;
    }
    if (G.player.x > 750) {
        G.player.x = 750;
    }
    // update the position of the player
    G.player.element.style.left = G.player.x + "px";
}


export function spawenBullet() {
    const gamebox = G.playGround.element  
    if (G.bullet) return
    const bullet = document.createElement('div')
    bullet.id = 'bullet'
    gamebox.append(bullet)
    let shipX = G.player.x + 22
    let shipY = G.player.y
    G.bullet = ({ element: bullet, x: shipX, y: shipY, speed: 10 })
    bullet.style.position = 'absolute'
    bullet.style.left = `${shipX}px`
    bullet.style.top = `${shipY}px`

}



export function updateBullets() {
        if (!G.bullet) return 

        G.bullet.y -= G.bullet.speed;
        // update the position of the bullet
        G.bullet.element.style.top = G.bullet.y + "px";

        if (G.bullet.y < 0) {
            // remove the bullet from the array
            G.bullet = null
        }
}



// save the state of the inputs of the player

document.addEventListener("keydown", (event) => {
    if (event.key === ' ' && !G.bullet) {
        keysstate.bullet = true
    }
    if (event.key === "ArrowLeft") {
        keysstate.left = true
        keysstate.right = false
    }

    if (event.key === "ArrowRight") {
        keysstate.right = true
        keysstate.left = false
    }
});


document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        keysstate.left = false
    }
    if (event.key === "ArrowRight") {
        keysstate.right = false
    }

})







