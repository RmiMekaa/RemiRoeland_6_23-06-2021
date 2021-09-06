export class ContactForm {

  /**
   * Créé un nouvel objet formulaire de contact
   *
   * @param   {String}  name       Le nom du photographe
   * @param   {Object}  domTarget  Le noeud où insérer le formulaire
   *
   * @constructor
   */
  constructor(name, domTarget) {
    this.name = name;
    this.DOM = document.createElement('form');
    this.DOM.setAttribute('id', 'contactForm');
    this.DOM.innerHTML = this.html;
    domTarget.appendChild(this.DOM);
    this.openForm();
    this.closeForm();
  }

  /**
  * Retourne le html du formulaire de contact
  *
  * @return  {String}  HTML String
  */
   get html() {
    return `<h1>Contactez-moi </br><span>${this.name}</span></h1>
            <label for="firstname">Prénom</label>
            <input type="text" name="firstname" aria-label="Champ du prénom" id="firstname">
            <label for="lastname">Nom</label>
            <input type="text" name="lastname" aria-label="Champ du nom" id="lastname">
            <label for="email">Email</label>
            <input type="mail" name="email" aria-label="Champ de l'e-mail" id="email">
            <label for="messagee">Votre message</label>
            <textarea name="message" aria-label="Champ du message" id="message"></textarea>
            <button class="submit-btn" type="submit" id="submit">Envoyer</button>
            <button id="modalClose" role="button" aria-label="Fermer le formulaire"><img src="ressources/close-icon.png"></button>`;
  }

  /**
 * Ouvre le formulaire
 *
 * @return  {Void}
 */
  openForm() {
    let that = this;
    let form = this.DOM;
    let button = document.getElementById('contact-btn');
    button.addEventListener('click', function() {
      form.style.display = 'flex';
      //Création du background ↓
      let background = document.createElement('div');
      background.classList.add('modal-bg');
      background.setAttribute('id', 'modal-bg');
      background.style.position = 'fixed';
      document.body.insertBefore(background, document.body.firstChild);
      that.trapFocus();
    })
  }
  /**
  * Ferme le formulaire
  * @return  {Void} 
  */
  closeForm() {
    let form = this.DOM;
    let closeButton = document.getElementById('modalClose');
    closeButton.addEventListener('click', function() {
    event.preventDefault();
    form.style.display = 'none';
    //Suppression du background ↓
    let background = document.getElementById('modal-bg');
    background.remove();  
    })
  }
  /**
   * Enferme le focus à l'intérieur du formulaire de contact
   *
   * @return  {void} 
   */
  trapFocus(){
    let firstname = document.getElementById('firstname');
    let close = document.getElementById('modalClose');

    firstname.focus();
    close.addEventListener('focusout', function() {
      firstname.focus();
    })

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        close.click();
      }  
    })
  }
}
