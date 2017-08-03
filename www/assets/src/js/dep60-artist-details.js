

function ArtistDetails(options){
	"use strict";

	var linkSelector = '[data-artist]';
	var artistContainerSelector = options['artistContainer'];
	var onLoadCallback = options['onLoad'];
	var unloadArtistSelector = '[data-close-artist-details]';

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

	self.loadArtistFromElement = function(element){
		var url = $(element).attr('href');
		self.loadArtistFromURL(url);
		AjaxHistory.push(url);
	}

	self.loadArtistFromURL = function(url){
		var ajaxURL = url + '.ajax';
		fadeOut();
		Ajax.get(ajaxURL, function(html){
			artistHTML = html;
			updateArtistContainer();
			onLoadCallback();
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

	self.goState = function(url){
		console.log('artist details go ' + url);
		var validationURI = '/portfolio/';
		var validate = url.indexOf(validationURI);
		var invalidationURI = '/portfolio/letter-';
		if(validate >= 0 && url.indexOf(invalidationURI) == -1){
			self.loadArtistFromURL(url);
		}
	}

	self.initialize= function(){
		$(artistContainerSelector).css('transition', 'opacity ' + fadeTime + 's');
		$(linkSelector).on('click', function(){
			//load artist
			self.loadArtistFromElement(this);

			//consume action (i.e. not follow the link)
			return false;
		});
		$(unloadArtistSelector).on('click', function(){
			self.unloadArtist();
		});
	}

	self.initialize();
}