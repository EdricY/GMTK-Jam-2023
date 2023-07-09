import "./levels.css"
import { initClassic, initLevel as initLevelMain } from "./main";
import winSound from "./ding.mp3"
export const levelDialog = document.getElementById("level-dialog")
const winDialog = document.getElementById("win-dialog")
const creditsDialog = document.getElementById("credits-dialog")
const winsfx = new Audio(winSound);

document.getElementById("reset-btn").addEventListener("click", () => {
  levelManager.initLevel();
  document.getElementById("reset-btn").classList.remove("pulse")
});


document.getElementById("level-btn").addEventListener("click", () => {
  levelDialog.showModal();
});

document.getElementById("level-dialog-close-btn").addEventListener("click", () => {
  levelDialog.close();
})

document.getElementById("close-credits-btn").addEventListener("click", () => {
  creditsDialog.close();
  levelManager.currentLevel = 0;
  initClassic();
})

document.getElementById("classic-btn").addEventListener("click", () => {
  if (levelManager.currentLevel === 0) return;
  levelManager.currentLevel = 0;
  initClassic();
})

document.getElementById("next-level-btn").addEventListener("click", () => {
  winDialog.close();
  levelManager.goToNextLevel();

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

  completeCurrentLevel() {
    this.setLevelSolved(this.currentLevel);
    if (this.currentLevel === NUM_LEVELS) {
      creditsDialog.showModal();
    } else {
      winDialog.showModal();
      winsfx.play();
    }


  }
  setLevelSolved(level) {
    this.solvedLevels.add(level);
    document.querySelector(`.level-select-btn[data-val="${level}"]`)
      .classList.add("solved")
  }

  goToNextLevel() {
    if (this.currentLevel < NUM_LEVELS) {
      this.currentLevel = this.currentLevel + 1;
      this.initLevel()
    }
  }

}

export const levelManager = new LevelManager();
window.levelManager = levelManager


const levelData = [null,
  { //1
    startingGrid: [
      [null, null, null, null],
      [null, null, 1024, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    queueVals: [1024],
    levelDirQueue: ["⬅️"],
  },
  { //2
    startingGrid: [
      [null, null, null, null],
      [null, null, null, 512],
      [null, null, null, null],
      [null, 512, null, 512],
    ],
    queueVals: [512, 2],
    levelDirQueue: ["⬅️", "⬇️"],
  },

  { //3
    startingGrid: [
      [2, 4, null, 256],
      [2, 2, null, null],
      [2, 512, null, null],
      [4, 512, null, 512],
    ],
    queueVals: [256, 2, 2],
    levelDirQueue: ["⬆️", "⬇️", "➡️",],
  },

  { //4
    startingGrid: [
      [256, null, null, 512],
      [null, null, null, null],
      [512, 256, null, null],
      [null, null, null, null],
    ],
    queueVals: [512, 2, 2, 2],
    levelDirQueue: ["➡️", "⬆️", "⬅️", "⬅️"],
  },
  { //5
    startingGrid: [
      [128, 128, 128, 128],
      [128, 128, 128, 128],
      [128, 128, 128, 128],
      [128, 128, 128, null],
    ],
    queueVals: [128, 2, 4, 2],
    levelDirQueue: ["➡️", "⬆️", "⬅️", "⬇️"],
  },
  { //6
    startingGrid: [
      [512, 512, 2, null],
      [null, null, 2, 2],
      [null, null, 2, 2],
      [16, 16, null, null],
    ],
    queueVals: [2, 2, 2, 1024],
    levelDirQueue: ["⬇️", "⬇️", "⬅️", "⬅️"],
  },
  { //7
    startingGrid: [
      [8, 2, 2, 8],
      [2, 2, 2, 2],
      [4, null, null, 4],
      [1024, 2, 2, 1024],
    ],
    queueVals: [2, 2, 2, 2],
    levelDirQueue: ["⬅️", "➡️", "⬆️", "⬅️"],
  },
  { //8
    startingGrid: [
      [256, null, null, null],
      [null, 2, null, null],
      [null, 16, 2, 512],
      [1024, 16, 4, 4],
    ],
    queueVals: [256, 2, 512, 1024],
    levelDirQueue: ["⬅️", "⬆️", "⬅️", "⬆️"],
  },
  { //9
    startingGrid: [
      [1024, 8, null, 1024],
      [2, 4, null, 2],
      [4, 8, null, 4],
      [null, null, null, null],
    ],
    queueVals: [8, 8, 2],
    levelDirQueue: ["⬅️", "⬇️", "⬅️"],
  },
  { //10
    startingGrid: [
      [1024, 512, 256, 128],
      [2, 4, null, null],
      [4, null, null, null],
      [2, null, null, null],
    ],
    queueVals: [128, 2, 2, 2, 2, 4],
    levelDirQueue: ["⬅️", "➡️", "⬇️", "⬅️", "⬅️", "⬅️"],
  },
  { //11
    startingGrid: [
      [8, null, 256, 256],
      [null, 128, 128, 4],
      [null, 128, null, null],
      [2, null, null, 4],
    ],
    queueVals: [128, 2, 256, 2, 256, 1024],
    levelDirQueue: ["⬅️", "⬇️" ,"➡️" ,"⬇️", "⬆️", "⬅️"],
  },
  { //12
    startingGrid: [
      [null, null,null, 256],
      [null, 64,64,null],
      [null, 4, 512,null],
      [null, null, null, null],
    ],
    queueVals: [2, 128, 4, 1024,8],
    levelDirQueue: [ "⬅️","⬆️","➡️","⬇️","⬅️"],
  }, 
  { //13
    startingGrid: [
      [64, null,null, 32],
      [2, 128,256, null],
      [8,null, 8,64],
      [1024, null, 512, null],
    ],
    queueVals: [ 256,4, 256, 2, 2],
    levelDirQueue: [ "⬅️","⬆️", "⬇️","➡️","➡️"],
  },
  { //14
    startingGrid: [
      [null, 32,null, 32],
      [32, 512,1024, 2],
      [null,null, 512,null],
      [32, null, null, null],
    ],
    queueVals: [ 32,64,128, 2],
    levelDirQueue: [ "⬅️","⬆️", "⬇️","➡️"],
  }
  
]

const NUM_LEVELS = levelData.length
