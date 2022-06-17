// VARIABLES
// DOM Elements
let overlay = document.getElementById("overlay");
const introBox = document.getElementById("intro-box");
let alertBoxLose = document.querySelector("#you-lose");
let alertBoxWin = document.querySelector("#you-win");
let alertBoxTextLose = document.querySelector("#you-lose > h3");
let alertBoxTextWin = document.querySelector("#you-win > h3");
const tryAgainButton = document.getElementById("try-again");
const startGameButton = document.getElementById("start-game");
const practiceGameButton = document.getElementById("practice");
const boxes = document.querySelectorAll(".game-board div");
const levelText = document.querySelectorAll(".skill > h5"); // Not added yet
const levelDisplay = document.querySelectorAll(".skill"); // Not added yet

// Named Variables
const width = 20; // # of rows
let currentBrain = [2, 1, 0]; // HEAD, BODY, TAIL
let brainLocationIndex = 0;
let skillLocationIndex = 0;
let direction = 1;
let i = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let arrayOfSkills = [
  "url('./img/1. HTML.png')",
  "url('./img/2. CSS.png')",
  "url('./img/3. Javascript.png')",
  "url('./img/4. JQuery.png')",
  "url('./img/5. SQL.png')",
  "url('./img/6. React.png')",
  "url('./img/7. Python.png')",
  "url('./img/8. C++.png')",
];

// FUNCTIONS
// Start Game
startGame = () => {
  overlay.style.display = "none";
  introBox.style.display = "none";
  alertBoxLose.style.display = "none";
  alertBoxWin.style.display = "none";
  currentBrain.forEach((index) => boxes[index].classList.remove("brain")); // removing all Brain pieces
  boxes[skillLocationIndex].style.removeProperty("background-image"); // removing skill images
  clearInterval(interval); // cancels a timed repeating action
  direction = 1;
  intervalTime = 200;
  currentBrain = [2, 1, 0];
  brainLocationIndex = 0;
  arrayOfSkills = [
    "url('./img/1. HTML.png')",
    "url('./img/2. CSS.png')",
    "url('./img/3. Javascript.png')",
    "url('./img/4. JQuery.png')",
    "url('./img/5. SQL.png')",
    "url('./img/6. React.png')",
    "url('./img/7. Python.png')",
    "url('./img/8. C++.png')",
  ];
  currentBrain.forEach((index) => boxes[index].classList.add("brain")); // adding initial Brain
  interval = setInterval(moveOutcomes, intervalTime); // update moveoutcomes by intervalTime
  let i = 0;
  randomSkill();
};
// Outcomes
moveOutcomes = () => {
  // DEATH CONDITION
  if (
    (currentBrain[0] + width >= width * width && direction === width) || // HIT BOTTOM
    (currentBrain[0] % width === width - 1 && direction === 1) || // HIT WALL
    (currentBrain[0] % width === 0 && direction === -1) || // HIT WALL
    (currentBrain[0] - width < 0 && direction === -width) || // HIT TOP
    boxes[currentBrain[0] + direction].classList.contains("brain") // HITS ITSELF
  ) {
    return (
      (overlay.style.display = "block") &&
      (alertBoxLose.style.display = "block") &&
      (alertBoxTextLose.textContent = "Pleassse try again!") &&
      clearInterval(interval)
    );
  }
  // WIN CONDITION
  else if (currentBrain[10]) {
    return (
      (overlay.style.display = "block") &&
      (alertBoxWin.style.display = "block") &&
      (alertBoxTextWin.textContent =
        "You're a massster of Sssoftware Engineering!") &&
      clearInterval(interval)
    );
  }

  // MOVEMENT OF THE BRAIN
  const brainEnd = currentBrain.pop(); // END IS = TAIL PIECE
  boxes[brainEnd].classList.remove("brain"); // MOVEMENT OF THE BRAIN
  currentBrain.unshift(currentBrain[0] + direction); // MOVEMENT IN DIRECTION

  // AQUIRING SKILL
  if (boxes[currentBrain[0]].style.backgroundImage) {
    boxes[currentBrain[0]].style.removeProperty("background-image"); // CLEAR SKILL
    boxes[brainEnd].classList.add("brain"); // ADD CLASS TO STYLE BOX
    currentBrain.push(brainEnd); // ADD TO TAIL
    arrayOfSkills.shift(); // REMOVE SKILL FROM ROTATION
    randomSkill(); // RE-RUN FUNCTION TO GENERATE NEW SKILL
    clearInterval(interval); // RESETS
    intervalTime = intervalTime * speed; // INCREASES SPEED
    interval = setInterval(moveOutcomes, intervalTime); // SETS SPEED WITH MOVEMENT
  }
  boxes[currentBrain[0]].classList.add("brain"); //ADD TO ARRAY
};

// Generating Skill
randomSkill = () => {
  skillLocationIndex = Math.floor(Math.random() * boxes.length); // RANDOM NUMBER
  boxes[skillLocationIndex].style.backgroundImage = arrayOfSkills[i];
  if (boxes[skillLocationIndex].classList.contains("brain")) {
    // ENSURE NO OVERLAP
    boxes[skillLocationIndex].style.removeProperty("background-image") &&
      randomSkill();
  }
};
// Control The Brain
function control(e) {
  if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

// EVENT LISTENERS
document.addEventListener("keyup", control);
startGameButton.addEventListener("click", startGame);
tryAgainButton.addEventListener("click", startGame);
practiceGameButton.addEventListener("click", startGame);
