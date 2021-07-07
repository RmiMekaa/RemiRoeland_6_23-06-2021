export class DataManager{

  data;

  src;

  /**
   * [constructor description]
   *
   * @param   {String}  source  l'url du serveur
   *
   * @constructor
   */
  constructor(source){
    this.src = source;
  }

  async getData() {
    const response = await fetch(this.src + "/data.json");
    this.data = await response.json();
    console.log(this.data);
    return this.data;
  }

}
