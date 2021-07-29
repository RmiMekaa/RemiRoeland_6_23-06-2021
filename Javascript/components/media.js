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

  html() {
    if (window.location.href.indexOf("showmedia") == -1 && this.image === null) {
      return this.htmlVideo();
    } else if (window.location.href.indexOf("showmedia") > -1 && this.image === null) {
      return this.carouselHtmlVideo();
    } else if (window.location.href.indexOf("showmedia") == -1) {
      return this.htmlPicture();
    }
    return this.carouselHtmlPicture();
  }

  htmlVideo() {
    return `<figure class="item">
                <video class="media" controls onclick="window.location.href='?showmedia/${this.photographerId}/${this.video}'" tabindex="0">
                    <source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4>
                </video>
                <figcaption>
                   <h2>${this.title}</h2>
                   <span class="likesNbr">${this.likes}</span>
                   <button class="like-icon fas fa-heart"  data-id="${this.id}" onclick="page.updateLike(this)"></button>
              </figcaption>
            </figure>`;
  }

  htmlPicture() {
    return `<figure class="item">
                <img class="media" src="ressources/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.image}'; page.getIndexOfMedia(${this.id})" tabindex="0">
                <figcaption>
                    <h2>${this.title}</h2>
                    <span class="likesNbr">${this.likes}</span>
                    <button class="like-icon fas fa-heart" data-id="${this.id}" onclick="page.updateLike(this)"></button>
                </figcaption>
            </figure>`;
  }

  carouselHtmlVideo() {
    return `<figure class="item">
                <video class="media" controls>
                    <source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4>
                </video>
                <figcaption>
                   <h2>${this.title}</h2>
              </figcaption>
            </figure>`;
  }

  carouselHtmlPicture() {
    return `<figure class="item">
                <img class="media" src="ressources/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}">
                <figcaption>
                    <h2>${this.title}</h2>
                </figcaption>
            </figure>`;
  }


}