import { PhotographerPage } from "./pages/photographerPage.js";
import { HomePage } from "./pages/homePage.js";
import { Slider } from "./pages/slider.js";

export class PageManager {

  /**
   * la page actuelle
   * @type { HomePage | PhotographerPage | Slider }
   */
  page;

  constructor(dataManager) {
    this.dataManager = dataManager;
    this.init();
  }

  /**
   * Récupère les données du json et affiche la page
   */
  async init() {
    await this.dataManager.getData();

    let page = window.location.search.slice(1).split("/");
    if(page[0] === "") page[0] = "homepage";
    this.displayPage(page[0], page[1]);
  } 

  /**
   * Affiche la page en fonction de l'url
   * @param   {String}  url  La première partie de l'url (index.html || photographer || showmedia)
   * @param   {String}  [id]        l'id d'un photographe
   *
   * @return  {void}                Créé le HTML dans l'élément body
   */
  displayPage(url, id) {
    let photographerId = parseInt(id);
    document.body.innerText = "";
    switch (url) {
      case "homepage":
        this.page = new HomePage(this.dataManager.getPhotographersList(), this.dataManager);
        break;
      case "photographer":
        this.page = new PhotographerPage(this.dataManager.getPhotographerData(photographerId), this.dataManager);
        break;
      case "showmedia":
        let actualMedia = document.location.href.substring(document.location.href.lastIndexOf('/') + 1); // Récupère le nom du fichier dans l'URL
        this.page = new Slider(photographerId, this.dataManager.getPhotographerData(photographerId).media, actualMedia);
        break;
    }
    window.page = this.page;
  }
  
}