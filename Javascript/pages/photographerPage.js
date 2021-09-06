/* PAGE DES PHOTOGRAPHES */

import { Header } from "../components/header.js";
import { Profile } from "../components/profile.js";
import { Gallery } from "../components/gallery.js";
import { LikesCounter } from "../components/likesCounter.js";

export class PhotographerPage {

  constructor(data, dataManager, pageManager) {
    this.pageManager = pageManager;
    this.dataManager = dataManager;
    this.photographer = data.photographer;
    this.medias = data.media;
    this.activeTags = [];

    this.render();
  }

  render() {
    this.header = new Header("photographerPage");
    let main = document.createElement('main');
    document.body.appendChild(main);
    this.profile = new Profile(this.photographer, "photographerPage", main);
    this.gallery = new Gallery(this.medias, main);
    this.likesCounter = new LikesCounter(this.photographer, this.medias, main);
  }

  /*----- Tags -----*/

  /**
   * Actions au clic sur un tag
   * @param   {HTMLElement}  element  La cible du clic
   * @return  {void}
   */
  tagsOnClick(element) {
    let filter = element.textContent.substring(1);
    this.addFilter(filter);
    this.setStyle(element);
    const newArr = this.dataManager.filteredItems(this.medias, this.activeTags)
    this.gallery.displayMedias(newArr);
  }

  /**
   * Ajoute une chaîne de caractères au tableau des filtres
   * @param   {String}  filter  la chaine de caractère à ajouter
   * @return  {void}  
   */
  addFilter(filter) {
    const index = this.activeTags.indexOf(filter)
    if (index === -1) {
      this.activeTags.push(filter);
    }
    else {
      this.activeTags.splice(index, 1);
    }
  }

  /**
   * Ajoute la classe CSS à l'élément
   * @param   {HTMLElement}  element  le tag
   * @return  {void} 
   */
  setStyle(element) {
  if (element.classList.contains('active')) element.classList.remove('active');
  else element.classList.add('active')
  }

}


