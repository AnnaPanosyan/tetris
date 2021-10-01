let main = document.querySelector(".main");
let scoreEl = document.querySelector(".score");
let levelEl = document.querySelector(".level");
let pause = document.querySelector(".pause");
let start = document.querySelector(".start");
let gameOver = document.querySelector(".gameOver");
let moving = document.querySelector(".moving");
let score = 0;
let level = 0;
let speed = 500;
let isPaused = false;
let gameTimer;
let field = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let activeCell = {
  x: 0,
  y: 0,
  shape: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
};

let figures = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],

  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
};

function draw() {
  let cellInnerHTML = "";
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 1) {
        cellInnerHTML += '<div class="cell moving"></div>';
      } else if (field[i][j] === 2) {
        cellInnerHTML += '<div class="cell fix"></div>';
      } else {
        cellInnerHTML += '<div class="cell"></div>';
      }
    }
  }
  main.innerHTML = cellInnerHTML;
}
draw();
function rotete() {
  let prevactiv = activeCell.shape;
  activeCell.shape = activeCell.shape[0].map((valeu, index) =>
    activeCell.shape.map((row) => row[index]).reverse()
  );
  if (hasMove()) {
    activeCell.shape = prevactiv;
  }
}

function removeLines() {
  let linesFull = true;
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] !== 2) {
        linesFull = false;
        break;
      }
    }
    if (linesFull) {
      field.splice(i, 1);
      field.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      score += 10;
    }
    linesFull = true;
  }

  scoreEl.innerHTML = score;
}
function countLevel() {
  if (score >= 50) {
    level += 1;
    score = 0;
    scoreEl.innerHTML = score;
    levelEl.innerHTML = level;
    speed -= 100;
  }
}
function removeActiveCell() {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 1) {
        field[i][j] = 0;
      }
    }
  }
}

function updateActiveCell() {
  removeActiveCell();
  for (let y = 0; y < activeCell.shape.length; y++) {
    for (let x = 0; x < activeCell.shape[y].length; x++) {
      if (activeCell.shape[y][x] === 1) {
        field[activeCell.y + y][activeCell.x + x] = activeCell.shape[y][x];
      }
    }
  }
}

function getNewCell() {
  let prevFigures = "OIZSTL";
  let rand = Math.floor(Math.random() * 6);
  let newCell = figures[prevFigures[rand]];

  return newCell;
}

function hasMove() {
  for (let y = 0; y < activeCell.shape.length; y++) {
    for (let x = 0; x < activeCell.shape[y].length; x++) {
      if (
        activeCell.shape[y][x] &&
        (field[activeCell.y + y] === undefined ||
          field[activeCell.y + y][activeCell.x + x] === undefined ||
          field[activeCell.y + y][activeCell.x + x] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}

function fix() {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 1) {
        field[i][j] = 2;
      }
    }
  }
}
function reset() {
  isPaused = false;
  clearTimeout(gameTimer);
  field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}
function moveCellDown() {
  activeCell.y += 1;
  if (hasMove()) {
    activeCell.y -= 1;
    fix();
    removeLines();
    countLevel();
    activeCell.shape = getNewCell();
    activeCell.x = Math.floor(
      (field[0].length - activeCell.shape[0].length) / 2
    );
    activeCell.y = 0;
    if (hasMove()) {
      reset();
      gameOver.style.display = "block";
    }
  }
}

document.addEventListener("keydown", function (ev) {
  if (ev.key === "ArrowLeft") {
    activeCell.x -= 1;
    if (hasMove()) {
      activeCell.x += 1;
    }
  } else if (ev.key === "ArrowRight") {
    activeCell.x += 1;
    if (hasMove()) {
      activeCell.x -= 1;
    }
  } else if (ev.key === "ArrowDown") {
    moveCellDown();
  } else if (ev.key === "ArrowUp") {
    rotete();
  }
  updateActiveCell();
  draw();
});
pause.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Pause") {
    e.target.innerHTML = "Keep playing";
    gameTimer = setTimeout(startGame, speed);
    clearTimeout(gameTimer);
  } else {
    e.target.innerHTML = "Pause";
  }
  isPaused = !isPaused;
});

start.addEventListener("click", (e) => {
  gameOver.style.display = "none";
  score = 0;
  level = 0;
  speed = 500;
  scoreEl.innerHTML = 0;
  levelEl.innerHTML = 0;
  reset();
  startGame();
  draw();
});

draw();

function startGame() {
  if (!isPaused && gameOver.style.display !== "block") {
    moveCellDown();
    updateActiveCell();
    draw();
  }
  gameTimer = setTimeout(startGame, speed);
}
