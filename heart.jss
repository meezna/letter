const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const maxHearts = 60;

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.size = Math.random() * 8 + 2;
  this.speed = Math.random() * 1 + 0.5;
  this.opacity = Math.random() * 0.5 + 0.5;

  this.draw = function () {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#ff69b4";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size * 2, this.y + this.size / 3,
                      this.x, this.y + this.size * 2);
    ctx.bezierCurveTo(this.x - this.size * 2, this.y + this.size / 3,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  this.update = function () {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  };
}

for (let i = 0; i < maxHearts; i++) {
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let heart of hearts) {
    heart.update();
  }
  requestAnimationFrame(animate);
}
animate();
