import "./levels.css"
import { initClassic, initLevel as initLevelMain } from "./main";
export const levelDialog = document.getElementById("level-dialog")

document.getElementById("reset-btn").addEventListener("click", () => {
  levelManager.initLevel();
});


document.getElementById("level-btn").addEventListener("click", () => {
  levelDialog.showModal();
});

document.getElementById("level-dialog-close-btn").addEventListener("click", () => {
  levelDialog.close();
})

document.getElementById("classic-btn").addEventListener("click", () => {
  if (levelManager.currentLevel === 0) return;
  levelManager.currentLevel = 0;
  initClassic();

})


document.querySelectorAll(".level-select-btn").forEach(x =>
  x.addEventListener("click", () => {
    const val = x.getAttribute("data-val");
    levelManager.currentLevel = Number(val);
    levelManager.initLevel();
    levelDialog.close();

    console.log(val);

  })
);


class LevelManager {
  _currentLevel = 0;
  solvedLevels = new Set();

  get isClassicMode() {
    return this._currentLevel === 0;
  }

  get currentLevel() {
    return this._currentLevel;
  }

  set currentLevel(val) {
    this._currentLevel = val;
    if (val === 0) {
      document.getElementById("title").innerHTML = "Classic Mode";
    }
    else {
      document.getElementById("title").innerHTML = "Level " + val;
    }
  }

  initLevel() {
    if (this._currentLevel === 0) {
      initClassic();
      return;
    }

    const currentLevelData = levelData[this._currentLevel];
    initLevelMain(currentLevelData.startingGrid, currentLevelData.queueVals, currentLevelData.levelDirQueue)
  }

  setCurrentLevelSolved() {
    this.setLevelSolved(this.currentLevel)
  }
  setLevelSolved(level) {
    this.solvedLevels.add(level);
    document.querySelector(`.level-select-btn[data-val="${level}"]`)
      .classList.add("solved")
  }

}

export const levelManager = new LevelManager();
window.levelManager = levelManager


const levelData = [null,
  {
    startingGrid: [
      [null, null, null, null],
      [null, null, 1024, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    queueVals: [1024],
    levelDirQueue: ["⬅️"],
  }
]