import Game from "./Game";
import Layer from "./Layer";

export default class Background {
  public image1: HTMLImageElement;
  public image2: HTMLImageElement;
  public image3: HTMLImageElement;
  public image4: HTMLImageElement;

  public layer1: Layer;
  public layer2: Layer;
  public layer3: Layer;
  public layer4: Layer;

  public layers: Layer[] = [];

  constructor(public game: Game) {
    this.image1 = document.getElementById("layer1")! as HTMLImageElement;
    this.image2 = document.getElementById("layer2")! as HTMLImageElement;
    this.image3 = document.getElementById("layer3")! as HTMLImageElement;
    this.image4 = document.getElementById("layer4")! as HTMLImageElement;

    this.layer1 = new Layer(this.game, this.image1, .2);
    this.layer2 = new Layer(this.game, this.image2, .4);
    this.layer3 = new Layer(this.game, this.image3, 1);
    this.layer4 = new Layer(this.game, this.image4, 1.5);

    this.layers = [this.layer1, this.layer2, this.layer3];
  }

  public update() {
    this.layers.forEach((layer) => layer.update());
  }

  public draw(context: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
