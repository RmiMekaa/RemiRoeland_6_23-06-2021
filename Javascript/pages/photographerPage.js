/* PAGE DES PHOTOGRAPHES */

import { Photographer } from "../components/photographer.js";
import { Media } from "../components/media.js";

export class PhotographerPage {

  /**
   * @param   {photographerPageData}  data  les données nécessaires à la page
   * @constructor
   */
  constructor(data) {
    this.data = data;
    this.activeTags = [];
  }

  /**
  * génère le html de la page
  *
  * @return  {String}  le HTML de la page
  */
  html() {
    let html = this.createHeader() + '<main>' + this.createPhotographerResume() + this.createSortBy() + this.createMedias() + this.createLikesCounter() + this.createForm() + '</main>';
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
    let medias = this.filteredMedias();
    let html = '<div class="gallery">';
    for (let i = 0; i < medias.length; i++) {
      media = new Media(medias[i]);
      html += media.html();  
    }
    return html += '</div>';
  }

  /**
   * Retourne le HTML du bouton pour filtrer les images
   *
   * @return  {String}  HTML String
   */
  createSortBy() {
    return `<div class="sort-by">
              <label for="sort-by">Trier par</label>
              <select name="sort-by" id="sort-by" tabindex="0" onchange="page.sortBy(this)">
                  <option value="popularity" id="opt1">Popularité</option>
                  <option value="date" id="opt2">Date</option>
                  <option value="name" id="opt3">Titre</option>
              </select>
            </div>`;
  }

  /**
  * Retourne le html du compteur de likes
  *
  * @return  {String}  HTML String
  */
  createLikesCounter() {
    return `<aside class="total-likes">
                <span id="totalLikesNbr" class="totalLikesNbr">${this.getTotal()}</span>
                <span class="price">${this.data.photographer.price}€ / jour</span>
            </aside>`;
  }

  /**
  * Retourne le html du formulaire de contact
  *
  * @return  {String}  HTML String
  */
  createForm() {
    return `<form id="contactForm">
              <h1>Contactez-moi </br><span>${this.data.photographer.name}</span></h1>
              <label for="firstname">Prénom</label>
              <input type="text" name="firstname" aria-label="Champ du prénom">
              <label for="lastname">Nom</label>
              <input type="text" name="lastname" aria-label="Champ du nom">
              <label for="email">Email</label>
              <input type="mail" name="email" aria-label="Champ de l'e-mail">
              <label for="messagee">Votre message</label>
              <textarea name="message" aria-label="Champ du message"></textarea>
              <button class="submit-btn" type="submit">Envoyer</button>
              <button id="modalClose" onclick="page.closeForm()" role="button" aria-label="Fermer le formulaire"><img src="ressources/close-icon.png"></button>
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
    let contactForm = document.getElementById("contactForm");
    contactForm.style.display = "none";
    //Suppression du background ↓
    let element = document.getElementsByClassName("modal-bg");
    document.body.removeChild(element[0]);  
  }

  /*----- Tri des médias par tags -----*/

  /**
   * Filtre les médiass par tags
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
  }

  filteredMedias(){
    if (this.activeTags.length === 0) return this.data.media;
    let newArrFinal = [];
    this.activeTags.forEach(tag =>{
      const newArr = this.data.media.filter(function (media) {
        return media.tags.includes(tag);
      })
      newArrFinal = newArrFinal.concat(newArr);
    });
    // Suppression des doublons dans le tableau
    let mySet = new Set(newArrFinal);
    newArrFinal = [...mySet];
   
    return newArrFinal;
  }
  
  /*----- Tri des médias -----*/

  /**
   * Tri les médias
   *
   * @param   {HTMLElement}  element  L'élément select dont on va récupérer la valeur
   *
   * @return  {void}   Trie le tableau
   */
  sortBy(element) {
    switch(element.value){
      case "popularity" : this.sortByPopularity(); break;
      case "date"       : this.sortByDate();       break;
      case "name"       : this.sortByName();       break;
      default           : return;
    }
    window.pageManager.updateHtml();
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


