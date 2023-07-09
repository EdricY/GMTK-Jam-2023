import "./index.css";
import "./win.css";
import { Cell } from "./cell";
import { slideL, slideR, slideU, slideD } from "./slide";
import { startTimer } from "./timer";
import { shuffle } from "./shuffle";
import { addToQueue, popFromQueue, queue, resetQueue } from "./queue";
import { getRandEl } from "./rand";
import "./levels";
import { levelDialog, levelManager } from "./levels";
import arrowSvg from "./arrow.svg"


const grid = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

window.grid = grid;

function detectWin() {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c]?.val === 2048) return true;
    }
  }
  return false;
}

function detectLose() {
  if (dirQueue.length === 0) return true;
  if (queue.length === 0) return true;
  return false;
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
//     const didMove = slideL(grid);
//     if (didMove) spawnRand()
//   }

//   if (e.key === "ArrowRight") {
//     const didMove = slideR(grid);
//     if (didMove) spawnRand()
//   }

//   if (e.key === "ArrowUp") {
//     const didMove = slideU(grid);
//     if (didMove) spawnRand()
//   }

//   if (e.key === "ArrowDown") {
//     const didMove = slideD(grid);
//     if (didMove) spawnRand()
//   }
// });

document.querySelectorAll(".grid-cell").forEach(x =>
  x.addEventListener("click", () => {
    const r = x.getAttribute("data-r");
    const c = x.getAttribute("data-c");

    if (grid[r][c]) return; // cell is occupied
    const val = popFromQueue();
    if (!val) return;
    grid[r][c] = new Cell(val, r, c);
    setTimeout(() => {
      const didSlide = slideOptions[dirQueue.shift()]?.(grid);
      if (!levelManager.currentLevel) {
        dirQueue.push(randDir());
        addToQueue(getRandEl([2, 2, 4]));
      }
      renderDirQueue();


      if (!levelManager.isClassicMode) {
        if (didSlide && detectWin()) {
          levelManager.completeCurrentLevel();

        } else if (detectLose()) {
          document.getElementById("reset-btn").classList.add("pulse")
        }
      }

    }, 0)
  })
)

function renderDirQueue() {
  document.getElementById("direction-queue").innerHTML =
    dirQueue.map(x => `<div class="${x}">${arrowSvg}</div>`).join("");
}

const slideOptions = {
  "L": slideL,
  "R": slideR,
  "D": slideD,
  "U": slideU,
};

const emojiToLetter = {
  "⬅️": "L",
  "➡️": "R",
  "⬇️": "D",
  "⬆️": "U",
}

function randDir() {
  return getRandEl(["L", "L", "R", "R", "D", "D", "D", "U"]);
}

// function timerRecurse() {
//   if (!gameOver) {
//     startTimer(() => {
//       slideOptions[nextDir](grid);
//       nextDir = randDir();
//       document.getElementById("direction-msg").innerHTML = nextDir;
//       timerRecurse();
//       addToQueue(getRandEl([2,4,8]))
//       addToQueue(getRandEl([2,4,8]))
//       addToQueue(getRandEl([2,4,8]))
//     })
//   }
// }

// document.querySelectorAll(".grid-cell").forEach(x =>
//   x.setAttribute("data-dir", getRandEl(["⬅️", "➡️", "⬇️", "⬆️", ""]))
// )

let dirQueue = [];
export function initClassic() {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c]) grid[r][c].remove();
      grid[r][c] = null;
    }
  }

  spawnRand();
  resetQueue()


  addToQueue(getRandEl([2, 2, 4]));
  addToQueue(getRandEl([2, 2, 4]));
  addToQueue(getRandEl([2, 2, 4]));

  dirQueue = [randDir(), randDir(), randDir(),];
  renderDirQueue();

}

export function initLevel(startingGrid, queueVals, levelDirQueue) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c]) {
        grid[r][c].remove();
        grid[r][c] = null;

      }
      if (startingGrid[r][c]) {
        grid[r][c] = new Cell(startingGrid[r][c], r, c);
      }
    }
  }

  resetQueue();
  queueVals.forEach(x => addToQueue(x));
  dirQueue = levelDirQueue.map(x => emojiToLetter[x]);
  renderDirQueue();
}


initClassic();