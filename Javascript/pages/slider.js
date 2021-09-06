/* SLIDER POUR LES MÉDIAS */

import { Media } from "../components/media.js";

export class Slider {

  constructor(photographerId, medias, actualMedia) {
    this.photographerId = photographerId; // L'id du photographe
    this.medias = medias; // Un tableau contenant les médias
    this.actualMedia = actualMedia;
    this.currentItem = this.medias.findIndex(i => (i.image || i.video) === this.actualMedia);
    
    this.DOM = document.createElement('section');
    this.DOM.className = 'slider';
    this.DOM.setAttribute('id', 'slider');
    document.body.appendChild(this.DOM);

    this.createMedias();
    this.createNavigation();
    this.keyboardControls();
  }

  /**
   * Génère le HTML des médias
   * @return  {String}  HTML String
   */
  createMedias() {
    const mediasContainer = document.createElement('div');
    mediasContainer.setAttribute('id', 'medias');
    this.DOM.appendChild(mediasContainer);
    new Media(this.medias[this.currentItem], 'slider', mediasContainer);
  }
  /**
   * Génère le HTML des éléments de navigation
   * @return  {String}  HTML String
   */
  createNavigation() {
    const nav = document.createElement('nav');
    nav.innerHTML =  `<a aria-label="média suivant" id="slider__next" class="slider-nav slider-nav__next" href="?showmedia/${this.nextMedia}"></a>
            <a aria-label="média précédent" id="slider__prev" class="slider-nav slider-nav__prev" href="?showmedia/${this.prevMedia}"></a>
            <a aria-label="fermer" id="slider__close" class="slider-nav slider-nav__close" href="?photographer/${this.photographerId}"></a>
            `;
    this.DOM.appendChild(nav);

  }

  /*----- FONCTIONNALITÉS POUR LA NAVIGATION -----*/
  
  /**
   * @return  {string}  L'url du média suivant
   */
  get nextMedia() {
    let nextMediaId= this.currentItem+1;
    if (nextMediaId >= this.medias.length) nextMediaId = 0;
    if (this.medias[nextMediaId].hasOwnProperty('image')) return this.photographerId+"/"+ this.medias[nextMediaId].image;
    else return this.photographerId+"/"+ this.medias[nextMediaId].video;
  }
  /**
   * @return  {string}  L'url du média précédent
   */
  get prevMedia() {
    let prevMediaId= this.currentItem-1;
    if (prevMediaId <0) prevMediaId = this.medias.length -1;
    if (this.medias[prevMediaId].hasOwnProperty('image')) return this.photographerId+"/"+ this.medias[prevMediaId].image;
    else return this.photographerId+"/"+ this.medias[prevMediaId].video;
  }

  /*----- NAVIGATION AU CLAVIER -----*/

  /**
   * Permet de naviguer dans le slider grâce aux touches ← → esc
   *
   * @return  {void}  
   */
  keyboardControls() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 39) {
        let next = document.getElementById('slider__next');
        next.click();
      }
      if (e.keyCode === 37) {
        let prev = document.getElementById('slider__prev');
        prev.click();
      }
      if (e.keyCode === 27) {
        let close = document.getElementById('slider__close');
        close.click();
      }
    });
  }

}


