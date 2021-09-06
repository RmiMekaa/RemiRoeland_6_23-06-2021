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
    this.dataManager = dataManager;
    this.photographers = photographers;
    this.activeTags = [];
    
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
    this.setStyle(element);
    const newArr = this.dataManager.filteredItems(this.photographers, this.activeTags);
    this.profiles.render(newArr);
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