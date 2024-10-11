const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (event) => {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !isGameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer); // Add class for color and animation
  cell.style.transform = "scale(1.5)"; // Scale up effect
  setTimeout(() => {
    cell.style.transform = "scale(1)"; // Scale down effect
  }, 300);

  checkResult();
};

const checkResult = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] === "" || board[b] === "" || board[c] === "") {
      continue;
    }
    if (board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.innerText = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    message.innerText = "It's a draw! 🤝";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const resetGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  message.innerText = "";
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("X", "O"); // Remove classes for reset
  });
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);
