import { stopLoop, startLoop, startGame } from "../main.js"

let statuss = "start"

document.querySelector("#game").innerHTML = `
    <div id="background">
        <div class="stars stars1"></div>
        <div class="stars stars2"></div>
        <div class="stars stars3"></div>
    </div>

    <div id="start" class="showFlex">
        <h1>space invaders</h1>
        <div class="list-score"></div>
        <button id="start-btn">start game</button>
    </div>

    <div id="ui" class="hidden">
        <div class="table-res">
            <h2 class="t">500</h2>
            <button id="pause-btn"><i class="fa-solid fa-pause"></i></button>
            <h2 id="time" class="t">03:56</h2>
        </div>
        <div id="livesContainer"></div>
        <div id="container"></div>
    </div>

    <div id="pause-menu" class="hidden">
        <div class="menu-game">
            <div class="controls-menu">
                <button id="continue-btn">Continue</button>
                <button id="pause-restart-btn">Restart</button>
                <button id="pause-exit-btn">Exit</button>
            </div>
        </div>
    </div>

    <div id="gameOver" class="hidden">
        <div class="box">
            <h1>Game over</h1>
            <div class="button-gameover">
                <button id="over-restart-btn" class="b1">Restart</button>
                <button id="over-exit-btn" class="b2">Exit</button>
            </div>
        </div>
    </div>

    <div id="youWin" class="hidden">
        <div class="box">
            <h1>You Win</h1>
            <div class="button-win">
                <button id="win-restart-btn" class="b1">Restart</button>
                <button id="win-exit-btn" class="b2">Exit</button>
            </div>
        </div>
    </div>
`

const startBtn = document.querySelector("#start-btn")
const pauseBtn = document.querySelector("#pause-btn")
const continueBtn = document.querySelector("#continue-btn")

const pauseRestartBtn = document.querySelector("#pause-restart-btn")
const pauseExitBtn = document.querySelector("#pause-exit-btn")

const overRestartBtn = document.querySelector("#over-restart-btn")
const overExitBtn = document.querySelector("#over-exit-btn")

const winRestartBtn = document.querySelector("#win-restart-btn")
const winExitBtn = document.querySelector("#win-exit-btn")

startBtn.addEventListener("click", throttle(Start, 500))
pauseBtn.addEventListener("click", throttle(pause, 200))

const pauseByKeyboard = throttle(pause, 100)

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        pauseByKeyboard()
    }
})

continueBtn.addEventListener("click", throttle(pause, 200))

pauseRestartBtn.addEventListener("click", throttle(restart, 500))
pauseExitBtn.addEventListener("click", throttle(Exit, 500))

overRestartBtn.addEventListener("click", throttle(restart, 500))
overExitBtn.addEventListener("click", throttle(Exit, 500))

winRestartBtn.addEventListener("click", throttle(restart, 500))
winExitBtn.addEventListener("click", throttle(Exit, 500))

const allowedMoves = {
    start: ["game"],
    game: ["pause", "gameOver", "win", "start"],
    pause: ["game", "start"],
    gameOver: ["start", "game"],
    win: ["start", "game"]
}

function setStatus(newStatus) {
    if (!allowedMoves[statuss].includes(newStatus)) {
        console.warn(`Invalid move: ${statuss} -> ${newStatus}`)
        statuss = "start"
        switchs()
        return
    }

    console.log(`Status changed: ${statuss} -> ${newStatus}`)
    statuss = newStatus
    switchs()
}

function Start() {
    setStatus("game")
    startGame()
}

function pause() {
    if (statuss === "game") {
        setStatus("pause")
        stopLoop()
    } else if (statuss === "pause") {
        setStatus("game")
        startLoop()
    }
}

export function GameOver() {
    stopLoop()
    setStatus("gameOver")
}

export function YouWin() {
    stopLoop()
    setStatus("win")
}

function restart() {
    setStatus("game")
    startGame()
}

function Exit() {
    stopLoop()
    setStatus("start")
}

function show(start, ui, pause, over, win) {
    document.querySelector("#start").className = start ? "showFlex" : "hidden"
    document.querySelector("#ui").className = ui ? "showFlex" : "hidden"
    document.querySelector("#pause-menu").className = pause ? "showFlex" : "hidden"
    document.querySelector("#gameOver").className = over ? "showFlex" : "hidden"
    document.querySelector("#youWin").className = win ? "showFlex" : "hidden"
}

function switchs() {
    switch (statuss) {
        case "start":
            show(true, false, false, false, false)
            break

        case "game":
            show(false, true, false, false, false)
            break

        case "pause":
            show(false, true, true, false, false)
            break

        case "gameOver":
            show(false, true, false, true, false)
            break

        case "win":
            show(false, true, false, false, true)
            break

        default:
            statuss = "start"
            show(true, false, false, false, false)
    }
}

function throttle(fn, delay) {
    let lastTime = 0

    return function () {
        const now = performance.now()

        if (now - lastTime >= delay) {
            lastTime = now
            fn()
        }
    }
}