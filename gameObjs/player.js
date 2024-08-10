import { Entity } from "./entity.js";
import { Sprite, Assets, Rectangle } from "/deps/pixi.mjs";
import Keyboard from "../keyboard.js";
const playerTexture = await Assets.load("player");
export default class Player extends Entity {
	display = new Sprite(playerTexture);
	canJump = true;
	jumpHeight = 20;
	speed = 2;
	constructor() {
		super("player");
		this.addChild(this.display);
	}
	update() {
		switch (Keyboard.lastPressed("KeyA", "KeyD")) {
			case "KeyA":
				this.acceleration[0] = -this.speed;
				break;
			case "KeyD":
				this.acceleration[0] = this.speed;
				break;
			case null:
				this.acceleration[0] = 0;
				break;
		}
		if (this.canJump && Keyboard.isKeyDown("Space")) {
			this.canJump = false;
			this.jumpIsAscending = true;
			this.acceleration[1] = -this.jumpHeight;
		}
	}
}