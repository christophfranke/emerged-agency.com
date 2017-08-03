	
function AjaxHistoryClass(modules){
	"use strict";

	var modules = modules || [];

	//tell the modules to go to a specific url
	function recreateState(url){
		for(var i=0; i < modules.length; i++){
			modules[i].goState(url);
		}
	}


	this.addModule = function(){
		for(var i=0; i<arguments.length; i++){
			modules.push(arguments[i]);
		}
	}

	this.push = function(url){

		//push url into history
		history.pushState(
			{
				url: url,
			},
			null, //title, not used currently
			url
		);
	}

	this.initialize = function(){

		$(window).bind('popstate', function(e){
			var state = e.originalEvent.state;
			if(state != null){
				recreateState(state.url);
			}
		});
	}

	this.initialize();
}
var AjaxHistory = new AjaxHistoryClass();
