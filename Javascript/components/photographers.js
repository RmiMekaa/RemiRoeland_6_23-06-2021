import { Profile } from "./profile.js";

export class Photographers {

  /**
   * Créé un nouvel objet galerie de photographes pour la page d'accueil
   * 
   * @param   {Array}  photographers  Les photographes
   * @param   {HTMLElement}  domTarget  Le noeud où insérer le profil
   * 
   * @constructor
   */
  constructor(photographers, domTarget) {
    this.photographers = photographers;
    this.DOM = document.createElement('section');
    this.DOM.className = 'photographers';
    domTarget.appendChild(this.DOM);

    this.displayPhotographers(this.photographers);
  }

  /**
   * Créé les profils et les insère dans le DOM
   *
   * @param   {Array}  photographers  Un tableau de photographes
   */
  displayPhotographers(photographers) {
    if (this.DOM.childNodes.length > 0) this.DOM.innerText = '';
    for (let photographer of photographers) {
      new Profile(photographer, 'homePage', this.DOM);
    }
  }

}