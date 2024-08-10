use hecs::World;
use macroquad::prelude::*;
use crate::levels::Level;

pub struct Level1;

impl Level for Level1 {
	fn init(&self, world: &mut World) {
		world.spawn(());
	}

	fn update(&self, world: &mut World, change_level: &mut bool) {
		draw_rectangle(0., 0., 10., 10., BLUE);
	}

	fn cleanup(&self, world: &mut World) {

	}
}