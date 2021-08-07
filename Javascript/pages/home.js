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
    this.tagsFilters = [];
  }

  /**
  * génère le html de la page d'accueil
  * @return  {String}  HTML String
  */
  html() {
    return this.createHeader() + this.createProfiles() + this.createElevator();
  }

  /**
   * Création du header
   * @return  {String}  HTML String
   */
  createHeader() {
    return `<header class="header" id="header">
              <a href="index.html"><img class="header__logo" src="ressources/logo.png" alt="FishEye Home page"></a>
              <nav class="header__nav">
                  <ul>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#portrait</li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#art</li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#fashion</li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#architecture</li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#travel</li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#sport</li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#animals</li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#events</li>
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
    const list = this.filteredPhotographers()
    for (let i = 0; i < list.length; i++) {
      profile = new Photographer(this.data[i]);
      html += profile.htmlForHomePage();
    }
    return html + '</main>';
  }

  /**
   * Création du bouton "Passer au contenu"
   * @return  {String}  HTML String
   */
  createElevator() {
    return `<a href="#header" id="elevator" tabindex="0">Passer au contenu</a>
    `;
  }

  /**
   * Ajoute un eventListenner pour faire apparaître l'ascenseur au scroll
   * @return  {void}
   */
  elevatorEventListener() {
    let elevator = document.getElementById('elevator');
    window.addEventListener("scroll", function(){
      if(window.scrollY > 0) elevator.style.display = "block";
      else elevator.style.display = "none";
    })
  }

  /**
   * Filtre les photographes par tags
   *
   * @param   {HTMLElement}  element  L'élément contenant le tag
   *
   * @return  {array}   Un nouveau tableau filtré
   */
  filterByTag(element) {
    element.classList.add('active');
    event.preventDefault;
    let tag = element.textContent.substring(1);
    console.log(tag);
    const index = this.tagsFilters.indexOf(tag)
    if ( index === -1) this.tagsFilters.push(tag);
    else this.tagsFilters.splice(index, 1);
    window.pageManager.forceUpdate();
  }

  filteredPhotographers(){
    if (this.tagsFilters.length===0) return this.data;
    let newArrFinal = [];
    this.tagsFilters.forEach(tag =>{
      const newArr = this.data.filter(function (photographer) {
        return photographer.tags.includes(tag);
      })
      newArrFinal = newArrFinal.concat(newArr);
    });
    console.log("newArrFinal", newArrFinal);
    return newArrFinal;
  }
}