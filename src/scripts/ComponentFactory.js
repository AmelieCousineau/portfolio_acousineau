import Carousel from "./components/Carousel.js";
import Header from "./components/Header.js";
import LineAnim from "./components/LineAnim.js";
import GreetingAnim from "./components/GreetingAnim.js";
import StarAnim from "./components/StarAnim.js";
import Zoom from "./components/Zoom.js";
import Scrolly from "./components/Scrolly.js";
import Splash from "./components/Splash.js";
import Form from "./components/form.js";
import Youtube from "./components/Youtube.js";

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Carousel,
      Header,
      LineAnim,
      GreetingAnim,
      StarAnim,
      Zoom,
      Scrolly,
      Splash,
      Form,
      Youtube,
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
