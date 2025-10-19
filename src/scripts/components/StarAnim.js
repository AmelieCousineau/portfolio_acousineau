export default class StarAnim{
    constructor(element){
        this.element = element;
        this.options = {
            speed: 3,
            inverse: false,
        };

        this.init();
    }

    init(){
        this.setOptions();
        this.rotateElement();
    }

    rotateElement(){
        if(this.options.inverse == true){
            this.element.style.animation = `spin-inverse ${this.options.speed}s linear infinite`;
        }
        else {
            this.element.style.animation = `spin ${this.options.speed}s linear infinite`;
        }
    }

    setOptions(){
        if ('speed' in this.element.dataset){
            this.options.speed = this.element.dataset.speed;
        }

        if('inverse' in this.element.dataset){
            this.options.inverse = true;
        }
    }
}










