

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

	var deferred = new DeferredImages();

	AjaxHistory.addModule(tiles, details, oembed, deferred);
	AjaxHistory.push(window.location.href);
});