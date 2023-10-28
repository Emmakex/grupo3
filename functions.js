// Captura tecla pulsada y hace funciones según si la tecla es 1 - 6, a - b -h -  Escape

document.addEventListener("DOMContentLoaded", function() {
    let currentSectionIndex = 0;
    const sections = document.querySelectorAll("section"); // Captura las secciones
  
    document.addEventListener("keydown", function(event) { // Captura la tecla pulsada
      
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") { // Si está activo el input o el textarea sale de la función
        return;
      }
  
      if (event.key === "a") { // Si la tecla pulsada es a
        currentSectionIndex = Math.max(0, currentSectionIndex - 1); // Resta uno al índice al que hará scroll
      } else if (event.key === "b") { // Si la tecla pulsada es b
        currentSectionIndex = Math.min(sections.length - 1, currentSectionIndex + 1); // Añade uno al índice al que hará scroll
      } else if (event.key === "h") { // Si la tecla pulsada es h
        addModal(); // Abrirá el modal de ayuda
      }else if (event.key === "Escape") { // Si la letra pulsada es Escape
          closeModal(); // Cerrará el modal de ayuda
      } else {
        let targetSection = document.querySelector(`section[data-key="${event.key}"]`); // Captura la sección del número pulsado, si la hay 
        if (targetSection) {
            currentSectionIndex = Array.from(sections).indexOf(targetSection); // Si hay sección buscará el indexOf de esa sección
        }
      }
      const targetSection = sections[currentSectionIndex]; // Guarda la sección a la que ir
      updateURL(targetSection); // #
      let sectionTop = '0'; // El párametro de top al que hará scroll, predefinido en 0 para que suba arriba del todo
      if (targetSection) {
        if(targetSection.offsetTop != '300'){ // Si el offSetTop no es 300, porque 300 es el offSetTop del inicio y tiene que subir hasta arriba
          sectionTop = targetSection.offsetTop; // Guarda el offSetTop de esa sección para aplicarlo después
        }
  
        window.scrollTo({ // Hacer scroll en la ventana
          top: sectionTop, // Hasta la posición que le indicamos
          behavior: "smooth"
        });
      }
    });
  });
  
  function updateURL(section) { // #
    if (section.id) {
      history.pushState({}, '', `#${section.id}`);
    } else {
      history.pushState({}, '', window.location.pathname);
    }
  }

  // Función para crear elementos

  function element(tag, options, children) { // Le pasaremos la etiqueta de lo que queremos crear, después los atributos  y los hijos
    let {classNames: classNames, ...atributs} = options; 

    const el = document.createElement(tag); // Guardará qué elemento vamos a crear en una variable
    for (const child of children) { // Recorrerá los hijos que queremos añadir
        el.append(child); // Los añadirá al padre
    }
    for (const className of classNames || []) { // Recorrerá las clases que queramos
        el.classList.add(className); //Añadirá las clases
    }
    for (const atributName in atributs) { // Recorrerá el resto de atributos
      el.setAttribute(atributName, atributs[atributName]); // Y los añadirá
    }
    return el; // Devuelve el elemento creado
}

// Función para crear el modal de ayuda

function createModal()  {
  console.log('funciona')
  
  let titulos = [...document.querySelectorAll('section[data-key]')] // Captura las secciones que saldrán en el modal

  .map(section => { // Recorre las secciones para crear los li de la ul de secciones
    if(section.dataset.key != 0){ // Si la sección no es 0
      const key = section.dataset.key // Captura el data key
      const title = section.querySelector('h2').textContent // Captura el título
      return element('li', {classNames : ['list-group-item']}, [element('kbd', {}, [key]), ' ', title]) // Crea el elemento li usando la función de crear elementos hecha antes, añadiendo la clase y el hijo que será un elemento nuevo con el parámetro de la variable key para el número de sección y el título de la misma
    }
  })

  let modal = element('div', {classNames: ['modal', 'show']}, [ // Creamos el modal con la función de crear elementos
    element('div', {classNames: ['modal-dialog']}, [ // Diferentes div con clases
      element('div', {classNames: ['modal-content']}, [
        element('div', {classNames: ['modal-header']}, [
          element('h5', {classNames: ['modal-title']}, ['Help']), // El título del modal
          element('button', {classNames: ['btn-close'], type: 'button', onclick: 'closeModal()'}, []) // El botón para cerrar la ventana
        ]),
        element('div', {classNames: ['modal-body']}, [element('p', {classNames: ['ms-2', 'fs-6']}, ['Select 1-6 to jump to webpage sections.']), // El título del modal

          element('ul', {classNames : ['list-group']}, titulos) // Creamos la lista de secciones usando los titulos de antes
        ])
      ])
    ])
  ]);
  return modal; // devuelve el modal construido
}

// Funcion para añadir modal al segundo de cargar la página y quitarlo a los 5 segundos

function addModal(){
  let modalToAdd = createModal(); // Llama a la función para crear el modal
  document.body.appendChild(modalToAdd); // Lo añade al documento
}
setTimeout(addModal, 1000) // Para que se visualice en pantalla al segundo de cargar la página
setTimeout(closeModal, 5000) // Para que desaparezca a los 5 segundos

// Función para cerrar el modal

function closeModal(){
  let modalToClose = document.getElementsByClassName("modal"); // Captura el modal
  if(modalToClose.length > 0) { // Si la array es más larga de 0, o sea, contiene un modal
    modalToClose[0].remove(); // Quita el primer elemento de la array (el modal)
  }
}