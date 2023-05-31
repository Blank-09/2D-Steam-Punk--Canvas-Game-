import Enemy from "../Enemy";
import Game from "../Game";

export default class Drone extends Enemy {
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public frameX: number;
  public frameY: number;
  public score: number;
  public lives: number;
  public drones = 5;

  constructor(public game: Game, public x: number, public y: number) {
    super(game);
    this.width = 115;
    this.height = 95;
    this.image = document.getElementById("drone")! as HTMLImageElement;
    this.frameX = 1;
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.type = "drone";
    this.speedX = Math.random() * -4.2 - 0.5;
  }
}
