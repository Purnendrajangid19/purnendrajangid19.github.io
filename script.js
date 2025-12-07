// =========================
// MATRIX BACKGROUND
// =========================
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.id = "matrix-bg";
document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", () => {
  setTimeout(resizeCanvas, 300);
});

const chars = "01";
const fontSize = 18;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = new Array(columns).fill(1);

function resetDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}
window.addEventListener("resize", resetDrops);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff9e";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  }
}
setInterval(drawMatrix, 40);

// =========================
// BOOT TYPING ANIMATION
// =========================
const bootLines = [
  "> Initializing SDR stack...",
  "> Verifying BTS broadcast frames...",
  "> SOC threat engine online...",
  "> ACCESS GRANTED :: PURNENDRA_JANGID"
];

let currentLine = 0;
let charIndex = 0;
const typingSpeed = 55;      // ms per char
const linePause = 600;       // pause between lines

function typeBootLines() {
  const terminal = document.getElementById("terminal");
  if (!terminal) return; // only run on pages that have #terminal

  // Lines fully printed so far
  const printed = bootLines.slice(0, currentLine);

  // Current line partial text
  const currentText = bootLines[currentLine].substring(0, charIndex);
  printed.push(currentText);

  terminal.innerHTML = printed.join("<br>");

  // Finished all lines
  if (currentLine >= bootLines.length) {
    // Highlight last line
    const htmlLines = bootLines.map((line, i) =>
      i === bootLines.length - 1 ? `<span class="access">${line}</span>` : line
    );
    terminal.innerHTML = htmlLines.join("<br>");
    return;
  }

  charIndex++;

  // Still typing current line
  if (charIndex <= bootLines[currentLine].length) {
    setTimeout(typeBootLines, typingSpeed);
  } else {
    // Move to next line
    currentLine++;
    charIndex = 0;
    if (currentLine < bootLines.length) {
      setTimeout(typeBootLines, linePause);
    } else {
      // final call prints last line fully highlighted
      setTimeout(typeBootLines, 200);
    }
  }
}

window.addEventListener("load", () => {
  if (document.getElementById("terminal")) {
    typeBootLines();
  }
});
