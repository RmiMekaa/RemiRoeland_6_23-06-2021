/* CONTRÔLE QUELLE PAGE DOIT ÊTRE AFFICHÉE */

import { PhotographerPage } from "./pages/photographerPage.js";
import { Home } from "./pages/home.js";
import { DataManager } from "./dataManager.js";
import { ShowMedia } from "./pages/showMedia.js";

export class PageManager {

  /**
   * le noeud DOM où l'on va insérer la page
   * @type {HTMLElement}
   */
  domTarget;
  /**
   * la page actuelle
   * @type { Home | Page404 | PhotographerPage | ShowMedia }
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
  constructor(domTarget, url) {
    this.domTarget = domTarget;
    this.dataManager = new DataManager(url);
    // this.photographerPage = new PhotographerPage();
    // this.showMedias = new ShowMedia();
    this.init();
  }

  async init() {
    await this.dataManager.getData();
    let page = window.location.search.slice(1).split("/");

    if(page[0] ===  "index.html" || page[0] === "") page[0] = "home";
    this.showPage(page[0], page[1]);
  } 


  /**
   * Détermine la page à afficher
   * @param   {String}  pageToShow  [pageToShow description]
   * @param   {String}  [data]   les informations sur la page à afficher
   *
   * @return  {void}                afficher la page dans le domTarget
   */
  showPage(pageToShow, data) {
    let photographerId = parseInt(data);
    switch (pageToShow) {
      case "home":
        this.page = new Home(this.dataManager.getPhotographersList());
        this.domTarget.innerHTML = this.page.html();
        this.page.elevatorEventListener();
        break;
      case "photographer":
        this.page = new PhotographerPage(this.dataManager.getPhotographer(photographerId));
        this.domTarget.innerHTML = this.page.html();
        break;
      case "showmedia":
        let actualMedia = document.location.href.substring(document.location.href.lastIndexOf('/') + 1); // Récupère le nom du fichier dans l'URL
        this.page = new ShowMedia(photographerId, this.dataManager.getPhotographer(photographerId).media, actualMedia);
        this.domTarget.innerHTML = this.page.html();
        break;
    }
    window.page = this.page;
  }

  /**
   * Actualise la page
   * @return  {void}
   */
  forceUpdate(){
    this.domTarget.innerHTML = this.page.html();
  }

}