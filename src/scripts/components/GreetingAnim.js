export default class GreetingAnim{
    constructor(element){
        this.element = element;
        this.words = ["Salut!", "Allo!", "Bonjour!", "Hey!"];
        this.currentWordIndex = 0;
        this.currentText = "";
        this.isDeleting = false;
        this.typeSpeed = 100; //vitesse en ms
        this.pauseBetweenWords = 3000 //temps entre chaque animation

        this.type();
        this.init();
    }

    init(){
        document.addEventListener("DOMContentLoaded", () => {
            const greeting = document.querySelector('.js-greeting');
            if(greeting) new GreetingAnim(greeting);
        });
    }

    type(){
        const word = this.words[this.currentWordIndex];
        const fullText = word;

        if(this.isDeleting){
            //Supprime une lettre
            this.currentText = fullText.substring(0, this.currentText.length - 1);
            document.querySelector('.js-type-line').classList.add('typeLine-is-active');
        }
        else{
            //Ajoute une lettre
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let speed = this.typeSpeed;

        if(!this.isDeleting && this.currentText === fullText){
            speed = this.pauseBetweenWords;
            this.isDeleting = true;
            document.querySelector('.js-type-line').classList.remove('typeLine-is-active');
        }
        else if(this.isDeleting && this.currentText === ""){
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}
