/* CONTRÔLE QUELLE PAGE DOIT ÊTRE AFFICHÉE */
import { PhotographerPage } from "./pages/photographerPage.js";
import { Home } from "./pages/home.js";
import { Page404 } from "./pages/page404.js";
import { DataManager } from "./dataManager.js";

export class PageManager {

  /**
   * le noeud DOM où l'on va insérer la page
   * @type {HTMLElement}
   */
  domTarget;
  /**
   * la page actuelle
   * @type { Home | Page404 | PhotographerPage }
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
    this.init();
  }

  async init() {
    await this.dataManager.getData();
    let page = window.location.search.slice(1).split("/");
    console.log(page)

    if(page[0] ===  "index.html" || page[0] === "") page[0] = "home";
    this.showPage(page[0], page[1]);
  }

  /**
   * [showPage description]
   *
   * @param   {String}  pageToShow  [pageToShow description]
   * @param   {String}  [data]   les informations sur la page à afficher
   *
   * @return  {void}                afficher la page dans le domTarget
   */
  showPage(pageToShow, data) {
    switch (pageToShow) {
      case "home":
        this.page = new Home(this.dataManager.getPhotographersList());
        break;
      case "photographer":
        const idPhotographer = parseInt(data);
        this.page = new PhotographerPage(this.dataManager.getPhotographer(idPhotographer));
        break;
      default:
        this.page = new Page404();
        break;
    }
    this.domTarget.innerHTML = this.page.html();
  }

}