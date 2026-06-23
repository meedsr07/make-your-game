import {stopLoop , startLoop , startGame} from "../main.js"
//import gamePlay from "./state.js"
let statuss = "start"


// #start .list-score


const startBtn = document.querySelector("#start-btn");
const pauseBtn = document.querySelector("#pause-btn");
const continueBtn = document.querySelector("#continue-btn");
const restartBtn = document.querySelector("#restart-btn");
const exitBtn = document.querySelector("#exit-btn");

startBtn.addEventListener("click", throttle(Start, 500));
pauseBtn.addEventListener("click", throttle(pause, 200));
const pauseByKeyboard = throttle(pause, 200);

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        pauseByKeyboard();
    }
});
continueBtn.addEventListener("click", throttle(pause, 200));
restartBtn.addEventListener("click", throttle(restart, 500));
exitBtn.addEventListener("click", throttle(Exit, 500));

const allowedMoves = {
    start: ["game"],
    game: ["pause", "gameOver", "start"],
    pause: ["game", "start"],
    gameOver: ["start", "game"]
};

function setStatus(newStatus){
    if (!allowedMoves[statuss].includes(newStatus)) {
        console.warn(`Invalid move: ${statuss} -> ${newStatus}`);
        statuss = "start";
        switchs();
        return;
    }
    console.log(`Status changed: ${statuss} -> ${newStatus}`);
    statuss = newStatus;
    switchs();
}

function Start(){
    setStatus("game");
    startGame()
}

function pause(){
    if( statuss == "game"){
        setStatus("pause")
        stopLoop()
    }else if(statuss == "pause"){
        setStatus("game")
        startLoop()
    }else{
        setStatus("start")
    }
}
export function GameOver(){
    setStatus("gameOver")
}

function restart(){
    reset()
    setStatus("game");
}

function Exit(){
    stopLoop();
    setStatus("start");
}

function show(start, ui, pause, over){
    document.querySelector("#start").className = start ? "showFlex" : "hidden";
    document.querySelector("#ui").className = ui ? "showFlex" : "hidden";
    document.querySelector("#pause-menu").className = pause ? "showFlex" : "hidden";
    document.querySelector("#gameOver").className = over ? "showFlex" : "hidden";
}

function switchs(){
    switch (statuss) {
        case "start":
            show(true, false, false, false);
            break;

        case "game":
            show(false, true, false, false);
            break;

        case "pause":
            show(false, true, true, false);
            break;

        case "gameOver":
            show(false, false, false, true);
            break;
        default:
            statuss = "start";
            show(true, false, false, false);
    }
}

function throttle(fn, delay) {
    let lastTime = 0;
    return function () {
        const now = performance.now();

        if (now - lastTime >= delay) {
            lastTime = now;
            fn();
        }
    };
}