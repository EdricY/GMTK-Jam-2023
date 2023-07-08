export const queue = [];
const qDiv = document.getElementById("queue-container");

export function addToQueue(val) {
  if (queue.length >= 4) return;
  queue.unshift(val);
  const div = document.createElement("div");
  div.innerHTML = val;
  div.setAttribute("data-val", val)
  div.classList.add("queue-cell");
  qDiv.appendChild(div);
}

export function popFromQueue() {
  const val = queue.pop();
  if (!val) return null;
  qDiv.firstChild.classList.add("shrink");
  qDiv.firstChild.addEventListener("animationend", () => {
    qDiv.removeChild(qDiv.firstChild);
  }, { once: true })
  return val;
}