



$(document).ready(function () {
    let sectionsId = [];

    $('.section').each(function () {
        var sec = $(this);

        sectionsId.push(sec.attr('id'));
    });

    let answersRun = false;

    $('.pagepiling').pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: [],
        anchors: sectionsId,
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: true,

        //events
        onLeave: function (index, nextIndex, direction) {

        },
        afterLoad: function (anchorLink, index) {
            if (anchorLink === 'answers') {
                answersRun = true;
                $.fn.pagepiling.setAllowScrolling(false);
                $.fn.pagepiling.setKeyboardScrolling(false);
            } else {
                answersRun = false;
            }
        },
        afterRender: function () {

        },
    });


    function camGif () {
        let wrap = $('.s-top'),
            cam = wrap.find('.s-top__cam'),
            device = wrap.find('.s-top__cam-device'),
            display = wrap.find('.s-top__cam-display'),
            resultBox = wrap.find('.s-top__cam-result'),

            devicetage = 1;

        if ( !wrap.length ) { return };



        function slideAnimate(dir) {
            if ( scrolling || (dir === 0) ) { return };

            scrolling = true;

            (dir === -1) ? ++stage : --stage;

            if ( stage < 1 ) {
                stage = 1;
                $.fn.pagepiling.moveSectionUp();
                $.fn.pagepiling.setAllowScrolling(true);
                $.fn.pagepiling.setKeyboardScrolling(true);
            } else if ( stage > 6 ) {
                stage = 6;
                $.fn.pagepiling.moveSectionDown();
                $.fn.pagepiling.setAllowScrolling(true);
                $.fn.pagepiling.setKeyboardScrolling(true);
            } else {
                wrap.attr('data-stage', stage);
            }

            setTimeout(function () {
                scrolling = false;
            }, 500)
        };


    };

    camGif();

    function answers () {
        let wrap = $('.s-answers'),
            touchY,
            dir,
            scrolling = false,
            stage = 1;

        if ( !wrap.length ) { return };


        wrap.on('touchstart', function (e){
            touchY = e.originalEvent.touches[0].clientY;
        });

        wrap.on('touchend', function (e) {
            var newTouchY = e.originalEvent.changedTouches[0].clientY;

            dir = (touchY > newTouchY + 15) ? -1 :
                (touchY < newTouchY - 15) ? 1 : 0;

            slideAnimate(dir);
        });


        wrap.on("mousewheel DOMMouseScroll", function (e) {
            slideAnimate(e.deltaY)
        });


        $(window).on("keydown", function (a) {
            let dir = ( 38 === a.keyCode || 37 === a.keyCode ) ? 1 : ( 40 === a.keyCode || 39 === a.keyCode ) && -1;

            if ( answersRun ) {
                let dir = ( 38 === a.keyCode || 37 === a.keyCode ) ? 1 : ( 40 === a.keyCode || 39 === a.keyCode ) && -1;

                (!!dir) ? slideAnimate(dir) : '';
            }
        });

        function slideAnimate(dir) {
            if ( scrolling || (dir === 0) ) { return };

            scrolling = true;

            (dir === -1) ? ++stage : --stage;

            if ( stage < 1 ) {
                stage = 1;
                $.fn.pagepiling.moveSectionUp();
                $.fn.pagepiling.setAllowScrolling(true);
                $.fn.pagepiling.setKeyboardScrolling(true);
            } else if ( stage > 6 ) {
                stage = 6;
                $.fn.pagepiling.moveSectionDown();
                $.fn.pagepiling.setAllowScrolling(true);
                $.fn.pagepiling.setKeyboardScrolling(true);
            } else {
                wrap.attr('data-stage', stage);
            }

            setTimeout(function () {
                scrolling = false;
            }, 500)
        };


    };

    answers();


});
//
// function mainScrolling() {
//     var players = []
//         , $body = $("body");
//
//
//
//     var bannerFeaturesInterval,
//         bannerFeatures = $('.sec-banner'),
//         bannerFeaturesIntervalCreate = function () {
//             var bannerState =  ( bannerFeatures.attr('data-state') ) ? +bannerFeatures.attr('data-state') : 0;
//             bannerFeaturesInterval = setInterval(function () {
//                 $('.sec-banner__robot-hand').animateCss('robotHand');
//                 $('.sec-banner__robot-shoulder').animateCss('robotShoulder');
//                 if (bannerState >= 4) {
//                     bannerState = 0;
//                 }
//                 bannerFeatures.attr('data-state', ++bannerState).addClass('sec-banner--animmate');
//                 console.log(bannerState);
//                 setTimeout(function() {
//                     bannerFeatures.removeClass('sec-banner--animmate');
//                 },700)
//             }, 3000);
//         };
//
//     function bannerFeaturesActive() {
//         var bannerState = 1;
//         setTimeout(function() {
//             $(".sec-banner").addClass("features-animate");
//             bannerFeaturesIntervalCreate();
//         },2500);
//     };
//
//     function bannerFeaturesStop() {
//         $(".sec-banner").removeClass("features-animate").removeAttr('data-state');
//         window.clearInterval(bannerFeaturesInterval);
//     };
//
//     $('.sec-banner__features-item').hover(
//         function() {
//             var $this = $(this);
//
//             $this.addClass('hover');
//             window.clearInterval(bannerFeaturesInterval);
//         },
//         function() {
//             var $this = $(this);
//
//             $this.removeClass('hover');
//             bannerFeaturesIntervalCreate();
//         }
//     );
//
//     var mainResponsesSlider,
//         mainResponses = function () {
//             if ( !$('.sec-responses__slides').hasClass('slick-initialized') && $('.sec-responses__slides .sec-responses__slide').length ) {
//                 mainResponsesSlider = $('.sec-responses__slides').slick(build_slick_options({
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     dragable: false,
//                     // infinite: false,
//                     variableWidth: true,
//                 }));
//             } else if ( $('.sec-responses__slides').hasClass('slick-initialized') ) {
//                 $('.sec-responses__slides')[0].slick.refresh();
//             }
//         }
//
//     var mainServicesSlider,
//         mainServices = function () {
//             if ( !$('.sec-services__slides').hasClass('slick-initialized') && $('.sec-services__slides .sec-services__slide').length ) {
//                 mainServicesSlider = $('.sec-services__slides').slick(build_slick_options({
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     infinite: false,
//                     speed: 500,
//
//                     // variableWidth: true,
//                 }));
//             } else if ( $('.sec-services__slides').hasClass('slick-initialized') ) {
//                 $('.sec-services__slides')[0].slick.refresh();
//             }
//
//
//             mainServicesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
//                 $('.sec-services__dot').removeClass('current');
//                 $('.sec-services__dot[data-index=' + nextSlide +']').addClass('current');
//             });
//
//             $('.js-sec-services-go-index').on('click touch', function() {
//                 mainServicesSlider.slick('slickGoTo', $(this).data('index'));
//             });
//         }
//
//     var mainCertifSlider,
//         mainCertif = function () {
//             if ( !$('.sec-certif__slides').hasClass('slick-initialized') && $('.sec-certif__slides .sec-certif__slide').length ) {
//                 mainCertifSlider = $('.sec-certif__slides').slick(build_slick_options({
//                     // slidesToShow: 1,
//                     slidesToScroll: 1,
//                     infinite: false,
//                     speed: 500,
//
//                     variableWidth: true,
//                 }));
//             } else if ( $('.sec-certif__slides').hasClass('slick-initialized') ) {
//                 $('.sec-certif__slides')[0].slick.refresh();
//             }
//
//         };
//
//
//
//     var mainAboutSecInterval,
//         mainAboutSecCreateInterval = function () {
//             mainAboutSecInterval = setInterval(function () {
//                 var $el = $('.sec-about__inner');
//                 var x = Math.random() * $el.outerWidth();
//                 var y = Math.random() * $el.outerHeight();
//                 var dropRadius = 20;
//                 var strength = 0.04 + Math.random() * 0.04;
//                 $el.ripples('drop', x, y, dropRadius, strength);
//             }, 400);
//         };
//
//     function mainAboutSec() {
//         try {
//             $('.sec-about').ripples({
//                 resolution: 512,
//                 dropRadius: 20, //px
//                 perturbance: 0.04,
//             });
//             $('.sec-about__inner').ripples({
//                 resolution: 128,
//                 dropRadius: 10, //px
//                 perturbance: 0.04,
//             });
//         } catch (e) {
//             console.log(e);
//         }
//
//
//
//
//         var bannerState = 1;
//
//         mainAboutSecCreateInterval();
//     };
//
//     function mainAboutSecStop() {
//         try {
//
//             $('.sec-about, .sec-about__inner').ripples('destroy');
//             window.clearInterval(mainAboutSecInterval);
//         } catch(e) {
//             console.log(e);
//         }
//     }
//
//     var mainNewsSlider,
//         mainNews = function () {
//             if ( !$('.sec-news__slides').hasClass('slick-initialized') && $('.sec-news__slides .sec-news__slide').length ) {
//                 mainNewsSlider = $('.sec-news__slides').slick(build_slick_options({
//                     // slidesToShow: 1,
//                     slidesToScroll: 2,
//                     infinite: true,
//                     speed: 500,
//                     lazyLoad: 'progressive',
//                     appendArrows: $('.sec-news__slider-arrows'),
//                     variableWidth: true,
//                 }));
//             } else if ( $('.sec-news__slides').hasClass('slick-initialized') ) {
//                 $('.sec-news__slides')[0].slick.refresh();
//             }
//
//         }
//
//
//     if ( !$body.hasClass("mobile") ) {
//
//         var totalSlides = $(".main-section").length,
//             currentSlide = 1,
//             currentSlideName = '',
//             activeSlide = $(".main-section.active"),
//             animateSlide = function (a) {
//                 activeSlide.hasClass("has-hidden-content") && !$body.hasClass("animating") ?
//                     ( "top" == a && (
//                             activeSlide.hasClass("hidden-content-visible") ?
//                                 ( activeSlide.removeClass("hidden-content-visible"),
//                                         $body.addClass("animating"),
//                                         window.setTimeout(function () {
//                                             $body.removeClass("animating")
//                                         }, 1500)
//                                 )
//                                 : activeSlide.hasClass("hidden-content-visible") || currentSlide > 1 && (
//                                 currentSlide -= 1,
//                                     hideCurrentSlide(),
//                                     initAnimate(currentSlide)
//                             )
//                         ),
//                         "bottom" == a && (
//                             activeSlide.hasClass("hidden-content-visible") ?
//                                 currentSlide < totalSlides && (currentSlide += 1,
//                                     hideCurrentSlide(),
//                                     initAnimate(currentSlide))
//                                 : activeSlide.hasClass("hidden-content-visible") || (
//                                 activeSlide.addClass("hidden-content-visible"),
//                                     $body.addClass("animating"),
//                                     window.setTimeout(function () {
//                                         $body.removeClass("animating")
//                                     }, 1500)
//                             )
//                         )
//                     )
//                     : $body.hasClass("animating") || (
//                     "top" == a && currentSlide > 1 ?
//                         (currentSlide -= 1,
//                                 hideCurrentSlide(),
//                                 initAnimate(currentSlide)
//                         ) :
//                         "bottom" == a && currentSlide < totalSlides && (
//                             currentSlide += 1,
//                                 hideCurrentSlide(),
//                                 initAnimate(currentSlide)
//                         )
//                 )
//             },
//
//             hideCurrentSlide = function () {
//                 var a = $(".main-section.active").attr("data-slide");
//                 if (a < currentSlide)
//                     for (var b = parseInt(a); b < parseInt(a) + currentSlide - a; b++)
//                         TweenMax.to(".main-section--" + b, 1.25, {
//                             x: "-100%",
//                             ease: Expo.easeInOut
//                         });
//                 else
//                     for (var b = parseInt(a); b > parseInt(a) + currentSlide - a; b--)
//                         TweenMax.to(".main-section--" + b, 1.25, {
//                             x: "100%",
//                             ease: Expo.easeInOut
//                         })
//             },
//
//             initAnimate = function (a) {
//                 $(".main-sections-pagination li").removeClass("active"),
//                     $(".main-sections-pagination li[data-goto=" + a + "]").addClass("active"),
//                     $body.addClass("animating"),
//                     adjustHash(),
//                     $(".main-section.active").removeClass("active").find(".anim").each(function() {
//                         $(this).addClass('anim-hidden').removeClass($(this).data('anim-name')).removeClass('animated');
//                     }),
//                     TweenMax.to(".main-section--" + currentSlide, 1.25, {
//                         x: "0%",
//                         ease: Expo.easeInOut
//                     }),
//
//                     slideChanged(),
//                     window.setTimeout(function () {
//                         $body.removeClass("animating");
//                     }, 1500)
//             },
//
//             slideChanged = function () {
//                 currentSlideName = $(".main-section--" + currentSlide).data('slidename');
//                 $(".main-section--" + currentSlide).addClass("active").find(".anim").each(function() {
//                     $(this).removeClass('anim-hidden').animateCss($(this).data('anim-name'));
//                 }),
//                     activeSlide = $(".main-section.active"),
//                     $body.attr("data-main-slide", currentSlideName),
//                     'banner' === currentSlideName ? bannerFeaturesActive() : bannerFeaturesStop(),
//                     'reviews' === currentSlideName ? mainResponses() : '',
//                     'services' === currentSlideName ? mainServices() : ''
//                 'about' === currentSlideName ? mainAboutSec() : mainAboutSecStop();
//                 'certif' === currentSlideName ? mainCertif() : ''
//                 'news' === currentSlideName ? mainNews() : ''
//                 // 3 === currentSlide || 4 === currentSlide || 5 === currentSlide ?
//                 //   $(".main-bike-section").attr("data-stage", currentSlide)
//                 //   : $(".main-bike-section").attr("data-stage", ""),
//                 //     $(".nav-content li").removeClass("active"),
//                 //     $(".nav-content li[data-goto=" + currentSlide + "]").addClass("active");
//
//                 // for (var a = 0; a < players.length; a++)
//                 //   null != players[a].pauseVideo && players[a].pauseVideo();
//                 // if ($(".main-section.active").find(".player[data-autoplay=true]").length > 0) {
//                 //   var b = $(".main-section.active").find(".player[data-autoplay=true]").attr("data-videocount");
//                 //   null != players[b] && null != players[b].playVideo && players[b].playVideo()
//                 // }
//                 // 5 == currentSlide ? createInterval() : window.clearInterval(batteryCellsInterval)
//             };
//
//         var adjustHash = function (a) {
//             var b = $(".main-section[data-slide=" + currentSlide + "]").attr("data-slidename");
//             window.location.hash = "#" + b
//         };
//
//         // slideChanged();
//
//         var addPagination = function () {
//             var a = $('<ul class="main-sections-pagination"></ul>');
//             $body.append(a);
//             for (var b = 1; b < totalSlides + 1; b++)
//                 1 == b ? a.append('<li class="active scroller" data-goto=' + b + "></li>") : a.append('<li class="scroller" data-goto=' + b + "></li>");
//             a.find("li")
//         }
//         addPagination();
//
//
//         $(".scroller").on("click", function () {
//             $(".scroller").removeClass("active"),
//                 $(this).addClass("active");
//             var a = $(this).attr("data-goto");
//             currentSlide = parseInt(a),
//                 hideCurrentSlide(),
//                 initAnimate(currentSlide),
//                 adjustHash()
//         });
//
//         if (window.location.hash.length > 0) {
//             var a = window.location.hash.split("#").pop();
//
//             currentSlide = $(".main-section[data-slidename=" + a + "]").length ? parseInt($(".main-section[data-slidename=" + a + "]").attr("data-slide")) : 1,
//                 $(".pagination li").removeClass("active"),
//                 $(".pagination li[data-goto=" + currentSlide + "]").addClass("active"),
//                 hideCurrentSlide(),
//                 initAnimate(currentSlide),
//                 adjustHash()
//         } else {
//             initAnimate(1);
//             adjustHash()
//         }
//
//         $(window).on("scroll DOMMouseScroll mousewheel", function (a) {
//             if (
//                 ( !$(a.target).hasClass('scroll-block') && !$(a.target).closest('.scroll-block').length ) &&
//                 ( !$(a.target).hasClass('left-nav__content') && !$(a.target).closest('.left-nav__content').length ) &&
//                 ( !$(a.target).hasClass('sec-services__item-descr') && !$(a.target).closest('.sec-services__item-descr').length )
//             ) {
//                 $('html').hasClass("remodal-is-locked") || (a.deltaY > 0 ? animateSlide("top") : a.deltaY < 0 && animateSlide("bottom"))
//                 a.preventDefault();
//             }
//         });
//         $(".main-sections-scroller-left").on("click", function (e) {
//             e.preventDefault();
//             animateSlide("top");
//         });
//         $(".main-sections-scroller-right").on("click", function (e) {
//             e.preventDefault();
//             animateSlide("bottom");
//         });
//         $(window).on("keydown", function (a) {
//             // ( 38 === a.keyCode || 37 === a.keyCode ) ? animateSlide("top") : ( 40 === a.keyCode || 39 === a.keyCode ) && animateSlide("bottom")
//             ( 38 === a.keyCode ) ? animateSlide("top") : ( 40 === a.keyCode ) && animateSlide("bottom")
//         });
//     } else {
//         bannerFeaturesActive()
//         // bannerFeaturesStop(),
//         mainResponses();
//         mainServices();
//         // mainAboutSec() : mainAboutSecStop();
//         mainCertif();
//         mainNews();
//     }
//
//
// };


