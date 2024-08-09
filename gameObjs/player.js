import { DynamicEntity } from "./entity.js";
import { checkKey } from "cdn.jsdelivr.net/npm/@rwh/keystrokes@1.5.6/+esm"
export default class Player extends DynamicEntity {
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