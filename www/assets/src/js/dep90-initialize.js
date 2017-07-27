

$(document).ready( function( $ ){
	"use strict";
	var tiles = new Tiles({
		container: '.home-tiles',
		tiles: '.home-tile',
	});

	var oembed = new Oembed();
	oembed.embed();

	var details = new ArtistDetails({
		artistContainer: '.artist-details',
		onLoad: function(){
			tiles.filter('none');
			oembed.embed();
		},
	});

	AjaxHistory.addModule(tiles, details, oembed);
	AjaxHistory.push(window.location.href);
});