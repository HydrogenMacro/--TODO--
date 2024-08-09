import { Sprite } from "/deps/pixi.mjs";

export const Direction = Object.freeze(
	["N", "NE", "E", "SE", "S", "SW", "W", "NW"].reduce(
		(acc, dir) => ((acc[dir] = dir), acc),
		{}
	)
);

export class Entity extends Sprite {
	constructor(spriteOptions, name) {
		super(spriteOptions);
		this.entityName = name;
	}
	/**
	 *
	 * @param {Entity} entity
	 */
	getCollisionInfo(entity) {
		let collisionInfo = [0, 0];
		// positive = possible collision
		let leftDist = this.x - entity.x;
		let rightDist = entity.x + entity.width - this.x;
		let upDist = this.y - entity.y;
		let downDist = entity.y + entity.height - this.y;

		if (leftDist > 0 && rightDist > 0) {
			// horizontal collision
			collisionInfo[0] = leftDist > rightDist ? -leftDist : rightDist;
		}
		if (upDist > 0 && downDist > 0) {
			// vertical collision
			collisionInfo[1] = upDist > downDist ? -upDist : downDist;
		}
		return collisionInfo;
	}
}
window.Entity = Entity;
export class DynamicEntity extends Entity {
	constructor(spriteOptions, name) {
		super(spriteOptions, name);
	}
}
