;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	// New: IO-based fade-in (replaces old Waypoints logic)
	// New: IO-based fade-in (keeps legacy effect names)
	var contentWayPoint = function () {
		var els = document.querySelectorAll('.animate-box');
		if (!els.length) return;

		// Detect Animate.css major version by probing a well-known v4 class
		var supportsV4 = !!document.createElement('div').classList;

		// Helper to apply classes in a version-agnostic way
		function applyAnimateClasses(el, effect) {
			// Legacy v3 classes
			el.classList.add('animated', 'animated-fast', effect);

			// v4 classes (prefixed with animate__)
			el.classList.add('animate__animated', 'animate__' + effect);
		}

		// Fallback: show immediately on very old browsers
		if (!('IntersectionObserver' in window)) {
			els.forEach(function (el) {
			var effect = el.getAttribute('data-animate-effect') || 'fadeInUp';
			applyAnimateClasses(el, effect);
			// ensure visible after classes are applied
			el.style.opacity = '1';
			el.style.transform = 'none';
			});
			return;
		}

		// Ensure initial hidden state (in case CSS didn’t load yet)
		els.forEach(function (el) {
			el.style.opacity = '0';
			el.style.transform = 'translateY(12px)';
		});

		var io = new IntersectionObserver(function (entries, obs) {
			entries.forEach(function (entry) {
			if (!entry.isIntersecting) return;

			var el = entry.target;
			var effect = el.getAttribute('data-animate-effect') || 'fadeInUp';

			applyAnimateClasses(el, effect);

			// in case a custom CSS transition is present, make sure it ends visible
			el.style.opacity = '1';
			el.style.transform = 'none';

			obs.unobserve(el); // animate once
			});
		}, {
			threshold: 0.18,
			rootMargin: '0px 0px -10% 0px'  // must include 'px' or '%'
		});

		els.forEach(function (el) { io.observe(el); });
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	// IntersectionObserver-based fade-in that preserves legacy effect names
	var contentWayPoint = function () {
  		var els = document.querySelectorAll('.animate-box');
			if (!els.length) return;

			// Old browsers: reveal without animation (no inline styles)
			if (!('IntersectionObserver' in window)) {
				els.forEach(function (el) {
				el.classList.add('in-view'); // end state
				// If you want animate.css to still run once:
				var effect = el.getAttribute('data-animate-effect') || 'fadeInUp';
				el.classList.add('animated-fast', effect);
				});
				return;
			}

		var io = new IntersectionObserver(function (entries, obs) {
			entries.forEach(function (entry) {
			if (!entry.isIntersecting) return;

			var el = entry.target;
			var effect = el.getAttribute('data-animate-effect') || 'fadeInUp';

			// Toggle classes only — no inline opacity/transform
			el.classList.add('in-view');            // triggers CSS transition end state
			el.classList.add('animated-fast', effect); // keeps legacy animate.css names

			obs.unobserve(el); // animate once
			});
		}, {
			threshold: 0.2,
			rootMargin: '0px 0px -10% 0'
		});

		els.forEach(function (el) { io.observe(el); });
			};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	
	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		// counter();
		counterWayPoint();
	});

	// After full page (including images) has loaded, recalculate waypoints
	// window.addEventListener('load', function () {
	// 	// Waypoints 4.x global refresh
	// 	if (window.Waypoint && typeof Waypoint.refreshAll === 'function') {
	// 		Waypoint.refreshAll();
	// 	}
	// 	// Fallback for older jQuery Waypoints
	// 	else if (window.jQuery && jQuery.waypoints) {
	// 		jQuery.waypoints('refresh');
	// 	}
	// 	});



}());