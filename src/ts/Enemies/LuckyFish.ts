import Enemy from "../Enemy";
import Game from "../Game";

export default class LuckyFish extends Enemy {
  public score: number;
  public lives: number;
  public y: number;
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public frameY: number = 0;
  public frameX: number = 0;
  type: string;

  constructor(game: Game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("lucky")! as HTMLImageElement;
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 5;
    this.score = this.lives;
    this.type = "lucky";
  }
}
