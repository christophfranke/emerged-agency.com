

$(document).ready( function( $ ){
	"use strict";
	var tiles = new Tiles({
		container: '.home-tiles',
		tiles: '.home-tile',
	});

	var details = new ArtistDetails({
		artistContainer: '.artist-details',
		onLoad: function(){
			tiles.filter('none');
		},
	});

	AjaxHistory.addModule(tiles, details);
	AjaxHistory.push('/');
});