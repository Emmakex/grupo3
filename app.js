// API Pokemon

// Función para pedir datos de un pokemon a la API
async function fetchPokemon() { 
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

// Función para llamar a la API e invocar a la función de crear pokemon
async function setPokemon() {
    let pokemon = await fetchPokemon() // Invoca a la función de llamada a la API
    addPokemon(pokemon) // añade el pokemon
}

setTimeout(setPokemon, 1000) // Al segundo de cargar la página crea el pokemon

// /API Pokemon

// API weather

// Función que pide los datos a la API
async function getWeatherData(lat, lon) {
    const apiKey = 'ce6c8eb34f770f7657e93083ab35e5a0'; // Key de la API para poder hacer la llamada
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`; //URL de la API con los datos de ubicación y la APIKey
    try {
      const response = await fetch(url); // Llamada a la API pasándole como párametro la url con la ubicación y la APIKey
      const jsonData = await response.json(); // Guarda en una variable los datos que devuelve la API
      const temperature = jsonData.main.temp; // Guarda los datos de temperatura
      const humidity = jsonData.main.humidity; // Guarda los datos de humedad
      const windSpeed = jsonData.wind.speed; // GUarda los datos de viento
      updateWeatherBar(temperature, humidity, windSpeed); // Invoca a la función de actualizar barra de clima pasándole como párametros la temperatura, la humedad y el viento que ha devueldo la API
    } catch (error) { // Mensaje de error en caso de no tener respuesta o datos
      console.error(error); 
      document.getElementById('weather-container').textContent = 'Error al cargar datos del clima';
    }
  }

  // Función para actualizar la barra de clima
  function updateWeatherBar(temperature, humidity, windSpeed) {
    var widthWindow = window.innerWidth; // Guarda el ancho de ventana para poder ejecutar un setInterval o el otro
    document.getElementById('temperature').querySelector('span').textContent = `${temperature}°C`; // Captura el span que hay dentro del div 'temperatura' y cambia el texto con los datos nuevos
    document.getElementById('humidity').querySelector('span').textContent = `${humidity}%`; // Captura el span que hay dentro del div 'humedad' y cambia el texto con los datos nuevos
    document.getElementById('wind').querySelector('span').textContent = `${windSpeed} m/s`; // Captura el span que hay dentro del div 'viento' y cambia el texto con los datos nuevos
    const weatherBar = document.getElementById('weather-bar'); // Captura el div de la barra de clima
    let position = 0; // Variable para fijar la posición a la que ha de moverse el div con el translateX
    if(widthWindow < 768){// Si el ancho de ventana es menor de 768
      setInterval(() => {
        position = (position + 1) % 3; // Cálculo para la nueva posición
        weatherBar.style.transform = `translateY(${-33.333 * position}%)`; // Añade el efecto de translación a la posición nueva
    }, 3000);
    }else{ // Si el ancho de ventana es superior a 768
      setInterval(() => {
          position = (position + 1) % 3; // Cálculo para la nueva posición
          weatherBar.style.transform = `translateX(${-33.333 * position}%)`; // Añade el efecto de translación a la posición nueva
      }, 3000);
    }
  }

  // Función para guardar la ubicacion
  function getLocation() {
    if (navigator.geolocation) { // Si hay localización en el navegador...
      navigator.geolocation.getCurrentPosition(async position => { // Función para capturar los datos de la localización
        const lat = position.coords.latitude; // Guarda los datos de latitud
        const lon = position.coords.longitude; // Guarda los datos de longitud
        getWeatherData(lat, lon); // Invoca a la función para llamar a la API con los datos nuevos
      }, () => {
        document.getElementById('weather-container').textContent = 'Error al obtener tu ubicación.'; // Captura el div del container clima y actualiza el texto en caso de error
      });
    } else { // O...
      document.getElementById('weather-container').textContent = 'Este navegador no admite la geolocalización.'; // Actualiza el texto en caso de que el navegador no permita la geolocalización
    }
  }

  document.getElementById('close-btn-weather').addEventListener('click', () => { // Función para añadile al botón del clima el evento de ocultar/mostrar la barra de clima
    document.getElementById('weather-bar').classList.toggle('invisible'); // Captura la barra de clima y le añade/elimina la clase invisible
    document.querySelector('.close-btn i').classList.toggle('fa-chevron-down'); // Captura la i del botón y le añade/elimina la clase fa-chevron-down
});

setTimeout((getLocation), 1000) // Para darle tiempo al código de que los elementos ya estén cargados en el document

//   /API weather

// Api Quiz 

let countries; // Crea la variable para guardar los países

// Función para llamar a la API
async function getCountries() {
  let results = await fetch("https://countries.trevorblades.com", { // LLama y guarda en una variable los resultados que vuelca la API
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
  countries = await results.json(); // Guarda los países en una variable
  startRound(); // Invoca a la función para crear la ronda de juego
}

let round = 1; // Contador con el número de rondas
let rounds = 5; // Contador de rondas máximas
let points = 0; // Contador de puntos
let randomCountry; // Variable para guardar el país de la pregunta

// Función para crear la ronda de juego
function startRound() {
  if (round > rounds) { // Si la ronda en juego es mayor que las rondas máximas...
    document.getElementById("easteregg").style.display = "none"; // ...Esconde el div de juego...
    document.getElementById("result").innerHTML = "Game Over! You scored " + points + " points."; // ...Muestra el div de resultado con los datos
    return;
  }

  document.getElementById("easteregg").style.display = "block"; // Captura el div del juego y le añade display block

  let randomNumber = Math.floor(Math.random() * countries.data.countries.length); // Crea un número aleatorio
  randomCountry = countries.data.countries[randomNumber]; // Guarda el país seleccionado de la array de countries
  document.getElementById("eastereggQuestion").innerHTML =
    "What is the capital of " + randomCountry.name + " " + randomCountry.emoji + "?"; // Captura el div de la pregunta y lo actualiza con el nombre del país

  let randomCountryFalse1, randomCountryFalse2; // Crea dos variables de ciudades aleatroias (que no sean la seleccionada antes)

  do {
    let randomNumberFalseAnswer1 = Math.floor(Math.random() * countries.data.countries.length); // Crea un número aleatorio
    randomCountryFalse1 = countries.data.countries[randomNumberFalseAnswer1]; // Guarda el país de la array en la variable de país falso 1...
  } while (!randomCountryFalse1.capital || randomCountryFalse1.capital === randomCountry.capital); //  ... Mientras la capital de ese país no sea igual que la del país seleccionado

  do {
    let randomNumberFalseAnswer2 = Math.floor(Math.random() * countries.data.countries.length); // Crea un número aleatorio 
    randomCountryFalse2 = countries.data.countries[randomNumberFalseAnswer2]; // Guarda el país de la array en la variable de país falso 2...
  } while (!randomCountryFalse2.capital || randomCountryFalse2.capital === randomCountry.capital || randomCountryFalse2.capital === randomCountryFalse1.capital); //  ... Mientras la capital de ese país no sea igual que la del país seleccionado ni la capital de país falso 1

  const array = [ // Crea un array para guardar las capitales
    randomCountry.capital,
    randomCountryFalse1.capital,
    randomCountryFalse2.capital,
  ];
  const shuffledArray = array.sort(() => 0.5 - Math.random()); // Toma la array de capitales y las ordena aleatoriamente

  document.getElementById("answer1").value = shuffledArray[0]; // Captura el div de la respuesta 1 y le adjudica al value la posición 0 del array desordenado
  document.getElementById("labelAnswer1").innerHTML = shuffledArray[0]; // Captura el label y le cambia el texto con el nombre de la capital

  document.getElementById("answer2").value = shuffledArray[1]; // Captura el div de la respuesta 2 y le adjudica al value la posición 1 del array desordenado
  document.getElementById("labelAnswer2").innerHTML = shuffledArray[1]; // Captura el label y le cambia el texto con el nombre de la capital

  document.getElementById("answer3").value = shuffledArray[2]; // Captura el div de la respuesta 3 y le adjudica al value la posición 2 del array desordenado
  document.getElementById("labelAnswer3").innerHTML = shuffledArray[2]; // Captura el label y le cambia el texto con el nombre de la capital
  document.getElementById("rounds").innerHTML = round + " / " + rounds; // Captura el div de rondas y actualiza con los datos
  document.getElementById("points").innerHTML = points; // Captura el div de puntos y actualiza con los datos nuevos
}

// Función para chequear la respuesta
function checkAnswer() {
  var ele = document.getElementsByName("quiz"); // Captura los elementos con name quiz
  let answerSelected = false; //Crea variable de respuesta seleccionada en false por defecto

  for (let i = 0; i < ele.length; i++) { // Recorre el array de documentos con name quiz
    if (ele[i].checked) { // Si ese elemento está checked
      answerSelected = true; // Cambia la variable de respuesta seleccionada a true
      if (ele[i].value === randomCountry.capital) { // Si el value de la respuesta coincide con la capital del país seleccionado...
        points++; // ...Suma 1 punto..
        document.getElementById("result").innerHTML = "Correct!"; // ... Y añade el texto Correct!
      } else { // Si la respuesta no coincide...
        document.getElementById("result").innerHTML = "Incorrect! The capital of " + randomCountry.name + " is " + randomCountry.capital; // Añade el texto de incorrecto y muestra la respuesta correcta
      }
      ele[i].checked = false; // Si ese elemento no está seleccionado pausa el for
      break;
    }
  }

  if (!answerSelected) { // Si no se ha seleccionado ninguna respuesta...
    document.getElementById("result").innerHTML = "Please select an answer."; // Se añade el texto
    return;
  }

  if (round < rounds) { // Si la ronda de juego es más baja que las rondas máximas...
    round++; // ...Añade uno a ronda de juego...
    document.getElementById("rounds").innerHTML = round + " / " + rounds; // ...Actualiza el div de rondas con el texto nuevo...
    document.getElementById("points").innerHTML = points; // ...Actualiza el div de puntos con el texto nuevo..
    startRound(); // ...Inicia otra ronda invocando la función
  } else { // Si el número de ronda es más alto que el número de rondas máximas...
    document.getElementById("easteregg").style.display = "none"; // ... Esconde el div de juego...
    document.getElementById("result").innerHTML = "Game Over! You scored " + points + " points."; // ... Muestra el div de resultado con el texto actualizado
    document.getElementById("points").innerHTML = points; // ...Actualiza el div de puntos con el texto nuevo...
    document.getElementById("rounds").innerHTML = rounds + " / " + rounds; // ...Actualiza el div de rondas con el texto nuevo
  }
}

setTimeout(getCountries, 1000) // Al segundo de cargar la página trae los paises