
let cellId = 0;
export class Cell {
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