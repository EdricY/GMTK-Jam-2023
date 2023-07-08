
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
    // this.div.style.animationName = "none";
    // setTimeout(() => this.div.style.animationName = null, 0)
  }

  setLoc(r, c) {
    console.log("setloc", r, c)
    // console.log(r, c)
    // const div = document.getElementById("cell-" + this.id);
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

function spawn() {
  const empties = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === null) empties.push([r, c])
    }
  }
  console.log(empties)
  if (empties.length === 0) return;
  const rand = Math.floor(Math.random() * empties.length);
  const rc = empties[rand];
  grid[rc[0]][rc[1]] = new Cell(2, rc[0], rc[1]);
}

function render() {
  // document.querySelectorAll(".cell-inner").forEach(x => {
  //   x.setAttribute("data-dirty", 1)
  // });

  // for (let r = 0; r < grid.length; r++) {
  //   for (let c = 0; c < grid[0].length; c++) {
  //     const cell = grid[r][c];
  //     if (cell) {
  //       const div = document.createElement("div");
  //       div.innerHTML = cell.value;
  //       div.classList.add("cell-inner");
  //       div.classList.add("val-" + cell.value);
  //       div.id = "cell-" + cell.id;
  //       div.style.translate = `calc(${c} * (100% + 10px)) calc(${r} * (100% + 10px))`;
  //       document.getElementById("grid-container").appendChild(div);
  //     }
  //   }
  // }
}

render();


window.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") {
    const didMove = slideL();
    if (didMove) spawn()
  }

  if (e.key === "ArrowRight") {
    const didMove = slideR();
    if (didMove) spawn()
  }

  if (e.key === "ArrowUp") {
    const didMove = slideU();
    if (didMove) spawn()
  }

  if (e.key === "ArrowDown") {
    const didMove = slideD();
    if (didMove) spawn()
  }
})

