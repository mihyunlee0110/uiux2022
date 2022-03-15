;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
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

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#261780',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());



// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
	constructor(el) {
	  this.el = el;
	  this.chars = '!<>-_\\/[]{}—=+*^?#________';
	  this.update = this.update.bind(this);
	}
	setText(newText) {
	  const oldText = this.el.innerText;
	  const length = Math.max(oldText.length, newText.length);
	  const promise = new Promise(resolve => this.resolve = resolve);
	  this.queue = [];
	  for (let i = 0; i < length; i++) {
		const from = oldText[i] || '';
		const to = newText[i] || '';
		const start = Math.floor(Math.random() * 40);
		const end = start + Math.floor(Math.random() * 40);
		this.queue.push({ from, to, start, end });
	  }
	  cancelAnimationFrame(this.frameRequest);
	  this.frame = 0;
	  this.update();
	  return promise;
	}
	update() {
	  let output = '';
	  let complete = 0;
	  for (let i = 0, n = this.queue.length; i < n; i++) {
		let { from, to, start, end, char } = this.queue[i];
		if (this.frame >= end) {
		  complete++;
		  output += to;
		} else if (this.frame >= start) {
		  if (!char || Math.random() < 0.28) {
			char = this.randomChar();
			this.queue[i].char = char;
		  }
		  output += `<span class="dud">${char}</span>`;
		} else {
		  output += from;
		}
	  }
	  this.el.innerHTML = output;
	  if (complete === this.queue.length) {
		this.resolve();
	  } else {
		this.frameRequest = requestAnimationFrame(this.update);
		this.frame++;
	  }
	}
	randomChar() {
	  return this.chars[Math.floor(Math.random() * this.chars.length)];
	}}
  
  
  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————
  
  const phrases = [
  'Hello there,',
  '안녕하세요!',
  'I am Mihyun!',
  '일상을 낯설게',
  '매일 새로운 발견',
  '이미현입니다.',
  'I\'m gonna show you',
  'what I\'ve made',
  '"사건은 현장에서 일어난다"',
  '현장에서 수집한 저의 감성을 담아',
  '다양한 사람이 행복할 수 있는 디자인',
  '하고싶습니다:)',
  'Making you happy is my dream'];
  
  
  const el = document.querySelector('.text');
  const fx = new TextScramble(el);
  
  let counter = 0;
  const next = () => {
	fx.setText(phrases[counter]).then(() => {
	  setTimeout(next, 800);
	});
	counter = (counter + 1) % phrases.length;
  };
  
  next();