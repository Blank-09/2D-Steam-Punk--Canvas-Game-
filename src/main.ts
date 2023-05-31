import "./css/style.css";
import Game from "./ts/Game";
import nipplejs from "nipplejs";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.height = 500;
canvas.width = (canvas.height * 16) / 9;

const game = new Game(canvas.width, canvas.height);
let lastTime = 0;

// animation loop

function animate(timestamp: number) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(ctx);
  game.update(deltaTime);
  requestAnimationFrame(animate);
}

ctx.fillStyle = "white";
ctx.font = "50px Bangers";
ctx.fillText(
  "Click on the Screen to start!",
  canvas.width * 0.28,
  canvas.height * 0.5
);

// animate(0);
const zone_joystick = document.getElementById("zone_joystick")!;

var options: nipplejs.JoystickManagerOptions = {
  zone: zone_joystick,
  position: {
    bottom: "60px",
    right: "70px",
  },
  size: 80,
  catchDistance: 50,
  mode: "static",
};
var manager = nipplejs.create(options);
manager.on("dir:up", () => {
  game.keys.push("ArrowUp");
});

manager.on("start", () => {
  console.log("start");
});

manager.on("end", () => {
  game.keys = [];
});

manager.on("dir:down", () => {
  game.keys = [];
  game.keys.push("ArrowDown");
});

const attackBtn = document.getElementById("attack-btn")!;

attackBtn.onclick = () => {
  game.player.shootTop();
};

document.body.onclick = () => {
  attackBtn.classList.add("active");
  zone_joystick.classList.add("active");
  document.body
    .requestFullscreen()
    .then((e) => {
      animate(0);
      console.log(e);
    })
    .catch((err) => {
      console.log(err);
    });

  document.body.onclick = null;
};
