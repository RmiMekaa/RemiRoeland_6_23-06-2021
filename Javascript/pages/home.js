/* PAGE D'ACCUEIL */

import { Photographer } from "../components/photographer.js";

export class Home {

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
  * génère le html de la page d'accueil
  * @return  {String}  HTML String
  */
  html() {
    return this.createHeader() + this.createProfiles();
  }

  /**
   * Création du header
   * @return  {String}  HTML String
   */
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

  /**
   * Création de la section des photographes
   * @return  {String}  HTML String
   */
  createProfiles() {
    let profile;
    let html = '<main class="photographers">';
    for (let i = 0; i < this.data.length; i++) {
      profile = new Photographer(this.data[i]);
      html += profile.htmlForHomePage();
    }
    return html + '</main>';
  }

  /**
   * Filtre les photographes par tags
   *
   * @param   {HTMLElement}  element  L'élément contenant le tag
   *
   * @return  {array}   Un nouveau tableau filtré
   */
  filterByTag(element){
    event.preventDefault;
    let tag = element.textContent.substring(1);
    console.log(tag);
    let newArr = this.data.filter(function(photographer) {
     return photographer.tags.includes(tag);
    })
    console.log(newArr);
  }
  
}


