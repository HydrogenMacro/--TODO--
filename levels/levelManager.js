import Player from "../gameObjs/player.js";
import { Container, Ticker } from "/deps/pixi.mjs";

export class LevelManager extends Container {
	ticker = new Ticker();
	constructor(initialLevel) {
		super();
		this.currentLevel = initialLevel;
		this.player = new Player();
		this.ticker.add(() => {
			this.currentLevel.update();
		}, this);
	}
	toggleDebugMode() {}
}

export class Level extends Container {
	constructor() {
		super();
	}
	updatePhysics() {
		for (const child of this.children) {
			child.x += child.velocity[0];
			child.y += child.velocity[1];
			for (const child2 of this.children) {
				if (child == child2) continue;
				let [dx, dy] = child.getCollisionInfo(child2);
				if ()
			}
		}
	}
}