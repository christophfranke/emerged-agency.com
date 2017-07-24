

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
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				onResponse(this.responseText);
				finishCSSAnimation();
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}

	function updateArtistContainer(){
		$(artistContainerSelector).html(artistHTML);
	}

	this.currentStateFunction = function(){
		var state = {
			artistHTML: artistHTML
		};
		return function(){
			artistHTML = state.artistHTML;
			updateArtistContainer();
		};
	}

	this.initialize= function(){
		$(artistContainerSelector).css('transition', 'opacity 1.5s');
		$(linkSelector).on('click', function(){
			var url = $(this).data(urlField);
			var historyURL = $(this).attr('href');
			startCSSAnimation();
			get(url, function(html){
				artistHTML = html;
				updateArtistContainer();
				onLoadCallback();
				AjaxHistory.push(historyURL);
			});

			//action consumed
			return false;
		});
	}


	this.initialize();
}