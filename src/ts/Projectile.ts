import Game from "./Game";

export default class Projectile {
  public width = 10;
  public height = 3;
  public speed = 3;
  public markedForDeletion = false;
  public image: HTMLImageElement;

  constructor(public game: Game, public x: number, public y: number) {
    this.image = document.getElementById("projectile")! as HTMLImageElement;
  }

  update() {
    this.x += this.speed;

    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "yellow";
    context.drawImage(this.image, this.x, this.y);
  }
}
