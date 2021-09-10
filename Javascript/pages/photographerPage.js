/* PAGE DES PHOTOGRAPHES */

import { Header } from "../components/header.js";
import { Profile } from "../components/profile.js";
import { Gallery } from "../components/gallery.js";
import { LikesCounter } from "../components/likesCounter.js";
import { TagFeatures } from "../tagsFeatures.js";

export class PhotographerPage extends TagFeatures {

  /**
   * Créé la page du photographe
   *
   * @param   {Object}  data         Les données du photographe
   * @param   {Object}  dataManager  Une référence au dataManager
   * @param   {Object}  pageManager  Une référence au pageManager
   *
   * @constructor
   */
  constructor(data, dataManager, pageManager) {
    super('photographerPage');
    this.pageManager = pageManager;
    this.dataManager = dataManager;
    this.photographer = data.photographer;
    this.medias = data.media;

    this.render();
  }

  /**
   * Créé les différents éléments de la page
   */
  render() {
    this.header = new Header("photographerPage");
    let main = document.createElement('main');
    document.body.appendChild(main);
    this.profile = new Profile(this.photographer, "photographerPage", main);
    this.likesCounter = new LikesCounter(this.photographer, this.medias, main);
    this.gallery = new Gallery(this.medias, main, this.likesCounter);
  }

}


