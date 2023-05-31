import Game from "./Game";

export default abstract class Enemy {
  public markedForDeletion = false;
  public speedX: number;
  public maxFrame = 17;
  public x: number;
  public type = "";

  abstract y: number;
  abstract width: number;
  abstract height: number;
  abstract image: HTMLImageElement;
  abstract frameX: number;
  abstract frameY: number;

  abstract score: number;
  abstract lives: number;

  constructor(public game: Game) {
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
  }

  public update() {
    this.x += this.speedX - this.game.speed;
    if (this.x + this.width < 0) this.markedForDeletion = true;

    if (this.frameX / 2 > this.maxFrame) this.frameX = 0;
    this.frameX++;
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.fillStyle = "black";
      context.font = "20px Helvetica";
      context.fillText(this.lives.toString(), this.x, this.y);
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
