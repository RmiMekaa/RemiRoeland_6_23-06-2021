/* PAGE D'ACCUEIL */

import { Header } from "../components/header.js";
import { Photographers } from "../components/photographers.js";
import { Elevator } from "../components/elevator.js";
import { TagFeatures } from "../tagsFeatures.js"; 

export class HomePage extends TagFeatures {

  /**
   *
   * @param   {Array}  photographers  les éléments à insérer dans la page
   *
   * @constructor
   */
  constructor(photographers, dataManager) {
    super('homePage');
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

}