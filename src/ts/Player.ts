import Game from "./Game";
import Projectile from "./Projectile";

export default class Player {
  public width = 120;
  public height = 190;
  public speedY = 0;
  public maxSpeed = 5;
  public powerUp: boolean = false;
  public powerUpTimer = 0;
  public powerUpLimit = 10000;

  public frameX = 0;
  public frameY = 0;
  public maxFrame = 37;

  public x = 20;
  public y = 100;

  public projectiles: Projectile[] = [];
  public image: HTMLImageElement;

  constructor(public game: Game) {
    this.image = document.getElementById("player")! as HTMLImageElement;
  }

  public update(deltaTime: number) {
    if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    this.y += this.speedY;

    // vertical boundaries
    if (this.y > this.game.height - this.height * 0.5)
      this.y = this.game.height - this.height * 0.5;
    else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;

    // Handler projectiles
    this.projectiles.forEach((projectile) => projectile.update());

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    this.frameX++;
    if (this.frameX > this.maxFrame) this.frameX = 0;

    // power up
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0;
      } else {
        this.powerUpTimer += deltaTime;
        this.frameY = 1;
        this.game.ammo += 0.1;
      }
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);

    this.projectiles.forEach((projectile) => projectile.draw(context));
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

  public shootTop() {
    if (this.powerUp) this.shootBottom();
    if (this.game.ammo < 0) return;
    this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
    this.game.ammo--;
  }

  public shootBottom() {
    if (this.game.ammo < 0) return;
    this.projectiles.push(new Projectile(this.game, this.x + 90, this.y + 175));
  }

  public enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;
    if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
  }
}
