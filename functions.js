// Who we are

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {
      
      if (event.key === "1") {
        
        const whoweareSection = document.getElementById("whoweare");
        
        if (whoweareSection) {
          
          const whoweareTop = whoweareSection.getBoundingClientRect().top;
          
          window.scrollTo({
            top: whoweareTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
 
// Service

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {

      if (event.key === "2") {
        const serviceSection = document.getElementById("service");
        
        if (serviceSection) {
          const serviceTop = serviceSection.getBoundingClientRect().top;
          
          window.scrollTo({
            top: serviceTop,
            behavior: "smooth"
          });
        }
      }
    });
  });

// Portfolio

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {

      if (event.key === "3") {
        const portfolioSection = document.getElementById("portfolio");
        
        if (portfolioSection) {
          const portfolioTop = portfolioSection.getBoundingClientRect().top;
          
          window.scrollTo({
            top: portfolioTop,
            behavior: "smooth"
          });
        }
      }
    });
  });

// Contacto

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {

      if (event.key === "4") {
        const contactSection = document.getElementById("contact");
        
        if (contactSection) {
          const contactTop = contactSection.getBoundingClientRect().top;
          
          window.scrollTo({
            top: contactTop,
            behavior: "smooth"
          });
        }
      }
    });
  });

// Formulario contacto

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {

      if (event.key === "5") {
        const containerFormContactSection = document.getElementById("containerFormContact");
        
        if (containerFormContactSection) {
          const containerFormContactTop = containerFormContactSection.getBoundingClientRect().top;
          
          window.scrollTo({
            top: containerFormContactTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
  