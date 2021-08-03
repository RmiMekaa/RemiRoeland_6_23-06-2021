/* SLIDER POUR LES MÉDIAS */

import { Media } from "../components/media.js";
import { PhotographerPage } from "./photographerPage.js";

export class ShowMedia {

  constructor(photographerId, medias, actualMedia) {
    this.photographerId = photographerId; // L'id du photographe
    this.medias = medias; // Un tableau contenant des objets (les médias)
    console.log(actualMedia);
    this.currentItem = actualMedia;    
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
    for (let i = 0; i < this.medias.length; i++) {
      this.media["media" + this.medias[i].id] = new Media(this.medias[i]);
      html += this.media["media" + this.medias[i].id].html();
    }
    return html += '</div>';
  }

  /**
   * Génère le HTML des éléments de navigation
   * @return  {String}  HTML String
   */
  createNavigation() {
    return `<button class="slider__next" onclick="page.next()"></button>
            <button class="slider__prev" onclick="page.prev()"></button>
            <button class="slider__close" onclick="window.history.go(-1); return false;"></button>
            `;
  }

  next() {
    const items = document.querySelectorAll("#medias .item");
    console.log(this.medias);
    const nbSlide = items.length;

    items[this.currentItem].classList.remove('active');

    if (this.currentItem < nbSlide - 1) {
      this.currentItem++;
    } else {
      this.currentItem = 0;
    }

    items[this.currentItem].classList.add('active');
    console.log(this.currentItem);
  }

  prev() {
    const items = document.querySelectorAll("#medias .item");
    console.log(items);
    const nbSlide = items.length;

    items[this.currentItem].classList.remove('active');

    if (this.currentItem > 0) {
      this.currentItem--;
    } else {
      this.currentItem = nbSlide -1;
    }

    items[this.currentItem].classList.add('active');
    console.log(this.currentItem);
  }

  //next() {
  //  this.currentItem++
  //  let i = this.currentItem;
  //  this.medias[i].active = true;
  //  delete this.medias[i-1].active;
  //}

}

