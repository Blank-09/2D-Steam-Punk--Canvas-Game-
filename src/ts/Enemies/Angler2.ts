import Enemy from "../Enemy";
import Game from "../Game";

export default class Angler2 extends Enemy {
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
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("angler2")! as HTMLImageElement;
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 6;
    this.score = this.lives;
  }
}
