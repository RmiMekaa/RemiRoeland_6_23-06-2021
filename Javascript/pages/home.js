/* CONSTRUIT LA PAGE */

import { Profile } from "../components/profile.js";

export class Home{

  /**
   * @type {Array.<String>} la liste des tags à afficher
   */
  tags = [];

  /**
   * [constructor description]
   *
   * @param   {Array.<photographerFromJson>}  data  les éléments à insérer dans la page
   *
   * @constructor
   */
  constructor(data) {
    this.data = data;
  }

  /**
  * génère le html de la page
  *
  * @return  {String}  le HTML de la page
  */
  html() {
    document.querySelector("main").classList.add("photographers");
    let html = "";
    let profile;
    for (let i = 0; i < this.data.length; i++) {
      console.log(i);
      profile = new Profile(this.data[i]);
      html += profile.html();
    }
    return html;
  }

  filterBytag(tag){
    const index = this.tags.indexOf(tag); 
    if ( index > 0) this.tags.splice(index, 1); //remove tag from list 
    console.log(this.tags);
  }
}