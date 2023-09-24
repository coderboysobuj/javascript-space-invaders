const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PLAYER_IMAGE_SCALE = 0.15;

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
}

let lastKey = ''

const projectiles = [];

const ctx = canvas.getContext('2d');

class Player {
  constructor({ position: { x: px, y: py }, velocity: { x: vx, y: vy }, image }) {
    this.position = {
      x: px,
      y: py
    };
    this.velocity = {
      x: vx,
      y: vy
    };
    this.speed = 7;
    this.rotation = 0;
    this.rotationValue = 0.15;
    this.image = image
    this.width = image.width * PLAYER_IMAGE_SCALE;
    this.height = image.height * PLAYER_IMAGE_SCALE;

  }

  draw() {
    ctx.save();

    // rotate player
    ctx.translate(player.position.x + player.width / 2, player.position.y + player.height / 2)
    ctx.rotate(this.rotation);
    ctx.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2)

    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    ctx.restore();
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
  }
}

class Projectile {
  constructor({ position: { x: px, y: py }, velocity: { x: vx, y: vy } }) {
    this.position = {
      x: px,
      y: py
    };
    this.velocity = {
      x: vx,
      y: vy
    }
    this.radius = 3;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y
  }
}


function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

const playerImage = createImage('./assets/spaceship.png');

const player = new Player({
  position: {
    x: (canvas.width / 2) - (playerImage.width * PLAYER_IMAGE_SCALE / 2),
    y: (canvas.height) - (playerImage.height * PLAYER_IMAGE_SCALE) - 20
  },
  velocity: {
    x: 0,
    y: 0
  },
  image: playerImage,
})

function animate() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player.update();

  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -player.speed;
    player.rotation = -player.rotationValue;
  } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
    player.velocity.x = player.speed;
    player.rotation = player.rotationValue;
  } else if (keys.space.pressed) {
    const projectile = new Projectile({
      position: {
        x: player.position.x + player.width / 2,
        y: player.position.y
      },
      velocity: {
        x: 0,
        y: -10
      }
    });
    projectiles.push(projectile);
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }

  projectiles.forEach((projectile, i) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(i, 1)
      }, 0)
    }
    projectile.update();
  })

  requestAnimationFrame(animate)
}

animate();

window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = true;
      break
    case 'd':
      keys.d.pressed = true;
      break
    case ' ':
      keys.space.pressed = true;
      lastKey = ' ';
      break
  }
})

window.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = false;
      lastKey = 'a'
      break
    case 'd':
      keys.d.pressed = false;
      lastKey = 'd'
      break
    case ' ':
      keys.space.pressed = false;
      lastKey = ' '
      break
  }
})
