export class Header{

  /**
   * Créé une nouvel objet header
   *
   * @param   {( "photographerPage" | "homePage")}  page  la page de référence pour l'affichage du header
   *
   * @constructor
   */
  constructor(page){
    this.DOM = document.createElement("header");
    this.DOM.className ="header";
    this.DOM.setAttribute('id', 'header');
    this.DOM.innerHTML = this[page];
    document.body.appendChild(this.DOM);
  }

  /**
   * Retourne le html du header pour la page des photographes
   *
   * @return  {String}  HTML String
   */
  get photographerPage(){
    return '<a href="index.html"><img class="header__logo" src="ressources/logo.png" alt="FishEye Home page"></a>';
  }

  /**
   * Retourne le html du header pour la page 'accueil'
   *
   * @return  {String}  HTML String
   */
  get homePage(){
    return `<a href="index.html"><img class="header__logo" src="ressources/logo.png" alt="FishEye Home page"></a>
            <nav class="header__nav">
                <ul>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>portrait</span></li>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>art</span></li>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>fashion</span></li>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>architecture</span></li>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>travel</span></li>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>sport</span></li>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>animals</span></li>
                    <li class="tag" tabindex="0" onclick="page.tagsOnClick(this)">#<span>events</span></li>
                </ul>
            </nav>
            <h1 class="header__heading">Nos photographes</h1>`;
  }
}