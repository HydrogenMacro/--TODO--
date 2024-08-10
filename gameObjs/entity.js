import { world } from "../physics.js";
import { Container, Rectangle } from "/deps/pixi.mjs";

console.log(RAPIER.RigidBodyDesc.dynamic(), RAPIER.ColliderDesc.cuboid(10, 10));
export class Entity extends Container {
	velocity = [0, 0];
	acceleration = [0, 0];
	gravity = [0, 1];
	isEntity = true;
	collider = world.createCollider(
		RAPIER.ColliderDesc.cuboid(10, 10),
		RAPIER.RigidBodyDesc.dynamic(),
	);
	constructor() {
		super();
	}
	_update() {
		this.update();
		this.updateDisplay();
	}
}


