
/* CONSTRUIT LA PAGE DU PHOTOGRAPHE */

import { Photographer } from "../components/photographer.js";
import { Media } from "../components/media.js";

export class PhotographerPage {

  /* @type {String} */
  city;
  /* @type {String} */
  country;
  /* @type {Number} */
  id;
  /* @type {String} */
  name;
  /* @type {String} */
  portrait;
  /* @type {Number} */
  price;
  /* @type {String} */
  tagline;
  /**
   * @type {Array.<String>} la liste des tags à afficher
   */
  tags = [];

  /**
   * [constructor description]
   *
   * @param   {photographerPageData}  data  les éléments à insérer dans la page
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
    const photographer = new Photographer(this.data.photographer);
    let html = this.createHeader() + '<main>' + photographer.html() + this.createSortBy() + this.createMedias() + this.createLikesCounter() + this.createForm() + '</main>';
    return html;
  }

  /**
  * Modifie le header
  */
  createHeader() {
    return `<header class="header">
              <a href="index.html"><img class="header__logo" src="ressources/logo.png" alt="FishEye Home page"></a>
            </header>`;
  }

  /**
  * génère le html de la section médias
  *
  * @return  {String}  le HTML de la section
  */
  createMedias() {
    this.media = {};
    let html = '<div class="gallery">';
    for (let i = 0; i < this.data.media.length; i++) {
      this.media["media" + this.data.media[i]] = new Media(this.data.media[i]);
      html += this.media["media" + this.data.media[i]].html();  
    }
    return html += '</div>';
  }

  /**
   * Génère le HTML du bouton pour filtrer les images
   *
   * @return  {String}  le HTML du bouton pour filtrer
   */
  createSortBy() {
    return `<div class="sort-by">
              <label for="sort-by">Trier par</label>
              <select name="sort-by" id="sort-by" onchange="page.sortBy(this)">
                  <option value="popularity" id="opt1">Popularité</option>
                  <option value="date" id="opt2">Date</option>
                  <option value="name" id="opt3">Titre</option>
              </select>
            </div>`;
  }

  /**
  * génère le html du compteur de likes
  *
  * @return  {String}  le HTML du compteur
  */
  createLikesCounter() {
    return `<aside class="total-likes">
                <span id="totalLikesNbr" class="totalLikesNbr">${this.getTotal()}</span>
                <span class="price">${this.data.photographer.price}€ / jour</span>
            </aside>`;
  }

  /**
  * génère le html du formulaire de contact
  *
  * @return  {String}  le HTML du formulaire
  */
  createForm() {
    return `<form id="contactForm">
              <h1>Contactez-moi </br><span>${this.data.photographer.name}</span></h1>
              <label for="firstname">Prénom</label>
              <input type="text" name="firstname" aria-label="Champ du prénom">
              <label for="lastname">Nom</label>
              <input type="text" name="lastname">
              <label for="email">Email</label>
              <input type="mail" name="email">
              <label for="messagee">Votre message</label>
              <textarea name="message"></textarea>
              <button class="submit-btn" type="submit">Envoyer</button>
              <button id="modalClose" onclick="page.closeForm()"><img src="ressources/close-icon.png"></button>
            </form>`;
  }

  /*----- LIKES -----*/

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
        window.pageManager.forceUpdate();
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
 * Ouvre le formulaire
 *
 * @return  {Void}
 */
  openForm() {
    event.preventDefault();
    let contactForm = document.getElementById("contactForm");
    contactForm.style.display = "flex";
    //Création du background ↓
    let modalBg = document.createElement("div");
    modalBg.classList.add("modal-bg");
    modalBg.style.position = "fixed";
    document.body.insertBefore(modalBg, document.body.firstChild);
  }
  
  /**
  * Ferme le formulaire
  * @return  {Void} 
  */
  closeForm() {
    event.preventDefault();
    contactForm.style.display = "none";
    //Suppression du background ↓
    let element = document.getElementsByClassName("modal-bg");
    document.body.removeChild(element[0]);  
  }

  /*----- FILTRER CONTENU -----*/

  /**
   * Filtre les médias par tags
   *
   * @param   {HTMLElement}  element  L'élément contenant le tag
   *
   * @return  {Array}  Un nouveau tableau avec les objets contenant le tag
   */
  filterByTag(element){
    event.preventDefault;
    let tag = element.textContent.substring(1);
    console.log(tag);
    let newArr = this.data.media.filter(function(media) {
     return media.tags == tag;
    })
    console.log(newArr);
  }

  /*----- SortBy -----*/

  sortBy(element) {
    switch(element.value){
      case "popularity" : this.sortByPopularity(); break;
      case "date"       : this.sortByDate();       break;
      case "name"       : this.sortByName();       break;
      default           : return;
    }
    window.pageManager.forceUpdate();
  }

  sortByPopularity() {
    this.data.media.sort(function compare(a, b){
      if (a.likes > b.likes) {return -1;}
      if (a.likes < b.likes) {return 1;}
      return 0;
    })
  }

  sortByDate() {
    this.data.media.sort(function compare(a, b){
      if (a.id < b.id) {return -1;}
      if (a.id > b.id) {return 1;}
      return 0;
    })
  }

  sortByName() {
    this.data.media.sort(function compare(a, b){
      if (a.title < b.title) {return -1;}
      if (a.title > b.title) {return 1;}
      return 0;
    })
  }

  /**
   * Récupère l'index du media cliqué
   *
   * @param   {number}  id  l'identifiant du media
   *
   * @return  {number}      l'index du media
   */
  getIndexOfMedia(id) {
    let index;
    for(var i = 0; i < this.data.media.length; i ++) {
      if(this.data.media[i]["id"] === id) {
          index = i;
      }
    }
    console.log(index);
  return index; 
  }

}


