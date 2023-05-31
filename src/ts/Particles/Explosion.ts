import Game from "../Game";

export default abstract class Explosion {
  public fps = 30;
  public timer = 0;
  public frameX = 0;
  public spriteHeight = 200;
  public interval = 1000 / this.fps;
  public markedForDeletion = false;
  public maxFrame = 8;

  public width: number;
  public height: number;
  abstract image: HTMLImageElement;

  constructor(public game: Game, public x: number, public y: number) {
    this.width = this.spriteHeight;
    this.height = this.spriteHeight;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }

  update(deltaTime: number) {
    this.x -= this.game.speed;
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteHeight,
      0,
      this.spriteHeight,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
