// This fill controls logic for the path memorizer [game1.html]
document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('gridContainer');
  const startGameButton = document.getElementById('startGameButton');
  const restartGameButton = document.getElementById('restartGameButton');
  const feedbackMessage = document.getElementById('feedbackMessage');
  const feedbackContainer = document.getElementById('feedbackContainer');
  const difficultyButtons = document.querySelectorAll('.button-container button[data-difficulty]');
  const gridSize = 5; // Define the grid size (5x5)

  let highlightedIndexes = []; // Store highlighted cells
  let userPath = []; // Store user's clicked cells
  let selectedDifficulty = 'easy'; // Default difficulty

  // Difficulty settings: percentage of the grid to highlight
  const difficultySettings = {
    easy: 0.2, // 20%
    medium: 0.3, // 30%
    hard: 0.4// 40%
  };

  // Function to create the grid
  function createGrid() {
    gridContainer.innerHTML = ''; // Clear previous grid
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.index = i; // Store the index
      cell.addEventListener('click', handleCellClick); // Add click event listener
      gridContainer.appendChild(cell);
    }
  }

  // Function to clear feedbackContainer
  function clearFeedbackContainer() {
    feedbackContainer.style.display = 'none';
  }
  // Function to show feedbackContainer
  function showFeedbackContainer() {
    feedbackContainer.style.display = 'flex';
  }
  // Function to highlight random cells
  function highlightCells() {
    const cells = document.querySelectorAll('.grid-cell');
    const numberOfCellsToHighlight = Math.floor(gridSize * gridSize * difficultySettings[selectedDifficulty]);
    highlightedIndexes = getRandomIndexes(numberOfCellsToHighlight);

    highlightedIndexes.forEach(index => {
      cells[index].classList.add('active');
    });

    // After 10 seconds, remove the highlight and start user interaction
    setTimeout(() => {
      cells.forEach(cell => cell.classList.remove('active'));
      clearFeedbackContainer()
      enableUserInteraction();
    }, 3000);
  }


  // Function to get random indexes
  function getRandomIndexes(count) {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  // Enable user interaction by allowing clicks on grid cells
  function enableUserInteraction() {
    userPath = []; // Reset user path
    feedbackMessage.textContent = "Now, click on the cells in the order you remember!";
  }

  // Handle cell click
  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.dataset.index);

    // If cell is already clicked, ignore
    if (userPath.includes(cellIndex) || userPath.length >= highlightedIndexes.length) return;

    userPath.push(cellIndex);

    if (highlightedIndexes.includes(cellIndex)) {
      cell.classList.add('correct');
    } else {
      cell.classList.add('incorrect');
    }

    if (userPath.length === highlightedIndexes.length) {
      checkUserPath();
    }
  }

  // Check user's path against the highlighted cells
  function checkUserPath() {
    let correctCount = 0;
    userPath.forEach(index => {
      if (highlightedIndexes.includes(index)) {
        correctCount++;
      }

    if (correctCount < 3) {
      showFeedbackContainer();
      feedbackMessage.textContent = `You got ${correctCount} out of ${highlightedIndexes.length} correct! 😥`;
    }
    else if (correctCount >= 5) {
      showFeedbackContainer();
      feedbackMessage.textContent = `You got ${correctCount} out of ${highlightedIndexes.length} correct! 😉`;
    } else if (correctCount > 5) {
      showFeedbackContainer();
      feedbackMessage.textContent = `You got ${correctCount} out of ${highlightedIndexes.length} correct! 😲`;
    }
  });

    // showFeedbackContainer();
    // feedbackMessage.textContent = `You got ${correctCount} out of ${highlightedIndexes.length} correct!`;

    // Optionally, you can reset the game after a delay
    setTimeout(() => {
      resetGame();
    }, 5000);
  }

  // Reset the game to start over
  function resetGame() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      cell.classList.remove('correct', 'incorrect');
    });
    feedbackMessage.textContent = "";
  }


  // Difficulty buttons click handler
  difficultyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      selectedDifficulty = event.target.dataset.difficulty;
      feedbackMessage.textContent = `Difficulty set to ${selectedDifficulty.toUpperCase()}. Click 'Start Game' to play.`;
    });
  });

  // Start game button click handler
  startGameButton.addEventListener('click', () => {
    clearFeedbackContainer()
    highlightCells();
    // resetGame()
  });
  // Start game button click handler
  restartGameButton.addEventListener('click', () => {
    // clearFeedbackContainer()
    // highlightCells();
    resetGame()
  });

  // Initialize the grid
  createGrid();
});


