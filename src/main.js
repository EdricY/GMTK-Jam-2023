import "./index.css";
import { Cell } from "./cell";
import { slideL, slideR, slideU, slideD } from "./slide";
import { startTimer } from "./timer";
import { shuffle } from "./shuffle";
import { addToQueue, popFromQueue, queue } from "./queue";
import { getRandEl } from "./rand";


let gameOver = false;
const grid = [
  [null, new Cell(2, 0, 1), new Cell(2, 0, 2), null],
  [new Cell(2, 1, 0), new Cell(2, 1, 1), new Cell(2, 1, 2), new Cell(2, 1, 3)],
  [new Cell(2, 2, 0), new Cell(2, 2, 1), null, null],
  [null, null, null, null],
];

window.grid = grid;

console.log(grid);

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
    const val = popFromQueue();
    if (!val) return;
    grid[r][c] = new Cell(val, r, c);
    setTimeout(() => {
      // slideOptions[nextDir]?.(grid);
      // nextDir = randDir();
      // document.getElementById("direction-msg").innerHTML = nextDir
      // addToQueue(getRandEl([2, 4, 8]))
      
      slideOptions[x.getAttribute("data-dir")]?.(grid);
      addToQueue(getRandEl([2, 4, 8]))

      document.querySelectorAll(".grid-cell").forEach(x =>
        x.setAttribute("data-dir", getRandEl(["⬅️", "➡️", "⬇️", "⬆️", ""]))
      )



      // shuffle(slideOptions);
      // slideOptions[0]() || slideOptions[1]() || slideOptions[2]() || slideOptions[3]()
    }, 0)
  })
)

let nextDir = randDir();
document.getElementById("direction-msg").innerHTML = nextDir

const slideOptions = {
  "⬅️": slideL,
  "➡️": slideR,
  "⬇️": slideD,
  "⬆️": slideU,
};

function randDir() {
  return getRandEl(["⬅️", "➡️", "⬇️", "⬆️"]);
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

function init() {
  document.querySelectorAll(".grid-cell").forEach(x =>
    x.setAttribute("data-dir", getRandEl(["⬅️", "➡️", "⬇️", "⬆️", ""]))
  )
  
  addToQueue(getRandEl([2, 4, 8]))
  addToQueue(getRandEl([2, 4, 8]))
  addToQueue(getRandEl([2, 4, 8]))
}

init();

// timerRecurse();
