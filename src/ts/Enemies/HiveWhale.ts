import Enemy from "../Enemy";
import Game from "../Game";

export default class HiveWhale extends Enemy {
  public score: number;
  public lives: number;
  public y: number;
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public frameY: number = 0;
  public frameX: number = 0;
  public type: string;

  constructor(game: Game) {
    super(game);
    this.width = 400;
    this.height = 227;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("hiveWhale")! as HTMLImageElement;
    this.lives = 20;
    this.score = this.lives;
    this.type = "hive";
    this.speedX = Math.random() * -1.2 - 0.2;
  }
}
