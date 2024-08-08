import { Application, Sprite, Assets } from "/deps/pixi.mjs";
import "/console.js";
import "/assets.js";
const app = new Application();
await app.init({
	canvas: document.getElementById("game"),
	resizeTo: document.body,
	antialias: true,
	resolution: devicePixelRatio,
	autoDensity: true
});

await Assets.load("/assets/favicon.png")
let s = Sprite.from("/assets/favicon.png");
app.stage.addChild(s);
app.ticker.add(() => {
	s.position.x += 1;
});