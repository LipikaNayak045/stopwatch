let startTime = 0;
let elapsedTime = 0;
let interval = null;
let running = false;
let timestamps = [];

function startStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(interval);
    elapsedTime = Date.now() - startTime;
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  document.getElementById("display").innerText = "00:00:00.000";
  timestamps = [];
  updateTimestamps();
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;

  const ms = elapsedTime % 1000;
  const s = Math.floor(elapsedTime / 1000) % 60;
  const m = Math.floor(elapsedTime / 60000) % 60;
  const h = Math.floor(elapsedTime / 3600000);

  document.getElementById("display").innerText =
    `${pad(h)}:${pad(m)}:${pad(s)}.${ms.toString().padStart(3, '0')}`;
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

function addTimestamp() {
  if (timestamps.length >= 10) {
    alert("Only 10 timestamps allowed.");
    return;
  }
  const current = document.getElementById("display").innerText;
  timestamps.push(current);
  updateTimestamps();
}

function updateTimestamps() {
  const list = document.getElementById("timestamps");
  list.innerHTML = "";
  timestamps.forEach((time, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1} - ${time}`;
    list.appendChild(li);
  });
}
