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

		var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Make hiding opt-in (prevents being stuck invisible if JS races)
		els.forEach(function (el) { el.classList.add('will-animate'); });

		function reveal(el){
			var effect = prefersReduced ? 'fadeIn' : (el.getAttribute('data-animate-effect') || 'fadeInUp');
				el.classList.remove('will-animate');
				el.classList.add('in-view','animated-fast');

				// Animate.css v3 names (safe even if not loaded)
				el.classList.add('animated');
				if (effect) el.classList.add(effect);

				// Animate.css v4 names (harmless if not present)
				el.classList.add('animate__animated');
				if (effect) el.classList.add('animate__' + effect);

				el.style.opacity = '';
				el.style.transform = '';
			}

		// Duo cards (two stacked images)
		(function observeDuo(){
			var duoEls = document.querySelectorAll('.album-item--duo');
			if (!duoEls.length || !('IntersectionObserver' in window)) return;
			// mark as "will animate" so CSS can start them transparent
  			duoEls.forEach(function(el){ el.classList.add('will-animate'); });

			var duoIO = new IntersectionObserver(function(entries, obs){
				entries.forEach(function(e){
					if (!e.isIntersecting) return;
					e.target.classList.add('is-visible'); // triggers your slideIn keyframes
					obs.unobserve(e.target);
				});
				}, { threshold: 0.2, rootMargin: '0px 0px -5% 0px' });
				duoEls.forEach(function(el){ duoIO.observe(el); });
			})();

		var io = null;
		if ('IntersectionObserver' in window){
			io = new IntersectionObserver(function(entries, obs){
			entries.forEach(function(entry){
				if (!entry.isIntersecting) return;
				reveal(entry.target);
				obs.unobserve(entry.target);
			});
			}, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });

			els.forEach(function(el){ io.observe(el); });
		} else {
			// Old browsers: just show them
			els.forEach(reveal);
		}

		// Kick-start anything already on screen (first load)
		function kickstartVisible(){
			var vh = window.innerHeight || document.documentElement.clientHeight;
			document.querySelectorAll('.animate-box').forEach(function(el){
			var r = el.getBoundingClientRect();
			if (r.top < vh * 0.9 && r.bottom > 0){
				reveal(el);
				if (io) io.unobserve(el);
			}
			});
			document.querySelectorAll('.album-item--duo').forEach(function(el){
			var r = el.getBoundingClientRect();
			if (r.top < vh * 0.9 && r.bottom > 0){
				el.classList.remove('will-animate');
				el.classList.add('is-visible');
			}
			});
		}

		// Run now, and after full load (covers fonts/images delaying layout)
		kickstartVisible();
		if (document.readyState === 'complete'){
			setTimeout(kickstartVisible, 0);
		} else {
			window.addEventListener('load', function(){ setTimeout(kickstartVisible, 0); }, { once:true });
		}
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
	// Trigger the number counters when the counter section enters view
	var counterWayPoint = function () {
		var el = document.getElementById('fh5co-counter');
			if (!el) return;

			function startCounter(){
				if (typeof $ === 'function' && $('.js-counter').countTo){
				$('.js-counter').countTo({
					formatter: function (value, options) { return value.toFixed(options.decimals); }
				});
				}
				el.classList.add('animated');
			}

			if (!('IntersectionObserver' in window)) {
				// old browsers: start after a brief delay
				setTimeout(startCounter, 400);
				return;
			}

			var io = new IntersectionObserver(function (entries, obs) {
				entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				setTimeout(startCounter, 400);
				obs.unobserve(entry.target);
				});
			}, { threshold: 0.25 });

			io.observe(el);

			// If page already loaded and the counter is visible, kick it
			if (document.readyState === 'complete'){
				var r = el.getBoundingClientRect();
				if (r.top < (window.innerHeight || 0) && r.bottom > 0) {
				setTimeout(startCounter, 0);
				}
			} else {
				window.addEventListener('load', function(){
				var r2 = el.getBoundingClientRect();
				if (r2.top < (window.innerHeight || 0) && r2.bottom > 0) {
					setTimeout(startCounter, 0);
				}
				}, { once:true });
			}
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