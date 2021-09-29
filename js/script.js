let main = document.querySelector(".main");
let field = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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
function moveDown() {
  if (canMoveDown()) {
    for (let i = field.length - 1; i >= 0; i--) {
      for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] === 1) {
          field[i + 1][j] = 1;
          field[i][j] = 0;
        }
      }
    }
  } else {
    fix();
  }
}

function canMoveDown() {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 1) {
        if (i === field.length - 1 || field[i + 1][j] === 2) {
          return false;
        }
      }
    }
  }
  return true;
}
 function rotete(){
   let prevactiv=activeCell.shape;
  activeCell.shape = activeCell.shape[0].map((valeu ,index) =>
  activeCell.shape.map((row) =>row[index]).reverse());
  if(hasmove()){
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
    }
    linesFull = true;
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
      if (activeCell.shape[y][x]===1) {
        field[activeCell.y + y][activeCell.x + x]= activeCell.shape[y][x]
      }
    }
  }
}
function hasmove(){
  for (let y = 0; y < activeCell.shape.length; y++) {
    for (let x = 0; x < activeCell.shape[y].length; x++){
      if (activeCell.shape[y][x] && (field[activeCell.y + y]=== undefined || 
       field[activeCell.y + y][activeCell.x + x]===undefined || 
        field[activeCell.y + y][activeCell.x + x]===2)){
          return true;
      }
     
    }
  
    }
    return false
}
// function scorePoints(count=0){
//    if(removeLines()){
//      count+=1
//  }
// }

function fix() {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 1) {
        field[i][j] = 2;
      }
    }
  }
}
document.addEventListener("keydown", function (ev) {
  if (ev.key === "ArrowLeft") {
    activeCell.x -= 1;
    if(hasmove()){
    activeCell.x += 1;
  }
  } else if (ev.key === "ArrowRight") {
    activeCell.x += 1;
    if(hasmove()){
      activeCell.x -= 1;
    }
  } else if (ev.key === "ArrowDown") {
    activeCell.y += 1;
    if(hasmove()){
      activeCell.y -= 1;
      fix() ;
      activeCell.y = 0;
    }
  }else if (ev.key === "ArrowUp") {
    rotete()
    }
  updateActiveCell();
  draw();
});
updateActiveCell();
draw();

// function goLeft() {
//   if (canGoLeft()) {
//     for (let i = field.length - 1; i >= 0; i--) {
//       for (let j = 0; j < field[i].length; j++) {
//         if (field[i][j] === 1) {
//           field[i][j - 1] = 1;
//           field[i][j] = 0;
//         }
//       }
//     }
//   }
// }

// function canGoLeft() {
//   for (let i = 0; i < field.length; i++) {
//     for (let j = 0; j < field[i].length; j++) {
//       if (field[i][j] === 1) {
//         if (j === 0 || field[i + 1][j] === 2) {
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// }

// function goRight() {
//   if (canGoRight()) {
//     for (let i = field.length - 1; i >= 0; i--) {
//       for (let j = field[i].length - 1; j >= 0; j--) {
//         if (field[i][j] === 1) {
//           field[i][j + 1] = 1;
//           field[i][j] = 0;
//         }
//       }
//     }
//   }
// }

// function canGoRight() {
//   for (let i = 0; i < field.length; i++) {
//     for (let j = 0; j < field[i].length; j++) {
//       if (field[i][j] === 1) {
//         if (j === field[i].length - 1 || field[i + 1][j] === 2) {
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// }
// function startGame() {
//   moveDown();
//   draw();
//   setTimeout(startGame, 500);
// }
// setTimeout(startGame, 500);