import { Media } from "../components/media.js";
import { SortBy } from "./sortBy.js";

export class Gallery {

  /**
   * Créé un nouvel objet gallery
   * 
   * @param   {array}   medias        Les médias à afficher dans la galerie
   * @param   {Object}  domTarget     Le noeud où insérer la galerie
   * @param   {Object}  likesCounter  Une référence au compteur de likes
   * 
   * @constructor
   */
  constructor(medias, domTarget, likesCounter) {
    this.likesCounter = likesCounter
    this.domTarget = domTarget;
    this.medias = medias;

    this.DOM = document.createElement('section')
    this.DOM.className= 'gallery';
    this.domTarget.appendChild(this.DOM);

    new SortBy(this.medias, this.DOM, this);

    const mediasContainer = document.createElement('div');
    mediasContainer.className = 'medias';
    this.DOM.appendChild(mediasContainer);

    this.displayMedias(this.medias);
  }

  /**
   * Créé les médias et les insère dans leur conteneur
   *
   * @param   {Array}  medias  Le tableau de médias
   *
   * @return  {void}  
   */
  displayMedias(medias) {
    /**
     * @type   {HTMLElement} L'élément contenant les médias
     */
    const mediasContainer = this.DOM.querySelector('.medias');

    if(mediasContainer.childNodes.length > 0) {
      mediasContainer.innerHTML = "";
    }
    for (let i = 0; i < medias.length; i++) {
      new Media(medias[i], 'photographerPage', mediasContainer, this.likesCounter);
    }
  }


}