

function Tiles(options){
	"use strict";

	//process options
	var containerSelector = options['container'];
	var tileSelector = options['tiles'];
	var triggerSelector = '[data-filterby]';
	var historyBaseURL = '/portfolio/';

	var transitionTime = '1s';

	//collections
	var tiles = $(tileSelector);
	var container = $(containerSelector);
	var triggers = $(triggerSelector);

	//current state
	var currentFilter = null;
	var width = null;
	var height = null;
	var elemsPerRow = null;

	var resizeTimeoutId = null;
	var resizeDelay = 250; //wait 50ms before resizing

	//keep reference to self
	var self = this;

	//private functions
	function isVisible(element){
		if(currentFilter == null)
			return true;
		else
			return $(element).hasClass(currentFilter);
	}


	function updateCSS(){
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
				$(element).css('opacity', 1);
				visibleTiles++;
			}
			else{
				var top = $(element).css('top');
				var left = $(element).css('left');
				top = parseInt(top.substring(0, top.length-2));
				left = parseInt(left.substring(0, left.length-2));
				$(element).css('width', 0);
				$(element).css('height', 0);
				$(element).css('left', left + $(element).width()/2);
				$(element).css('top', top + $(element).height()/2);
				$(element).css('opacity', 0);
			}
		}

		//set container dimensions
		var rows = Math.ceil(visibleTiles/elemsPerRow);
		container.css('height', height*rows);
	}

	function setInitialCSS(){
		container.css('position', 'relative');
		container.css('width', '100%');
		container.css('transition', 'all ' + transitionTime);
		tiles.css('position', 'absolute');
		tiles.css('transition', 'all ' + transitionTime);
		tiles.css('overflow', 'hidden');
	}

	function updateDimensions(){
		$(tiles).css('transition', '');
		$(tiles).css('left', '');
		$(tiles).css('top', '');
		$(tiles).css('width', '');
		$(tiles).css('height', '');

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

		tiles.css('transition', 'all ' + transitionTime);
	}

	function updateTriggerClass(){
		$(triggers).removeClass('active');

		var selector = currentFilter == null ?
			'[data-filterby=""]':'[data-filterby=' + currentFilter + ']';
		var trigger = $(selector);
		if(trigger.length > 0)
			trigger.addClass('active');
	}

	//apply event handler
	function initializeFilterTrigger(){
		for(var i=0; i < triggers.length; i++){
			var trigger = triggers[i];
			$(trigger).on('click', function(){
				self.filter($(this).data('filterby'));
				var historyURL = historyBaseURL + (currentFilter || '');
				AjaxHistory.push(historyURL);
				return false;
			});
		}
	}

	function initializeResizeTrigger(){
		$(window).on('resize', function(){
			//resize guard
			if(resizeTimeoutId != null)
				clearTimeout(resizeTimeoutId);

			resizeTimeoutId = setTimeout( function(){
				updateDimensions();
				updateCSS();
				resizeTimeoutId = null;
			}, resizeDelay);
		});
	}


	//public functions

	this.currentStateFunction = function(){
		var state = {
			currentFilter: currentFilter
		};
		return function(){
			self.filter(state.currentFilter);
		};
	}

	//initialize. Happens on object creation, but can be triggerd manually if necessary
	this.initialize = function(){
		setInitialCSS();
		updateDimensions();
		updateCSS();
		initializeFilterTrigger();
		initializeResizeTrigger();
	}

	//recalculate all styles
	this.update = function(){
		updateDimensions();
		updateCSS();
	}

	//apply a filter class
	this.filter = function(className){
		if(className === undefined || className == '')
			className = null;
		currentFilter = className;

		updateTriggerClass();
		updateCSS();
	}



	this.initialize();
}
