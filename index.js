const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PLAYER_IMAGE_SCALE = 0.15;

const ctx = canvas.getContext('2d');

class Player {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image
    this.width = image.width * PLAYER_IMAGE_SCALE;
    this.height = image.height * PLAYER_IMAGE_SCALE;

  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}


function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

const playerImage = createImage('./assets/spaceship.png');

function animate() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
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

  player.draw();


  requestAnimationFrame(animate)
}

animate();
