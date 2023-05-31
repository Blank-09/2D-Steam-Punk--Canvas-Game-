import Game from "./Game";

export default class UI {
  public fontSize = 25;
  public fontFamily = "Bangers";
  public color = "white";

  constructor(public game: Game) {}

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";

    context.font = this.fontSize + "px " + this.fontFamily;
    context.fillText("Score: " + this.game.score, 20, 40);

    // timer
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText("Timer: " + formattedTime, 20, 100);

    if (this.game.gameOver) {
      context.textAlign = "center";
      let message1, message2;

      if (this.game.score > this.game.winningScore) {
        message1 = "Most Wondrous!";
        message2 = "Well Done Explorer!";
      } else {
        message1 = "Blazes!";
        message2 = "Get my repair kit and try again!";
      }

      context.font = "100px " + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );

      context.font = "30px " + this.fontFamily;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
    }

    if (this.game.player.powerUp) context.fillStyle = "#ffffbd";
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + i * 5, 50, 3, 20);
    }

    context.restore();
  }
}
