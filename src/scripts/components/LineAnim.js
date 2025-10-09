export default class LineAnim{
    constructor(element){
        this.element = element

        this.init();
    }

    init(){
        console.log('Initialisation de ma composante LineAnim');
        setInterval(this.reverseLine, 5000);
    }

    reverseLine(){
        document.querySelector('.js-line-up').classList.toggle('line-up-reverse');
        document.querySelector('.js-line-left').classList.toggle('line-vertical-reverse');
        document.querySelector('.js-line-down').classList.toggle('line-down-reverse');
    }
}