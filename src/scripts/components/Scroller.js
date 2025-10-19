import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';

export default class Scroller{
    constructor(element){
        gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
        this.element = element;

        this.init();
    }

    init(){
        const scroller = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            ease: 'expo.out',
        });
    }
}