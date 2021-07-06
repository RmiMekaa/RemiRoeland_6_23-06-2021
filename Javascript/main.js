/*-----CONTACT FORM----------------------------------------------------------------------------------------------------------------*/

const contactForm = document.getElementById("contactForm");
const modalClose = document.getElementById("modalClose");
const contactBtn = document.getElementById("contact-btn");

const modalName = document.querySelector("#contactForm h1 span");
modalName.innerHTML = "Mimi Keel"; //nom du photographe

modalClose.addEventListener("click", closeModal);
contactBtn.addEventListener("click", openModal);

/**
 * Ferme le formulaire
 *
 * @return  {Void} 
 */
function closeModal(e) {
    e.preventDefault();
    contactForm.style.display = "none";
    removeModalBg();
}
/**
 * Ouvre le formulaire
 *
 * @return  {Void}
 */
function openModal(e) {
    e.preventDefault();
    contactForm.style.display = "flex";
    createModalBg();
}
/**
 * Créé un élément div qui sert d'arrière plan au formulaire
 *
 * @return  {Void}
 */
function createModalBg() {
    let modalBg = document.createElement("div");
    modalBg.classList.add("modal-bg");
    document.body.insertBefore(modalBg, document.body.firstChild);
}
/**
 *  Supprime l'élément div qui sert d'arrière plan au formulaire
 *
 * @return  {void} 
 */
function removeModalBg() {
    let element = document.getElementsByClassName("modal-bg");
    document.body.removeChild(element[0]);
}

/*-----LIKES-----------------------------------------------------------------------------------------------------------------*/

const likeBtn = document.getElementsByClassName("like-icon");
const likesNbr = document.getElementsByClassName("likesNbr");

let likes = 10;
for (let i=0; i < likesNbr.length; i++) {
    likesNbr[i].insertAdjacentHTML("afterbegin", likes.toString());
}

for (let i=0; i < likeBtn.length; i++) {
    likeBtn[i].addEventListener("click", function() {
        likes++;
    });
}

/*-----TOTAL LIKES-----------------------------------------------------------------------------------------------------------*/

const totalLikesNbr = document.getElementById("totalLikesNbr");

let TotalLikes = sumOfLikes();

/**
 * Additionne les likes des photos
 *
 * @return  {Number}  Retourne le résultat
 */
function sumOfLikes() {
    let sum = 0;
    for (let i=0; i < likesNbr.length; i++) {
        sum += parseInt(likesNbr[i].textContent);
    }

    return sum;
}

totalLikesNbr.innerHTML = TotalLikes.toString();

/*-----SLIDESHOW-------------------------------------------------------------------------------------------------------------*/



