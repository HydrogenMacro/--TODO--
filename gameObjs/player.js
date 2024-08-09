import { DynamicEntity } from "./entity.js";
import { Sprite, Assets, Rectangle } from "/deps/pixi.mjs";
import Keyboard from "../keyboard.js";
const playerTexture = await Assets.load("player");
export default class Player extends DynamicEntity {
	display = new Sprite(playerTexture);
	canJump = true;
	jumpIsAscending = false;
	jumpHeight = 10;
	speed = 3;
	constructor() {
		super("player", new Rectangle(0, 0, 10, 10));
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
			//this.canJump = false;
			this.jumpIsAscending = true;
			this.acceleration[1] = -this.jumpHeight;
		}
	}
}