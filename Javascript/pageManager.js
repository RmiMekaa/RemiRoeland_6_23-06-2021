import { PhotographerPage } from "./pages/photographerPage.js";
import { HomePage } from "./pages/home.js";
import { DataManager } from "./dataManager.js";
import { Slider } from "./pages/showMedia.js";

export class PageManager {

  /**
   * la page actuelle
   * @type { Home | PhotographerPage | ShowMedia }
   */
  page;

  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget   le noeud DOM où l'on va insérer la page
   * @param   {String}       url         l'url du serveur
   *
   * @constructor
   */
  constructor(dataSrc) {
    this.dataManager = new DataManager(dataSrc);
    this.init();
  }

  /**
   * [init description]
   *
   * @return  {[type]}  [return description]
   */
  async init() {
    await this.dataManager.getData();

    let page = window.location.search.slice(1).split("/");
    if(page[0] === "") page[0] = "homepage";
    this.generateHTML(page[0], page[1]);
  } 

  /**
   * Génère le html de la page souhaitée en fonction des informations contenues dans l'url
   * @param   {String}  urlStart  La première partie de l'url (index.html || photographer || showmedia)
   * @param   {String}  [id]        l'id d'un photographe
   *
   * @return  {void}                Créé le HTML dans l'élément body
   */
  generateHTML(urlStart, id) {
    let photographerId = parseInt(id);
    switch (urlStart) {
      case "homepage":
        this.page = new HomePage(this.dataManager.getPhotographersList());
        break;
      case "photographer":
        this.page = new PhotographerPage(this.dataManager.getPhotographer(photographerId));
        break;
      case "showmedia":
        let actualMedia = document.location.href.substring(document.location.href.lastIndexOf('/') + 1); // Récupère le nom du fichier dans l'URL
        this.page = new Slider(photographerId, this.dataManager.getPhotographer(photographerId).media, actualMedia);
        break;
    }
    document.body.innerHTML = this.page.html();
    window.page = this.page;
  }

  /**
   * Actualise le contenu de la page
   * @return  {void}
   */
  updateHtml(){
    document.body.innerHTML = this.page.html();
  }

  updateHomePage(){
    document.body.innerHTML = this.page.html();
    this.page.setActiveTagsStyle();
  }


}