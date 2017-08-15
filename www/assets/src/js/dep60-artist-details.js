

function ArtistDetails(options){
	"use strict";

	var linkSelector = '[data-artist]';
	var artistContainerSelector = options['artistContainer'];
	var currentURL = null;

	var fadeTime = 1.5;

	var self = this;

	function fadeOut(){
		$(artistContainerSelector).css('opacity', '0');
	}

	function fadeIn(){
		$(artistContainerSelector).css('opacity', '1');
	}

	function scrollIfNecessary(){
		var anchor = $('.artist-content h1').offset().top;
		var pos = $(document).scrollTop();
		if(pos > anchor){
			$('html, body').animate({ scrollTop: anchor}, 'slow');
		}
	}

	function updateArtistContainer(html){
		$(artistContainerSelector).html(html);
	}

	self.loadArtist = function(url){
		if(currentURL == url){
			fadeIn();
			return;
		}
		var ajaxURL = url + '.ajax';
		fadeOut();
		Ajax.get(ajaxURL, function(html){
			updateArtistContainer(html);
			currentURL = url;
			objects.oembed.embed();
			AjaxNavigation.updateLinks();
			scrollIfNecessary();
			fadeIn();
		});
	}

	self.unloadArtist = function(){
		fadeOut();
	}

	self.goState = function(url){
		var validationURI = '/portfolio/';
		var validate = url.indexOf(validationURI);
		var invalidationURI = '/portfolio/letter-';
		if(validate >= 0 && url.indexOf(invalidationURI) == -1){
			self.loadArtist(url);
		}
		else{
			self.unloadArtist();
		}
	}

	self.initialize = function(){
		$(artistContainerSelector).css('transition', 'opacity ' + fadeTime + 's');
	}

	self.initialize();
}