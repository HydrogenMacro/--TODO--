import { Application, Sprite, Assets } from "/deps/pixi.mjs";
import "/console.js";
import "/assets.js";
import { LevelManager } from "./levels/levelManager.js";
import level1 from "./levels/level1.js";

const app = new Application();
await app.init({
	canvas: document.getElementById("game"),
	resizeTo: document.body,
	antialias: true,
	resolution: devicePixelRatio,
	autoDensity: true,
});

await new Promise(res => {
	console.log("press2play")
	const cb = () => {
		res();
		document.body.removeEventListener("click", cb)
	};
	document.body.addEventListener("click", cb);
});

const levels = [
	level1
];
const levelManager = new LevelManager(levels);
app.stage.addChild(levelManager);