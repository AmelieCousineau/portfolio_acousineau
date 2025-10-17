import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
      },
      navigation: {
        nextEl: this.element.querySelector('.custom-button-next'),
        prevEl: this.element.querySelector('.custom-button-prev'),
      },
    };

    this.init();
  }

  init() {
    console.log('Initialisation de ma composante Carousel');

    this.setOptions();

    new Swiper(this.element, this.options);
  }

  setOptions() {
    if ('split' in this.element.dataset) {
      this.options.breakpoints = {
        0: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        510: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 60,
        },
        1024: {
          slidesPerView: this.element.dataset.slides,
          spaceBetween: this.element.dataset.space,
        },
      };
    }

    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }

    if ('loop' in this.element.dataset) {
      this.options.loop = true;
    }

    if ('slides' in this.element.dataset) {
      this.options.slidesPerView =
        this.element.dataset.slides || this.options.slidesPerView;
    }

    if('space' in this.element.dataset){
      this.options.spaceBetween = this.element.dataset.space;
    }
  }
}
