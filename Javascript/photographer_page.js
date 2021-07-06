class Photographer_page {

    /**
     * la représentation du profil dans le DOM
     * @type {HTMLElement}
     */
    photographer_page;
    /**
     * le nom du photographe
     * @type {String}
     */
    name;
    /**
     * le numéro d'identifiant
     * @type {Number}
     */
    id;
    /**
     * la ville du photographe
     * @type {String}
     */
    city;
    /**
     * le pays du photographe
     * @type {String}
     */
    country;
    /**
     * la liste des tags
     * @type {Array}
     */
    tags;
    /**
     * la phrase de description
     * @type {String}
     */
    tagline;
    /**
     * la photo de profil du photographe
     * @type {HTMLElement}
     */
    portrait;

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  le noeud où l'on va injecter notre profil
     * @param   {Object}       infos      les détails du photographe
     *
     * @constructor
     */
    constructor(domTarget, infos) {
        this.photographer_page = document.createElement("div");
        this.photographer_page.className = "profile__header";
        domTarget.appendChild(this.photographer_page);
        for (const [key, value] of Object.entries(infos)) {
            this[key] = value;
        }
        this.render();
    }
    
    render() {
        this.photographer_page.innerHTML = this.template();
    }

    template() {
        return `
        <section class="profile__info">
            <h1 class="photographer__name">${this.name}</h1>
            <span class="photographer__location">${this.city}</span>
            <span class="photographer__description">${this.tagline}</span>
            <div class="photographer__tags">
                ${this.tagList()}                
            </div>
            <a href="" class="button">Contactez-moi</a>
        </section>
        <img class="photographer__pp" src="ressources/Sample Photos/Photographers ID Photos/thumbs/${this.portrait}" alt="photographer picture">
      `;
    }

    tagList() {
        let list = "";
        for (let i = 0; i < this.tags.length; i++) {
            list += "<a class=\"tag\" href=\"\"> #" + this.tags[i] + "</a>";
        }
        return list;
    }
}

function createProfileHeader(i) {
  new Photographer_page(document.querySelector("main"), data.photographers[i]);
}

createProfileHeader(0);
