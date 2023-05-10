// ELEMENT SELECTIONS AND GLOBAL DATA
const navigationArea = document.querySelector('#navigation-area');
const mainAddBtn = document.querySelector('#main-add-btn');
const mainRetrieveBtn = document.querySelector('#main-retrieve-btn');
const listAllBtn = document.querySelector('#main-retrieve-all-btn');
const initialNav = document.querySelector('#initial-nav');
const addPieceFormArea = document.querySelector('#add-piece-form-area');
const retrieveFormArea = document.querySelector('#retrieve-form-area');
const addPieceForm = document.querySelector('#add-piece-form');
const repListing = document.querySelector('#rep-listing');
const searchComposerForm = document.querySelector('#search-composer-form');
const searchByInstrument = document.querySelector('#search-by-instrument');
const searchByInstrumentSelector = document.querySelector('#search-by-instrument-selector');

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
  searchComposerForm.style.display = 'none';
  searchByInstrument.style.display = 'none';
  const byComposerBtn = document.querySelector('#by-composer-btn');
  const byInstrumentBtn = document.querySelector('#by-instrument-btn');
  const chooseSearchOpt = document.querySelector('#choose-search-opt');
  byComposerBtn.addEventListener('click', () => {
    chooseSearchOpt.style.display = 'none';
    searchByInstrument.style.display = 'none';
    searchComposerForm.style.display='flex';
  });
  byInstrumentBtn.addEventListener('click', () => {
    chooseSearchOpt.style.display = 'none';
    searchComposerForm.style.display = 'none';
    searchByInstrument.style.display='flex';
  })
});

listAllBtn.addEventListener('click', () => {
  let allPieces = retrievePiecesFromDb();
  displayPieces(allPieces);
});

searchComposerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const retrieveComposerQuery = document.querySelector('#retrieve-composer-query');
  filterPiecesByComposer(retrieveComposerQuery.value);
});

const filterPiecesByComposer = (composerName) => {
  let piecesByComposer = allPieces.filter(piece => piece.composer === composerName);
  displayPieces(piecesByComposer);
}

searchByInstrumentSelector.addEventListener('change', () => {
  filterPiecesByInstrument(searchByInstrumentSelector.value);
})

const filterPiecesByInstrument = (instrumentName) => {
  let piecesByInstrument = allPieces.filter(piece => piece.instrument === instrumentName);
  displayPieces(piecesByInstrument);
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

