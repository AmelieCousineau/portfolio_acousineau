export default class Header {
    constructor(element) {
    this.element = element;
    this.options = {
      
    };

    this.init();
  }

  init() {
    console.log('Initialisation de ma composante Header');

    this.setOptions();

    document.querySelector('.js-toggle').addEventListener('click', this.toggleMenu.bind(this));

    const menuElements = document.querySelectorAll('.js-menu');
    for(let i=0; i<menuElements.length; i++){
      let menuElement = menuElements[i];
      menuElement.addEventListener('click', this.removeMenu.bind(this));
    }
  }

  toggleMenu(){
    this.element.classList.toggle('nav-is-active');
  }

  removeMenu(){
    this.element.classList.remove('nav-is-active');
  }

  setOptions() {
    
  }
}