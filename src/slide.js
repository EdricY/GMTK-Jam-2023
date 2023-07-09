import { levelManager } from "./levels";

export function slideL(grid) {
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
          levelManager.score += cell.val;
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


export function slideR(grid) {
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
          levelManager.score += cell.val;
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


export function slideU(grid) {
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
          levelManager.score += cell.val;
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


export function slideD(grid) {
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
          levelManager.score += cell.val;
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