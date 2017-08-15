

$(document).ready( function( $ ){
	"use strict";

	var deferred = new DeferredImages();

	var tiles = new Tiles({
		container: '.home-tiles',
		tiles: '.home-tile',
		onChange: function(){
			deferred.loadAll();
		}
	});

	var oembed = new Oembed();

	var details = new ArtistDetails({
		artistContainer: '.artist-details',
		onLoad: function(){
			tiles.filter('none');
			oembed.embed();
		},
	});

	AjaxHistory.addModule(tiles, details, oembed, deferred);
	AjaxHistory.replace(window.location.href);
	AjaxHistory.goState(window.location.href);
});