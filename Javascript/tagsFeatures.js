export class TagFeatures {

  /**
   * Fonctionnalités pour les tags
   *
   * @param   {String}  page  La page où appliquer les fonctionnalités
   *
   * @constructor
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Actions au clic sur un tag
   * @param   {HTMLElement}  element  La cible du clic
   * @return  {void}
   */
   tagsOnClick(element) {
    this.addFilter(element.textContent.substring(4)); // substring pour supprimer "tag#" et ne garder que le nom du tag
    this.displayResults();
    this.setStyle();
  }

  /**
   * Ajoute une chaîne de caractères au tableau des filtres
   * @param   {String}  filter  la chaine de caractère à ajouter
   * @return  {void}  
   */
  addFilter(filter) {
    const index = this.dataManager.activeTags.indexOf(filter)
    if (index === -1) {
      this.dataManager.activeTags.push(filter);
    }
    else {
      this.dataManager.activeTags.splice(index, 1);
    }
  }

  /**
   * Filtre le tableau et affiche les résultats
   *
   * @return  {void} 
   */
  displayResults() {
    let newArr;
    switch (this.page) {
      case 'homePage' : 
        newArr = this.dataManager.filteredItems(this.photographers, this.dataManager.activeTags);
        this.profiles.displayPhotographers(newArr);
        break;
      case 'photographerPage' : 
        newArr = this.dataManager.filteredItems(this.medias, this.dataManager.activeTags);
        this.gallery.displayMedias(newArr);
    }
  }

  /**
   * Applique le style CSS sur les tags actifs
   *
   * @return  {void}  [return description]
   */
  setStyle() {
    let tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      if (this.dataManager.activeTags.indexOf(tag.textContent.substring(4)) > -1) tag.classList.add('active');
      else tag.classList.remove('active');
    })
  }

  /**
   * Permet de déclencher le clic quand l'utilisateur presse la touche entrée
   *
   * @param   {Object}  e   La touche pressée par l'utilisateur
   * @param   {HTMLElement}  element  l'élément où l'évènement a été détecté
   */
  enterHandler(e, element){
    if (e.keyCode === 13) element.click();
  }
}