

function ArtistDetails(options){

	var urlField = 'artist-url'
	var linkSelector = '[data-' + urlField + ']';
	var artistContainerSelector = options['artistContainer'];
	var onLoadCallback = options['onLoad'];

	var artistHTML = '';

	var self = this;

	function startCSSAnimation(){
		$(artistContainerSelector).css('opacity', '0');
	}

	function finishCSSAnimation(){
		$(artistContainerSelector).css('opacity', '1');
	}

	function get(url, onResponse){
		Ajax.get(url, function(response){
			onResponse(response);
			finishCSSAnimation();			
		});
	}

	function updateArtistContainer(){
		$(artistContainerSelector).html(artistHTML);
	}

	self.loadArtist = function(element){
		var url = $(element).data(urlField);
		var historyURL = $(element).attr('href');
		startCSSAnimation();
		get(url, function(html){
			artistHTML = html;
			updateArtistContainer();
			onLoadCallback();
			AjaxHistory.push(historyURL);
		});		
	}

	self.currentStateFunction = function(){
		var state = {
			artistHTML: artistHTML
		};
		return function(){
			artistHTML = state.artistHTML;
			updateArtistContainer();
		};
	}

	self.initialize= function(){
		$(artistContainerSelector).css('transition', 'opacity 1.5s');
		$(linkSelector).on('click', function(){
			//load artist
			self.loadArtist(this);

			//consume action (i.e. not follow the link)
			return false;
		});
	}

	self.initialize();
}