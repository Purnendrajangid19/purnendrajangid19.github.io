const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "01";
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff9e";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (Math.random() > 0.95) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(draw, 40);

window.addEventListener("orientationchange", () => {
  setTimeout(() => resize(), 300);
});

const lines = [
  "> Initializing SDR stack...",
  "> Verifying BTS broadcast frames...",
  "> SOC threat engine online...",
  "> ACCESS GRANTED :: PURNENDRA_JANGID"
];

let currentLine = 0;
let charIndex = 0;
const speed = 55;  // typing speed

function typeLine() {
  if (currentLine < lines.length) {
    const terminal = document.getElementById("terminal");
    terminal.innerHTML = lines.slice(0, currentLine).join("<br>") + "<br>" +
      lines[currentLine].substring(0, charIndex);

    charIndex++;

    if (charIndex <= lines[currentLine].length) {
      setTimeout(typeLine, speed);
    } else {
      currentLine++;
      charIndex = 0;
      setTimeout(typeLine, 600);  // pause per line
    }
  }
}

window.onload = typeLine;
