/* PAGE D'ACCUEIL */

import { Header } from "../components/header.js";
import { Photographers } from "../components/photographers.js";
import { Elevator } from "../components/elevator.js";

export class HomePage {

  /**
   *
   * @param   {Array}  photographers  les éléments à insérer dans la page
   *
   * @constructor
   */
  constructor(photographers, dataManager) {
    this.photographers = photographers;
    this.dataManager = dataManager;
    
    this.render();
  }

  render() {
    new Header('homePage');
    let main = document.createElement('main');
    document.body.appendChild(main);
    this.profiles = new Photographers(this.photographers, main);
    new Elevator(document.body);
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
    const newArr = this.dataManager.filteredItems(this.photographers, this.dataManager.activeTags);
    this.profiles.displayPhotographers(newArr);
    this.setStyle();
  }

  /**
   * Ajoute une chaîne de caractères au tableau des filtres
   * @param   {String}  filter  la chaine de caractère à ajouter
   * @return  {void}  
   */
  addFilter(filter) {
    const index = this.dataManager.activeTags.indexOf(filter)
    if (index === -1) {
      this.dataManager.activeTags.push(filter);
    }
    else {
      this.dataManager.activeTags.splice(index, 1);
    }
  }

  /**
   * Applique le style CSS sur les tags actifs
   *
   * @return  {void}  [return description]
   */
  setStyle() {
    let tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      if (this.dataManager.activeTags.indexOf(tag.textContent.substring(1)) > -1) tag.classList.add('active');
      else tag.classList.remove('active');
    })
  }

}