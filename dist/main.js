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

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _shuffle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shuffle */ \"./src/shuffle.js\");\n\r\n\r\n\r\n\r\nlet cellId = 0;\r\nclass Cell {\r\n  constructor(val, r, c) {\r\n    this.id = cellId++;\r\n\r\n    this.div = document.createElement(\"div\");\r\n    this.div.innerHTML = val;\r\n    this.div.classList.add(\"cell-inner\");\r\n    this.div.id = \"cell-\" + this.id;\r\n    this.div.style.translate = `calc(${c} * (100% + 10px)) calc(${r} * (100% + 10px))`;\r\n    document.getElementById(\"grid-container\").appendChild(this.div);\r\n\r\n    this._val = val;\r\n    this.val = val; // trigger setter\r\n  }\r\n\r\n  get val() {\r\n    return this._val;\r\n  }\r\n\r\n  set val(val) {\r\n    this.div.setAttribute(\"data-val\", val);\r\n    this.div.innerHTML = val;\r\n    this._val = val;\r\n  }\r\n\r\n  setLoc(r, c) {\r\n    this.div.style.translate = `calc(${c} * (100% + 10px)) calc(${r} * (100% + 10px))`;\r\n  }\r\n\r\n  setDirty() {\r\n    setTimeout(() => this.div.remove(), 100)\r\n  }\r\n}\r\n\r\nconst grid = [\r\n  [null, new Cell(2, 0, 1), new Cell(2, 0, 2), null],\r\n  [new Cell(2, 1, 0), new Cell(2, 1, 1), new Cell(2, 1, 2), new Cell(2, 1, 3)],\r\n  [new Cell(2, 2, 0), new Cell(2, 2, 1), null, null],\r\n  [null, null, null, null],\r\n];\r\n\r\nwindow.grid = grid;\r\n\r\nconsole.log(grid)\r\nfunction init() {\r\n}\r\n\r\nfunction myComponent() {\r\n  const divElement = document.createElement('div');\r\n  const h2 = document.createElement('h2');\r\n  h2.innerText = 'Nice';\r\n  const img = document.createElement('img');\r\n  img.src = \"./assets/asdf.png\";\r\n  divElement.appendChild(h2);\r\n  divElement.appendChild(img);\r\n  return divElement;\r\n}\r\n\r\nfunction slideL() {\r\n  let didMove = false;\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = 0; c < grid[0].length; c++) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search to right for merge\r\n      for (let i = c + 1; i < grid[0].length; i++) {\r\n        if (grid[r][i] && grid[r][i]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[r][i];\r\n          grid[r][i] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[r][i]) break; // end of empty space\r\n      }\r\n\r\n      // slide left\r\n      let slideEnd = c;\r\n      for (let i = c - 1; i >= 0; i--) {\r\n        if (grid[r][i]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[r][slideEnd] = cell;\r\n      mergedCell?.setLoc(r, slideEnd)\r\n      cell?.setLoc(r, slideEnd);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\r\n\r\n\r\nfunction slideR() {\r\n  let didMove = false;\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = grid[0].length - 1; c >= 0; c--) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search to left for merge\r\n      for (let i = c - 1; i >= 0; i--) {\r\n        if (grid[r][i] && grid[r][i]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[r][i];\r\n          grid[r][i] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[r][i]) break; // end of empty space\r\n      }\r\n\r\n      // slide right\r\n      let slideEnd = c;\r\n      for (let i = c + 1; i < grid[0].length; i++) {\r\n        if (grid[r][i]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[r][slideEnd] = cell;\r\n      mergedCell?.setLoc(r, slideEnd)\r\n      cell?.setLoc(r, slideEnd);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\r\n\r\n\r\nfunction slideU() {\r\n  let didMove = false;\r\n  for (let c = 0; c < grid[0].length; c++) {\r\n    for (let r = 0; r < grid.length; r++) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search downward for merge\r\n      for (let i = r + 1; i < grid.length; i++) {\r\n        if (grid[i][c] && grid[i][c]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[i][c];\r\n          grid[i][c] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[i][c]) break; // end of empty space\r\n      }\r\n\r\n      // slide up\r\n      let slideEnd = r;\r\n      for (let i = r - 1; i >= 0; i--) {\r\n        if (grid[i][c]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[slideEnd][c] = cell;\r\n      mergedCell?.setLoc(slideEnd, c)\r\n      cell?.setLoc(slideEnd, c);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\r\n\r\n\r\nfunction slideD() {\r\n  let didMove = false;\r\n  for (let c = 0; c < grid[0].length; c++) {\r\n    for (let r = grid.length - 1; r >= 0; r--) {\r\n      let cell = grid[r][c];\r\n      if (!cell) continue;\r\n      let mergedCell;\r\n      // search upward for merge\r\n      for (let i = r - 1; i >= 0; i--) {\r\n        if (grid[i][c] && grid[i][c]?.val === cell.val) {\r\n          // merge\r\n          didMove = true;\r\n          mergedCell = grid[i][c];\r\n          grid[i][c] = null;\r\n          cell.val = cell.val + cell.val;\r\n          break;\r\n        }\r\n        if (grid[i][c]) break; // end of empty space\r\n      }\r\n\r\n      // slide down\r\n      let slideEnd = r;\r\n      for (let i = r + 1; i < grid.length; i++) {\r\n        if (grid[i][c]) {\r\n          // end of empty space\r\n          break;\r\n        }\r\n        didMove = true;\r\n        slideEnd = i;\r\n      }\r\n      grid[r][c] = null;\r\n      grid[slideEnd][c] = cell;\r\n      mergedCell?.setLoc(slideEnd, c)\r\n      cell?.setLoc(slideEnd, c);\r\n      mergedCell?.setDirty();\r\n    }\r\n  }\r\n  return didMove;\r\n}\r\n\r\nfunction spawnRand() {\r\n  const empties = [];\r\n  for (let r = 0; r < grid.length; r++) {\r\n    for (let c = 0; c < grid[0].length; c++) {\r\n      if (grid[r][c] === null) empties.push([r, c])\r\n    }\r\n  }\r\n  if (empties.length === 0) return;\r\n  const rand = Math.floor(Math.random() * empties.length);\r\n  const rc = empties[rand];\r\n  grid[rc[0]][rc[1]] = new Cell(2, rc[0], rc[1]);\r\n}\r\n\r\n\r\n// window.addEventListener(\"keydown\", e => {\r\n//   if (e.key === \"ArrowLeft\") {\r\n//     const didMove = slideL();\r\n//     if (didMove) spawnRand()\r\n//   }\r\n\r\n//   if (e.key === \"ArrowRight\") {\r\n//     const didMove = slideR();\r\n//     if (didMove) spawnRand()\r\n//   }\r\n\r\n//   if (e.key === \"ArrowUp\") {\r\n//     const didMove = slideU();\r\n//     if (didMove) spawnRand()\r\n//   }\r\n\r\n//   if (e.key === \"ArrowDown\") {\r\n//     const didMove = slideD();\r\n//     if (didMove) spawnRand()\r\n//   }\r\n// });\r\n\r\ndocument.querySelectorAll(\".grid-cell\").forEach(x =>\r\n  x.addEventListener(\"click\", () => {\r\n    const r = x.getAttribute(\"data-r\");\r\n    const c = x.getAttribute(\"data-c\");\r\n\r\n    if (grid[r][c]) return; // cell is occupied\r\n    \r\n    grid[r][c] = new Cell(2, r, c);\r\n    setTimeout(() => {\r\n      (0,_shuffle__WEBPACK_IMPORTED_MODULE_1__.shuffle)(slideOptions);\r\n      slideOptions[0]() || slideOptions[1]() || slideOptions[2]() || slideOptions[3]()\r\n    }, 0)\r\n  })\r\n)\r\n\r\nconst slideOptions = [slideL, slideR, slideD, slideU]\r\n\r\n\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/main.js?");

/***/ }),

/***/ "./src/shuffle.js":
/*!************************!*\
  !*** ./src/shuffle.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shuffle: () => (/* binding */ shuffle)\n/* harmony export */ });\nfunction shuffle(array) {\r\n  let currentIndex = array.length,  randomIndex;\r\n\r\n  // While there remain elements to shuffle.\r\n  while (currentIndex != 0) {\r\n\r\n    // Pick a remaining element.\r\n    randomIndex = Math.floor(Math.random() * currentIndex);\r\n    currentIndex--;\r\n\r\n    // And swap it with the current element.\r\n    [array[currentIndex], array[randomIndex]] = [\r\n      array[randomIndex], array[currentIndex]];\r\n  }\r\n\r\n  return array;\r\n}\r\n\n\n//# sourceURL=webpack://gmtk-jam-2023/./src/shuffle.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;