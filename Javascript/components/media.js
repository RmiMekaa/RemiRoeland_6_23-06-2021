export class Media {

  /* @type {Date}*/
  date;
  /* @type {Number}*/
  id;
  /* @type {String | null}*/
  image = null;
  /* @type {String | null}*/
  video = null;
  /* @type {Number}*/
  likes;
  /* @type {Number}*/
  photographerId;
  /* @type {Number}*/
  price;
  /* @type {Array.<String>}*/
  tags;
  /* @type {String}*/
  title;
  /* @type {String}*/
  description;

  /**
   * [constructor description]
   *
   * @param   {Object}  media  Un objet media
   *
   * @constructor
   */
  constructor(media) {
    for (const [key, value] of Object.entries(media)) {
      this[key] = value;
    }
  }

  /**
   * Génère les médias sous différentes structure en fonction de l'url
   *
   * @return  {string}  HTML String
   */
  html() {
    if (window.location.href.indexOf("showmedia") == -1) return this.htmlForThumbnail();
    else return this.htmlForSlider();
  }

  /**
   * Génère le html pour les vignettes
   *
   * @return  {String}  HTML String
   */
  htmlForThumbnail() {
    return `<figure class="item">
              ${this.thumbnailMedia()}
              <figcaption>
                  <h2>${this.title}</h2>
                  <span class="likesNbr">${this.likes}</span>
                  <button aria-label="bouton j'aime" class="like-icon fas fa-heart" data-id="${this.id}" onclick="page.updateLike(this)"></button>
              </figcaption>
            </figure>`;
  }
  /**
   * Retourne le html pour le slider
   * @return  {string}  HTML String
   */
  htmlForSlider() {
    return `<figure class="item">
                ${this.sliderMedia()}
                <figcaption>
                   <h2>${this.title}</h2>
              </figcaption>
            </figure>`;
  }
  
  /**
   * Créé une balise img ou video en fonction du type du média avec les attributs nécessaires
   *
   * @return  {String}  HTML String
   */
  thumbnailMedia() {
    if (this.video) return `<video class="media" title="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.video}'" tabindex="0"><source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4></video>`;
    else return `<img class="media" src="ressources/Sample Photos/${this.photographerId}/Thumbnails/${this.image}" alt="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.image}'; page.getIndexOfMedia(${this.id})" tabindex="0">`
  }
  /**
   * Créé une balise img ou video en fonction du type du média
   *
   * @return  {String}  HTML String
   */
  sliderMedia() {
    if (this.video) return `<video title="${this.description}" class="media" controls><source src="ressources/Sample Photos/${this.photographerId}/${this.video}" tabindex="0" type=video/mp4></video>`;
    else return `<img class="media" src="ressources/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}" tabindex="0">`
  }

}
