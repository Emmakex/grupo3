// Who we are

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {
      // Verificar si se presionó la tecla "1"
      if (event.key === "1") {
        // Encontrar la sección "whoweare" por su id
        const whoweareSection = document.getElementById("whoweare");
        
        if (whoweareSection) {
          // Obtener la posición superior de la sección "whoweare"
          const whoweareTop = whoweareSection.getBoundingClientRect().top;
          
          // Desplazar la página hasta la posición de la sección "whoweare"
          window.scrollTo({
            top: whoweareTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
  