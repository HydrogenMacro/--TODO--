use std::sync::LazyLock;
use hecs::*;
use macroquad::prelude::*;
use rapier2d::prelude::*;
use macroquad::experimental::collections::storage;
use macroquad::prelude::animation::{AnimatedSprite, Animation};
use crate::assets::Assets;
use crate::game_objs::Texture;

#[derive(Default)]
pub struct Player;

#[derive(Bundle)]
pub struct PlayerBundle {
	player_marker: Player,
	texture: Texture2D,
	rigid_body_handle: RigidBodyHandle,
	collider_handle: ColliderHandle
}
impl Default for PlayerBundle {
	fn default() -> Self {
		PlayerBundle {
			player_marker: Player,
			texture: storage::get::<Assets>().0.get(&"favicon.png").unwrap().clone(),
			rigid_body_handle: Default::default(),
			collider_handle: Default::default(),
		}
	}
}