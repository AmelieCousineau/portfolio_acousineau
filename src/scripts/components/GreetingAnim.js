export default class GreetingAnim{
    constructor(element){
        this.element = element;
        this.words = ["Salut!", "Allo!", "Bonjour!", "Hey!"];
        this.currentWordIndex = 0;
        this.currentText = "";
        this.isDeleting = false;
        this.typeSpeed = 100; //vitesse en ms
        this.pauseBetweenWords = 3000 //temps entre chaque animation

        this.init();
    }

    init(){
        this.type();
    }

    type(){
        const word = this.words[this.currentWordIndex];
        const fullText = word;

        if(this.isDeleting){
            //Supprime une lettre
            this.currentText = fullText.substring(0, this.currentText.length - 1);
            document.querySelector('.js-type-line').classList.add('typeLine-is-active'); //ajoute la ligne de typage
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
            document.querySelector('.js-type-line').classList.remove('typeLine-is-active'); //retire la ligne de typage
        }
        else if(this.isDeleting && this.currentText === ""){
            this.isDeleting = false;

            this.currentWordIndex++;
            if(this.currentWordIndex >= this.words.length){
                this.currentWordIndex = 0;
            }

            speed = 500;
        }

        setTimeout(this.type.bind(this), speed);
    }
}
