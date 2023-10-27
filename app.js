// Pokemon
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
        console.log(simpleStats)
    document.querySelector("#APItarget").appendChild(clone)
}

async function setPokemon() {
    let pokemon = await fetchPokemon()
    addPokemon(pokemon)
}

setTimeout(setPokemon, 1000)

// /Pokemon

// API clima

async function getWeatherData(lat, lon) {
    const apiKey = 'ce6c8eb34f770f7657e93083ab35e5a0';
    const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey};
  
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      const temperature = jsonData.main.temp;
      const humidity = jsonData.main.humidity;
      const windSpeed = jsonData.wind.speed;
      updateWeatherBar(temperature, humidity, windSpeed);
    } catch (error) {
      console.error(error);
      document.getElementById('weather-container').textContent = 'Error al cargar datos del clima';
    }
  }
  
  function updateWeatherBar(temperature, humidity, windSpeed) {
    document.getElementById('temperature').querySelector('span').textContent = ${temperature}°C;
    document.getElementById('humidity').querySelector('span').textContent = ${humidity}%;
    document.getElementById('wind').querySelector('span').textContent = ${windSpeed} m/s;
  
    const weatherBar = document.getElementById('weather-bar');
    let position = 0;
    setInterval(() => {
      position = (position + 1) % 3;
      weatherBar.style.transform = translateX(${-33.333 * position}%);
    }, 3000);
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherData(lat, lon);
      }, () => {
        document.getElementById('weather-container').textContent = 'Error al obtener tu ubicación.';
      });
    } else {
      document.getElementById('weather-container').textContent = 'Este navegador no admite la geolocalización.';
    }
  }
  getLocation();
  
  document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('weather-container').style.display = 'none';
  });

//   /API clima