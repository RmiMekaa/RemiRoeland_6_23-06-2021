
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

    this.firstname = document.getElementById('firstname');
    this.lastname = document.getElementById('lastname');
    this.email = document.getElementById('email');
    this.message = document.getElementById('message');

    this.formInputs = [this.firstname, this.lastname, this.email, this.message];

    this.submitListenner();
    this.formIsValid = false;
  }

  /**
  * Retourne le html du formulaire de contact
  *
  * @return  {String}  HTML String
  */
  get html() {
    return `<h1>Contactez-moi </br><span>${this.name}</span></h1>
            <div class="formData">
              <label for="firstname">Prénom</label>
              <input type="text" name="firstname" aria-label="Champ du prénom" id="firstname" minlength="2" required>
            </div>
            <div class="formData">
              <label for="lastname">Nom</label>
              <input type="text" name="lastname" aria-label="Champ du nom" id="lastname" minlength="2" required>
            </div>
            <div class="formData">
              <label for="email">Email</label>
              <input type="email" name="email" aria-label="Champ de l'e-mail" id="email" required>
            </div>
            <div class="formData">
              <label for="message">Votre message</label>
              <textarea name="message" aria-label="Champ du message" id="message" minlength="5"></textarea>
            </div>
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
    button.addEventListener('click', function () {
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
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
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
  trapFocus() {
    let firstname = document.getElementById('firstname');
    let close = document.getElementById('modalClose');

    firstname.focus();
    close.addEventListener('focusout', function () {
      firstname.focus();
    })

    window.addEventListener('keyup', (e) => {
      if (e.key === "Escape") {
        close.click();
      }
    })
  }

  /**
   * Place un écouteur sur la soumission du formulaire qui empêche le formulaire d'être soumis et appelle la fonction submitHandle
   * 
   * @return {void}
   */
  submitListenner() {
    this.DOM.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitHandle();
      return false;
    })
  }
  /**
   * Lance les vérifications et affiche les résultats dans la console si le formulaire est valide
   *
   * @return  {void} 
   */
  submitHandle() {
    this.formIsValid = true;
    this.checkNameValidity(this.firstname);
    this.checkNameValidity(this.lastname);

    if (!this.formIsValid) return;

    this.consoleDisplay();
    this.formInputs.forEach(input => input.value = '');
  }
  /**
   * Affiche les éléments soumis dans le formulaire dans la console
   *
   */
  consoleDisplay() {
    console.log('prénom :', this.firstname.value);
    console.log('nom :', this.lastname.value);
    console.log('email :', this.email.value);
    console.log('message :', this.message.value);
  }
  /**
   * Vérifie la bonne saisie pour les champs prénom et nom et agit en conséquence
   *
   * @param   {Object}  target  L'élément à vérifier
   *
   * @return  {void}
   */
  checkNameValidity(target) {
    const nameReg = /^[a-z ,.'-]+$/i;
    if (!nameReg.test(target.value)) {
      target.style.border = "3px black solid";
      target.parentNode.setAttribute('data-error', 'Format incorrect');
      this.formIsValid = false;
      return;
    }
    target.parentNode.removeAttribute('data-error');
    target.style.border = "none"
  }

}
