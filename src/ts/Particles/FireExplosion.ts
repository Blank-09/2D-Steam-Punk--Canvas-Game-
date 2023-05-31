import Game from "../Game";
import Explosion from "./Explosion";

export default class FireExplosion extends Explosion {
  image: HTMLImageElement;

  constructor(public game: Game, public x: number, public y: number) {
    super(game, x, y);
    this.image = document.getElementById("fireExplosion")! as HTMLImageElement;
  }
}
