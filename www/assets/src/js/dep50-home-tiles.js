

function Tiles(options){
	"use strict";

	//process options
	var containerSelector = options['container'];
	var tileSelector = options['tiles'];
	var triggerSelector = '[data-filterby]';
	var onChange = options['onChange'];

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

	function assignCSS(element, left, top, width, height){
		var scaleX = width > 0 ? 1:0;
		var scaleY = height > 0 ? 1:0;
		var transformString = 'translate3d(' + left + 'px,' + top + 'px,0px) scale3d(' + scaleX + ',' + scaleY + ',1)';
		$(element).css('transform',transformString);
	}

	function markVisible(element){
		$(element).addClass('visible');
		$(element).find('img[data-img-src]').attr('data-img-priority', '1');
	}

	function markInvisible(element){
		$(element).removeClass('visible');
		$(element).find('img[data-img-src]').attr('data-img-priority', '0');
		$(element).find('img[data-img-src]').removeAttr('data-img-priority');
	}


	function updateCSS(){
		//set element css
		var visibleTiles = 0;
		for(var i=0; i < tiles.length; i++){
			var element = tiles[i];
			if(isVisible(element)){			
				var currentRow = Math.floor(visibleTiles/5);
				var currentCol = visibleTiles % 5;
				assignCSS(element, width*currentCol, height*currentRow, width, height);

				//save data
				$(element).data('top', height*currentRow);
				$(element).data('left', width*currentCol);

				$(element).css('opacity', 1);

				markVisible(element);
				visibleTiles++;
			}
			else{
				var top = $(element).data('top');
				var left = $(element).data('left');
				assignCSS(element, left, top, 0, 0);
				$(element).css('opacity', 0);
				markInvisible(element);
			}
		}

		//set container dimensions
		var rows = Math.ceil(visibleTiles/elemsPerRow);
		container.css('height', height*rows);
	}

	function unsetCSS(){
		tiles.css('transition', '');
		tiles.css('left', '');
		tiles.css('top', '');
		tiles.css('width', '');
		tiles.css('height', '');
		tiles.css('padding', '');

		setTimeout(function(){
			tiles.css('transition', 'all 1s');
		}, 10);
	}

	function setInitialCSS(){
		container.css('transition', 'all ' + transitionTime);
		container.css('position', 'relative');
		container.css('width', '100%');
		container.css('opacity', 1);
		tiles.css('position', 'absolute');
		tiles.css('transition', 'all ' + transitionTime);
		tiles.css('overflow', 'hidden');
		tiles.data('top', 0);
		tiles.data('left', 0);
	}

	function updateDimensions(){
		unsetCSS();

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
			height = $(visibleTile).outerHeight();
			elemsPerRow = Math.floor(container.width()/width);
		}

		tiles.css('padding', 0);
		tiles.css('top', 0);
		tiles.css('left', 0);
		tiles.css('width', width);
		tiles.css('height', height);
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
				var historyURL = $(this).attr('href');
				AjaxHistory.push(historyURL);
				if(typeof onChange === 'function')
					onChange();
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

	//go to a state according to url
	self.goState = function(url){
		var validationURI = '/portfolio/';
		if(url == 'http://' + window.location.hostname + '/' || url == 'http://' + window.location.hostname + '/portfolio')
			url = validationURI;
		var validate = url.indexOf(validationURI);
		if(validate >= 0){		
			var filterby = url.substring(validate + validationURI.length);
			self.filter(filterby);
		}
		if(typeof onChange === 'function')
			onChange();
	}

	//initialize. Happens on object creation, but can be triggerd manually if necessary
	self.initialize = function(){
		setInitialCSS();
		updateDimensions();
		updateCSS();
		initializeFilterTrigger();
		initializeResizeTrigger();
	}

	//recalculate all styles
	self.update = function(){
		updateDimensions();
		updateCSS();
	}

	//apply a filter class
	self.filter = function(className){
		if(className === undefined || className == '')
			className = null;
		currentFilter = className;

		updateTriggerClass();
		updateCSS();
	}



	this.initialize();
}
