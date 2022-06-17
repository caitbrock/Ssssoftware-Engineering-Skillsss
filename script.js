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
let currentBrain = [2, 1, 0]; // head, body, tail
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
  currentBrain.forEach((index) => boxes[index].classList.remove("brain")); // remove all Brain pieces
  boxes[skillLocationIndex].style.removeProperty("background-image"); // remove skill images
  clearInterval(interval); // cancel timed repeating action
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
  currentBrain.forEach((index) => boxes[index].classList.add("brain")); // add initial Brain state
  interval = setInterval(moveOutcomes, intervalTime); // update move outcomes by intervalTime
  let i = 0;
  randomSkill();
};
// Outcomes
moveOutcomes = () => {
  // DEATH CONDITION
  if (
    (currentBrain[0] + width >= width * width && direction === width) || // hit bottom
    (currentBrain[0] % width === width - 1 && direction === 1) || // hit wall
    (currentBrain[0] % width === 0 && direction === -1) || // hit wall
    (currentBrain[0] - width < 0 && direction === -width) || // hit top
    boxes[currentBrain[0] + direction].classList.contains("brain") // hit itself
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
  const brainEnd = currentBrain.pop(); // end is = tail piece
  boxes[brainEnd].classList.remove("brain"); // remove end styling
  currentBrain.unshift(currentBrain[0] + direction); // add to front

  // AQUIRING SKILL
  if (boxes[currentBrain[0]].style.backgroundImage) {
    boxes[currentBrain[0]].style.removeProperty("background-image"); // clear skill image
    boxes[brainEnd].classList.add("brain"); // style tail
    currentBrain.push(brainEnd); // add to tail
    arrayOfSkills.shift(); // remove the skill from the rotation
    randomSkill(); // re-run function
    clearInterval(interval); // reset
    intervalTime = intervalTime * speed; // increase spead
    interval = setInterval(moveOutcomes, intervalTime); // sets spead to move outcome
  }
  boxes[currentBrain[0]].classList.add("brain"); //add to array of the brain
};

// Generating Skill
randomSkill = () => {
  skillLocationIndex = Math.floor(Math.random() * boxes.length); // generate random number
  boxes[skillLocationIndex].style.backgroundImage = arrayOfSkills[i]; // assign box index of random number an image from array
  if (boxes[skillLocationIndex].classList.contains("brain")) {
    // if location is occupied by a piece of the brain
    boxes[skillLocationIndex].style.removeProperty("background-image") && //remove the background image and re-run function
      randomSkill(); // re-run function
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
