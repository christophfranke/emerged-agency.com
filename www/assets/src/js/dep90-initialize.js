

var objects = {};
$(document).ready( function( $ ){
	"use strict";

	objects.deferred = new DeferredImages();

	objects.tiles = new Tiles({
		container: '.home-tiles',
		tiles: '.home-tile',
	});

	objects.oembed = new Oembed();

	objects.details = new ArtistDetails({
		artistContainer: '.artist-details',
	});


	AjaxNavigation.initialize();
	AjaxNavigation.replaceState(window.location.href);
	AjaxNavigation.goState(window.location.href);
});