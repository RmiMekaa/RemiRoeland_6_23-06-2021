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
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>portrait</li>
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>art</li>
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>fashion</li>
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>architecture</li>
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>travel</li>
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>sport</li>
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>animals</li>
                    <li class="tag" tabindex="0" onkeypress="page.enterHandler(event, this)" onclick="page.tagsOnClick(this)"><span class="sr-only">tag</span><span aria-hidden="true">#</span>events</li>
                </ul>
            </nav>
            <h1 class="header__heading">Nos photographes</h1>`;
  }
}