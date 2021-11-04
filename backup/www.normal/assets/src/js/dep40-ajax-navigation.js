	
var AjaxNavigation = {

	linkAttr: 'data-ajax-navigation',


	//tell the modules to go to a specific url
	goState: function(url){
		for(var k in objects){
			if(typeof objects[k].goState === 'function')
				objects[k].goState(url);
		}
	},


	replaceState: function(url){
		//push url into history
		history.replaceState(
			{
				url: url,
			},
			null, //title, not used currently
			url
		);
	},

	push: function(url){
		//push url into history
		history.pushState(
			{
				url: url,
			},
			null, //title, not used currently
			url
		);
	},

	pushAndGo: function(url){
		AjaxNavigation.push(url);
		AjaxNavigation.goState(url);
	},

	updateLinks: function(){
		var linkAttr = AjaxNavigation.linkAttr;
		var links = $('[' + linkAttr + ']');
		for(var i=0; i < links.length; i++){
			var link = links[i];
			$(link).on('click', function(){
				var url = $(this).attr('href');
				AjaxNavigation.pushAndGo(url);
				return false;
			});
			$(link).removeAttr(linkAttr);
		}
	},

	initialize: function(){

		$(window).bind('popstate', function(e){
			var state = e.originalEvent.state;
			if(state != null){
				AjaxNavigation.goState(state.url);
			}
		});

		AjaxNavigation.updateLinks();
	}

};
