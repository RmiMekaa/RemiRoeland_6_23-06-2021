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
    console.log(data);
    this.data = data;
  }


  /**
  * génère le html de la page
  *
  * @return  {String}  le HTML de la page
  */
  html() {
    this.editHeader();
    const photographer = new Photographer(this.data.photographer);
    let html = photographer.html() + this.createSortBy() + this.createMedias() + this.createLikesCounter() + this.createForm();
    return html;
  }

  /**
  * Modifie le header
  */
  editHeader() {
    let header = document.querySelector(".header");
    let tags = document.querySelector(".header__nav");
    let heading = document.querySelector(".header__heading")
    header.removeChild(tags);
    header.removeChild(heading);
  }

  /**
  * génère le html de la section médias
  *
  * @return  {String}  le HTML de la section
  */
  createMedias() {
    this.media = {};
    const photographer = new Photographer(this.data.photographer);
    let html = '<div class="gallery">';
    for (let i = 0; i < this.data.media.length; i++) {
      this.media["media" + this.data.media[i].id] = new Media(this.data.media[i]);
      html += this.media["media" + this.data.media[i].id].html();
    }
    return html += '</div>';
  }

  /**
   * Génère le HTML du bouton pour filtrer les images
   *
   * @return  {String}  le HTML du bouton pour filtrer
   */
  createSortBy() {
    return `
    <div class="sort-by">
      <label for="sort-by">Trier par</label>
      <select name="sort-by">
          <option value="popularity">Popularité</option>
          <option value="date">Date</option>
          <option value="name">Titre</option>
      </select>
    </div>
    `;
  }

  /**
  * génère le html du compteur de likes
  *
  * @return  {String}  le HTML du compteur
  */
  createLikesCounter() {
    return `<aside class="total-likes">
                <span id="totalLikesNbr" class="totalLikesNbr"></span>
                <span class="price">${this.data.photographer.price}€ / jour</span>
            </aside>
            `;
  }

  /**
  * génère le html du formulaire de contact
  *
  * @return  {String}  le HTML du formulaire
  */
  createForm() {
    return ` <form id="contactForm">
              <h1>Contactez-moi </br><span>${this.data.photographer.name}</span></h1>
              <label for="firstname"></label>
              <input type="text" name="firstname" aria-label="Champ du prénom">
              <label for="lastname">Nom</label>
              <input type="text" name="lastname">
              <label for="email">Email</label>
              <input type="mail" name="email">
              <label for="messagee">Votre message</label>
              <textarea name="message"></textarea>
              <button class="submit-btn" type="submit">Envoyer</button>
              <button id="modalClose"><img src="ressources/close-icon.png"></button>
            </form>
          `;
  }

  /**
   * Incrémente ou décrémente le compteur de like du média
   * @param   {HTMLElement}  element  l'icône like du média
   */
  updateLike(element) {
    let likes = element.previousElementSibling;
    parseInt(likes.textContent);
    if (likes.classList.contains("liked")) {
      likes.textContent--
      likes.classList.remove("liked");
    } else {
      likes.textContent++
      likes.classList.add("liked");
    }
  }

  /**
   * Additionne les likes des photos
   *
   * @return  {Number}  Retourne le résultat
   */
  sumOfLikes() {
    const likesNbr = document.getElementsByClassName("likesNbr");
    const totalLikesNbr = document.getElementById("totalLikesNbr");

    let sum = 0;
    for (let i = 0; i < likesNbr.length; i++) {
      sum += parseInt(likesNbr[i].textContent);
    }

    console.log(sum);

    totalLikesNbr.innerHTML = sum;
  }




  filterBytag(tag) {
    const index = this.tags.indexOf(tag);
    if (index > 0) this.tags.splice(index, 1); //remove tag from list 
    console.log(this.tags);
  }

  sortByPopularity() {
    //for (let i = 0; i < this.data.likes.length; i++) {
    this.data.medias.sort(function (a, b) {
      return a.likes - b.likes;
    })
    console.log(this.data);
  }



}


