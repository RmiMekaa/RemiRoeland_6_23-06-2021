export class SortBy {

  /**
   * Créé un nouvel objet bouton de tri
   * 
   * @param   {Array}  medias  Un tableau de médias à trier
   * @param   {HTMLElement}  domTarget  Le noeud où insérer l'instance
   * @param   {Object}  gallery  Une référence à la classe gallery
   * 
   * @constructor
   */
  constructor(medias, domTarget, gallery){
    this.gallery = gallery;
    this.medias = medias;
    this.DOM = document.createElement('aside');
    this.DOM.className = 'sort-by';
    this.DOM.innerHTML = this.html;
    domTarget.appendChild(this.DOM);

    this.addListener();
  }

  /**
   * Retourne le html du bouton de tri
   *
   * @return  {String}  HTML String
   */
  get html(){
    return `<span class="select-label" tabindex="0"><span aria-hidden="true">Trier par</span><span class="sr-only">appuyez sur tab puis utiliser les flèches directionnelles pour trier les médias </span></span>
            <div class="select" tabindex="1">
              <input class="sortBy-option" name="option" type="radio" id="popularity" aria-label="trier par popularité" checked>
              <label for="popularity" class="select__option">Popularité</label>
              <input class="sortBy-option" name="option" type="radio" id="date" aria-label="trier par date">
              <label for="date" class="select__option">Date</label>
              <input class="sortBy-option" name="option" type="radio" id="name" aria-label="trier par nom">
              <label for="name" class="select__option">Nom</label>
            </div>`;
  }

  /*----- Fonctionnalités de tri -----*/

  /**
   * Ajoute un écouteur sur les différentes options de tri
   *
   * @return  {void}
   */
  addListener() {
    const that = this;
    this.DOM.querySelectorAll('.sortBy-option').forEach(option => {
      option.addEventListener('click', function() {
        that.sortBy(this);
      })
    })
  }
  
  /**
   * Actualise l'affichage des médias
   * @param   {HTMLElement}  element  L'élément select sur lequel le clic a été détecté
   *
   * @return  {void}   Trie le tableau
   */
  sortBy(element) {
    console.log(element.id);
    switch (element.id) {
      case "popularity": this.sortByPopularity(); break;
      case "date": this.sortByDate(); break;
      case "name": this.sortByName(); break;
      default: return;
    }
    this.gallery.displayMedias(this.medias);
  }
  /**
   * Tri les médias par popularité (nombre de likes)
   *
   * @return  {void}  trie le tableau
   */
  sortByPopularity() {
    this.medias.sort(function compare(a, b) {
      if (a.likes > b.likes) { return -1; }
      if (a.likes < b.likes) { return 1; }
      return 0;
    })
  }
  /**
   * Tri les médias par date (du plus récent au plus ancien)
   *
   * @return  {void}  trie le tableau
   */
  sortByDate() {
    this.medias.sort(function compare(a, b) {
      if (a.date > b.date) { return -1; }
      if (a.date < b.date) { return 1; }
      return 0;
    })
  }
  /**
   * Tri les médias par ordre alphabétique
   *
   * @return  {void}  trie le tableau
   */
  sortByName() {
    this.medias.sort(function compare(a, b) {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    })
  }

}