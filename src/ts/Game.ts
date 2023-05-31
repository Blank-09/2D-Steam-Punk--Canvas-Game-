import Background from "./Background";
import Angler1 from "./Enemies/Angler1";
import Angler2 from "./Enemies/Angler2";
import Drone from "./Enemies/Drone";
import HiveWhale from "./Enemies/HiveWhale";
import LuckyFish from "./Enemies/LuckyFish";
import Enemy from "./Enemy";
import InputHandler from "./InputHandler";
import Particle from "./Particle";
import Explosion from "./Particles/Explosion";
import FireExplosion from "./Particles/FireExplosion";
import SmokeExplosion from "./Particles/SmokeExplosion";
import Player from "./Player";
import Projectile from "./Projectile";
import UI from "./UI";

type Character = Player | Enemy | Projectile;

export default class Game {
  public player: Player;
  public input: InputHandler;
  public ui: UI;
  public background: Background;

  public keys: string[] = [];
  public enemies: Enemy[] = [];
  public particles: Particle[] = [];
  public explosions: Explosion[] = [];

  public enemyTimer = 0;
  public enemyInterval = 1000;

  public ammo = 20;
  public maxAmmo = 50;
  public ammoTimer = 0;
  public ammoInterval = 350;

  public score: number = 0;
  public speed: number = 1;
  public winningScore = 100;
  public gameOver: boolean = false;
  public gameTime = 0;
  public timeLimit = 45 * 1000;

  public debug: boolean = false;

  constructor(public width: number, public height: number) {
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
  }

  public update(deltaTime: number) {
    if (!this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;
    this.player.update(deltaTime);

    this.background.update();
    this.background.layer4.update();

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    }

    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );

    this.explosions.forEach((explosion) => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedForDeletion
    );

    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        this.addExplosion(enemy);
        for (let i = 0; i < enemy.score; i++) {
          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.height * 0.5,
              enemy.y + enemy.width * 0.5
            )
          );
        }

        if (enemy.type === "lucky") this.player.enterPowerUp();
        else if (!this.gameOver) this.score--;
      }

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;
          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.height * 0.5,
              enemy.y + enemy.width * 0.5
            )
          );

          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            for (let i = 0; i < enemy.score; i++) {
              this.particles.push(
                new Particle(
                  this,
                  enemy.x + enemy.height * 0.5,
                  enemy.y + enemy.width * 0.5
                )
              );
            }
            this.addExplosion(enemy);
            if (enemy.type === "hive") {
              for (let i = 0; i < 5; i++)
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5
                  )
                );
            }
            if (!this.gameOver) this.score += enemy.score;
            // if (this.score > this.winningScore) this.gameOver = true;
          }
        }
      });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    }

    this.ammoTimer += deltaTime;
    this.enemyTimer += deltaTime;
  }

  public draw(context: CanvasRenderingContext2D) {
    this.background.draw(context);
    this.particles.forEach((particle) => particle.draw(context));
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.explosions.forEach((explosion) => explosion.draw(context));
    this.ui.draw(context);
    this.player.draw(context);
    this.background.layer4.draw(context);
  }

  public addExplosion(enemy: Enemy) {
    const randomize = Math.random();
    if (randomize < 0.5) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    } else {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
  }

  public addEnemy() {
    const randomize = Math.random();
    if (randomize < 0.3) this.enemies.push(new Angler1(this));
    else if (randomize < 0.5) this.enemies.push(new Angler2(this));
    else if (randomize < 0.8) this.enemies.push(new LuckyFish(this));
    else this.enemies.push(new HiveWhale(this));
  }

  public checkCollision(rect1: Character, rect2: Character) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }
}
