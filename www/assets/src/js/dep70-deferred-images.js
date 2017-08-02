

function DeferredImages(options){
	"use strict";

	var imageSelector = 'img[data-img-src]';
	var images = $(imageSelector);

	var loadingImages = 0;
	var maxConcurrentLoading = 1;
	var scheduledImages = [];

	var self = this;


	self.currentStateFunction = function(){
		return function(){
			self.loadAll();
		}
	}

	self.load = function(image){
		var src = $(image).data('img-src');
		if(loadingImages > maxConcurrentLoading){
			console.log('scheduled ' + src);
			scheduledImages.push(image);
		}

		loadingImages++;
		$(image).on('load', function(){
			loadingImages--;
			console.log('loaded ' + src);
			if(loadingImages < maxConcurrentLoading && scheduledImages.length > 0)
				self.load(scheduledImages.pop());
		});

		console.log('loading ' + src);
		$(image).attr('src', src);
	}

	self.loadAll = function(){
		for(var i=0; i < images.length; i++){
			self.load(images[i]);
		}
	}

	self.initialize = function(){
		self.loadAll();
	}

	self.initialize();
}