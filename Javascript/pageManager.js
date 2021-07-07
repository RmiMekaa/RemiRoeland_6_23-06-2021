import { Photographer } from "./pages/photographer";
import { Home } from "./pages/home";
import { Page404 } from "./pages/page404";

export class PageManager {

    /**
     * le noeud DOM où l'on va insérer la page
     * @type {HTMLElement}
     */
    domTarget;

    /**
     * la page actuelle
     * @type { Home | Page404 | Photographer }
     */
    page;

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget   le noeud DOM où l'on va insérer la page
     *
     * @constructor
     */
    constructor(domTarget) {
        this.domTarget = domTarget;
        this.showPage("home");
    }

    definePageToShow() {

    }

    /**
     * [showPage description]
     *
     * @param   {String}  pageToShow  [pageToShow description]
     * @param   {any}     [arguments]   les informations sur la page à afficher
     *
     * @return  {void}                afficher la page dans le domTarget
     */
    showPage(pageToShow, arguments) {
        switch(pageToShow){
            case "home" :
                this.page = new Home();
                break;
            case "photographer" :
                this.page = new Photographer(arguments);
                break;
            default : 
                this.page = new Page404();
                break;
        }
        this.domTarget.innerHTML = await this.page.html();
    }
}