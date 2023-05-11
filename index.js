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
const backToMainBtn = document.querySelector('#back-to-main-btn');

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
  const chooseSearchOpt = document.querySelector('#choose-search-opt');
  initialNav.style.display = 'none';
  retrieveFormArea.style.display = 'flex';
  chooseSearchOpt.style.display = 'flex';
  searchComposerForm.style.display = 'none';
  searchByInstrument.style.display = 'none';
  const byComposerBtn = document.querySelector('#by-composer-btn');
  const byInstrumentBtn = document.querySelector('#by-instrument-btn');

  byComposerBtn.addEventListener('click', () => {
    chooseSearchOpt.style.display = 'none';
    searchByInstrument.style.display = 'none';
    searchComposerForm.style.display = 'flex';
  });
  byInstrumentBtn.addEventListener('click', () => {
    chooseSearchOpt.style.display = 'none';
    searchComposerForm.style.display = 'none';
    searchByInstrument.style.display = 'flex';
  })
});

backToMainBtn.addEventListener('click', () => {
  repListing.innerHTML = '';
  initialNav.style.display = 'flex';
  retrieveFormArea.style.display = 'none';
  searchComposerForm.style.display = 'none';
  searchByInstrument.style.display = 'none';
  addPieceFormArea.style.display = 'none';
})

listAllBtn.addEventListener('click', () => {
  displayPieces(allPieces);
});


// SEARCH AND FILTER HANDLERS
searchComposerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const retrieveComposerQuery = document.querySelector('#retrieve-composer-query');
  filterPiecesByComposer(retrieveComposerQuery.value, retrieveComposerQuery);
});

const filterPiecesByComposer = (composerName, retrieveComposerQuery) => {
  let piecesByComposer = allPieces.filter(piece => piece.composer === composerName);
  retrieveComposerQuery.value = '';
  displayPieces(piecesByComposer);
}

searchByInstrumentSelector.addEventListener('change', () => {
  filterPiecesByInstrument(searchByInstrumentSelector.value);
});

const filterPiecesByInstrument = (instrumentName) => {
  let piecesByInstrument = allPieces.filter(piece => piece.instrument === instrumentName);
  searchByInstrumentSelector.value = 'choose';
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

    pieceCard.addEventListener('click', () => {
      deletePiece(piece);
    });

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
    .then(data => {
      allPieces.push(data);
      titleField.value = '';
      composerField.value = '';
      instrumentSelection.value = 'none-selected';

      const confirmAddModal = document.createElement('div');
      confirmAddModal.classList.add('confirm-delete-div'); // we'll do something more generic
      const confirmAddMsg = document.createElement('p');
      confirmAddMsg.textContent = 'Piece successfully added!';
      const confirmAddBtn = document.createElement('button');
      confirmAddBtn.textContent = 'OK';

      confirmAddModal.append(confirmAddMsg);
      confirmAddModal.append(confirmAddBtn);

      const body = document.getElementsByTagName('body')[0];
      const backdrop = document.createElement('div');
      backdrop.classList.add('backdrop');
      body.append(backdrop); // repeated, we can modularize this out

      repListing.append(confirmAddModal);

      confirmAddBtn.addEventListener('click', () => {
        backdrop.remove();
        confirmAddModal.remove();
      })

    })
});

// DELETE A PIECE
const deletePiece = (piece) => {
  const confirmDeleteDiv = document.createElement('div');
  confirmDeleteDiv.classList.add('confirm-delete-div');
  const confirmDeleteMsg = document.createElement('p');
  confirmDeleteMsg.textContent = 'Are you sure you want to delete this piece?';
  const confirmYesBtn = document.createElement('button');
  confirmYesBtn.textContent = 'YES';
  const confirmNoBtn = document.createElement('button');
  confirmNoBtn.textContent = 'NO';

  confirmDeleteDiv.append(confirmDeleteMsg);
  confirmDeleteDiv.append(confirmYesBtn);
  confirmDeleteDiv.append(confirmNoBtn);

  const body = document.getElementsByTagName('body')[0];
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  body.append(backdrop);

  repListing.append(confirmDeleteDiv);

  confirmYesBtn.addEventListener('click', () => {
    confirmDeleteDiv.remove();
    backdrop.remove();
    deletePieceFromServer(piece);
  });

  confirmNoBtn.addEventListener('click', () => {
    backdrop.remove();
    confirmDeleteDiv.remove();
  });
}

const deletePieceFromServer = (pieceToDelete) => {
  fetch(`http://localhost:3000/pieces/${pieceToDelete.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      let deletedPieceOnGlobal = allPieces.find(piece => piece.id === pieceToDelete.id);
      let deletedPieceOnGlobalIdx = allPieces.indexOf(deletedPieceOnGlobal);
      allPieces.splice(deletedPieceOnGlobalIdx, 1);
    });
}

