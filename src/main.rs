#[macro_use]
extern crate hecs;

use hecs::*;
use macroquad::experimental::collections::storage;
use macroquad::prelude::*;
use rapier2d::prelude::*;

use crate::assets::{Assets, load_assets};
use crate::levels::{Level, LEVELS};

mod levels;
mod game_objs;
mod assets;

#[macroquad::main("TODO")]
async fn main() {
	set_pc_assets_folder("assets");

	load_assets().await;

	let mut world = World::new();

	storage::store(RigidBodySet::new());
	storage::store(ColliderSet::new());

	let mut current_level_index = 0;
	let mut should_change_level = false;
	LEVELS[current_level_index].init(&mut world);

	let integration_parameters = IntegrationParameters::default();
	let mut physics_pipeline = PhysicsPipeline::new();
	let mut island_manager = IslandManager::new();
	let mut broad_phase = BroadPhaseMultiSap::new();
	let mut narrow_phase = NarrowPhase::new();
	let mut impulse_joint_set = ImpulseJointSet::new();
	let mut multibody_joint_set = MultibodyJointSet::new();
	let mut ccd_solver = CCDSolver::new();
	let mut query_pipeline = QueryPipeline::new();
	loop {
		clear_background(GREEN);
		LEVELS[current_level_index].update(&mut world, &mut should_change_level);
		physics_pipeline.step(
			&vector![0.0, 1.0],
			&integration_parameters,
			&mut island_manager,
			&mut broad_phase,
			&mut narrow_phase,
			&mut storage::get_mut::<RigidBodySet>(),
			&mut storage::get_mut::<ColliderSet>(),
			&mut impulse_joint_set,
			&mut multibody_joint_set,
			&mut ccd_solver,
			Some(&mut query_pipeline),
			&(),
			&(),
		);
		if should_change_level {
			LEVELS[current_level_index].cleanup(&mut world);
			current_level_index += 1;
			if current_level_index > LEVELS.len() - 1 {
				panic!("level does not exist")
			}
			LEVELS[current_level_index].init(&mut world);
		}
		next_frame().await;
	}
}