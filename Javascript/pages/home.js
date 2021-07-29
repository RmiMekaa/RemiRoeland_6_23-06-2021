/* CONSTRUIT LA PAGE D'ACCUEIL */

import { Profile } from "../components/profile.js";

export class Home{

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

  /**
   * Création du header
   *
   * @return  {String}  HTML
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
   * Filtre les photographes par tags
   *
   * @param   {HTMLElement}  element  L'élément contenant le tag
   *
   * @return  {Array}   Un nouveau tableau avec les objets contenant le tag de l'élément
   */
  filterByTag(element){
    event.preventDefault;
    let tag = element.textContent.substring(1);
    console.log(tag, this.data);
    let newArr = this.data.filter(function(photographer) {
     return photographer.tags.includes(tag);
    })
    console.log(newArr);
  }
  
}


