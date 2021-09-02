/* PAGE D'ACCUEIL */

import { Photographer } from "../components/photographer.js";

export class HomePage {

  /**
   * [constructor description]
   *
   * @param   {Array.<photographerFromJson>}  data  les éléments à insérer dans la page
   *
   * @constructor
   */
  constructor(data, dataManager) {
    this.dataManager = dataManager;
    this.data = data;
    this.activeTags = [];
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
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>portrait</span></li>
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>art</span></li>
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>fashion</span></li>
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>architecture</span></li>
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>travel</span></li>
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>sport</span></li>
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>animals</span></li>
                      <li class="tag" tabindex="0" onclick="page.selectTags(this)">#<span>events</span></li>
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
    const list = this.dataManager.filteredItems(this.data, this.activeTags);
    for (let i = 0; i < list.length; i++) {
      profile = new Photographer(list[i]);
      html += profile.htmlForHomePage();
    }
    return html + '</main>';
  }

  /*----- Ascenseur -----*/

  /**
   * Création du bouton "Passer au contenu"
   * @return  {String}  HTML String
   */
  createElevator() {
    return `<button onclick="window.scrollTo(0, 0)" id="elevator" tabindex="0">Passer au contenu</button>
    `;
  }
  /**
   * Ajoute un eventListenner pour faire apparaître l'ascenseur au scroll
   * @return  {void}
   */
  elevatorEventListener() {
    let elevator = document.getElementById('elevator');
    window.addEventListener('scroll', function(){
      if(window.scrollY > 0) elevator.style.display = 'block';
      else elevator.style.display = 'none';
    })
  }

  /*----- Tags -----*/

  /**
   * Ajoute le tag à la liste des filtres et raffraichi la page avec le contenu filtré
   *
   * @param   {HTMLElement}  element  L'élément contenant le tag
   *
   */
  selectTags(element) {
    event.preventDefault;
    let tag = element.textContent.substring(1);
    console.log(tag);
    const index = this.activeTags.indexOf(tag)
    if ( index === -1) {
      this.activeTags.push(tag);
    }
    else this.activeTags.splice(index, 1);
    globalThis.pageManager.updateHtml();
    this.setActiveTagsStyle();
  }
  /**
   * Ajoute la classe 'active' aux tags sélectionnés
   *
   * @return  {void} 
   */
  setActiveTagsStyle(){
    //Pour chaque élément avec la classe 'tag'
    let tags = document.getElementsByClassName('tag');
    for (let i = 0; i < tags.length; i++) {
      //Si textContent du tag contient une des chaine du tableau activeTags
      if (this.activeTags.some(tag =>tags[i].textContent.includes(tag))) {
        //J'ajoute la classe active à l'élément
        tags[i].classList.add('active');
      }
    }
  }

}