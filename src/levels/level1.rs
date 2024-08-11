use hecs::*;
use macroquad::experimental::collections::storage;
use macroquad::prelude::*;
use rapier2d::prelude::*;

use crate::game_objs::player::PlayerBundle;
use crate::levels::Level;

#[derive(Debug)]
pub struct Level1;

impl Level for Level1 {
	fn init(&self, world: &mut World) {
		let player = world.spawn(
			PlayerBundle::default()
		);
		world.insert(player, (Level1, )).unwrap();
	}

	fn update(&self, world: &mut World, change_level: &mut bool) {
		let mut q = world.query::<With<(&Texture2D, &ColliderHandle), &Level1>>();
		let (texture, collider_handle) = q.iter().next().unwrap().1;
		let binding = storage::get::<ColliderSet>();
		let pos = binding.get(*collider_handle).unwrap().translation();
		draw_texture(texture, pos.x, pos.y, WHITE);
	}

	fn cleanup(&self, world: &mut World) {}
}