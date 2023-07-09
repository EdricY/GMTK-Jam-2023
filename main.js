/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/index.css?");

/***/ }),

/***/ "./src/levels.css":
/*!************************!*\
  !*** ./src/levels.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/levels.css?");

/***/ }),

/***/ "./src/win.css":
/*!*********************!*\
  !*** ./src/win.css ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/win.css?");

/***/ }),

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Cell: () => (/* binding */ Cell)\n/* harmony export */ });\n\r\nlet cellId = 0;\r\nclass Cell {\r\n  constructor(val, r, c) {\r\n    this.id = cellId++;\r\n\r\n    this.div = document.createElement(\"div\");\r\n    this.div.innerHTML = val;\r\n    this.div.classList.add(\"cell-inner\");\r\n    this.div.id = \"cell-\" + this.id;\r\n    this.div.style.translate = `calc(${c} * (100% + 10px)) calc(${r} * (100% + 10px))`;\r\n    document.getElementById(\"grid-container\").appendChild(this.div);\r\n\r\n    this._val = val;\r\n    this.val = val; // trigger setter\r\n  }\r\n\r\n  get val() {\r\n    return this._val;\r\n  }\r\n\r\n  set val(val) {\r\n    this.div.setAttribute(\"data-val\", val);\r\n    this.div.innerHTML = val;\r\n    this._val = val;\r\n  }\r\n\r\n  setLoc(r, c) {\r\n    this.div.style.translate = `calc(${c} * (100% + 10px)) calc(${r} * (100% + 10px))`;\r\n  }\r\n\r\n  setDirty() {\r\n    setTimeout(() => this.remove(), 100)\r\n  }\r\n\r\n  remove() {\r\n    this.div.remove();\r\n  }\r\n}\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/cell.js?");

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   levelDialog: () => (/* binding */ levelDialog),\n/* harmony export */   levelManager: () => (/* binding */ levelManager)\n/* harmony export */ });\n/* harmony import */ var _levels_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levels.css */ \"./src/levels.css\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ \"./src/main.js\");\n\r\n\r\nconst levelDialog = document.getElementById(\"level-dialog\")\r\n\r\ndocument.getElementById(\"reset-btn\").addEventListener(\"click\", () => {\r\n  levelManager.initLevel();\r\n  document.getElementById(\"reset-btn\").classList.remove(\"pulse\")\r\n});\r\n\r\n\r\ndocument.getElementById(\"level-btn\").addEventListener(\"click\", () => {\r\n  levelDialog.showModal();\r\n});\r\n\r\ndocument.getElementById(\"level-dialog-close-btn\").addEventListener(\"click\", () => {\r\n  levelDialog.close();\r\n})\r\n\r\ndocument.getElementById(\"classic-btn\").addEventListener(\"click\", () => {\r\n  if (levelManager.currentLevel === 0) return;\r\n  levelManager.currentLevel = 0;\r\n  (0,_main__WEBPACK_IMPORTED_MODULE_1__.initClassic)();\r\n})\r\n\r\ndocument.getElementById(\"next-level-btn\").addEventListener(\"click\", () => {\r\n  document.getElementById(\"win-dialog\").close();\r\n  levelManager.goToNextLevel();\r\n\r\n})\r\n\r\n\r\n\r\n\r\ndocument.querySelectorAll(\".level-select-btn\").forEach(x =>\r\n  x.addEventListener(\"click\", () => {\r\n    const val = x.getAttribute(\"data-val\");\r\n    levelManager.currentLevel = Number(val);\r\n    levelManager.initLevel();\r\n    levelDialog.close();\r\n\r\n    console.log(val);\r\n\r\n  })\r\n);\r\n\r\nconst NUM_LEVELS = 10;\r\n\r\nclass LevelManager {\r\n  _currentLevel = 0;\r\n  solvedLevels = new Set();\r\n\r\n  get isClassicMode() {\r\n    return this._currentLevel === 0;\r\n  }\r\n\r\n  get currentLevel() {\r\n    return this._currentLevel;\r\n  }\r\n\r\n  set currentLevel(val) {\r\n    this._currentLevel = val;\r\n    if (val === 0) {\r\n      document.getElementById(\"title\").innerHTML = \"Classic Mode\";\r\n    }\r\n    else {\r\n      document.getElementById(\"title\").innerHTML = \"Level \" + val;\r\n    }\r\n  }\r\n\r\n  initLevel() {\r\n    if (this._currentLevel === 0) {\r\n      (0,_main__WEBPACK_IMPORTED_MODULE_1__.initClassic)();\r\n      return;\r\n    }\r\n\r\n    const currentLevelData = levelData[this._currentLevel];\r\n    (0,_main__WEBPACK_IMPORTED_MODULE_1__.initLevel)(currentLevelData.startingGrid, currentLevelData.queueVals, currentLevelData.levelDirQueue)\r\n  }\r\n\r\n  setCurrentLevelSolved() {\r\n    this.setLevelSolved(this.currentLevel)\r\n  }\r\n  setLevelSolved(level) {\r\n    this.solvedLevels.add(level);\r\n    document.querySelector(`.level-select-btn[data-val=\"${level}\"]`)\r\n      .classList.add(\"solved\")\r\n  }\r\n\r\n  goToNextLevel() {\r\n    if (this.currentLevel < NUM_LEVELS) {\r\n      this.currentLevel = this.currentLevel + 1;\r\n      this.initLevel()\r\n    }\r\n\r\n  }\r\n\r\n}\r\n\r\nconst levelManager = new LevelManager();\r\nwindow.levelManager = levelManager\r\n\r\n\r\nconst levelData = [null,\r\n  { //1\r\n    startingGrid: [\r\n      [null, null, null, null],\r\n      [null, null, 1024, null],\r\n      [null, null, null, null],\r\n      [null, null, null, null],\r\n    ],\r\n    queueVals: [1024],\r\n    levelDirQueue: [\"⬅️\"],\r\n  },\r\n  { //2\r\n    startingGrid: [\r\n      [null, null, null, null],\r\n      [null, null, null, 512],\r\n      [null, null, null, null],\r\n      [null, 512, null, 512],\r\n    ],\r\n    queueVals: [512, 2],\r\n    levelDirQueue: [\"⬅️\", \"⬇️\"],\r\n  },\r\n\r\n  { //3\r\n    startingGrid: [\r\n      [2, 4, null, 256],\r\n      [2, 2, null, null],\r\n      [2, 512, null, null],\r\n      [4, 512, null, 512],\r\n    ],\r\n    queueVals: [256, 2, 2],\r\n    levelDirQueue: [\"⬆️\", \"⬇️\", \"➡️\",],\r\n  },\r\n\r\n  { //4\r\n    startingGrid: [\r\n      [256, null, null, 512],\r\n      [null, null, null, null],\r\n      [512, 256, null, null],\r\n      [null, null, null, null],\r\n    ],\r\n    queueVals: [512, 2, 2, 2],\r\n    levelDirQueue: [\"➡️\", \"⬆️\", \"⬅️\", \"⬅️\"],\r\n  },\r\n  { //5\r\n    startingGrid: [\r\n      [128, 128, 128, 128],\r\n      [128, 128, 128, 128],\r\n      [128, 128, 128, 128],\r\n      [128, 128, 128, null],\r\n    ],\r\n    queueVals: [128, 2, 4, 2],\r\n    levelDirQueue: [\"➡️\", \"⬆️\", \"⬅️\", \"⬇️\"],\r\n  },\r\n  { //6\r\n    startingGrid: [\r\n      [512, 512, 2, null],\r\n      [null, null, 2, 2],\r\n      [null, null, 2, 2],\r\n      [16, 16, null, null],\r\n    ],\r\n    queueVals: [2, 2, 2, 1024],\r\n    levelDirQueue: [\"⬇️\", \"⬇️\", \"⬅️\", \"⬅️\"],\r\n  },\r\n  { //7\r\n    startingGrid: [\r\n      [8, 2, 2, 8],\r\n      [2, 2, 2, 2],\r\n      [4, null, null, 4],\r\n      [1024, 2, 2, 1024],\r\n    ],\r\n    queueVals: [2, 2, 2, 2],\r\n    levelDirQueue: [\"⬅️\", \"➡️\", \"⬆️\", \"⬅️\"],\r\n  },\r\n\r\n  { //8\r\n    startingGrid: [\r\n      [1024, 512, 256, 128],\r\n      [2, 4, null, null],\r\n      [4, null, null, null],\r\n      [2, null, null, null],\r\n    ],\r\n    queueVals: [128, 2, 2, 2, 4, 2],\r\n    levelDirQueue: [\"⬅️\", \"➡️\", \"⬇️\", \"⬅️\", \"⬅️\", \"⬅️\"],\r\n  },\r\n\r\n  { //10\r\n    startingGrid: [\r\n      [1024, 8, null, 1024],\r\n      [2, 4, null, 2],\r\n      [4, 8, null, 4],\r\n      [null, null, null, null],\r\n    ],\r\n    queueVals: [8, 8, 2],\r\n    levelDirQueue: [\"⬅️\", \"⬇️\", \"⬅️\"],\r\n  },\r\n]\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/levels.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initClassic: () => (/* binding */ initClassic),\n/* harmony export */   initLevel: () => (/* binding */ initLevel)\n/* harmony export */ });\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _win_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./win.css */ \"./src/win.css\");\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\n/* harmony import */ var _slide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slide */ \"./src/slide.js\");\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timer */ \"./src/timer.js\");\n/* harmony import */ var _shuffle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shuffle */ \"./src/shuffle.js\");\n/* harmony import */ var _queue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./queue */ \"./src/queue.js\");\n/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rand */ \"./src/rand.js\");\n/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./levels */ \"./src/levels.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst winDialog = document.getElementById(\"win-dialog\")\r\n\r\n\r\nconst grid = [\r\n  [null, null, null, null],\r\n  [null, null, null, null],\r\n  [null, null, null, null],\r\n  [null, null, null, null],\r\n];\r\n\r\nwindow.grid = grid;\r\n\r\nfunction detectWin() {\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = 0; c < grid[0].length; c++) {\r\n      if (grid[r][c]?.val === 2048) return true;\r\n    }\r\n  }\r\n  return false;\r\n}\r\n\r\nfunction detectLose() {\r\n  if (dirQueue.length === 0) return true;\r\n  if (_queue__WEBPACK_IMPORTED_MODULE_6__.queue.length === 0) return true;\r\n  return false;\r\n}\r\n\r\n\r\nfunction spawnRand() {\r\n  const empties = [];\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = 0; c < grid[0].length; c++) {\r\n      if (grid[r][c] === null) empties.push([r, c])\r\n    }\r\n  }\r\n  if (empties.length === 0) return;\r\n  const rand = Math.floor(Math.random() * empties.length);\r\n  const rc = empties[rand];\r\n  grid[rc[0]][rc[1]] = new _cell__WEBPACK_IMPORTED_MODULE_2__.Cell(2, rc[0], rc[1]);\r\n}\r\n\r\n\r\n// window.addEventListener(\"keydown\", e => {\r\n//   if (e.key === \"ArrowLeft\") {\r\n//     const didMove = slideL(grid);\r\n//     if (didMove) spawnRand()\r\n//   }\r\n\r\n//   if (e.key === \"ArrowRight\") {\r\n//     const didMove = slideR(grid);\r\n//     if (didMove) spawnRand()\r\n//   }\r\n\r\n//   if (e.key === \"ArrowUp\") {\r\n//     const didMove = slideU(grid);\r\n//     if (didMove) spawnRand()\r\n//   }\r\n\r\n//   if (e.key === \"ArrowDown\") {\r\n//     const didMove = slideD(grid);\r\n//     if (didMove) spawnRand()\r\n//   }\r\n// });\r\n\r\ndocument.querySelectorAll(\".grid-cell\").forEach(x =>\r\n  x.addEventListener(\"click\", () => {\r\n    const r = x.getAttribute(\"data-r\");\r\n    const c = x.getAttribute(\"data-c\");\r\n\r\n    if (grid[r][c]) return; // cell is occupied\r\n    const val = (0,_queue__WEBPACK_IMPORTED_MODULE_6__.popFromQueue)();\r\n    if (!val) return;\r\n    grid[r][c] = new _cell__WEBPACK_IMPORTED_MODULE_2__.Cell(val, r, c);\r\n    setTimeout(() => {\r\n      const didSlide = slideOptions[dirQueue.shift()]?.(grid);\r\n      if (!_levels__WEBPACK_IMPORTED_MODULE_8__.levelManager.currentLevel) {\r\n        dirQueue.push(randDir());\r\n        (0,_queue__WEBPACK_IMPORTED_MODULE_6__.addToQueue)((0,_rand__WEBPACK_IMPORTED_MODULE_7__.getRandEl)([2, 2, 4]));\r\n      }\r\n      document.getElementById(\"direction-queue\").innerHTML =\r\n        dirQueue.map(x => `<div>${x}</div>`).join(\"\");\r\n\r\n\r\n      if (!_levels__WEBPACK_IMPORTED_MODULE_8__.levelManager.isClassicMode) {\r\n        if (didSlide && detectWin()) {\r\n          _levels__WEBPACK_IMPORTED_MODULE_8__.levelManager.setCurrentLevelSolved();\r\n          winDialog.showModal()\r\n        } else if (detectLose()) {\r\n          document.getElementById(\"reset-btn\").classList.add(\"pulse\")\r\n        }\r\n      }\r\n\r\n    }, 0)\r\n  })\r\n)\r\n\r\n\r\nconst slideOptions = {\r\n  \"⬅️\": _slide__WEBPACK_IMPORTED_MODULE_3__.slideL,\r\n  \"➡️\": _slide__WEBPACK_IMPORTED_MODULE_3__.slideR,\r\n  \"⬇️\": _slide__WEBPACK_IMPORTED_MODULE_3__.slideD,\r\n  \"⬆️\": _slide__WEBPACK_IMPORTED_MODULE_3__.slideU,\r\n};\r\n\r\nfunction randDir() {\r\n  return (0,_rand__WEBPACK_IMPORTED_MODULE_7__.getRandEl)([\"⬅️\", \"➡️\", \"⬇️\", \"⬆️\"]);\r\n}\r\n\r\n// function timerRecurse() {\r\n//   if (!gameOver) {\r\n//     startTimer(() => {\r\n//       slideOptions[nextDir](grid);\r\n//       nextDir = randDir();\r\n//       document.getElementById(\"direction-msg\").innerHTML = nextDir;\r\n//       timerRecurse();\r\n//       addToQueue(getRandEl([2,4,8]))\r\n//       addToQueue(getRandEl([2,4,8]))\r\n//       addToQueue(getRandEl([2,4,8]))\r\n//     })\r\n//   }\r\n// }\r\n\r\n// document.querySelectorAll(\".grid-cell\").forEach(x =>\r\n//   x.setAttribute(\"data-dir\", getRandEl([\"⬅️\", \"➡️\", \"⬇️\", \"⬆️\", \"\"]))\r\n// )\r\n\r\nlet dirQueue = [];\r\nfunction initClassic() {\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = 0; c < grid[0].length; c++) {\r\n      if (grid[r][c]) grid[r][c].remove();\r\n      grid[r][c] = null;\r\n    }\r\n  }\r\n\r\n  spawnRand();\r\n  (0,_queue__WEBPACK_IMPORTED_MODULE_6__.resetQueue)()\r\n\r\n\r\n  ;(0,_queue__WEBPACK_IMPORTED_MODULE_6__.addToQueue)((0,_rand__WEBPACK_IMPORTED_MODULE_7__.getRandEl)([2, 2, 4]));\r\n  (0,_queue__WEBPACK_IMPORTED_MODULE_6__.addToQueue)((0,_rand__WEBPACK_IMPORTED_MODULE_7__.getRandEl)([2, 2, 4]));\r\n  (0,_queue__WEBPACK_IMPORTED_MODULE_6__.addToQueue)((0,_rand__WEBPACK_IMPORTED_MODULE_7__.getRandEl)([2, 2, 4]));\r\n\r\n  dirQueue = [randDir(), randDir(), randDir(),];\r\n  document.getElementById(\"direction-queue\").innerHTML =\r\n    dirQueue.map(x => `<div>${x}</div>`).join(\"\");\r\n\r\n}\r\n\r\nfunction initLevel(startingGrid, queueVals, levelDirQueue) {\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = 0; c < grid[0].length; c++) {\r\n      if (grid[r][c]) {\r\n        grid[r][c].remove();\r\n        grid[r][c] = null;\r\n\r\n      }\r\n      if (startingGrid[r][c]) {\r\n        grid[r][c] = new _cell__WEBPACK_IMPORTED_MODULE_2__.Cell(startingGrid[r][c], r, c);\r\n      }\r\n    }\r\n  }\r\n\r\n  (0,_queue__WEBPACK_IMPORTED_MODULE_6__.resetQueue)();\r\n  queueVals.forEach(x => (0,_queue__WEBPACK_IMPORTED_MODULE_6__.addToQueue)(x));\r\n  dirQueue = [...levelDirQueue];\r\n  document.getElementById(\"direction-queue\").innerHTML =\r\n    dirQueue.map(x => `<div>${x}</div>`).join(\"\");\r\n}\r\n\r\n\r\ninitClassic();\r\n\r\n\r\n// timerRecurse();\r\n\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/main.js?");

