// ELEMENT SELECTIONS AND GLOBAL DATA
const navigationArea = document.querySelector('#navigation-area');
const mainAddBtn = document.querySelector('#main-add-btn');
const mainRetrieveBtn = document.querySelector('#main-retrieve-btn');
const initialNav = document.querySelector('#initial-nav');
const addPieceFormArea = document.querySelector('#add-piece-form-area');
const retrieveForm = document.querySelector('#retrieve-form');
const addPieceForm = document.querySelector('#add-piece-form');
let pieces;

// INITIAL LISTENERS
mainAddBtn.addEventListener('click', () => {
  initialNav.style.display = 'none';
  addPieceFormArea.style.display='flex';

})

mainRetrieveBtn.addEventListener('click', () => {
  initialNav.style.display = 'none';
  retrieveForm.style.display = 'flex';

})

// FETCH DATA FROM DB AND PUT INTO GLOBAL VARIABLE
fetch('http://localhost:3000/pieces')
.then(res => res.json())
.then(data => handleData(data));

const handleData = (data) => {
  pieces = data;
  console.log('here are your pieces', pieces)
}


addPieceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submitted');
  const titleField = document.querySelector('#piece-title');
  const composerField = document.querySelector('#composer');
  const instrumentSelection = document.querySelector('#instrument');
  console.log(titleField.value, composerField.value, instrumentSelection.value)
})

