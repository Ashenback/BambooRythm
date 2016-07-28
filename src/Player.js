import Entity from './Entity';

export default class Player extends Entity {
    hitArea;

    constructor({x, y, width, height}) {
        super();
        this.x = x;
        this.y = y;

        this.hitArea = new PIXI.Graphics();
        this.hitArea.lineStyle(2, 0xFF00FF, 1);
        this.hitArea.beginFill(0xFF00BB, 0.25);
        this.hitArea.drawRoundedRect(0, 0, width, height, 15);
        this.hitArea.endFill();
        this.addChild(this.hitArea);
    }
}