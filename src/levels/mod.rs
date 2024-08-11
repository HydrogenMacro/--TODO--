use std::sync::LazyLock;
use hecs::*;
use crate::levels::level1::Level1;

pub mod level1;

pub struct InLevel<const LEVEL: usize>;

pub trait Level: 'static + Send + Sync {
	fn init(&mut self, world: &mut World);
	fn update(&mut self, world: &mut World, change_level: &mut bool);
	fn cleanup(&mut self, world: &mut World);
}