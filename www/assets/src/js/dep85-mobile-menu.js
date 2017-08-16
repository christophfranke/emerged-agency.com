

function MobileMenu(){

	var menuButtonSelector = '.mobile-menu-button';
	var menuSelector = '.mobile-menu';

	var self = this;


	self.showMenu = function(){
		$(menuSelector).addClass('visible');
		// $(menuSelector).slideDown();
	}

	self.hideMenu = function(){
		$(menuSelector).removeClass('visible');
		// $(menuSelector).slideUp();
	}

	self.toggleMenu = function(){
		$(menuSelector).toggleClass('visible');
		// $(menuSelector).slideToggle();
	}


	self.initialize = function(){
		$(menuButtonSelector).on('click', function(){
			self.toggleMenu();
		});

		self.hideMenu();
	}


	self.initialize();
}