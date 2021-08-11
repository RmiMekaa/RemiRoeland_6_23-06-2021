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
  constructor(data) {
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
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>portrait</span></li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>art</span></li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>fashion</span></li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>architecture</span></li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>travel</span></li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>sport</span></li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>animals</span></li>
                      <li class="tag" tabindex="0" onclick="page.filterByTag(this)">#<span>events</span></li>
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
    const list = this.filteredPhotographers();
    for (let i = 0; i < list.length; i++) {
      profile = new Photographer(list[i]);
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
    event.preventDefault;
    let tag = element.textContent.substring(1);
    console.log(tag);
    const index = this.activeTags.indexOf(tag)
    if ( index === -1) {
      this.activeTags.push(tag);
    }
    else this.activeTags.splice(index, 1);
    window.pageManager.updateHtml();
    this.setActiveTagsStyle();
  }

  /**
   * Créé un tableau filtré contenant les photographes à afficher sur la page
   *
   * @return  {array}
   */
  filteredPhotographers(){
    if (this.activeTags.length === 0) return this.data;
    let newArrFinal = [];
    this.activeTags.forEach(tag =>{
      const newArr = this.data.filter(function (photographer) {
        return photographer.tags.includes(tag);
      })
      newArrFinal = newArrFinal.concat(newArr);
    });
    // Suppression des doublons dans le tableau
    let mySet = new Set(newArrFinal);
    newArrFinal = [...mySet];
    console.log("newArrFinal", newArrFinal);

    return newArrFinal;
  }

  /**
   * Ajoute la classe 'active' aux tags sélectionnés
   *
   * @return  {void} 
   */
  setActiveTagsStyle(){
    //Pour chaque élément avec la classe 'tag'
    let tags = document.getElementsByClassName('tag');
    console.log("activeTags : " + this.activeTags);
    for (let i = 0; i < tags.length; i++) {
      //Si textContent du tag contient une des chaine du tableau activeTags
      if (this.activeTags.some(v =>tags[i].textContent.includes(v))) {
        console.log("l'élément contient '" + tags[i].textContent + "'");
        //J'ajoute la classe active à l'élément
        tags[i].classList.add('active');
      }
    }
  }

}