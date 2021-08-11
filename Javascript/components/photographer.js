/* GÉNÈRE LES PROFILS DES PHOTOGRAPHES */

export class Photographer {

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
   * [constructor description]
   *
   * @param   {photographerFromJson}  data  [data description]
   *
   * @constructor
   */
  constructor(data) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  /**
   * génère les profils pour la page d'accueil
   * @return  {String}  HTML String
   */
  htmlForHomePage() {
    return `
          <article class="photographer">
          <a class="photographer__thumb" href="?photographer/${this.id}" aria-label:"${this.name}">
              <img class="photographer__pp" src="ressources/Sample Photos/Photographers ID Photos/thumbs/${this.portrait}" alt="${this.name}">
              <h2 class="photographer__name">${this.name}</h2>
          </a>
          <h3 class="photographer__location">${this.city}, ${this.country}</h3>
          <span class="photographer__description">${this.tagline}</span>
          <span class="photographer__price">${this.price}€ / jour </span>
          <ul class="photographer__tags">
              ${this.tagList()}
          </ul>
          </article>
          `;
  }

  /**
   * génère les profils pour les pages des photographes
   * @return  {String}  HTML String
   */
  htmlForPhotographerPage() {
    return `
      <div class="profile__header">
        <section class="profile__info">
            <h1 class="photographer__name">${this.name}</h1>
            <span class="photographer__location">${this.city}, ${this.country}</span>
            <span class="photographer__description">${this.tagline}</span>
            <ul class="photographer__tags"> 
            ${this.tagList()}              
            </ul>
            <button class="button" id="contact-btn" onclick="page.openForm()" role="button" aria-label="Accédez au formulaire de contact">Contactez-moi</button>
        </section>
        <img class="photographer__pp" src="ressources/Sample Photos/Photographers ID Photos/thumbs/${this.portrait}" alt="photo du photographe">
      </div>
      `;
  }

  /**
   * Génère la liste des tags pour les photographes
   * @return  {string}  HTML String
   */
  tagList() {
    let list = "";
    for (let i = 0; i < this.tags.length; i++) {
      list += `<li class="tag" onclick="page.filterByTag(this)" tabindex="0">#<span>${this.tags[i]}</span></li>`;
    }
    return list;
  }
}