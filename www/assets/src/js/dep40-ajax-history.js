	
function AjaxHistoryClass(modules){

	var modules = modules || [];
	var urlFunctionMap = {};

	//look up url in functino map and execute
	function recreateState(url){
		if(typeof urlFunctionMap[url] === 'function')
			urlFunctionMap[url]();
		else
			console.error('URL ' + url + ' not found');
	}


	this.addModule = function(){
		for(var i=0; i<arguments.length; i++){
			modules.push(arguments[i]);
		}
	}

	this.push = function(url){
		//get states of all registered modules
		var states = []
		for(var i=0; i < modules.length; i++){
			states[i] = modules[i].currentStateFunction();
		}

		//map them into the url->function map
		urlFunctionMap[url] = function(){
			for(var i=0;i<states.length;i++){
				states[i]();
			}
		}

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
