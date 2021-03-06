export class LikesCounter {

  /**
   * Créé un nouvel objet compteur de likes
   *
   * @param   {Object}  photographer  Les données du photographe
   * @param   {Array}   medias        Un tableau contenant les médias
   * @param   {Object}  domTarget     Le noeud où insérer le compteur
   *
   * @constructor
   */
  constructor(photographer, medias, domTarget){
    this.photographer = photographer;
    this.medias = medias;
    this.DOM = document.createElement('aside');
    this.DOM.className = 'total-likes';
    domTarget.appendChild(this.DOM);
    this.render();
  }

  /**
   * Génère le html du compteur
   */
  render() {
    this.DOM.innerHTML = this.html;
  }

  /**
   *  Retourne le HTML du compteur de likes
   *
   * @return  {String}  HTML String
   */
  get html() {
    return `<span id="totalLikesNbr" class="totalLikesNbr" tabindex="0"><span class="sr-only">total de likes</span>${this.total}</span>
            <span class="price" tabindex="0"><span class="sr-only">tarif :</span>${this.photographer.price}€<span class="sr-only">par</span><span aria-hidden="true">/</span>jour</span>`;
  }

  /**
   * Retourne la somme des likes
   *
   * @return  {number}  Le total de likes
   */
  get total() {
    let total = 0;
    this.medias.forEach(media => {
      total += media.likes;
    });
    return total;
  }
  
}