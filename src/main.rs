#[macro_use]
extern crate hecs;

use hecs::*;
use macroquad::experimental::collections::storage;
use macroquad::prelude::*;

use crate::assets::{Assets, load_assets};
use crate::levels::{Level, level1};
use crate::levels::level1::Level1;

mod levels;
mod game_objs;
mod assets;

#[macroquad::main("TODO")]
async fn main() {
	set_pc_assets_folder("assets");

	load_assets().await;

	let mut world = World::new();

	let mut current_level_index = 0;
	let mut should_change_level = false;

	let mut levels = [
		&mut Level1(macroquad_platformer::World::new())
	];
	levels[current_level_index].init(&mut world);

	loop {
		clear_background(GREEN);
		levels[current_level_index].update(&mut world, &mut should_change_level);

		if should_change_level {
			levels[current_level_index].cleanup(&mut world);
			current_level_index += 1;
			if current_level_index > levels.len() - 1 {
				panic!("level does not exist")
			}
			levels[current_level_index].init(&mut world);
		}
		next_frame().await;
	}
}