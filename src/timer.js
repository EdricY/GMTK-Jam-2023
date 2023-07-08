
const div = document.getElementById("timer");

export function startTimer(callback) {
  div.classList.remove("ticking")
  setTimeout(() => div.classList.add("ticking"), 0);

  div.addEventListener("transitionend", () => {
    callback?.();
  }, {once: true})
}