async function fetchPokemon() {
    let id = Math.ceil(Math.random()*1000)
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`

    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    return data
}

const FRONT = `[data-source="sprites.front_default"]`
const NAME = `[data-source="name"]`

function addPokemon(pokemon) {

        let simpleStats = {}
        
        for (const {stat,base_stat} of pokemon.stats){
            simpleStats[stat.name] = base_stat
        }

        let otherSimpleStats = [...pokemon.stats]
            .reduce(
                (acc, item) => acc.set(item.stat.name, item.base_stat),
                new Map()
            )

        console.log(otherSimpleStats)

    let template = document.querySelector("#pokemon-template")
    let clone = template.content.cloneNode(true)

    clone.querySelector(FRONT).src = pokemon.sprites.front_default
    clone.querySelector(NAME).innerText = pokemon.name
    clone
        .querySelector(`[data-source="stats.attack"]`)
        .value = simpleStats.attack
        //pokemon.stats.find(item => item.stat.name=="attack").base_stat
        console.log(simpleStats)

    let hp = pokemon.stats.find(item => item.stat.name == "hp").base_stat

    let hpProgress = clone.querySelector(`[data-source="stats.hp"]`)

    let hpProgressBar = hpProgress.firstElementChild

    hpProgressBar.innerText = hp
    hpProgressBar.style.width = `${hp}%`
    console.log(hp)

    hpProgress.setAttribute("aria-valuenow", hp)



    document.querySelector("#APItarget").appendChild(clone)
}

async function setPokemon() {
    let pokemon = await fetchPokemon()
    addPokemon(pokemon)
}

setTimeout(setPokemon, 1000)