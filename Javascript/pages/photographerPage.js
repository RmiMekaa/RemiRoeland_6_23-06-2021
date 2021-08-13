/* PAGE DES PHOTOGRAPHES */

import { Photographer } from "../components/photographer.js";
import { Media } from "../components/media.js";
import { DataManager } from "../dataManager.js";

export class PhotographerPage {

  /**
   * @param   {photographerPageData}  data  les données nécessaires à la page
   * @constructor
   */
  constructor(data) {
    this.data = data;
    this.activeTags = [];
    this.focusList = {};
  }

  /**
  * génère le html de la page
  *
  * @return  {String}  le HTML de la page
  */
  html() {
    let html = this.createHeader() + '<main>' + this.createPhotographerResume() + this.createSortBy() + '<div class="gallery" id="gallery">' + this.createMedias() + '</div>' + this.createForm() + this.createLikesCounter() + '</main>';
    return html;
  }

  /**
  * Retourne le html du header
  *   
  * @return  {String}  HTML String
  */
  createHeader() {
    return `<header class="header">
              <a href="index.html"><img class="header__logo" src="ressources/logo.png" alt="FishEye Home page"></a>
            </header>`;
  }
  /**
  * Retourne le html du profil
  *   
  * @return  {String}  HTML String
  */
  createPhotographerResume() {
    const photographer = new Photographer(this.data.photographer);
    return photographer.htmlForPhotographerPage()
  }
  /**
  * Retourne le html de la section médias
  *
  * @return  {String}  HTML String
  */
  createMedias() {
    let media;
    let medias = window.dataManager.filteredItems(this.data.media, this.activeTags);
    let html = '';
    for (let i = 0; i < medias.length; i++) {
      media = new Media(medias[i]);
      html += media.html();  
    }
    return html;
  }

  /*----- LIKES -----*/

  /**
  * Retourne le html du compteur de likes
  *
  * @return  {String}  HTML String
  */
  createLikesCounter() {
    return `<aside class="total-likes">
                <span id="totalLikesNbr" class="totalLikesNbr" tabindex="0">${this.getTotal()}</span>
                <span class="price">${this.data.photographer.price}€ / jour</span>
            </aside>`;
  }
  /**
   * Incrémente ou décrémente le compteur de like du média
   * @param   {HTMLElement}  element  l'icône like du média
   */
  updateLike(element) {
    const idMedia = parseInt(element.dataset.id);
    for( let i = this.data.media.length-1; i>=0; i--){
      if (this.data.media[i].id === idMedia){
        const el = this.data.media[i];
        if (el.liked) {
          el.likes--;
          delete el.liked;
        }
        else {
          el.likes++;
          el.liked = true;
        }
        window.pageManager.updateHtml();
        return;
      }
    }
  }
  /**
   * Calcule le total des likes
   *
   * @return  {number}  la somme des likes
   */
   getTotal(){
      let total = 0;
      this.data.media.forEach(element => {
        total += element.likes;
      });
      return total;
  }
  
  /*----- FORMULAIRE -----*/

