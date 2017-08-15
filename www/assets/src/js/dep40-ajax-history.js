	
function AjaxHistoryClass(modules){
	"use strict";

	var linkAttr = 'data-ajax-navigation';

	var modules = modules || [];
	var self = this;

	//tell the modules to go to a specific url
	self.goState = function(url){
		for(var i=0; i < modules.length; i++){
			modules[i].goState(url, function(){
				self.updateLinks();
			});
		}
	}


	self.addModule = function(){
		for(var i=0; i<arguments.length; i++){
			modules.push(arguments[i]);
		}
	}

	self.replace = function(url){
		//push url into history
		history.replaceState(
			{
				url: url,
			},
			null, //title, not used currently
			url
		);
	}

	self.push = function(url){
		//push url into history
		history.pushState(
			{
				url: url,
			},
			null, //title, not used currently
			url
		);
	}

	self.pushAndGo = function(url){
		self.push(url);
		self.goState(url);
	}

	self.updateLinks = function(){
		var links = $('[' + linkAttr + ']');
		for(var i=0; i < links.length; i++){
			var link = links[i];
			$(link).on('click', function(){
				var url = $(this).attr('href');
				self.pushAndGo(url);
				return false;
			});
			$(link).removeAttr(linkAttr);
		}
	}

	self.initialize = function(){

		$(window).bind('popstate', function(e){
			var state = e.originalEvent.state;
			if(state != null){
				self.goState(state.url);
			}
		});

		self.updateLinks();
	}

	this.initialize();
}
var AjaxHistory = new AjaxHistoryClass();
