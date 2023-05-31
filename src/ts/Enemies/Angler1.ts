import Enemy from "../Enemy";
import Game from "../Game";

export default class Angler1 extends Enemy {
  public score: number;
  public lives: number;
  public y: number;
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public frameY: number = 0;
  public frameX: number = 0;

  constructor(game: Game) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("angler1")! as HTMLImageElement;
    this.frameY = Math.floor(Math.random() * 3);
    this.lives = 5;
    this.score = this.lives;
  }
}
