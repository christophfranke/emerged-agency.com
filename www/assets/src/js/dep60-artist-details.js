

function ArtistDetails(options){
	"use strict";

	var linkSelector = '[data-artist]';
	var artistContainerSelector = options['artistContainer'];
	var onLoadCallback = options['onLoad'];

	var fadeTime = 1.5;

	var artistHTML = '';

	var self = this;

	function fadeOut(){
		$(artistContainerSelector).css('opacity', '0');
	}

	function fadeIn(){
		$(artistContainerSelector).css('opacity', '1');
	}

	function updateArtistContainer(){
		$(artistContainerSelector).html(artistHTML);
	}

	self.loadArtistFromURL = function(url, onComplete){
		var ajaxURL = url + '.ajax';
		fadeOut();
		Ajax.get(ajaxURL, function(html){
			artistHTML = html;
			updateArtistContainer();
			if(typeof onLoadCallback === 'function')
				onLoadCallback();
			if(typeof onComplete === 'function')
				onComplete();
			fadeIn();
		});
	}

	self.unloadArtist = function(){
		fadeOut();
		artistHTML = '';
		setTimeout(function(){
			updateArtistContainer();
		}, 1000*fadeTime);
	}

	self.goState = function(url, onComplete){
		var validationURI = '/portfolio/';
		var validate = url.indexOf(validationURI);
		var invalidationURI = '/portfolio/letter-';
		if(validate >= 0 && url.indexOf(invalidationURI) == -1){
			self.loadArtistFromURL(url, onComplete);
		}
		else{
			self.unloadArtist();
			if(typeof onComplete === 'function')
				onComplete();
		}
	}

	self.initialize = function(){
		$(artistContainerSelector).css('transition', 'opacity ' + fadeTime + 's');
	}

	self.initialize();
}