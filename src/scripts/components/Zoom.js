import { gsap } from 'gsap';
import { Draggable } from "gsap/Draggable.js";
import { InertiaPlugin } from "gsap/InertiaPlugin.js";

export default class Zoom{
    constructor(element){
        this.element = element;

        gsap.registerPlugin(Draggable, InertiaPlugin);

        this.img = this.element.querySelector('img');
        this.currentScale = 1;
        this.dragInstance = null;

        this.init();
    }

    init(){
        console.log('Initialisation de ma composante Zoom');
        this.createModal();

        this.element.addEventListener('click', this.openModal.bind(this));

        this.closeBtn = this.modal.querySelector('.close-btn');
        this.zoomInBtn = this.modal.querySelector('.zoom-in');
        this.zoomOutBtn = this.modal.querySelector('.zoom-out');

        this.closeBtn.addEventListener('click', this.closeModal.bind(this));
        this.zoomInBtn.addEventListener('click', this.zoomIn.bind(this));
        this.zoomOutBtn.addEventListener('click', this.zoomOut.bind(this));
    }

    openModal(){
        this.modal.classList.add('active');

        if (this.dragInstance) this.dragInstance.kill();
        this.dragInstance = Draggable.create(this.clonedImg, {
            type: "x,y",
            bounds: this.imgContainer,
        })[0];
    }

    closeModal(){
        this.modal.classList.remove('active');

        // Supprime le draggable si existant
        if (this.dragInstance) {
            this.dragInstance.kill();
            this.dragInstance = null;
        }

        // Réinitialise le zoom et la position de l'image
        gsap.set(this.zoomWrapper, { scale: 1 });
        gsap.set(this.clonedImg, { x: 0, y: 0 });

        // Réinitialise la valeur courante de scale
        this.currentScale = 1;
    }

    zoomIn(){
        this.currentScale = Math.min(this.currentScale + 0.1, 4);
        gsap.to(this.zoomWrapper, { scale: this.currentScale, duration: 0.2 });
    }

    zoomOut(){
        this.currentScale = Math.max(this.currentScale - 0.1, 1);
        gsap.to(this.zoomWrapper, { scale: this.currentScale, duration: 0.2 });
    }

    createModal(){
        this.modal = document.createElement('div');
        this.modal.classList.add('modal-zoom');
        this.modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">✕</button>
            <div class="img-container"></div>
            <div class="controls">
            <button class="zoom-in">+</button>
            <button class="zoom-out">−</button>
            </div>
        </div>
        `;
        
        document.body.appendChild(this.modal);
        this.imgContainer = this.modal.querySelector('.img-container');

        this.zoomWrapper = document.createElement('div');
        this.zoomWrapper.classList.add('zoom-wrapper');
        this.imgContainer.appendChild(this.zoomWrapper);

        this.clonedImg = this.img.cloneNode(true);
        this.clonedImg.setAttribute('id', "clonedImg");
        this.zoomWrapper.appendChild(this.clonedImg);

        this.initTouchEvents();
    }

    initTouchEvents() {
        this.startDistance = 0;
        this.startScale = this.currentScale;

        this.zoomWrapper.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault(); // bloque le scroll du document
                const [touch1, touch2] = e.touches;
                this.startDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                this.startScale = this.currentScale;
            }
        }, { passive: false });

        this.zoomWrapper.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const [touch1, touch2] = e.touches;
                const currentDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                const newScale = this.startScale * (currentDistance / this.startDistance);
                this.currentScale = Math.max(1, Math.min(newScale, 4));
                gsap.set(this.zoomWrapper, { scale: this.currentScale });
            }
        }, { passive: false });
    }
}