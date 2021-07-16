/* RÉCUPÈRE LES DONNÉES */

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
   * @return  {Promise}  [return description]
   */
  async getData() {
    const response = await fetch(this.src + "/data.json"); //on aurait pu faire un import direct mais c'est l'occasion de mettre en place un fetch
    this.data = await response.json();
    return true;
  }


  /**
   * permet d'obtenir la liste des photographes
   *
   * @return  {Array.<photographerFromJson>}  les photographes
   */
  getPhotographersList() {
    return this.data.photographers;
  }

  /**
   * permet d'obtenir les informations necessaires pour une page d'un photographe
   *
   * @param   {Number}                photographerId  l'identifiant du photographe
   *
   * @return  {photographerPageData}                    [return description]
   */
  getPhotographer(photographerId) {
    //TODO : filtrer les données et retourner celles nécessaires

    const answer = {
      photographer:null,
      media: []
    };

    for (let i = 0; i < this.data.photographers.length; i++) {
      if (this.data.photographers[i].id === photographerId) {
        answer.photographer = this.data.photographers[i];
        break;
      }
    }

    for (let i = 0; i < this.data.media.length; i++) {
      if (this.data.media[i].photographerId === photographerId) {
        answer.media.push(this.data.media[i]);
      }
    }
    return answer;
  }
}