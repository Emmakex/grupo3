// Pokemon

// Función para llamar a un pokemon
async function fetchPokemon() { // Llamada a la API 
    let id = Math.ceil(Math.random()*1000) // Creación de número aleatorio para llamar a un pokemon
    let url = `https://pokeapi.co/api/v2/pokemon/${id}` // Llamada al pokemon con id aleatorio

    let response = await fetch(url) // Url del Pokemon
    let data = await response.json() // datos del pokemon
    return data // Devuelve los datos del Pokemon
}

const FRONT = `[data-source="sprites.front_default"]` // Variable para guardar el string a buscar más adelante
const NAME = `[data-source="name"]` // Variable para guardar el string a buscar más adelante


// Función para crear la tarjeta del pokemon
function addPokemon(pokemon) { 

        let simpleStats = {} // Creación de variable de objetos vacía

        for (const {stat,base_stat} of pokemon.stats){ // Recorre los stats del pokemon y guarda stat y base_stat
          simpleStats[stat.name] = base_stat // Añade la key de stat.name con el valor de base_stat
        }

        let otherSimpleStats = [...pokemon.stats]
            .reduce( // Pasa la key del objeto (stat.name) a un atributo llamado key, y el valor de la key (base_stat) a un atributo value
                (acc, item) => acc.set(item.stat.name, item.base_stat),
                new Map()
            )

    let template = document.querySelector("#pokemon-template") // Captura el template
    let clone = template.content.cloneNode(true) 

    clone.querySelector(FRONT).src = pokemon.sprites.front_default // Clona el div del template y le añade la url del pokemon
    clone.querySelector(NAME).innerText = pokemon.name // Cambia el texto del template por el nombre del pokemon
    document.querySelector("#APItarget").appendChild(clone) // añade el clone al template
}

// Función para llamar a la API y invocar a la función de crear pokemon
async function setPokemon() {
    let pokemon = await fetchPokemon() // Llama a la API
    addPokemon(pokemon) // añade el pokemon
}

setTimeout(setPokemon, 1000) // Al segundo de cargar la página crea el pokemon

// /Pokemon

// API weather

async function getWeatherData(lat, lon) {
    const apiKey = 'ce6c8eb34f770f7657e93083ab35e5a0';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
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
    document.getElementById('temperature').querySelector('span').textContent = `${temperature}°C`;
    document.getElementById('humidity').querySelector('span').textContent = `${humidity}%`;
    document.getElementById('wind').querySelector('span').textContent = `${windSpeed} m/s`;
    const weatherBar = document.getElementById('weather-bar');
    let position = 0;
    setInterval(() => {
        position = (position + 1) % 3;
        weatherBar.style.transform = `translateX(${-33.333 * position}%)`;
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

  document.getElementById('close-btn-weather').addEventListener('click', () => {
    document.getElementById('weather-bar').classList.toggle('invisible');
    console.log(document.getElementById('weather-bar'))
  });
  

//   /API weather

// API Trivia

async function getRandomQuestion() {
    try {
        const response = await fetch('https://jservice.io/api/random');
        const data = await response.json();
        const question = data[0].question;
        const answer = data[0].answer;
        document.getElementById('question').innerText = 'Question: ' + question;
        document.getElementById('answer').innerText = 'Answer: ' + answer;
    } catch (error) {
        console.error('Error con la pregunta aleatoria:', error);
        document.getElementById('question').innerText = 'No carga la pregunta';
    }
}

// Api Quiz //
let countries;

async function getCountries() {
  console.log("Getting countries...");
  let results = await fetch("https://countries.trevorblades.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query getCountries {
          countries{
           name
          emoji
          capital
          currency
          code
          }
        }`,
    }),
  });
  countries = await results.json();
  console.log(countries.data);
  startRound();
}

let round = 1;
let rounds = 5;
let points = 0;
let randomCountry;

function startRound() {
  if (round > rounds) {
    document.getElementById("easteregg").style.display = "none";
    document.getElementById("result").innerHTML = "Game Over! You scored " + points + " points.";
    return;
  }

  document.getElementById("easteregg").style.display = "block";

  let randomNumber = Math.floor(Math.random() * countries.data.countries.length);
  randomCountry = countries.data.countries[randomNumber];

  console.log(randomCountry.name);

  document.getElementById("eastereggQuestion").innerHTML =
    "What is the capital of " + randomCountry.name + " " + randomCountry.emoji + "?";

  let randomCountryFalse1, randomCountryFalse2;

  do {
    let randomNumberFalseAnswer1 = Math.floor(Math.random() * countries.data.countries.length);
    randomCountryFalse1 = countries.data.countries[randomNumberFalseAnswer1];
  } while (!randomCountryFalse1.capital || randomCountryFalse1.capital === randomCountry.capital);

  do {
    let randomNumberFalseAnswer2 = Math.floor(Math.random() * countries.data.countries.length);
    randomCountryFalse2 = countries.data.countries[randomNumberFalseAnswer2];
  } while (!randomCountryFalse2.capital || randomCountryFalse2.capital === randomCountry.capital || randomCountryFalse2.capital === randomCountryFalse1.capital);

  const array = [
    randomCountry.capital,
    randomCountryFalse1.capital,
    randomCountryFalse2.capital,
  ];
  const shuffledArray = array.sort(() => 0.5 - Math.random());

  document.getElementById("answer1").value = shuffledArray[0];
  document.getElementById("labelAnswer1").innerHTML = shuffledArray[0];

  document.getElementById("answer2").value = shuffledArray[1];
  document.getElementById("labelAnswer2").innerHTML = shuffledArray[1];

  document.getElementById("answer3").value = shuffledArray[2];
  document.getElementById("labelAnswer3").innerHTML = shuffledArray[2];
  document.getElementById("rounds").innerHTML = round + " / " + rounds;
  document.getElementById("points").innerHTML = points;
}

function checkAnswer() {
  var ele = document.getElementsByName("quiz");
  let answerSelected = false;

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      answerSelected = true;
      if (ele[i].value === randomCountry.capital) {
        points++;
        document.getElementById("result").innerHTML = "Correct!";
      } else {
        document.getElementById("result").innerHTML = "Incorrect! The capital of " + randomCountry.name + " is " + randomCountry.capital;
      }
      ele[i].checked = false;
      break;
    }
  }

  if (!answerSelected) {
    document.getElementById("result").innerHTML = "Please select an answer.";
    return;
  }

  if (round < rounds) {
    round++;
    document.getElementById("rounds").innerHTML = round + " / " + rounds;
    document.getElementById("points").innerHTML = points;
    startRound();
  } else {
    document.getElementById("easteregg").style.display = "none";
    document.getElementById("result").innerHTML = "Game Over! You scored " + points + " points.";
    document.getElementById("points").innerHTML = points;
    document.getElementById("rounds").innerHTML = rounds + " / " + rounds;
  }
}

setTimeout(getCountries, 1000) // Al segundo de cargar la página trae los paises