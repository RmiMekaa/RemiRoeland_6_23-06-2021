export class Media {



    /* @type {Date}*/
    date;

    /* @type {Number}*/
    id;

    /* @type {String | null}*/
    image = null;

    /* @type {String | null}*/
    video = null;

    /* @type {Number}*/
    likes;

    /* @type {Number}*/
    photographerId;

    /* @type {Number}*/
    price;

    /* @type {Array.<String>}*/
    tags;

    /* @type {String}*/
    title;

    /* @type {String}*/
    description;

    /**
     * [constructor description]
     *
     * @param   {mediaFromJson}  data  [data description]
     *
     * @constructor
     */
    constructor(data) {
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }
    }

    html() {
        if (this.image === null) return this.htmlVideo();
        return this.htmlPicture();
    }

    htmlVideo() {
        return `
            <figure class="item">
                <video class="media" controls>
                    <source src="ressources/Sample Photos/${this.photographerId}/${this.video}" type=video/mp4>
                </video>
                <figcaption>
                   <h2>${this.title}</h2>
                   <span class="likesNbr">${this.likes}<i class="like-icon fas fa-heart"></i></span>
                <figcaption>
            </figure>  
        `;  
    }
    htmlPicture() {
        return `
            <figure class="item">
                <img src="ressources/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}" onclick="">
                <figcaption>
                    <h2>${this.title}</h2>
                    <span class="likesNbr">${this.likes}<i class="like-icon fas fa-heart"></i></span>
                <figcaption>
            </figure>
        `;
    }

}