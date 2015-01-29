/**
 * Zestybytes Main JS file
 *
 * Used to control all animations and page/menu flow for site
 *
 * Author: Jason Frazier
 * Email: jason@zestybytes.com
 */

(function (window, document) {


	// Define constants
	// use $C for convenience
	var $C = {
		DEFAULT_HELP_TEXT: '[ Choose from Menu Above ]',
		OPEN_PP_TOP: 80,
		OPEN_PP_LEFT: 7,
		CLOSE_PP_TOP: "50%",
		CLOSE_PP_LEFT: 0,
		OPEN_P_TOP: -73,
		OPEN_P_LEFT: 80,
		CLOSE_P_TOP: -80,
		CLOSE_P_LEFT: "50%",
		LEFT_ARROW: '<i class="fa fa-arrow-left"></i>',
		KEY: {
			OLD_CHAR: 'oldChar',
			PAGE: 'page',
			PAGE_PRETTY: 'page-pretty',
		},
		CLASS: {
			CIRCLE_BUTTON: 'zb-circle-button',
			YELLOW_HIGHLIGHT: 'zb-yellow-highlight',
			CIRCLE_MENU: 'zb-circle-menu',
			CIRCLE_BG: 'zb-circle-bg',
			HELP_TEXT: 'zb-help-text',
			BG_TEXT: 'zb-bg-text',
			BG_TEXT_STATIC: 'zb-bg-text-static'
		},
		ID: {
			MAIN: 'zb-main',
			MAIN_MENU: 'zb-main-menu',
			CIRCLE_BUTTON_1: 'zb-circle-button-1',
			CIRCLE_BUTTON_2: 'zb-circle-button-2',
			CIRCLE_BUTTON_3: 'zb-circle-button-3',
			CIRCLE_BUTTON_4: 'zb-circle-button-4'
		},
		PAGE: {
			ABOUT: {
				ID: 'about',
				PRETTY: 'About Me'
			},
			SKILLS: {
				ID: 'skills',
				PRETTY: 'Skills'
			},
			CONTACT: {
				ID: 'contact',
				PRETTY: 'Contact'
			},
			WORKS: {
				ID: 'works',
				PRETTY: 'Works'
			}
		}
	};

	// Declare variables

	var main = function () {
		menu.init();
		page.background.init();
		return zbInterface;
	};
	
	
	var menu = {
		init: function () {
			var btn = $('.' + $C.CLASS.CIRCLE_BUTTON);

			this.dataInit();
			this.hoverInit(btn);
			this.clickInit(btn);
			this.helpText.init();
		},
		dataInit: function () {
			$('#' + $C.ID.CIRCLE_BUTTON_1).data($C.KEY.PAGE, $C.PAGE.ABOUT.ID);
			$('#' + $C.ID.CIRCLE_BUTTON_1).data($C.KEY.PAGE_PRETTY, $C.PAGE.ABOUT.PRETTY);
			$('#' + $C.ID.CIRCLE_BUTTON_2).data($C.KEY.PAGE, $C.PAGE.SKILLS.ID);
			$('#' + $C.ID.CIRCLE_BUTTON_2).data($C.KEY.PAGE_PRETTY, $C.PAGE.SKILLS.PRETTY);
			$('#' + $C.ID.CIRCLE_BUTTON_3).data($C.KEY.PAGE, $C.PAGE.CONTACT.ID);
			$('#' + $C.ID.CIRCLE_BUTTON_3).data($C.KEY.PAGE_PRETTY, $C.PAGE.CONTACT.PRETTY);
			$('#' + $C.ID.CIRCLE_BUTTON_4).data($C.KEY.PAGE, $C.PAGE.WORKS.ID);
			$('#' + $C.ID.CIRCLE_BUTTON_4).data($C.KEY.PAGE_PRETTY, $C.PAGE.WORKS.PRETTY);
		},
		hoverInit: function (btn) {
			btn.hover(this.onHoverIn, this.onHoverOut);
		},
		onHoverIn: function (e) {
			var pretty = $(this).data($C.KEY.PAGE_PRETTY);
			$('.' + $C.CLASS.HELP_TEXT).html('[ ' + pretty + ' ]');
		},
		onHoverOut: function (e) {
			$('.' + $C.CLASS.HELP_TEXT).html($C.DEFAULT_HELP_TEXT);
		},
		clickInit: function (btn) {
			btn.on('click', this.onClick);
		},
		onClick: function (e) {
			// this = button clicked
			var $this = $(this);
			var $main = $('#' + $C.ID.MAIN);

			// menu/page is open, so close everything
			if ($this.parent().hasClass('open')) {
				// hide main content if necessary
				if ($main.css('display') == 'block') {
					$main.slideUp( 1000, function () {
						menu.display($this);
					});
				} else {
					$('.' + $C.CLASS.BG_TEXT).textillate('stop');
					menu.display($this);
				}
			} else {
				// user just chose menu item, animate it in and show page
				if ($main.css('display') == 'block') {
					$main.slideUp( 1000, function () {
						page.display($this);
					});
				} else {
					page.display($this);
				}
			}
		},
		helpText: {
			init: function () {
				$('.' + $C.CLASS.HELP_TEXT).textillate({
					in: {
						effect: 'fadeInDownBig',
						sequence: 'true'
					},
					type: 'char'
				});
			}
		},
		display: function (btn) {
			btn.parent().removeClass('open');
			btn.addClass($C.CLASS.YELLOW_HIGHLIGHT);
			btn.html(btn.data($C.KEY.OLD_CHAR));

			btn.siblings().fadeIn(1000);
			btn.parent().parent().animate({
				top: $C.CLOSE_PP_TOP, 
				left: $C.CLOSE_PP_LEFT
			}, {
				duration: 1000,
				start: function () {
					$('#' + $C.ID.MAIN_MENU).css({'width': '100%'});
				}
			});
			btn.parent().animate({
				top: $C.CLOSE_P_TOP, 
				left: $C.CLOSE_P_LEFT,
				width: 160,
				height: 160
			}, {
				duration: 1000, 
				always: function () {
					btn.removeClass($C.CLASS.YELLOW_HIGHLIGHT);
					$('.' + $C.CLASS.CIRCLE_MENU).addClass($C.CLASS.CIRCLE_BG);
					$('.' + $C.CLASS.HELP_TEXT).html($C.DEFAULT_HELP_TEXT);
					$('.' + $C.CLASS.HELP_TEXT).show();
				}
			});
		}
	};

	var page = {
		display: function (btn) {
			btn.parent().addClass('open');
			$('#zb-spinner').show();
			btn.addClass($C.CLASS.YELLOW_HIGHLIGHT);
			btn.siblings().fadeOut(1000);
			btn.parent().parent().animate({
				top: $C.OPEN_PP_TOP, 
				left: $C.OPEN_PP_LEFT,
			}, {
				duration: 1000,
				start: function () {
					btn.parent().parent().css({width: '98%'});

					$('.' + $C.CLASS.CIRCLE_MENU).removeClass($C.CLASS.CIRCLE_BG);
					$('.' + $C.CLASS.HELP_TEXT).hide();
				}
			});
			btn.parent().animate({
				top: $C.OPEN_P_TOP, 
				left: $C.OPEN_P_LEFT,
				width: 64,
				height: 64
			},{ 
				duration: 1000, 
				always: function () {
					btn.removeClass($C.CLASS.YELLOW_HIGHLIGHT);
					btn.data($C.KEY.OLD_CHAR, btn.html());
					btn.html($C.LEFT_ARROW);
					page.get(btn.data($C.KEY.PAGE));
				}
			});
		},
		// get page content via ajax, put it in main div, then animate in
		get: function (pageName) {
			var $main = $('#' + $C.ID.MAIN);
			var url = "page/" + pageName + ".html";
			// $.get( "page/" + pageName + ".html", function( data ) {
			// 	var innerText = data +
			// 		'<div class="zb-copyright">' +
			// 		'&copy; ' + 
			// 		new Date().getFullYear() +
			// 		' Jason Frazier' +
			// 		'</div>';
			// 	$main.html(innerText);
			// 	$main.slideDown(1000);
			// });
			
			// $(document).ajaxStart(function () {
			// 	console.log('startex ajax');
			// });

			$.ajax({
				url: url,
				success: function( data ) {
					var innerText = data +
						'<div class="zb-copyright">' +
						'&copy; ' + 
						new Date().getFullYear() +
						' Jason Frazier' +
						'</div>';
					$main.html(innerText);
					$main.slideDown(1000);
				},
				dataType: 'html',
				complete: function () {
					$('#zb-spinner').hide();
				}
			});
		},
		background: {
			init: function () {
				$('.' + $C.CLASS.BG_TEXT).textillate({
					loop: true,
					minDisplayTime: 4000,
					in: {
						effect: 'flip',
						shuffle: 'true',
						delay: 100,
						delayScale: 1.8
					},
					out: {
						effect: 'flip',
						shuffle: 'true',
						delay: 100,
						delayScale: 1.8
					}
				});
			}
		},
		contactForm: {
			validateSubmit: function (e) {
				e.preventDefault();
				if(page.contactForm.validate()){
					page.contactForm.submit();
				} else {
					page.contactForm.showMessage("Invalid input for Email, please check your input");
				}

				return false;
			},
			validate: function () {
				var assume = false;
				var val = document.zbf1.Email__2.value;
				if(val.search('@') != -1){
					assume = true;
				}
				return assume;
			},
			submit: function () {
				var $form = $('#zb-f form');
				var submitUrl = $form.attr('action');
				var params = $form.serialize();

				// disable send button to stop multiple submits
				document.zbf1.Submit.disabled="disabled";

				// send form via ajax
				$.ajax({
					type: "POST",
					url: submitUrl,
					data: params,
					success: aSuccess,
					error: aError,
					dataType: 'json'
				});

				function aSuccess () {
					page.contactForm.showMessage("Thank you! I will contact you soon");
				}

				function aError () {
					page.contactForm.showMessage("There was a problem, try again later!");
				}
			},
			showMessage: function (message) {
				var $mssg = $('.zb-page-content .zb-message-text');
				$mssg.hide().html(message).fadeIn(1000, function () {
					window.setTimeout(function () {
						$mssg.fadeOut(4000, function () {
								$mssg.css({display:'block',visibility:'hidden'}).html('&nbsp;');
							});
					}, 4000);
				});
			}
		}
	};

	var contactForm = {
		init: function () {
			var $submitBtn = $('#zb-f form input.submit');
			$submitBtn.on('click', page.contactForm.validateSubmit);

		},
	};

	var zbInterface = {
		contactForm: {
			init: contactForm.init
		}
	};

	// Application initialized, attach
	// namespaced entrypoint
	window.com = window.com || {};
	window.com.zestybytes = window.com.zestybytes || {};
	window.com.zestybytes.getInterface = main;

})(window, document, undefined);

// Start application
com.zestybytes.i = com.zestybytes.getInterface();
