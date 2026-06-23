import {gamePlay as G } from "./app/state.js"

creatListMobs()
function creatListMobs(){
    let container = document.querySelector("#start .list-score")
let c = document.createDocumentFragment()

for (let i = 0 ; i < G.mobs.length ; i++){
    let newDiv = document.createElement("div")
    newDiv.innerHTML = `
        <div class = "${G.mobs[i].name}1"></div>
        <h3>=<span>${G.mobs[i].points}</span></h3>`
    newDiv.classList.add("flexed")
    newDiv.classList.add(`a${i}`)
    c.append(newDiv)
}
container.append(c)
}


