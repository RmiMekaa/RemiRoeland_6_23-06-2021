/* SLIDER POUR LES MÉDIAS */

import { Media } from "../components/media.js";

export class ShowMedia {

  constructor(photographerId, medias, actualMedia) {
    this.photographerId = photographerId; // L'id du photographe
    this.medias = medias; // Un tableau contenant des objets (les médias)
    this.actualMedia = actualMedia;
    console.log(this.medias);
    console.log(actualMedia);
    this.currentItem = this.medias.findIndex(i => (i.image || i.video) === this.actualMedia);
  }

  /**
   * Génère le HTML du slider
   * @return  {String}  HTML String
   */
  html() {
    let html = '<div id="slider" class="slider">';
    html += this.createMedias() + this.createNavigation() + '<div>'

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
    return `<a href="?showmedia/${this.nextMedia}"><button class="slider__next"></button></a>
            <a href="?showmedia/${this.prevMedia}"><button class="slider__prev"></button></a>
            <a href="?photographer/${this.photographerId}"><button class="slider__close"; return false;"></button></a>
            `;
  }




  /*----- FONCTIONNALITÉS POUR LA NAVIGATION -----*/
  
  get nextMedia() {
    let nextMediaId= this.currentItem+1;
    if (nextMediaId >= this.medias.length) nextMediaId = 0;
    if (this.medias[nextMediaId].hasOwnProperty('image')) return this.photographerId+"/"+ this.medias[nextMediaId].image;
    else return this.photographerId+"/"+ this.medias[nextMediaId].video;
  }
  get prevMedia() {
    let prevMediaId= this.currentItem-1;
    if (prevMediaId <0) prevMediaId = this.medias.length -1;
    if (this.medias[prevMediaId].hasOwnProperty('image')) return this.photographerId+"/"+ this.medias[prevMediaId].image;
    else return this.photographerId+"/"+ this.medias[prevMediaId].video;
  }

  //prev() {
  //  const items = document.querySelectorAll("#medias .item");
  //  const nbSlide = items.length;
//
  //  items[this.currentItem].classList.remove('active');
//
  //  if (this.currentItem > 0) {
  //    this.currentItem--;
  //  } else {
  //    this.currentItem = nbSlide -1;
  //  }
//
  //  items[this.currentItem].classList.add('active');
  //  console.log(this.currentItem);
  //}

}

