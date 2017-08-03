

function ArtistDetails(options){
	"use strict";

	var urlField = 'artist-url'
	var linkSelector = '[data-' + urlField + ']';
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

	function get(url, onResponse){
		Ajax.get(url, function(response){
			onResponse(response);
			fadeIn();			
		});
	}

	function updateArtistContainer(){
		$(artistContainerSelector).html(artistHTML);
	}

	self.loadArtist = function(element){
		var url = $(element).data(urlField);
		var historyURL = $(element).attr('href');
		fadeOut();
		get(url, function(html){
			artistHTML = html;
			updateArtistContainer();
			onLoadCallback();
			AjaxHistory.push(historyURL);
		});
	}

	self.unloadArtist = function(){
		fadeOut();
		artistHTML = '';
		setTimeout(function(){
			updateArtistContainer();
		}, 1000*fadeTime);
	}

	self.currentStateFunction = function(){
		var state = {
			artistHTML: artistHTML
		};
		return function(){
			artistHTML = state.artistHTML;
			updateArtistContainer();
			fadeIn();
		};
	}

	self.initialize= function(){
		$(artistContainerSelector).css('transition', 'opacity ' + fadeTime + 's');
		$(linkSelector).on('click', function(){
			//load artist
			self.loadArtist(this);

			//consume action (i.e. not follow the link)
			return false;
		});
		$(unloadArtistSelector).on('click', function(){
			self.unloadArtist();
		});
	}

	self.initialize();
}