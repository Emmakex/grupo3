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
      } else {
        let targetSection = document.querySelector(`section[data-key="${event.key}"]`);  
        if (targetSection) {
            currentSectionIndex = Array.from(sections).indexOf(targetSection);
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
  
  function element(tag, options, children) {
    let {classNames: classNames, ...atributs} = options;

    const el = document.createElement(tag);
    for (const child of children) {
        el.append(child);
    }
    for (const className of classNames || []) {
        el.classList.add(className);
    }
    for (const atributName in atributs) {
      el.setAttribute(atributName, atributs[atributName]);
    }
    return el;
}

function createModal()  {
  
  let titulos = [...document.querySelectorAll('section[data-key]')]

  .map(section => {
    const key = section.dataset.key
    const title = section.querySelector('h2').textContent
    return element('li', {classNames : ['list-group-item']}, [element('kbd', {}, [key]), ' ', title])
  })

  let modal = element('div', {classNames: ['modal', 'show']}, [
    element('div', {classNames: ['modal-dialog']}, [
      element('div', {classNames: ['modal-content']}, [
        element('div', {classNames: ['modal-header']}, [
          element('h5', {classNames: ['modal-title']}, ['Ayuda']), 
          element('button', {classNames: ['btn-close'], type: 'button'}, [])
        ]),
        element('div', {classNames: ['modal-body']}, [
          element('ul', {classNames : ['list-group']}, titulos)
        ])
      ])
    ])
  ]);
  return modal;
}

function addModal(){
  let modalToAdd = createModal();
  document.body.appendChild(modalToAdd);
}
setTimeout(addModal, 1000)
  