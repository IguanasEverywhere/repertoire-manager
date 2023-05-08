// ELEMENT SELECTIONS
const navigationArea = document.querySelector('#navigation-area');
const mainAddBtn = document.querySelector('#main-add-btn');
const mainRetrieveBtn = document.querySelector('#main-retrieve-btn');
const initialNav = document.querySelector('#initial-nav');
const addPieceForm = document.querySelector('#add-piece-form');
const retrieveForm = document.querySelector('#retrieve-form');

// INITIAL LISTENERS
mainAddBtn.addEventListener('click', () => {
  initialNav.style.display = 'none';
  addPieceForm.style.display='flex';

})

mainRetrieveBtn.addEventListener('click', () => {
  initialNav.style.display = 'none';
  retrieveForm.style.display = 'flex';

})