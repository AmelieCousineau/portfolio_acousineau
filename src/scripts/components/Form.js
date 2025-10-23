export default class Form{
    constructor(element){
        this.element = element;
        this.formElements = this.element.elements;

        this.init();
    }

    init(){
        console.log('Initialisation de la composante form')

        this.element.setAttribute('novalidate', "");

        for (let i = 0; i < this.formElements.length; i++) {
            const input = this.formElements[i];
            
            if(input.required){
                input.addEventListener('input', this.validateInput.bind(this));
            }
        }

        this.element.addEventListener('submit', this.submitForm.bind(this));
    }

    async submitForm(event){
        event.preventDefault(); // empêche le rechargement de la page

        if(this.validate()){
            console.log('success');
            
            try {
                console.log('Envoi vers Formspree…');
                const response = await fetch(this.element.action, {
                    method: this.element.method,
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: new FormData(this.element)
                });

                if (response.ok) {
                    alert('Merci ! Ton message a bien été envoyé');
                    this.element.reset();
                } else {
                    console.error('Erreur Formspree:', response.statusText);
                    alert('Oups ! Une erreur est survenue. Essaie plus tard.');
                }
            } catch (error) {
                console.error('Erreur réseau :', error);
                alert('Impossible de contacter le serveur. Vérifie ta connexion.');
            }
        }
        else{
            console.log('fail');
        }

    }

    validate(){
        let isValid = true;

        for (let i = 0; i < this.formElements.length; i++) {
            const input = this.formElements[i];

            if(input.required && !this.validateInput(input)){
                isValid = false;
            }
        }

        return isValid;
    }

     validateInput(event){
        const input = event.currentTarget || event;

        if(input.validity.valid){
            this.removeError(input);
        }
        else{
            this.addError(input);
        }

        return input.validity.valid;
    }

    addError(input){
        input.classList.add('error');
    }

    removeError(input){
        input.classList.remove('error');
    }
}