use hecs::*;
use crate::levels::level1::Level1;

pub mod level1;
pub const LEVELS: &'static [&'static dyn Level] = &[
	&Level1
];
pub trait Level: 'static + Send + Sync {
	fn init(&self, world: &mut World);
	fn update(&self, world: &mut World, change_level: &mut bool);
	fn cleanup(&self, world: &mut World);
}