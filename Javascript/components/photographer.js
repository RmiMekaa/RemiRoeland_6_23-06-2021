export class Photographer {


  /* @type {String} */
  city;

  /* @type {String} */
  country;

  /* @type {Number} */
  id;

  /* @type {String} */
  name;

  /* @type {String} */
  portrait;

  /* @type {Number} */
  price;

  /* @type {String} */
  tagline;

  /* @type {Array.<String>} tags */
  tags;


    /**
     * [constructor description]
     *
     * @param   {photographerFromJson}  data  [data description]
     *
     * @constructor
     */
    constructor(data) {
      for (const [key, value] of Object.entries(data)) {
        this[key] = value;
      }
    }
  
    /**
     * génère le html de la page
     *
     * @return  {String}  le HTML de la page
     */
    html() {
      return `
      <div class="profile__header">
        <section class="profile__info">
            <h1 class="photographer__name">${this.name}</h1>
            <span class="photographer__location">${this.city}, ${this.country}</span>
            <span class="photographer__description">${this.tagline}</span>
            <ul class="photographer__tags"> 
            ${this.tagList()}              
            </ul>
            <a href="" class="button" id="contact-btn" onclick="page.openForm()" aria-label="Accédez au formulaire de contact">Contactez-moi</a>
        </section>
        <img class="photographer__pp" src="ressources/Sample Photos/Photographers ID Photos/Thumbs/${this.portrait}" alt="photographer picture">
      </div>
      `;
    }
  
    tagList() {
      let list = "";
      for (let i = 0; i < this.tags.length; i++) {
        list += `<li class="tag" onclick="page.filterByTag(this)">#${this.tags[i]}</li>`;
      }
      return list;
    }
  }