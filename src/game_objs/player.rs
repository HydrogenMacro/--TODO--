use std::sync::LazyLock;
use hecs::*;
use macroquad::prelude::*;
use rapier2d::prelude::*;
use macroquad::experimental::collections::storage;
use macroquad::prelude::animation::{AnimatedSprite, Animation};
use rapier2d::control::KinematicCharacterController;
use crate::assets::Assets;
use crate::game_objs::Texture;

#[derive(Default, Debug)]
pub struct Player;

#[derive(Bundle, Debug)]
pub struct PlayerBundle {
	player_marker: Player,
	texture: Texture2D,
	rigid_body_handle: RigidBodyHandle,
	collider_handle: ColliderHandle,
	kinematic_character_controller: KinematicCharacterController
}
impl Default for PlayerBundle {
	fn default() -> Self {
		let mut rigid_body_set = storage::get_mut::<RigidBodySet>();
		let mut collider_set = storage::get_mut::<ColliderSet>();
		let rigid_body_handle = rigid_body_set.insert(RigidBodyBuilder::dynamic());
		PlayerBundle {
			player_marker: Player,
			texture: storage::get::<Assets>().0.get(&"favicon.png").unwrap().clone(),
			rigid_body_handle,
			collider_handle: collider_set.insert_with_parent(
				ColliderBuilder::cuboid(10., 10.).mass(10.),
				rigid_body_handle,
				&mut rigid_body_set
			),
			kinematic_character_controller: KinematicCharacterController::default()
		}
	}
}