import { Profile } from "./profile.js";

export class Photographers {

  /**
   * Créé un nouvelle instance pour la galerie de photographes de la page d'accueil
   * @param   {Array}  photographers  Les photographes
   * @param   {HTMLElement}  domTarget  Le noeud où insérer le profil
   */
  constructor(photographers, domTarget) {
    this.photographers = photographers;
    this.DOM = document.createElement('section');
    this.DOM.className = 'photographers';
    domTarget.appendChild(this.DOM);

    this.render(this.photographers);
  }

  render(array) {
    if (this.DOM.childNodes.length > 0) this.DOM.innerText = '';
    //const list = this.dataManager.filteredItems(this.data, this.activeTags);
    for (let i = 0; i < array.length; i++) {
      new Profile(array[i], 'homePage', this.DOM);
    }
  }

}