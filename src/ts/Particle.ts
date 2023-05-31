import Game from "./Game";

export default class Particle {
  public image: HTMLImageElement;
  public frameX: number;
  public frameY: number;
  public sizeModifier: number;
  public size: number;

  public va: number; // radian per animation frame
  public speedX: number;
  public speedY: number;

  public spriteSize = 50;
  public gravity = 0.5;
  public angle = 0;
  public bounced = 0;
  public bottomBounceBoundary: number;

  public markedForDeletion = false;

  constructor(public game: Game, public x: number, public y: number) {
    this.image = document.getElementById("gears")! as HTMLImageElement;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.sizeModifier = +(Math.random() * 0.5 + 0.5).toFixed(1);
    this.size = this.spriteSize * this.sizeModifier;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;
    this.va = Math.random() * 0.2 - 0.1;
    this.bottomBounceBoundary = Math.random() * 80 + 60;
  }

  update() {
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX - this.game.speed;
    this.y += this.speedY;
    if (this.y > this.game.height + this.size || this.x < 0 - this.size)
      this.markedForDeletion = true;
    if (
      this.y > this.game.height - this.bottomBounceBoundary &&
      this.bounced < 2
    ) {
      this.bounced++;
      this.speedY *= -0.5;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.size * -0.5,
      this.size * -0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
