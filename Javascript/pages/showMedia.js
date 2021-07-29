import { Media } from "../components/media.js";
import { PhotographerPage } from "./photographerPage.js";

export class ShowMedia {

  constructor(photographerId, medias, actualMedia) {
    this.photographerId = photographerId; // L'id du photographe
    this.medias = medias; // Un tableau contenant des objets (les médias)
    console.log(actualMedia);
    this.currentItem = actualMedia;    
  }

  html() {
    let html = this.createSlider();
    return html;
  }

  /**
   * Génère le HTML de la page
   *
   * @return  {String}  HTML
   */
  createSlider() {
    this.media = {};
    let html = '<div id="carousel" class="carousel"><div id="medias">';
    for (let i = 0; i < this.medias.length; i++) {
      this.media["media" + this.medias[i].id] = new Media(this.medias[i]);
      html += this.media["media" + this.medias[i].id].html();
    }
    console.log(this.media);

    return html += '</div>' + this.createNavigation() + '</div>';
  }

  /**
   * @return  {String}  Le HTML des éléments de navigation
   */
  createNavigation() {
    return `<button class="carousel__next" onclick="page.next()"></button>
            <button class="carousel__prev" onclick="page.prev()"></button>
            <button class="carousel__close" onclick="window.history.go(-1); return false;"></button>
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

}

