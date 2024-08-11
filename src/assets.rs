use std::collections::HashMap;
use std::ops::Deref;
use macroquad::experimental::collections::storage;
use macroquad::prelude::*;

#[derive(Debug, Default)]
pub struct Assets(pub(crate) HashMap<&'static str, Texture2D>);

pub async fn load_assets() {
	let assets = [
		"favicon.png"
	];
	storage::store(Assets::default());
	for assetName in assets {
		storage::get_mut::<Assets>().0.insert(assetName, load_texture(assetName).await.unwrap());
	}
}