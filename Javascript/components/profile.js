/* PROFILS DES PHOTOGRAPHES */

import { ContactForm } from "./contactForm.js";

export class Profile {

  /**
  * la représentation du profil dans le DOM
  * @type {HTMLElement}
  */
  profile;
  /**
   * le nom du photographe
   * @type {String}
   */
  name;
  /**
  * le numéro d'identifiant
  * @type {Number}
  */
  id;
  /**
   * la ville du photographe
   * @type {String}
   */
  city;
  /**
   * le pays du photographe
   * @type {String}
   */
  country;
  /**
   * la liste des tags
   * @type {Array}
   */
  tags;
  /**
  * la phrase de description
  * @type {String}
  */
  tagline;
  /**
  * le tarif du photographe
  * @type {Number}
  */
  price;
  /**
  * la photo de profil du photographe
  * @type {HTMLElement}
  */
  portrait;

  /**
   * Créé un nouvel objet profil 
   *
   * @param   {Object}  data  Les données du photographe
   * @param   {( "photographerPage" | "homePage")}  page  la page où insérer le profil
   *
   * @constructor
   */
  constructor(data, page, domTarget) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
    this.DOM = document.createElement("article");
    this.DOM.innerHTML = this[page];
    domTarget.appendChild(this.DOM);

    if (page == 'photographerPage') new ContactForm(this.name, this.DOM);
  }

  /**
   * génère les profils pour la page d'accueil
   * @return  {String}  HTML String
   */
  get homePage() {
    this.DOM.className = "photographer";
    return `
          <a class="photographer__thumb" href="?photographer/${this.id}" aria-label="Artiste ${this.name}">
              <img class="photographer__pp" src="ressources/Sample Photos/Photographers ID Photos/thumbs/${this.portrait}" alt="photo de ${this.name}">
              <h2 class="photographer__name" aria-hidden="true">${this.name}</h2>
          </a>
          <h3 class="photographer__location" tabindex="0" aria-label="habite à ${this.city}, ${this.country}">${this.city}, ${this.country}</h3>
          <span class="photographer__description" tabindex="0"><span class="sr-only">citation :</span>${this.tagline}</span>
          <span class="photographer__price" tabindex="0"><span class="sr-only">tarif :</span>${this.price}€<span class="sr-only">par</span><span aria-hidden="true">/</span>jour</span>
          <ul class="photographer__tags">
              ${this.tagList}
          </ul>
          `;
  }
  /**
   * génère les profils pour les pages des photographes
   * @return  {String}  HTML String
   */
  get photographerPage() {
    this.DOM.className = "profile__header";
    return `
        <section class="profile__info">
            <h2 class="photographer__name" tabindex="0">${this.name}</h2>
            <h3 class="photographer__location" tabindex="0" aria-label="habite à ${this.city}, ${this.country}">${this.city}, ${this.country}</h3>
            <span class="photographer__description" tabindex="0"><span class="sr-only">citation :</span>${this.tagline}</span>
            <ul class="photographer__tags"> 
            ${this.tagList}              
            </ul>
            <button class="button" id="contact-btn" role="button" aria-label="Accédez au formulaire de contact">Contactez-moi</button>
        </section>
        <img class="photographer__pp" src="ressources/Sample Photos/Photographers ID Photos/thumbs/${this.portrait}" alt="photo de ${this.name}">
      `;
  }
  /**
   * Génère la liste des tags pour les photographes
   * @return  {string}  HTML String
   */
  get tagList() {
    let list = "";
    this.tags.forEach(tag => {
      list += `<li class="tag" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)" tabindex="0"><span class="sr-only">tag</span><span aria-hidden="true">#</span>${tag}</li>`;
    })
    return list;
  }

}