  /**
  * Retourne le html du formulaire de contact
  *
  * @return  {String}  HTML String
  */
  createForm() {
    return `<form id="contactForm">
              <h1>Contactez-moi </br><span>${this.data.photographer.name}</span></h1>
              <label for="firstname">Prénom</label>
              <input type="text" name="firstname" aria-label="Champ du prénom" id="firstname">
              <label for="lastname">Nom</label>
              <input type="text" name="lastname" aria-label="Champ du nom" id="lastname">
              <label for="email">Email</label>
              <input type="mail" name="email" aria-label="Champ de l'e-mail" id="email">
              <label for="messagee">Votre message</label>
              <textarea name="message" aria-label="Champ du message" id="message"></textarea>
              <button class="submit-btn" type="submit" id="submit">Envoyer</button>
              <button id="modalClose" onclick="page.closeForm()" role="button" aria-label="Fermer le formulaire"><img src="ressources/close-icon.png"></button>
            </form>`;
  }
  /**
 * Ouvre le formulaire
 *
 * @return  {Void}
 */
  openForm() {
    event.preventDefault();
    let contactForm = document.getElementById("contactForm");
    contactForm.style.display = "flex";
    //Création du background ↓
    let background = document.createElement("div");
    background.classList.add("modal-bg");
    background.setAttribute('id', 'modal-bg');
    background.style.position = "fixed";
    document.body.insertBefore(background, document.body.firstChild);
    this.trapFocus();
  }
  /**
  * Ferme le formulaire
  * @return  {Void} 
  */
  closeForm() {
    event.preventDefault();
    let contactForm = document.getElementById("contactForm");
    contactForm.style.display = "none";
    //Suppression du background ↓
    let background = document.getElementById("modal-bg");
    background.remove();  
  }
  /**
   * Enferme le focus à l'intérieur du formulaire de contact
   *
   * @return  {void} 
   */
   trapFocus(){
    let firstname = document.getElementById('firstname');
    let close = document.getElementById('modalClose');

    firstname.focus();
    close.addEventListener('focusout', function() {
      firstname.focus();
    })

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        close.click();
      }  
    })
  }
  
  /*----- Tags -----*/

  /**
   * Ajoute les tags dans le tableau activeTags et modifie leur apparence
   *
   * @param   {HTMLElement}  element  L'élément contenant le tag
   *
   * @return  {void}
   */
  selectTags(element) {
    event.preventDefault;
    let tag = element.textContent.substring(1);
    const index = this.activeTags.indexOf(tag)
    if ( index === -1) {
      this.activeTags.push(tag);
    }
    else this.activeTags.splice(index, 1);
    window.pageManager.updateHtml();
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
      //Si textContent de l'élément contient une des chaine du tableau activeTags
      if (this.activeTags.some(tag =>tags[i].textContent.includes(tag))) {
        //J'ajoute la classe active à l'élément
        tags[i].classList.add('active');
      }
    }
  }
  
  /*----- Tri des médias -----*/

  /**
  * Retourne le html du dropdown
  *
  * @return  {String}  HTML String
  */
  createSortBy(){
    return `
    <span class="select-label">Trier par</span>
    <div class="select" tabindex="1">
      <input class="sortBy-input" name="option" type="radio" id="popularity" onclick="page.sortBy(this)" checked>
      <label for="popularity" class="select__option">Popularité</label>
      <input class="sortBy-input" name="option" type="radio" id="date" onclick="page.sortBy(this)">
      <label for="date" class="select__option">Date</label>
      <input class="sortBy-input" name="option" type="radio" id="name" onclick="page.sortBy(this)">
      <label for="name" class="select__option">Nom</label>
    </div>
    `;
  }
  /**
   * Tri les médias
   *
   * @param   {HTMLElement}  element  L'élément select dont on va récupérer la valeur
   *
   * @return  {void}   Trie le tableau
   */
  sortBy(element) {
    switch(element.id){
      case "popularity" : this.sortByPopularity(); break;
      case "date"       : this.sortByDate();       break;
      case "name"       : this.sortByName();       break;
      default           : return;
    }
    let gallery = document.getElementById('gallery');
    gallery.innerHTML = this.createMedias();
  }
  /**
   * Tri les médias par popularité (nombre de likes)
   *
   * @return  {void}  trie le tableau
   */
  sortByPopularity() {
    this.data.media.sort(function compare(a, b){
      if (a.likes > b.likes) {return -1;}
      if (a.likes < b.likes) {return 1;}
      return 0;
    })
  }
  /**
   * Tri les médias par date (du plus récent au plus ancien)
   *
   * @return  {void}  trie le tableau
   */
  sortByDate() {
    this.data.media.sort(function compare(a, b){
      if (a.id > b.id) {return -1;}
      if (a.id < b.id) {return 1;}
      return 0;
    })
  }
  /**
   * Tri les médias par ordre alphabétique
   *
   * @return  {void}  trie le tableau
   */
  sortByName() {
    this.data.media.sort(function compare(a, b){
      if (a.title < b.title) {return -1;}
      if (a.title > b.title) {return 1;}
      return 0;
    })
  }

}


