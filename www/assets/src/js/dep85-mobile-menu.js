

function MobileMenu(){

	var menuButtonSelector = '.mobile-menu-button';
	var menuSelector = '.mobile-menu';

	var self = this;


	self.showMenu = function(){
		$(menuSelector).addClass('visible');
	}

	self.hideMenu = function(){
		$(menuSelector).removeClass('visible');
	}

	self.toggleMenu = function(){
		$(menuSelector).toggleClass('visible');
	}


	self.initialize = function(){
		$(menuButtonSelector).on('click', function(){
			self.toggleMenu();
		});

		self.hideMenu();
	}


	self.initialize();
}