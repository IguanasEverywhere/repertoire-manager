// ELEMENT SELECTIONS AND GLOBAL DATA
const navigationArea = document.querySelector('#navigation-area');
const mainAddBtn = document.querySelector('#main-add-btn');
const mainRetrieveBtn = document.querySelector('#main-retrieve-btn');
const initialNav = document.querySelector('#initial-nav');
const addPieceFormArea = document.querySelector('#add-piece-form-area');
const retrieveFormArea = document.querySelector('#retrieve-form-area');
const addPieceForm = document.querySelector('#add-piece-form');
const listAllBtn = document.querySelector('#main-retrieve-all-btn');
const repListing = document.querySelector('#rep-listing');
const searchForm = document.querySelector('#search-form');

let allPieces;

// FETCH DATA FROM DB AND PUT INTO GLOBAL VARIABLE
const retrievePiecesFromDb = () => {
  fetch('http://localhost:3000/pieces')
    .then(res => res.json())
    .then(data => handleData(data));

  const handleData = (data) => {
    allPieces = data;
  }
  return allPieces;
}
retrievePiecesFromDb();


// INITIAL LISTENERS
mainAddBtn.addEventListener('click', () => {
  repListing.innerHTML = '';
  initialNav.style.display = 'none';
  addPieceFormArea.style.display = 'flex';
});

mainRetrieveBtn.addEventListener('click', () => {
  repListing.innerHTML = '';
  initialNav.style.display = 'none';
  retrieveFormArea.style.display = 'flex';
});

listAllBtn.addEventListener('click', () => {
  let allPieces = retrievePiecesFromDb();
  displayPieces(allPieces);
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const retrieveComposerQuery = document.querySelector('#retrieve-composer-query');
  filterPiecesByComposer(retrieveComposerQuery.value);
});

const filterPiecesByComposer = (composerName) => {
  let piecesByComposer = allPieces.filter(piece => piece.composer === composerName);
  displayPieces(piecesByComposer);
}

// DISPLAY PIECES ON DOM
const displayPieces = (pieces) => {
  repListing.innerHTML = '';

  pieces.forEach(piece => {
    const pieceCard = document.createElement('div');

    const pieceComposer = document.createElement('p');
    pieceComposer.textContent = piece.composer;

    const pieceTitle = document.createElement('p');
    pieceTitle.textContent = piece.title;

    const pieceInstrument = document.createElement('p');
    pieceInstrument.textContent = piece.instrument;

    pieceCard.classList.add('piece-card');
    pieceCard.append(pieceComposer);
    pieceCard.append(pieceTitle);
    pieceCard.append(pieceInstrument);

    repListing.append(pieceCard);
  })
}

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

