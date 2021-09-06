export class Elevator {

  /**
   * Créé un nouvel objet ascenseur
   *
   * @param   {Object}  domTarget  Le noeud où insérer l'ascenseur
   *
   * @constructor
   */
  constructor(domTarget) {
    this.DOM = document.createElement('button');
    this.DOM.setAttribute('id', 'elevator');
    this.DOM.setAttribute('onclick', 'window.scrollTo(0, 0)');
    this.DOM.setAttribute('tabindex', '0');
    this.DOM.innerText = 'Passer au contenu';
    domTarget.appendChild(this.DOM);

    this.scrollListener(); 
  }

  /**
   * Ajoute un eventListenner pour faire apparaître l'ascenseur au scroll
   * @return  {void}
   */
  scrollListener() {
    let elevator = this.DOM;
    window.addEventListener('scroll', function(){
      if(window.scrollY > 0) elevator.style.display = 'block';
      else elevator.style.display = 'none';
    })
  }

}