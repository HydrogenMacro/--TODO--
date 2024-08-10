use hecs::*;
use macroquad::prelude::*;
use rapier2d::prelude::*;
use crate::game_objs::player::PlayerBundle;
use crate::levels::Level;

pub struct Level1;

impl Level for Level1 {
	fn init(&self, world: &mut World) {
		world.spawn(PlayerBundle::default());
	}

	fn update(&self, world: &mut World, change_level: &mut bool) {
		let mut q =  world.query::<&Texture2D>();
		let texture = q.iter().next().unwrap().1;
		draw_texture(texture, 0., 0., WHITE);
	}

	fn cleanup(&self, world: &mut World) {

	}
}