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
    console.log(this.data);
  }

  /**
  * génère le html de la page
  *
  * @return  {String}  le HTML de la page
  */
  html() {
    let html = '<main class="photographers">';
    let profile;
    for (let i = 0; i < this.data.length; i++) {
      console.log(i);
      profile = new Profile(this.data[i]);
      html += profile.html();
    }
    return this.createHeader() + html + '</main>';
  }

  createHeader() {
    return `<header class="header">
              <a href="index.html"><img class="header__logo" src="ressources/logo.png" alt="FishEye Home page"></a>
              <nav class="header__nav">
                  <ul>
                      <li class="tag" onclick="page.filterByTag(this)">#portrait</li>
                      <li class="tag" onclick="page.filterByTag(this)">#art</li>
                      <li class="tag" onclick="page.filterByTag(this)">#fashion</li>
                      <li class="tag" onclick="page.filterByTag(this)">#architecture</li>
                      <li class="tag" onclick="page.filterByTag(this)">#travel</li>
                      <li class="tag" onclick="page.filterByTag(this)">#sport</li>
                      <li class="tag" onclick="page.filterByTag(this)">#animals</li>
                      <li class="tag" onclick="page.filterByTag(this)">#events</li>
                  </ul>
              </nav>
              <h1 class="header__heading">Nos photographes</h1>
            </header>`;
  }

  //filterByTag(element){
  //  event.preventDefault;
  //  let tag = element.textContent.substring(1);
  //  console.log(tag);
  //
  //  //this.data.filter(function(object) {
  //  //  console.log(object.tags == tag);
  //  //})
  //}
  
  filterBytag(tag){
    //const index = this.tags.indexOf(tag); 
    //if ( index > 0) this.tags.splice(index, 1); 
    //console.log(this.tags);

    console.log(this.data);
  }
}


