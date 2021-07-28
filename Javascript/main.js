/*--------SortBy--------------------------------------------------------------------------------*/

// const sortBtn = document.getElementById("sort-by");

// sortBtn.addEventListener('change', function () {
//   console.log('You selected: ', this.value);
//   sortBy();
// });

// function sortBy() {
//   if (sortBtn.value = "popularity") {
//     sortByPopularity();
//   } else if (sortBtn.value = "date") {
//     sortByDate();
//   } else if (sortBtn.value = "name") {
//     sortByName();
//   }
// }

// function sortByPopularity() {
//   totalLikesNbr.style.background = "blue";
// }

// function sortByDate() {
//   totalLikesNbr.style.background = "red";
// }

// function sortByName() {
//   totalLikesNbr.style.background = "green";
// }






function filterByTag(element){
  event.preventDefault;
  let tag = element.textContent.substring(1);
  this.data.filter(function(object) {
    return object.tags == tag;
  })
}
