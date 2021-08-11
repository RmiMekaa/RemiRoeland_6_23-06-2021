/* SLIDER POUR LES MÉDIAS */

import { Media } from "../components/media.js";

export class Slider {

  constructor(photographerId, medias, actualMedia) {
    this.photographerId = photographerId; // L'id du photographe
    this.medias = medias; // Un tableau contenant des objets (les médias)
    this.actualMedia = actualMedia;
    this.currentItem = this.medias.findIndex(i => (i.image || i.video) === this.actualMedia);
    this.keyboardControls();
  }

  /**
   * Génère le HTML du slider
   * @return  {String}  HTML String
   */
  html() {
    let html = '<div id="slider" class="slider">';
    html += this.createMedias() + this.createNavigation() + '<div>';

    return html;
  }

  /**
   * Génère le HTML des médias
   * @return  {String}  HTML String
   */
  createMedias() {
    this.media = {};
    let html = '<div id="medias">';
    // for (let i = 0; i < this.medias.length; i++) {
      const media = new Media(this.medias[this.currentItem]);
      html += media.html();
    // }
    return html + '</div>';
  }
  /**
   * Génère le HTML des éléments de navigation
   * @return  {String}  HTML String
   */
  createNavigation() {
    return `<a id="slider__next" href="?showmedia/${this.nextMedia}"><button class="slider__next"></button></a>
            <a id="slider__prev" href="?showmedia/${this.prevMedia}"><button class="slider__prev"></button></a>
            <a id="slider__close" href="?photographer/${this.photographerId}"><button class="slider__close"; return false;"></button></a>
            `;
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
        console.log('escape');
        let close = document.getElementById('slider__close');
        close.click();
      }
    });
  }

}


