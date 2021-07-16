/* CONSTRUIT LES PROFILS POUR LA PAGE D'ACCUEIL */

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
  * [constructor description]
  *
  * @param   {Object}       infos      les détails du photographe
  *
  * @constructor
  */
  constructor(infos) {
    for (const [key, value] of Object.entries(infos)) {
      this[key] = value;
    }
  }

  html() {
    return `
        <article class="photographer">
        <a class="photographer__thumb" href="?photographer/${this.id}" aria-label:"${this.name}">
            <img class="photographer__pp" src="ressources/Sample Photos/Photographers ID Photos/thumbs/${this.portrait}" alt="${this.name}">
            <h2 class="photographer__name">${this.name}</h2>
        </a>
        <h3 class="photographer__location">${this.city}, ${this.country}</h3>
        <span class="photographer__description">${this.tagline}</span>
        <span class="photographer__price">${this.price}€ / jour </span>
        <div class="photographer__tags">
            ${this.tagList()}
        </div>
        </article>
        `;
  }

  tagList() {
    let list = "";
    for (let i = 0; i < this.tags.length; i++) {
      console.log("this.tags[i]:", this.tags[i]);

      list += `<a class="tag" href="#${this.tags[i]}">#${this.tags[i]}</a>`;
    }
    return list;
  }
}

