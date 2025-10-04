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
  }

  toggleMenu(){
    this.element.classList.toggle('nav-is-active');
  }

  setOptions() {
    
  }
}