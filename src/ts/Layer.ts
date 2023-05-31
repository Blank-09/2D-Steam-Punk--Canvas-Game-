import Game from "./Game";

export default class Layer {
  public width = 1768;
  public height = 500;
  public x = 0;
  public y = 0;

  constructor(
    public game: Game,
    public image: HTMLImageElement,
    public speedModifier: number
  ) {}

  public update() {
    if (this.x <= -this.width) this.x = 0;
    this.x -= this.game.speed * this.speedModifier;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}
