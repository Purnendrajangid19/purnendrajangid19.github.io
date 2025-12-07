// ===== Matrix Background =====
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", () => {
  setTimeout(resize, 300);
});

const chars = "01";
const fontSize = 18;
let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff9e";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 40);

// ===== Typing Animation (only on pages with #terminal) =====
const lines = [
  "> Initializing SDR stack...",
  "> Verifying BTS broadcast frames...",
  "> SOC threat engine online...",
  "<span class='access'>> ACCESS GRANTED :: PURNENDRA_JANGID</span>"
];

let currentLine = 0;
let charIndex = 0;
const speed = 55;  // typing speed

function typeLine() {
  const termina
