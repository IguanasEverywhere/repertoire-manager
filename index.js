// ELEMENT SELECTIONS AND GLOBAL DATA
const navigationArea = document.querySelector('#navigation-area');
const mainAddBtn = document.querySelector('#main-add-btn');
const mainRetrieveBtn = document.querySelector('#main-retrieve-btn');
const initialNav = document.querySelector('#initial-nav');
const addPieceFormArea = document.querySelector('#add-piece-form-area');
const retrieveForm = document.querySelector('#retrieve-form');
const addPieceForm = document.querySelector('#add-piece-form');
const listAllBtn = document.querySelector('#main-retrieve-all-btn');
const repListing = document.querySelector('#rep-listing');
let pieces;

// FETCH DATA FROM DB AND PUT INTO GLOBAL VARIABLE
const retrievePiecesFromDb = () => {
  fetch('http://localhost:3000/pieces')
    .then(res => res.json())
    .then(data => handleData(data));

  const handleData = (data) => {
    pieces = data;
    console.log('here are your pieces', pieces)
  }
  return pieces; // I'm not crazy about this global variable, will consult with teacher about if this is the best way to do this
}
retrievePiecesFromDb();


// INITIAL LISTENERS
mainAddBtn.addEventListener('click', () => {
  initialNav.style.display = 'none';
  addPieceFormArea.style.display = 'flex';
});

mainRetrieveBtn.addEventListener('click', () => {
  initialNav.style.display = 'none';
  retrieveForm.style.display = 'flex';
});

listAllBtn.addEventListener('click', () => {
  let allPieces = retrievePiecesFromDb();
  allPieces.forEach(piece => {
    const pieceCard = document.createElement('div');

    const pieceTitle = document.createElement('p');
    pieceTitle.textContent = piece.title;

    const pieceComposer = document.createElement('p');
    pieceComposer.textContent = piece.composer;

    const pieceInstrument = document.createElement('p');
    pieceInstrument.textContent = piece.instrument;

    pieceCard.classList.add('piece-card');
    pieceCard.append(pieceTitle);
    pieceCard.append(pieceComposer);
    pieceCard.append(pieceInstrument);

    repListing.append(pieceCard);
  })
})



// HANDLE SUBMISSION OF NEW PIECE
addPieceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleField = document.querySelector('#piece-title');
  const composerField = document.querySelector('#composer');
  const instrumentSelection = document.querySelector('#instrument');

  fetch('http://localhost:3000/pieces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      composer: composerField.value,
      title: titleField.value,
      instrument: instrumentSelection.value
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))  // here we can give a success message and reset the input fields
});

retrieveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e)
})