/***/ }),

/***/ "./src/queue.js":
/*!**********************!*\
  !*** ./src/queue.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToQueue: () => (/* binding */ addToQueue),\n/* harmony export */   popFromQueue: () => (/* binding */ popFromQueue),\n/* harmony export */   queue: () => (/* binding */ queue),\n/* harmony export */   resetQueue: () => (/* binding */ resetQueue)\n/* harmony export */ });\nconst queue = [];\r\nconst qDiv = document.getElementById(\"queue-container\");\r\n\r\nfunction resetQueue() {\r\n  while (queue.length) {\r\n    queue.pop();\r\n    qDiv.removeChild(qDiv.firstChild);\r\n  }\r\n}\r\n\r\nfunction addToQueue(val) {\r\n  // if (queue.length >= 4) return;\r\n  queue.unshift(val);\r\n  const div = document.createElement(\"div\");\r\n  div.innerHTML = val;\r\n  div.setAttribute(\"data-val\", val)\r\n  div.classList.add(\"queue-cell\");\r\n  qDiv.appendChild(div);\r\n}\r\n\r\nfunction popFromQueue() {\r\n  const val = queue.pop();\r\n  if (!val) return null;\r\n  qDiv.firstChild.classList.add(\"shrink\");\r\n  qDiv.firstChild.addEventListener(\"animationend\", () => {\r\n    qDiv.removeChild(qDiv.firstChild);\r\n  }, { once: true })\r\n  return val;\r\n}\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/queue.js?");

