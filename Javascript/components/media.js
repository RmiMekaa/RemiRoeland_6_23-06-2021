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
   * Créé un nouvel objet média
   * 
   * @param   {Object}  media  Un objet media
   * @param   {String}  page  La page où insérer le média
   * @param   {Object} likesCounter Une référence au compteur de likes
   * @param   {Object} domTarget Le noeud où insérer le média
   *
   * @constructor
   */
  constructor(media, page, domTarget, likesCounter) {
    this.page = page;
    this.media = media;
    this.likesCounter = likesCounter;
    for (const [key, value] of Object.entries(media)) {
      this[key] = value;
    }
    this.DOM = document.createElement('figure');
    this.DOM.className = 'item';
    domTarget.appendChild(this.DOM);   

    switch(page) {
      case 'photographerPage': this.DOM.innerHTML = this.photographerPageRender();
                               this.like(media);
                               break;
      case 'slider'          : this.DOM.innerHTML = this.sliderRender();
    }
  }

  photographerPageRender() {
    return `${this.mediaHTML(this.page)}
            <div class="item__details">
                <h2 tabindex="0" aria-label="titre : ${this.title}">${this.title}</h2>
                <span tabindex="0" class="likesNbr"><span class="sr-only">nombre de likes :</span>${this.likes}</span>
                <button tabindex="0" aria-label="ajouter un like" class="like-icon fas fa-heart" data-id="${this.id}"></button>
            </div>`;
  }

  sliderRender() {
    return `${this.mediaHTML(this.page)}
    <figcaption>
        <h2>${this.title}</h2>
    </figcaption>`;
  }

  mediaHTML(page) {
    switch (page) {
      case 'photographerPage':
        if (this.media.image) return `<img class="media" src="ressources/Sample Photos/${this.photographerId}/Thumbnails/${this.image}" alt="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.image}'; page.getIndexOfMedia(${this.id})" tabindex="0"></img>`;
        else return `<video controls class="media" title="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.video}'" tabindex="0"><source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4></video>`;
        break;    
      case 'slider': 
        if (this.media.image) return `<img class="media" src="ressources/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.image}'; page.getIndexOfMedia(${this.id})" tabindex="0"></img>`;
        else return `<video controls class="media" title="${this.description}" onclick="window.location.href='?showmedia/${this.photographerId}/${this.video}'" tabindex="0"><source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4></video>`;
    }
  }

  like(media) {
    const likesCounter = this.likesCounter;
    const likes = this.DOM.querySelector('.likesNbr');
    const button = this.DOM.querySelector('button');
    button.addEventListener('click', function() {
      if (button.classList.contains('liked')) {
        media.likes --;
        button.classList.remove('liked');
      } else {
        media.likes ++;
        button.classList.add('liked');
      }
      likes.innerHTML = media.likes;
      likesCounter.render();
    })
  }












  /**
   * Génère les médias sous différentes structure en fonction de l'url
   *
   * @return  {void}  HTML String
   */
  ffdrender() {

    if (window.location.href.indexOf("showmedia") == -1) this.DOM.innerHTML= this.htmlForThumbnail();
    else this.DOM.innerHTML= this.htmlForSlider();
  }

  /**
   * Génère le html pour les vignettes
   *
   * @return  {String}  HTML String
   */
  htmlForThumbnail() {
    return `${this.thumbnailMedia()}
              <figcaption>
                  <h2>${this.title}</h2>
                  <span class="likesNbr">${this.likes}</span>
                  <button aria-label="bouton j'aime" class="like-icon fas fa-heart" data-id="${this.id}" onclick="page.updateLike(this)"></button>
              </figcaption>`;
  }

  //this.DOM.innnerHTML= `
  //  <img src="">
  //  <h2>dfkljglkfjgkldfj</h2>
  //`;
  //new Like(qte, this.DOM)

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
