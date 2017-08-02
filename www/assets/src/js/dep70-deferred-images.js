

function DeferredImages(options){
	"use strict";

	var imageSelector = 'img[data-img-src]';
	var images = $(imageSelector);

	var loadingImages = 0;
	var loadedImages = 0;
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
		// console.log('queued: ', scheduledImages.length);
		// console.log('sum: ', loadedImages + loadingImages + scheduledImages.length);

		setTimeout(function(){
			observeScheduledImages();
		}, observerFrequency);
	}

	function finalizeImageLoad(){
		loadingImages--;
		loadedImages++;
		if(loadingImages < maxConcurrentLoading && scheduledImages.length > 0)
			self.load(scheduledImages.shift());
	}

	self.currentStateFunction = function(){
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
			scheduledImages.push(image);
			return;
		}

		loadingImages++;
		$(image).on('load', function(){
			finalizeImageLoad();
		});
		$(image).on('error', function(){
			finalizeImageLoad();
		});

		//make sure we get load event after setting image
		$(image).removeAttr('src');
		$(image).attr('src', src);
	}

	self.loadAll = function(){
		for(var i=0; i < images.length; i++){
			self.load(images[i]);
		}
	}

	self.initialize = function(){
		self.loadAll();
		observeScheduledImages();
	}

	self.initialize();
}