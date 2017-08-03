

function DeferredImages(options){
	"use strict";

	var imageSelector = 'img[data-img-src]';

	var loadingImages = 0;
	var loadedImages = 0;
	var priorityImages = [];
	var scheduledImages = [];
	//Loading two at a time is a bit faster, but also interfereces with the browsers capability of loading other ajax calls
	var maxConcurrentLoading = 1;
	var observerFrequency = 1000;

	var self = this;


	function observeScheduledImages(){
		if(loadingImages < maxConcurrentLoading && scheduledImages.length > 0)
			self.load(scheduledImages.shift());

		// console.log('loaded: ', loadedImages);
		// console.log('loading: ', loadingImages);
		// console.log('priority: ', priorityImages.length)
		// console.log('queued: ', scheduledImages.length);
		// console.log('sum: ', loadedImages + loadingImages + scheduledImages.length + priorityImages.length);

		setTimeout(function(){
			observeScheduledImages();
		}, observerFrequency);
	}

	function finalizeImageLoad(image){
		loadingImages--;
		loadedImages++;
		if(loadingImages < maxConcurrentLoading){
			if(priorityImages.length > 0)
				self.load(priorityImages.shift())
			else if(scheduledImages.length > 0)
				self.load(scheduledImages.shift());
		}

		$(image).removeAttr('data-img-src');
	}

	function isPriority(image){
		return $(image).data('img-priority') == 1;
	}

	self.goState = function(url){
		return function(){
			self.loadAll();
		}
	}

	self.load = function(image){
		var src = $(image).data('img-src');

		//make sure we don't confuse ourself with reloading
		if($(image).attr('src') == src)
			return;

		if(loadingImages >= maxConcurrentLoading){
			if(isPriority(image))
				priorityImages.push(image);
			else
				scheduledImages.push(image);
			return;
		}

		loadingImages++;
		$(image).on('load', function(){
			finalizeImageLoad(image);
			$(image).css('opacity', 1);
		});
		$(image).on('error', function(){
			finalizeImageLoad(image);
		});

		//make sure we get load event after setting image
		$(image).removeAttr('src');
		$(image).attr('src', src);
	}

	self.loadAll = function(){
		var images = $(imageSelector);

		//purge all scheduled
		scheduledImages = [];
		priorityImages = [];


		//load priority images first
		for(var i=0; i < images.length; i++){
			if(isPriority(images[i]))
				self.load(images[i]);
		}
		for(var i=0; i < images.length; i++){
			if(!isPriority(images[i]))
				self.load(images[i]);
		}
	}

	self.initialize = function(){
		self.loadAll();
		observeScheduledImages();
	}

	self.initialize();
}