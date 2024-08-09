import { DynamicEntity } from "./entity.js";
import { checkKey } from "https://cdn.jsdelivr.net/npm/@rwh/keystrokes@1.5.6/+esm"
import { Sprite, Assets } from "/deps/pixi.mjs";

const playerTexture = await Assets.load("player");
export default class Player extends DynamicEntity {
	display = new Sprite(playerTexture);
	constructor() {
		super("player");
	}
	update() {
		if (checkKey("a")) {
			this.velocity[0] = -1;
		}
		if (checkKey("d")) {
			this.velocity[0] = 1;
		}
	}
}