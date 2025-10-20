export default class Splash{
    constructor(element){
        this.element = element;

        this.init();
    }

    init(){
        this.splash();
    }

    splash(){
        this.splash = this.element;
        this.body = document.body;
        const hasSeenSplash = localStorage.getItem("hasSeenSplash");
        this.pourcent = splash.querySelector(".pourcent");

        if(!hasSeenSplash){
            this.splash.classList.remove("hidden");
            this.body.style.overflow = "hidden";

            this.counter = 0;
            const duration = 700;
            const stepTime = duration / 100;
            this.interval = setInterval(this.animationPourcent.bind(this), stepTime);

            setTimeout(this.closeSplash.bind(this), 1500);
        }

        else{
            this.splash.style.display = "none";
            this.body.style.overflow = "";
        }
    }

    closeSplash(){
        this.body.style.overflow = "";
        this.splash.classList.add("hidden");
        this.splash.style.display = "none";

        localStorage.setItem("hasSeenSplash", "true");
    }

    animationPourcent(){
        this.pourcent.textContent = `${this.counter}%`;
        this.counter++;
        if (this.counter > 100) clearInterval(this.interval);
    }

}