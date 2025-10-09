import Carousel from "./components/Carousel.js";
import Header from "./components/Header.js";
import LineAnim from "./components/LineAnim.js";
import GreetingAnim from "./components/GreetingAnim.js";

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Carousel,
      Header,
      LineAnim,
      GreetingAnim,
    };
    this.init();
  }
  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
