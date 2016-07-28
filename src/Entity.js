import PIXI from 'pixi.js';

export default class Entity extends PIXI.Container {
    alive = true;
    flags = [];

    constructor({x, y}) {
        super();
        this.x = x;
        this.y = y;
    }

    addFlag(flag) {
        !this.hasFlag(flag) && this.flags.push(flag);
    }

    removeFlag(remove) {
        this.flags = this.flags.filter(flag => flag !== remove);
    }

    hasFlag(flag) {
        return this.flags.includes(flag);
    }

    kill() {
        this.alive = false;
    }

    // Dummy method, should be overridden by child
    update(delta) {}

    touches(other) {
        const bounds = this.getBounds(),
            otherBounds = other.getBounds();

        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy, halfWidth, halfHeight, otherHalfWidth, otherHalfHeight,
            center = {},
            otherCenter = {};

        halfWidth = bounds.width / 2;
        halfHeight = bounds.height / 2;
        otherHalfWidth = otherBounds.width / 2;
        otherHalfHeight = otherBounds.height / 2;

        center.x = bounds.x + halfWidth;
        center.y = bounds.y + halfHeight;
        otherCenter.x = otherBounds.x + otherHalfWidth;
        otherCenter.y = otherBounds.y + otherHalfHeight;

        vx = center.x - otherCenter.x;
        vy = center.y - otherCenter.y;

        combinedHalfWidths = halfWidth + otherHalfWidth;
        combinedHalfHeights = halfHeight + otherHalfHeight;

        hit = Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;

        return hit;
    }
}