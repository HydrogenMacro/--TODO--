use hecs::*;
use macroquad::experimental::collections::storage;
use macroquad::prelude::*;
use macroquad_platformer::Actor;

use crate::game_objs::player::PlayerBundle;
use crate::levels::{InLevel, Level};

pub struct Level1(pub macroquad_platformer::World);
impl Level for Level1 {
	fn init(&mut self, world: &mut World) {
		let player = world.spawn(
			PlayerBundle::new(&mut self.0)
		);
		world.insert_one(player, InLevel::<0>).unwrap();
		dbg!(world.query::<&Level1>().iter().next().is_some());
	}

	fn update(&mut self, world: &mut World, change_level: &mut bool) {
		let mut q = world.query::<With<(&Texture2D, &Actor), &InLevel<0>>>();
		let (texture, actor) = q.iter().next().unwrap().1;
		let player_pos = self.0.actor_pos(*actor);
		draw_texture(texture, player_pos.x, player_pos.y, WHITE);
	}

	fn cleanup(&mut self, world: &mut World) {}
}