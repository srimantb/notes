// Navigate to specific tool page
// function navigateToTool(toolName) {
//     window.location.href = `${toolName}.html`;
// }

// Filter tools based on search input
// function filterTools() {
//     const query = document.getElementById('searchBar').value.toLowerCase();
//     const tools = document.querySelectorAll('.tool-card');
//     tools.forEach(tool => {
//         const toolName = tool.innerText.toLowerCase();
//         if (toolName.includes(query)) {
//             tool.style.display = 'block';
//         } else {
//             tool.style.display = 'none';
//         }
//     });
// }



function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// Call this function whenever new content is added
document.addEventListener("DOMContentLoaded", () => {
  scrollToBottom();
});


// Navigation logic################
// Search bar filtering
function filterTools() {
  const searchValue = document.getElementById("searchBar").value.toLowerCase();
  const toolCards = document.querySelectorAll(".tool-card");

  toolCards.forEach((card) => {
    const toolName = card.textContent.toLowerCase();
    card.style.display = toolName.includes(searchValue) ? "" : "none";
  });
}

// Navigation simulation
function navigateToTool(toolName) {
  window.location.href = `${toolName}.html`; // Replace with actual navigation logic
}


// Navigate back to the main page
function goBack() {
    window.history.back();
}

// #########################################################################
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0f0";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    const radius = 2;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    particles.push(new Particle(x, y, dx, dy, radius));
  }
}

function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const distance = Math.hypot(
        particles[i].x - particles[j].x,
        particles[i].y - particles[j].y
      );
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "rgba(0, 255, 0, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update());
  connect();
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});


