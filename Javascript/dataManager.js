/* GESTION DES DONNÉES */

export class DataManager {

  /**
   * @type {dataFromJson} les données en provenance du json
   */
  data;
  src;

  /**
   * [constructor description]
   *
   * @param   {String}  source  l'url du serveur
   *
   * @constructor
   */
  constructor(source) {
    this.src = source;
  }

  /**
   * recupère les données 
   *
   * @return  {Promise} 
   */
  async getData() {
    const response = await fetch(this.src + "/data.json");
    this.data = await response.json();
    return true;
  }

  /**
   * permet d'obtenir la liste des photographes
   * @return  {Array}  les photographes
   */
  getPhotographersList() {
    return this.data.photographers;
  }

  /**
   * permet d'obtenir les informations necessaires pour une page d'un photographe
   * @param   {Number}  photographerId  l'identifiant du photographe
   * @return  {Object}  Les données propres au photographe
   */
  getPhotographer(photographerId) {
    const answer = {
      photographer:null,
      media: []
    };
    // Récupère l'objet contenant les données du photographe
    for (let i = 0; i < this.data.photographers.length; i++) {
      if (this.data.photographers[i].id === photographerId) {
        answer.photographer = this.data.photographers[i];
        break;
      }
    }
    // Récupère les médias du photographe
    for (let i = 0; i < this.data.media.length; i++) {
      if (this.data.media[i].photographerId === photographerId) {
        answer.media.push(this.data.media[i]);
      }
      // Par défaut, trie les médias par popularité
      this.data.media.sort(function compare(a, b){
        if (a.likes > b.likes) {return -1;}
        if (a.likes < b.likes) {return 1;}
        return 0;
      })  
    }
    return answer;
  }
}