use hecs::*;
use macroquad::prelude::*;
use rapier2d::prelude::*;
use macroquad::experimental::collections::storage;

pub struct Player(Vec2);
pub struct Camera(Camera2D);
pub fn player(position: Vec2) -> BuiltEntity<'static> {
	let rigid_body = RigidBodyBuilder::kinematic_velocity_based()
		.position(position)
	let collider = ColliderBuilder::ball(10.);
	EntityBuilder::new()
		.add(Player)
		.add(Camera(Camera2D::default()))
		.add(storage::get::<RigidBodySet>().insert(rigid_body))
		.add(storage::get::<ColliderSet>().insert(collider))
		.build()
}