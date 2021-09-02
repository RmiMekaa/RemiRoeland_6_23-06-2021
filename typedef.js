  /**
   * @typedef  {Object}         photographerFromJson
   * @property {String}         city
   * @property {String}         country
   * @property {Number}         id
   * @property {String}         name
   * @property {String}         portrait
   * @property {Number}         price
   * @property {String}         tagline
   * @property {Array.<String>} tags
   */

  /**
   * @typedef  {Object}         mediaFromJson
   * @property {Date}           date
   * @property {Number}         id
   * @property {String}         [image]
   * @property {String}         [video]
   * @property {Number}         likes
   * @property {Number}         photographerId
   * @property {Number}         price
   * @property {Array.<String>} tags
   * @property {String}         title
   * @property {String}         description
   * @property {boolean}        liked
   * /

  /**
   * @typedef  {Object}                       dataFromJson
   * @property {Array.<photographerFromJson>} photographers
   * @property {Array.<mediaFromJson>}        media
   */

  /**
   * @typedef  {Object}                photographerPageData
   * @property {photographerFromJson}  photographer
   * @property {Array.<mediaFromJson>} media
   */