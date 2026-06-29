import { stopLoop, startLoop, startGame } from "../main.js";
import {gamePlay as G } from "./state.js"
import {throttle , debounce} from "./Security.js"
import {creatStart ,creatUi ,creatGameOver ,creatYouWin } from "./genertorHTML.js"


let statuss = "start";

const game = document.querySelector("#game");

/* ---------- protected functions ---------- */

const safeStart = debounce(throttle(Start, 500), 100);
const safePause = debounce(throttle(pause, 200), 100);
const safeRestart = debounce(throttle(restart, 500), 100);
const safeExit = debounce(throttle(Exit, 500), 100);

/* ---------- init ---------- */
OpenOrCancelPause()
creatStart()

/* ---------- events ---------- */
function OpenOrCancelPause(){
    window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        safePause();
    }
    });
}

export function bindEvents() {
    document.querySelector("#start-btn")
    ?.addEventListener("click", safeStart);

    document.querySelector("#pause-btn")
        ?.addEventListener("click", safePause);

    document.querySelector("#continue-btn")
        ?.addEventListener("click", safePause);

    document.querySelector("#pause-restart-btn")
        ?.addEventListener("click", safeRestart);

    document.querySelector("#pause-exit-btn")
        ?.addEventListener("click", safeExit);

    document.querySelector("#over-restart-btn")
        ?.addEventListener("click", safeRestart);

    document.querySelector("#over-exit-btn")
        ?.addEventListener("click", safeExit);

    document.querySelector("#win-restart-btn")
        ?.addEventListener("click", safeRestart);

    document.querySelector("#win-exit-btn")
        ?.addEventListener("click", safeExit);
}
/* ---------- status ---------- */

const allowedMoves = {
    start: ["game"],
    game: ["pause", "gameOver", "win", "start"],
    pause: ["game", "start"],
    gameOver: ["start", "game"],
    win: ["start", "game"]
};

function setStatus(newStatus) {
    if (!allowedMoves[statuss].includes(newStatus)) {
        statuss = "start";
        switchs();
        return;
    }

    console.log(`Status changed: ${statuss} -> ${newStatus}`);
    statuss = newStatus;
    switchs();
}

function switchs() {
    switch (statuss) {
        case "start":
            creatStart();
            break;

        case "game":
            show(true, false);
            break;

        case "pause":
            show(true, true);
            break;

        case "gameOver":
            creatGameOver();
            break;

        case "win":
            creatYouWin();
            break;

        default:
            statuss = "start";
            creatStart();
    }
}

/* ---------- actions ---------- */

function Start() {
    creatUi();
    setStatus("game");
    startGame();
}

function pause() {
    if (statuss === "game") {
        setStatus("pause");
        stopLoop();
    } else if (statuss === "pause") {
        setStatus("game");
        startLoop();
    }
}

function restart() {
    stopLoop();
    creatUi();
    setStatus("game");
    startGame();
}

function Exit() {
    stopLoop();
    setStatus("start");
}

export function GameOver() {
    stopLoop();
    setStatus("gameOver");
}

export function YouWin() {
    stopLoop();
    setStatus("win");
}

/* ---------- ui helpers ---------- */

function show(ui, pauseMenu) {
    document.querySelector("#ui").className = ui ? "showFlex" : "hidden";
    document.querySelector("#pause-menu").className = pauseMenu ? "showFlex" : "hidden";
}