/***/ }),

/***/ "./src/rand.js":
/*!*********************!*\
  !*** ./src/rand.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRandEl: () => (/* binding */ getRandEl)\n/* harmony export */ });\n\r\nfunction getRandEl(arr) {\r\n  return arr[Math.floor(arr.length * Math.random())]; \r\n}\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/rand.js?");

/***/ }),

/***/ "./src/shuffle.js":
/*!************************!*\
  !*** ./src/shuffle.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shuffle: () => (/* binding */ shuffle)\n/* harmony export */ });\nfunction shuffle(array) {\r\n  let currentIndex = array.length,  randomIndex;\r\n\r\n  // While there remain elements to shuffle.\r\n  while (currentIndex != 0) {\r\n\r\n    // Pick a remaining element.\r\n    randomIndex = Math.floor(Math.random() * currentIndex);\r\n    currentIndex--;\r\n\r\n    // And swap it with the current element.\r\n    [array[currentIndex], array[randomIndex]] = [\r\n      array[randomIndex], array[currentIndex]];\r\n  }\r\n\r\n  return array;\r\n}\r\n\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/shuffle.js?");

/***/ }),

/***/ "./src/slide.js":
/*!**********************!*\
  !*** ./src/slide.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   slideD: () => (/* binding */ slideD),\n/* harmony export */   slideL: () => (/* binding */ slideL),\n/* harmony export */   slideR: () => (/* binding */ slideR),\n/* harmony export */   slideU: () => (/* binding */ slideU)\n/* harmony export */ });\n\r\nfunction slideL(grid) {\r\n  let didMove = false;\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = 0; c < grid[0].length; c++) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search to right for merge\r\n      for (let i = c + 1; i < grid[0].length; i++) {\r\n        if (grid[r][i] && grid[r][i]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[r][i];\r\n          grid[r][i] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[r][i]) break; // end of empty space\r\n      }\r\n\r\n      // slide left\r\n      let slideEnd = c;\r\n      for (let i = c - 1; i >= 0; i--) {\r\n        if (grid[r][i]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[r][slideEnd] = cell;\r\n      mergedCell?.setLoc(r, slideEnd)\r\n      cell?.setLoc(r, slideEnd);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\r\n\r\n\r\nfunction slideR(grid) {\r\n  let didMove = false;\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = grid[0].length - 1; c >= 0; c--) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search to left for merge\r\n      for (let i = c - 1; i >= 0; i--) {\r\n        if (grid[r][i] && grid[r][i]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[r][i];\r\n          grid[r][i] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[r][i]) break; // end of empty space\r\n      }\r\n\r\n      // slide right\r\n      let slideEnd = c;\r\n      for (let i = c + 1; i < grid[0].length; i++) {\r\n        if (grid[r][i]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[r][slideEnd] = cell;\r\n      mergedCell?.setLoc(r, slideEnd)\r\n      cell?.setLoc(r, slideEnd);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\r\n\r\n\r\nfunction slideU(grid) {\r\n  let didMove = false;\r\n  for (let c = 0; c < grid[0].length; c++) {\r\n    for (let r = 0; r < grid.length; r++) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search downward for merge\r\n      for (let i = r + 1; i < grid.length; i++) {\r\n        if (grid[i][c] && grid[i][c]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[i][c];\r\n          grid[i][c] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[i][c]) break; // end of empty space\r\n      }\r\n\r\n      // slide up\r\n      let slideEnd = r;\r\n      for (let i = r - 1; i >= 0; i--) {\r\n        if (grid[i][c]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[slideEnd][c] = cell;\r\n      mergedCell?.setLoc(slideEnd, c)\r\n      cell?.setLoc(slideEnd, c);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\r\n\r\n\r\nfunction slideD(grid) {\r\n  let didMove = false;\r\n  for (let c = 0; c < grid[0].length; c++) {\r\n    for (let r = grid.length - 1; r >= 0; r--) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search upward for merge\r\n      for (let i = r - 1; i >= 0; i--) {\r\n        if (grid[i][c] && grid[i][c]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[i][c];\r\n          grid[i][c] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[i][c]) break; // end of empty space\r\n      }\r\n\r\n      // slide down\r\n      let slideEnd = r;\r\n      for (let i = r + 1; i < grid.length; i++) {\r\n        if (grid[i][c]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[slideEnd][c] = cell;\r\n      mergedCell?.setLoc(slideEnd, c)\r\n      cell?.setLoc(slideEnd, c);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/slide.js?");

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startTimer: () => (/* binding */ startTimer)\n/* harmony export */ });\n\r\nconst div = document.getElementById(\"timer\");\r\n\r\nfunction startTimer(callback) {\r\n  div.classList.remove(\"ticking\")\r\n  setTimeout(() => div.classList.add(\"ticking\"), 0);\r\n\r\n  div.addEventListener(\"transitionend\", () => {\r\n    callback?.();\r\n  }, {once: true})\r\n}\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/timer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;