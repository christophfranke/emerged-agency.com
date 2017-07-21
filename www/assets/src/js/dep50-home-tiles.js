

function Tiles(options){
	"use strict";

	//process options
	var containerSelector = options['container'];
	var tileSelector = options['tiles'];
	var triggerSelector = options['trigger'];

	//collections
	var tiles = $(tileSelector);
	var container = $(containerSelector);
	var triggers = $(triggerSelector);

	//current state
	var currentFilter = null;
	var width = null;
	var height = null;
	var elemsPerRow = null;


	//private functions
	function isVisible(element){
		if(currentFilter == null)
			return true;
		else
			return $(element).hasClass(currentFilter);
	}


	function updateCSS(){
		//set container dimensions
		var rows = Math.ceil(tiles.length/elemsPerRow);
		container.css('height', height*rows);

		//set element css
		var visibleTiles = 0;
		for(var i=0; i < tiles.length; i++){
			var element = tiles[i];
			if(isVisible(element)){			
				var currentRow = Math.floor(visibleTiles/5);
				var currentCol = visibleTiles % 5;
				$(element).css('left', width*currentCol);
				$(element).css('top', height*currentRow);
				$(element).css('width', width);
				$(element).css('height', height);
				visibleTiles++;
			}
			else{
				$(element).css('width', 0);
				$(element).css('height', 0);
			}

		}
	}

	function setInitialCSS(){
		container.css('position', 'relative');
		container.css('transition', 'all 0.7s');
		tiles.css('position', 'absolute');
		tiles.css('transition', 'all 0.7s');
		tiles.css('overflow', 'hidden');
	}

	function updateDimensions(){

		//find a visible tile
		var visibleTile = null
		for(var i=0; i < tiles.length; i++)
		{
			if($(tiles[i]).width() > 0){
				visibleTile = tiles[i];
				break;
			}
		}

		//update dimensions
		if(visibleTile != null){		
			width = $(visibleTile).width();
			height = $(visibleTile).height();
			elemsPerRow = Math.floor(container.width()/width);
		}
	}

	//apply event handler
	function initializeFilterTrigger(){
		for(var i=0; i < triggers.length; i++){
			var trigger = triggers[i];
			console.log(trigger);
		}
	}


	//public functions

	//initialize. Happens on object creation, but can be triggerd manually if necessary
	this.initialize = function(){
		setInitialCSS();
		updateDimensions();
		updateCSS();
		initializeFilterTrigger()
	}

	//recalculate all styles
	this.update = function(){
		updateDimensions();
		updateCSS();
	}

	//apply a filter class
	this.filter = function(className){
		if(className === undefined)
			className = null;
		currentFilter = className;
		updateDimensions();
		updateCSS();
	}



	this.initialize();
}
