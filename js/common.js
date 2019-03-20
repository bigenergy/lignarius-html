// Document READY
$(document).ready(function(){

	// nav
	(function(){
		var nav = $('.nav-desctop');
		if ( nav.length ) {

			var navLi = nav.find('>li');

			navLi.each(function(){
				if ( $(this).find('>ul').length ) {
					$(this).addClass('sub');
				}
			});

			navLi.find('>a').click(function(e){
				var th = $(this),
				liParent = $(this).parent('li'),
				ulChild = liParent.find('>ul');

				if ( liParent.hasClass('sub') ) {
					e.preventDefault();
					
					liParent.toggleClass('active');
					ulChild.toggleClass('active');
				}

				$(document).mouseup(function(e){
					if ( window.innerWidth > 991 ) {
						if ( ( !ulChild.is(e.target) && ulChild.has(e.target).length === 0 ) && ( !th.is(e.target) && th.has(e.target).length === 0 ) ) {
							liParent.removeClass('active');
							ulChild.removeClass('active');
						}
					}
				});
			});

			$(window).resize(function(){
				if ( window.innerWidth <= 991 ) {
					nav.removeClass('nav-desctop');
				}
				else {
					nav.addClass('nav-desctop');
					$('.navigation').attr('style','');
				}
			});

			// Show navigation 
			$('.hamburger a').click(function(){
				$('.navigation').slideToggle();
			});
			$('.hamb-close a').click(function(){
				$('.navigation').slideToggle();
			});
		}
	}());

	// Init Slik
	if ( $('#top-carousel').length ) {
		$('#top-carousel').slick({
			infinite: true,
			slidesToShow: 1,
			dots: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
		});
	}
	if ( $('#type-stairs').length ) {
		$('#type-stairs').slick({
			infinite: false,
			slidesToShow: 5,
			dots: false,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 768,
				settings: {
					infinite: true,
					slidesToShow: 3,
					arrows: true
				}
			}
			]
		});
	}
	if ( $('.home-product-slider').length ) {
		$('.home-product-slider').slick({
			infinite: true,
			slidesToShow: 4,
			dots: false,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					arrows: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					arrows: true
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					arrows: true
				}
			}
			]
		});
	}
	if ( $('.solutions-carousel').length ) {
		$('.solutions-carousel').slick({
			infinite: false,
			slidesToShow: 4,
			dots: false,
			arrows: true,
			autoplay: false,
			autoplaySpeed: 3000,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						arrows: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						arrows: true
					}
				},
				{
					breakpoint: 481,
					settings: {
						slidesToShow: 1,
						arrows: true
					}
				}
			],
		});
		$('.solutions-carousel').on('afterChange',function(event, slick, currentSlide){
			if ( window.innerWidth <  481 ) {
				currentSlide = $(slick.$slides.get(currentSlide));
				
				var solutionTitle = currentSlide.find('.th-name').text(),
				solutionDescription = currentSlide.find('.th-description').html();

				if ( $('.on-solution-title').length ) {
					$('.on-solution-title').text(solutionTitle);
				}

				if ( $('.on-solution-title').length ) {
					$('.on-solution-description').html(solutionDescription);
				}

				currentSlide.find('input[type="radio"]').prop('checked','true');
			}
		});
	}
	if ( $('#signle-carousel').length ) {
		$('#signle-carousel').Thumbelina({
			orientation:'vertical',
			$bwdBut:$('#signle-carousel .top'),
			$fwdBut:$('#signle-carousel .bottom')
		});
	}

	// Singe change image
	(function(){
		var mainImg = $('.main-single-image');

		$('body').on('click', '#signle-carousel li', function(e){
			console.log($(this).data('src-full'));
			mainImg.attr('href', $(this).data('src-full') );			
			mainImg.css({
				'background-image': 'url(' + $(this).data('src-medium') + ')'
			});			
		});

	}());

	// Yandex map
	ymaps.ready(function(){
		// First map
		var MapOne = new ymaps.Map("f-map-one", {
			center: [59.844708, 30.279864],
			zoom: 16,
			controls: ['geolocationControl','routeButtonControl','zoomControl']
		});
		var placemarkOne = new ymaps.Placemark([59.844708, 30.279864], {
			hintContent: 'Тел. (812) 655-60-42',
			balloonContent: 'пр. Народного Ополчения, д. 22'
		},{
			iconLayout: 'default#image',
			iconImageHref: 'images/icons/map.png',
			iconImageSize: [72, 101],
			iconImageOffset: [-36, -101]
		});

		MapOne.geoObjects.add(placemarkOne);
		
		// Second map
		var MapTwo = new ymaps.Map("f-map-two", {
			center: [60.073813, 30.282577],
			zoom: 16,
			controls: ['geolocationControl','routeButtonControl','zoomControl']
		});

		var placemarkTwo = new ymaps.Placemark([60.073813, 30.282577], {
			hintContent: 'Тел. (812) 655-60-42',
			balloonContent: 'Парголово, Выборгское шоссе, 369'
		},{
			iconLayout: 'default#image',
			iconImageHref: 'images/icons/map.png',
			iconImageSize: [72, 101],
			iconImageOffset: [-36, -101]
		});

		MapTwo.geoObjects.add(placemarkTwo);

		if ( $('.f-map').length ) {
			$('.on-map-address').click(function(){
				var id = $(this).data('map');

				if ( window.innerWidth > 768 ) {
					$('.on-map-address').removeClass('active');
					$(this).addClass('active');

					if ( $(id).length ) {
						$('.f-map__map').hide();
						$(id).show();
					}
				}
				else {
					if ( $(id).length ) {
						$(id).arcticmodal({
							beforeOpen: function(){
								$('html,body').addClass('no-overflow');
							},
							afterOpen: function(){
								MapOne.container.fitToViewport();
								MapTwo.container.fitToViewport();
							},
							afterClose: function(){
								$('html,body').removeClass('no-overflow');
							}
						});
						$(id).find('.close-arctic').click(function(e){
							e.preventDefault();
							$(id).arcticmodal('close');
						});
					}
				}
			})
		}
	});

	// Read more
	(function(){
		
		var reamMore = $('.on-read-more');
		reamMore.each(function(){
			var showElements = parseInt($(this).data('show-elements')) - 1;

			var minHeight = 0;
			for(var i = 0; i <= showElements; i++ ) {
				minHeight += $(this).find('p').eq(i).outerHeight(true);
			}

			var wrapper = $(this).wrapInner("<div class='on-read-more-wrapper'></div>").find('.on-read-more-wrapper');
			var content = $(this).wrapInner("<div class='on-read-more-content'></div>").find('.on-read-more-content');
			
			content.height(minHeight);

			$(this).append('<div class="on-read-more-toggle"><a href="#">Развернуть</a></div>');
		});

		var toggleBtn = $('.on-read-more-toggle a');
		toggleBtn.click(function(e){
			e.preventDefault();

			var th = $(this),
			parent = th.closest('.on-read-more'),
			wrapper = parent.find('.on-read-more-wrapper'),
			content = parent.find('.on-read-more-content'),
			showElements = parseInt(parent.data('show-elements') - 1);

			var minHeight = 0;
			for(var i = 0; i <= showElements; i++ ) {
				minHeight += wrapper.find('p').eq(i).outerHeight(true);
			}

			var maxHeight = wrapper.outerHeight(true);

			if ( th.hasClass('show') ) {
				content.animate({
					'height': minHeight
				}, 500, function(){
					th.removeClass('show');
					th.html('Развернуть');
				});
			}
			else {
				content.animate({
					'height': maxHeight
				}, 500, function(){
					th.addClass('show');
					th.html('Свернуть');
				});
			}
		});

		$(window).resize(function(){
			reamMore.each(function(){
				var showElements = parseInt($(this).data('show-elements')) - 1;
				var minHeight = 0;

				for(var i = 0; i <= showElements; i++ ) {
					minHeight += $(this).find('p').eq(i).outerHeight(true);
				}

				var wrapper = $(this).find('.on-read-more-wrapper'),
				content = $(this).find('.on-read-more-content'),
				toggleBtn = $(this).find('.on-read-more-toggle a');

				var maxHeight = wrapper.outerHeight(true);

				if ( toggleBtn.hasClass('show') ) {
					content.height( maxHeight );
				}
				else {
					content.height( minHeight );
				}

			});
		});
	}());

	// filter show / hide
	(function(){
		var filter = $('.catalog-filter');

		if ( filter.length ) {
			$('.on-filter-show, .on-close-filter').click(function(e){
				e.preventDefault();
				$('.catalog-filter').slideToggle(300);
			});

			$(document).mouseup(function(e){
				if ( window.innerWidth < 768 ) {
					if ( !filter.is(e.target) && filter.has(e.target).length === 0 ) {
						$('.catalog-filter').slideUp(300);
					}
				}
			});

			$(window).resize(function(){
				if ( window.innerWidth >= 768 ) {
					filter.attr('style','');
				}
			});
		}

	}());

	// Height для галереи
	(function(){
		var galleryItem = $('.gallery-single-item');
		if ( galleryItem.length ) {

			$(window).resize(function(){
				if ( window.innerWidth < 576 ) {
					galleryItem.height( galleryItem.width() );
				}
				else {
					galleryItem.css({
						'height' : ''
					});
				}
			});

		}
	}());

	// Клик по ссылкам 
	$('a[href^="#"]').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		if ( href == "#" ) return;
		if ( $(href).length ) {
			if ( $(href).is(':visible') ) {
				jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: $(href).offset().top}, 800);
			}
			else {
				$(href).arcticmodal({
					beforeOpen: function(){
						$('html,body').addClass('no-overflow');
						$(href).addClass('load-modal');
					},
					afterOpen: function(){
						var thSlick = $(href).find('.slick-slider');
						if ( thSlick.length ) {
							thSlick.slick('refresh');
						}
						$(href).removeClass('load-modal');
					},
					afterClose: function(){
						$('html,body').removeClass('no-overflow');
					}
				});
			}
		}
	});

	// Модальное окно готовых решений
	(function(){
		$('body').on('click','.solution', function(){
			var solutionTitle = $(this).find('.th-name').text(),
				solutionDescription = $(this).find('.th-description').html();

			if ( $('.on-solution-title').length ) {
				$('.on-solution-title').text(solutionTitle);
			}

			if ( $('.on-solution-title').length ) {
				$('.on-solution-description').html(solutionDescription);
			}

		});
	}());

	// Открытие при нажатии на check
	(function(){
		$('.on-collect-check').change(function(){
			var thParent = $(this).closest('.on-collect-check-parent');
			if ( thParent.length ) {
				var thWrap = thParent.find('.on-collect-check-wrap');
				if ( thWrap.length ) {

					if( $(this).is(":checked") ) {
						thWrap.addClass('active');
					}
					else {
						thWrap.removeClass('active');
						thWrap.find('input').val('');
					}

				}
			} 
		})
	}());

	$('input[name="phone"]').mask("+7(999)999-99-99");
});

// WINDOW LOAD
$(window).on('load',function(){

});