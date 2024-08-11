use std::sync::LazyLock;

use hecs::*;
use macroquad::experimental::collections::storage;
use macroquad::prelude::*;
use macroquad::prelude::animation::{AnimatedSprite, Animation};
use macroquad_platformer::Actor;

use crate::assets::Assets;
use crate::game_objs::Texture;

#[derive(Default, Debug)]
pub struct Player;

#[derive(Bundle, Debug)]
pub struct PlayerBundle {
	player_marker: Player,
	texture: Texture2D,
	actor: Actor
}

impl PlayerBundle {
	pub(crate) fn new(physics_world: &mut macroquad_platformer::World) -> Self {
		PlayerBundle {
			player_marker: Player,
			texture: storage::get::<Assets>().0.get(&"favicon.png").unwrap().clone(),
			actor: physics_world.add_actor(Vec2::new(0., 0.), 10, 10)
		}
	}
}