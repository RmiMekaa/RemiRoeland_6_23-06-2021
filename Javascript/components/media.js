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
   * @param   {mediaFromJson}  data  [data description]
   *
   * @constructor
   */
  constructor(data) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  /**
   * Génère les médias sous différentes structure en fonction de l'url
   *
   * @return  {string}  HTML String
   */
  html() {
    if (window.location.href.indexOf("showmedia") == -1 && this.image === null) {
      return this.htmlVideo();
    } else if (window.location.href.indexOf("showmedia") > -1 && this.image === null) {
      return this.htmlVideoForSlider();
    } else if (window.location.href.indexOf("showmedia") == -1) {
      return this.htmlPicture();
    }
    return this.htmlPictureForSlider();
  }

  /**
   * Retourne le html pour les vidéos
   * @return  {string}  HTML String
   */
  htmlVideo() {
    return `<figure class="item">
                <video class="media" onclick="window.location.href='?showmedia/${this.photographerId}/${this.video}'" tabindex="0">
                    <source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4>
                </video>
                <figcaption>
                   <h2>${this.title}</h2>
                   <span class="likesNbr">${this.likes}</span>
                   <button class="like-icon fas fa-heart" data-id="${this.id}" onclick="page.updateLike(this)" aria-label="bouton j'aime"></button>
              </figcaption>
            </figure>`;
  }
  /**
   * Retourne le html pour les images
   * @return  {string}  HTML String
   */
  htmlPicture() {
    return `<figure class="item">
                <img class="media" src="ressources/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.image}'; page.getIndexOfMedia(${this.id})" tabindex="0">
                <figcaption>
                    <h2>${this.title}</h2>
                    <span class="likesNbr">${this.likes}</span>
                    <button class="like-icon fas fa-heart" data-id="${this.id}" onclick="page.updateLike(this)" aria-label="bouton j'aime"></button>
                </figcaption>
            </figure>`;
  }
  /**
   * Retourne le html pour les vidéos dans le slider
   * @return  {string}  HTML String
   */
  htmlVideoForSlider() {
    return `<figure class="item">
                <video class="media" controls>
                    <source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4>
                </video>
                <figcaption>
                   <h2>${this.title}</h2>
              </figcaption>
            </figure>`;
  }
  /**
   * Retourne le html pour les images du slider
   * @return  {string}  HTML String
   */
  htmlPictureForSlider() {
    return `<figure class="item">
                <img class="media" src="ressources/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}">
                <figcaption>
                    <h2>${this.title}</h2>
                </figcaption>
            </figure>`;
  }


}