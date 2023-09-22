// Teclas 1 - 5 y a - b

document.addEventListener("DOMContentLoaded", function() {
    let currentSectionIndex = 0;
    const sections = document.querySelectorAll("section");
  
    document.addEventListener("keydown", function(event) {
      
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        return;
      }
  
      if (event.key === "a") {
        currentSectionIndex = Math.max(0, currentSectionIndex - 1);
      } else if (event.key === "b") {
        currentSectionIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
      } else if (event.key >= "1" && event.key <= "5") {
        const sectionId = event.key === "1" ? "whoweare" :
                          event.key === "2" ? "service" :
                          event.key === "3" ? "portfolio" :
                          event.key === "4" ? "contact" :
                          event.key === "5" ? "containerFormContact" : null;
  
        if (sectionId) {
          const targetSection = document.getElementById(sectionId);
  
          if (targetSection) {
            currentSectionIndex = Array.from(sections).indexOf(targetSection);
          }
        }
      }
  
      const targetSection = sections[currentSectionIndex];
  
      if (targetSection) {
        const sectionTop = targetSection.offsetTop;
  
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth"
        });
      }
    });
  });
  
  