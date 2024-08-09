import { Sprite, Ticker } from "/deps/pixi.mjs";

export default class MultiAnimatedSprite extends Sprite {
	static AnimationEndAction = Object.freeze({
		Loop: 0,
		Stop: 1,
		SwitchToDefaultAnimation: 2
	});
	constructor(animations, defaultAnimationName) {
		this.defaultAnimationName = defaultAnimationName
		this.animationName = defaultAnimationState;
		this.currentAnimationFrameIndex = 0;
		this.animationEndAction = MultiAnimatedSprite.AnimationEndAction.Loop;
		this.animations = animations;
		Ticker.shared.add(() => {
			let currentAnimationFrames = this.animations[this.animationName];
			if (!currentAnimationFrames) throw new Error(`Animation ${this.animationName} not found`);
			this.texture = currentAnimationFrames[this.currentAnimationFrame];
			this.currentAnimationFrameIndex += 1;
			if (this.currentAnimationFrameIndex > currentAnimationFrames.length - 1) {
				switch (this.animationEndAction) {
					case MultiAnimatedSprite.AnimationEndAction.Loop:
						this.currentAnimationFrameIndex = 0;
						break;
					case MultiAnimatedSprite.AnimationEndAction.Stop:
						this.currentAnimationFrameIndex =
							currentAnimationFrames.length - 1;
						break;
					case MultiAnimatedSprite.AnimationEndAction.SwitchToDefaultAnimation:
						this.animationName = this.defaultAnimationState;
						this.currentAnimationFrameIndex = 0;
						this.animationEndAction =
							MultiAnimatedSprite.AnimationEndAction.Loop;
						break;
				}
			}
		}, this);
	}
	playAnimation(animationName, endAction=AnimationEndAction.SwitchToDefaultAnimation) {
		this.animationName = animationName;
		this.currentAnimationFrameIndex = 0;
		this.animationEndAction = endAction;
	}
}