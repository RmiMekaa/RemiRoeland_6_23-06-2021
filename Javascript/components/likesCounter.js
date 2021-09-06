export class LikesCounter {

  constructor(photographer, medias, domTarget){
    this.photographer = photographer;
    this.medias = medias;
    this.DOM = document.createElement('aside');
    this.DOM.className = 'total-likes';
    domTarget.appendChild(this.DOM);
    this.render();
  }

  render() {
    this.DOM.innerHTML = this.html;
  }
  
  /**
   *  Retourne le HTML du compteur de likes
   *
   * @return  {String}  HTML String
   */
  get html() {
    return `<span id="totalLikesNbr" class="totalLikesNbr" tabindex="0">${this.total}</span>
            <span class="price">${this.photographer.price}€ / jour</span>`;
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

  // /**
  //  * Incrémente ou décrémente le compteur de like du média
  //  * @param   {HTMLElement}  element  l'icône like du média
  //  */
  //  updateTotal(element) {
  //   const idMedia = parseInt(element.dataset.id);
  //   for (let i = this.medias.length - 1; i >= 0; i--) {
  //     if (this.medias[i].id === idMedia) {
  //       const el = this.medias[i];
  //       if (el.liked) {
  //         el.likes--;
  //         delete el.liked;
  //       }
  //       else {
  //         el.likes++;
  //         el.liked = true;
  //       }
  //       globalThis.pageManager.updateHtml();
  //       return;
  //     }
  //   }
  // }
  

}