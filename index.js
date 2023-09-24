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

let lastKey = '';

const ctx = canvas.getContext('2d');

class Player {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.speed = 7;
    this.rotation = 0;
    this.rotationValue = 0.15;
    this.velocity = velocity;
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

  if (keys.a.pressed && lastKey === 'a' && player.position.x >= 0) {
    player.velocity.x = -player.speed;
    player.rotation = -player.rotationValue;
  } else if (keys.d.pressed && lastKey === 'd' && player.position.x + player.width <= canvas.width) {
    player.velocity.x = player.speed;
    player.rotation = player.rotationValue;
  } else if (keys.space.pressed && lastKey === ' ') {
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }

  requestAnimationFrame(animate)
}

animate();

window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a'
      break
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd'
      break
    case ' ':
      keys.space.pressed = true;
      lastKey = ' '
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
