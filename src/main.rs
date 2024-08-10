#[macro_use]
extern crate hecs;

mod levels;
mod game_objs;
mod assets;

use hecs::*;
use macroquad::prelude::*;
use rapier2d::prelude::*;
use crate::levels::{Level, LEVELS};
use macroquad::experimental::collections::storage;
use crate::assets::{Assets, load_assets};

#[macroquad::main("BasicShapes")]
async fn main() {
	set_pc_assets_folder("assets");
	storage::store(Assets::default());
	load_assets().await;

	let mut world = World::new();

	storage::store(RigidBodySet::new());
	storage::store(ColliderSet::new());

	let mut current_level_index = 0;
	let mut should_change_level = false;
	LEVELS[current_level_index].init(&mut world);
	loop {
        clear_background(GREEN);
		LEVELS[current_level_index].update(&mut world, &mut should_change_level);
		if should_change_level {
			LEVELS[current_level_index].cleanup(&mut world);
			current_level_index += 1;
			LEVELS[current_level_index].init(&mut world);
		}
        next_frame().await;
    }
}