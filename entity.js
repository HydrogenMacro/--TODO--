import { Container, Rectangle } from "/deps/pixi.mjs";

export class Entity extends Container {
	/**
	 * 
	 * @param {String} name 
	 * @param {Rectangle} hitbox 
	 */
	constructor(name, hitbox) {
		super();
		this.entityName = name;
		this.hitbox = hitbox
	}
	/**
	 *
	 * @param {Entity} entity
	 */
	getCollisionInfo(entity) {
		return getCollisionInfo(
			this.hitbox.x,
			this.hitbox.y,
			this.hitbox.width,
			this.hitbox.height,
			entity.hitbox.x,
			entity.hitbox.y,
			entity.hitbox.width,
			entity.hitbox.height
		);
	}
}
export class DynamicEntity extends Entity {
	acceleration = [0, 0];
	velocity = [0, 0];

	constructor(spriteOptions, name) {
		super(spriteOptions, name);
	}
}

// returns the deltas (both x and y) needed to resolve collision
function getCollisionInfo(x1, y1, w1, h1, x2, y2, w2, h2) {
	let collisionInfo = [0, 0];
	if ((x1 > x2 + w2 || x2 > x1 + w1) && (y1 > y2 + y2 || y2 > y1 + y1))
		return collisionInfo;
	// distance needed to travel in order to resolve collision
	let leftDist = x2 - (x1 + w1);
	let rightDist = x2 + w2 - x1;
	let upDist = y2 - (y1 + h1);
	let downDist = y2 + h2 - y1;
	console.log("left", leftDist);
	console.log("right", rightDist);

	collisionInfo[0] = closestToZero(leftDist, rightDist);
	collisionInfo[1] = closestToZero(upDist, downDist);
	return collisionInfo;
}
function closestToZero(a, b) {
	return Math.abs(a) < Math.abs(b) ? a : b;
}
