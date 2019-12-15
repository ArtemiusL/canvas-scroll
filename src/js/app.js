import Mouse from './mouse';
import Ball from './ball';

const canvas = document.getElementById('drawOnMe');
const ctx = canvas.getContext('2d');
const pos = new Mouse(canvas);
const balls = [];

const mouse = new Ball(0, 0, 30, 'green');

for (let i = 0; i < 50; i++) {
  balls.push(
		new Ball(
			200 + 100 * Math.cos(i * 2 * Math.PI / 50),
			200 + 100 * Math.sin(i * 2 * Math.PI / 50)
		)
	);
}

function ConnectDots(balls) {
  ctx.beginPath();
  ctx.moveTo(balls[0].x, balls[0].y);
  balls.forEach((ball) => {
    ctx.lineTo(ball.x, ball.y);
  });

  ctx.closePath();
  ctx.fill();
}

function ConnectDots1(dots) {
  ctx.beginPath();

  for (let i = 0, jlen = dots.length; i <= jlen; ++i) {
    const p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0];
    const p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1];
    ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
  }

  ctx.closePath();
  ctx.stroke();
}

function Render() {
  window.requestAnimationFrame(Render);
  ctx.clearRect(0, 0, 600, 600);

  mouse.setPos(pos.x, pos.y);
  mouse.draw(ctx);

  balls.forEach((ball) => {
    ball.think(pos);
		// ball.draw(ctx);
  });
  ConnectDots1(balls);
}

Render();