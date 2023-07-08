import "./index.css";

import { shuffle } from "./shuffle";

let cellId = 0;
class Cell {
  constructor(val, r, c) {
    this.id = cellId++;

    this.div = document.createElement("div");
    this.div.innerHTML = val;
    this.div.classList.add("cell-inner");
    this.div.id = "cell-" + this.id;
    this.div.style.translate = `calc(${c} * (100% + 10px)) calc(${r} * (100% + 10px))`;
    document.getElementById("grid-container").appendChild(this.div);

    this._val = val;
    this.val = val; // trigger setter
  }

  get val() {
    return this._val;
  }

  set val(val) {
    this.div.setAttribute("data-val", val);
    this.div.innerHTML = val;
    this._val = val;
  }

  setLoc(r, c) {
    this.div.style.translate = `calc(${c} * (100% + 10px)) calc(${r} * (100% + 10px))`;
  }

  setDirty() {
    setTimeout(() => this.div.remove(), 100)
  }
}

const grid = [
  [null, new Cell(2, 0, 1), new Cell(2, 0, 2), null],
  [new Cell(2, 1, 0), new Cell(2, 1, 1), new Cell(2, 1, 2), new Cell(2, 1, 3)],
  [new Cell(2, 2, 0), new Cell(2, 2, 1), null, null],
  [null, null, null, null],
];

window.grid = grid;

console.log(grid)
function init() {
}

function myComponent() {
  const divElement = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.innerText = 'Nice';
  const img = document.createElement('img');
  img.src = "./assets/asdf.png";
  divElement.appendChild(h2);
  divElement.appendChild(img);
  return divElement;
}

function slideL() {
  let didMove = false;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let cell = grid[r][c];
      if (!cell) continue;
      let mergedCell;
      // search to right for merge
      for (let i = c + 1; i < grid[0].length; i++) {
        if (grid[r][i] && grid[r][i]?.val === cell.val) {
          // merge
          didMove = true;
          mergedCell = grid[r][i];
          grid[r][i] = null;
          cell.val = cell.val + cell.val;
          break;
        }
        if (grid[r][i]) break; // end of empty space
      }

      // slide left
      let slideEnd = c;
      for (let i = c - 1; i >= 0; i--) {
        if (grid[r][i]) {
          // end of empty space
          break;
        }
        didMove = true;
        slideEnd = i;
      }
      grid[r][c] = null;
      grid[r][slideEnd] = cell;
      mergedCell?.setLoc(r, slideEnd)
      cell?.setLoc(r, slideEnd);
      mergedCell?.setDirty();
    }
  }
  return didMove;
}


function slideR() {
  let didMove = false;
  for (let r = 0; r < grid.length; r++) {
    for (let c = grid[0].length - 1; c >= 0; c--) {
      let cell = grid[r][c];
      if (!cell) continue;
      let mergedCell;
      // search to left for merge
      for (let i = c - 1; i >= 0; i--) {
        if (grid[r][i] && grid[r][i]?.val === cell.val) {
          // merge
          didMove = true;
          mergedCell = grid[r][i];
          grid[r][i] = null;
          cell.val = cell.val + cell.val;
          break;
        }
        if (grid[r][i]) break; // end of empty space
      }

      // slide right
      let slideEnd = c;
      for (let i = c + 1; i < grid[0].length; i++) {
        if (grid[r][i]) {
          // end of empty space
          break;
        }
        didMove = true;
        slideEnd = i;
      }
      grid[r][c] = null;
      grid[r][slideEnd] = cell;
      mergedCell?.setLoc(r, slideEnd)
      cell?.setLoc(r, slideEnd);
      mergedCell?.setDirty();
    }
  }
  return didMove;
}


function slideU() {
  let didMove = false;
  for (let c = 0; c < grid[0].length; c++) {
    for (let r = 0; r < grid.length; r++) {
      let cell = grid[r][c];
      if (!cell) continue;
      let mergedCell;
      // search downward for merge
      for (let i = r + 1; i < grid.length; i++) {
        if (grid[i][c] && grid[i][c]?.val === cell.val) {
          // merge
          didMove = true;
          mergedCell = grid[i][c];
          grid[i][c] = null;
          cell.val = cell.val + cell.val;
          break;
        }
        if (grid[i][c]) break; // end of empty space
      }

      // slide up
      let slideEnd = r;
      for (let i = r - 1; i >= 0; i--) {
        if (grid[i][c]) {
          // end of empty space
          break;
        }
        didMove = true;
        slideEnd = i;
      }
      grid[r][c] = null;
      grid[slideEnd][c] = cell;
      mergedCell?.setLoc(slideEnd, c)
      cell?.setLoc(slideEnd, c);
      mergedCell?.setDirty();
    }
  }
  return didMove;
}


function slideD() {
  let didMove = false;
  for (let c = 0; c < grid[0].length; c++) {
    for (let r = grid.length - 1; r >= 0; r--) {
      let cell = grid[r][c];
      if (!cell) continue;
      let mergedCell;
      // search upward for merge
      for (let i = r - 1; i >= 0; i--) {
        if (grid[i][c] && grid[i][c]?.val === cell.val) {
          // merge
          didMove = true;
          mergedCell = grid[i][c];
          grid[i][c] = null;
          cell.val = cell.val + cell.val;
          break;
        }
        if (grid[i][c]) break; // end of empty space
      }

      // slide down
      let slideEnd = r;
      for (let i = r + 1; i < grid.length; i++) {
        if (grid[i][c]) {
          // end of empty space
          break;
        }
        didMove = true;
        slideEnd = i;
      }
      grid[r][c] = null;
      grid[slideEnd][c] = cell;
      mergedCell?.setLoc(slideEnd, c)
      cell?.setLoc(slideEnd, c);
      mergedCell?.setDirty();
    }
  }
  return didMove;
}

function spawnRand() {
  const empties = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === null) empties.push([r, c])
    }
  }
  if (empties.length === 0) return;
  const rand = Math.floor(Math.random() * empties.length);
  const rc = empties[rand];
  grid[rc[0]][rc[1]] = new Cell(2, rc[0], rc[1]);
}


// window.addEventListener("keydown", e => {
//   if (e.key === "ArrowLeft") {
//     const didMove = slideL();
//     if (didMove) spawnRand()
//   }

//   if (e.key === "ArrowRight") {
//     const didMove = slideR();
//     if (didMove) spawnRand()
//   }

//   if (e.key === "ArrowUp") {
//     const didMove = slideU();
//     if (didMove) spawnRand()
//   }

//   if (e.key === "ArrowDown") {
//     const didMove = slideD();
//     if (didMove) spawnRand()
//   }
// });

document.querySelectorAll(".grid-cell").forEach(x =>
  x.addEventListener("click", () => {
    const r = x.getAttribute("data-r");
    const c = x.getAttribute("data-c");

    if (grid[r][c]) return; // cell is occupied

    grid[r][c] = new Cell(2, r, c);
    setTimeout(() => {
      slideOptions[nextDir]();
      nextDir = randDir();
      document.getElementById("direction-msg").innerHTML = nextDir

      // shuffle(slideOptions);
      // slideOptions[0]() || slideOptions[1]() || slideOptions[2]() || slideOptions[3]()
    }, 0)
  })
)

let nextDir = randDir();
document.getElementById("direction-msg").innerHTML = nextDir

const slideOptions = {
  "LEFT": slideL,
  "RIGHT": slideR,
  "DOWN": slideD,
  "UP": slideU,
}

function randDir() {
  return ["LEFT", "RIGHT", "DOWN", "UP"][Math.floor(Math.random() * 4)];
}

