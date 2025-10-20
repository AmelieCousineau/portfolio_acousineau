export default class Header {
    constructor(element) {
    this.element = element;
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.isActive = this.element.classList.contains('nav-is-active');
    this.nav = this.element.querySelector('.nav__main');

    this.init();
  }

  init() {
    console.log('Initialisation de ma composante Header');

    this.element.querySelector('.js-toggle').addEventListener('click', this.toggleMenu.bind(this));

    const menuElements = document.querySelectorAll('.js-menu');
    for(let i=0; i<menuElements.length; i++){
      let menuElement = menuElements[i];
      menuElement.addEventListener('click', this.removeMenu.bind(this));
    }
  }

  toggleMenu(){
    this.isActive = this.element.classList.contains('nav-is-active');

    if(!this.isActive){
      this.element.classList.add('nav-is-active');
      this.nav.style.transform = 'translateY(0)';
    }

    else{
      this.nav.style.transform = 'translateY(-100%)';

      this.nav.addEventListener('transitionend', this.onTransitionEnd);
    }
  }

  removeMenu(){
    if(this.element.classList.contains('nav-is-active')){
      this.toggleMenu();
    }
  }
  
  onTransitionEnd(){
    this.element.classList.remove('nav-is-active');
    this.nav.removeEventListener('transitionend', this.onTransitionEnd);
  }
}