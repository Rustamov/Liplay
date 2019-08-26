var wWidth = 0;
    W_SM = 576
    W_MD = 768,
    W_LG = 992,
    W_XL = 1200,

    LOADER_HTML = '<div class="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
;



$(document).ready(function () {
    let sectionsId = [];

    $('.section').each(function () {
        var sec = $(this);

        sectionsId.push(sec.attr('id'));
    });

    let answersRun = false;


    let camGif = {
        deviceStage: 0,
        deviceStagesCount: 2,
        displayStage: 0,
        displayStagesCount: 5,
        resultBoxStage: 0,
        resultBoxStagesCount: 4,
        speed: 600,
        interval: 0,

        init: function() {
            this.wrap = $('.s-top');
            this.cam = this.wrap.find('.s-top__cam');
            this.device = this.wrap.find('.s-top__cam-device');
            this.display = this.wrap.find('.s-top__cam-display');
            this.resultBox = this.wrap.find('.s-top__cam-result');
        },

        run: function () {
            let _this =  this;
            let nextStage =  function () {
                _this.nextStage(_this)
            };

            _this.interval = setInterval(nextStage, _this.speed);
        },

        stop: function () {
            let _this =  this;

            clearInterval(_this.interval);

            _this.deviceStage = 1;
            _this.displayStage = 0;
            _this.resultBoxStage = 0;

            _this.setStage();

        },

        setStage: function () {
            this.device.attr('data-stage', this.deviceStage);
            this.display.attr('data-stage', this.displayStage);
            this.resultBox.attr('data-stage', this.resultBoxStage);
        },

        nextStage: function (obj) {
            let _this = obj;

            if ( _this.deviceStage < _this.deviceStagesCount ) {
                ++_this.deviceStage;
            } else if ( _this.displayStage < _this.displayStagesCount ) {
                ++_this.displayStage;
            } else if ( _this.resultBoxStage < _this.resultBoxStagesCount ) {
                ++_this.resultBoxStage;
            } else {
                _this.deviceStage = 1;
                _this.displayStage = 0;
                _this.resultBoxStage = 0;
            };


            _this.setStage();

        },

    };

    if ( $('.s-top').length ) {
        camGif.init();
    }

    if ( $('.pagepiling').length ) {
        $('.pagepiling').pagepiling({
            menu: null,
            direction: 'horizontal',
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
                pagepilingLoadStep(anchorLink, index);
            },

            afterRender: function () {
                let initAnchorLink = $('.pp-section.active').attr('id');

                pagepilingLoadStep(initAnchorLink);
            },
        });
    }

    function pagepilingLoadStep (anchorLink, index) {

        if (anchorLink === 'answers') {
            answersRun = true;
            $.fn.pagepiling.setAllowScrolling(false);
            $.fn.pagepiling.setKeyboardScrolling(false);
        } else {
            answersRun = false;
        }

        if (anchorLink === 'top') {
            camGif.run();
        } else {
            camGif.stop();
        }
    }





    function answers () {
        let wrap = $('.s-answers'),
            touchY,
            dir,
            scrolling = false,
            stage = 1;

        wrap.on('touchstart', function (e){
            touchY = e.originalEvent.touches[0].clientY;
        });

        wrap.on('touchend', function (e) {
            var newTouchY = e.originalEvent.changedTouches[0].clientY;

            dir = (touchY > newTouchY + 5) ? -1 :
                (touchY < newTouchY - 5) ? 1 : 0;

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

    if ( $('.s-answers').length ) {
       answers();
    };



    function personPopup() {
        let sound,
            soundSrc = '';

        $(document).on('click touch', '.s-answers__card', function (e) {
            e.preventDefault();

            let sound,
                popupTrigger = $(this),
                index = popupTrigger.data('index'),
                popupTriggerHtml = popupTrigger.html(),
                imgSrc = 'img/answers/' + index + '.jpg'
            ;

            soundSrc = 'audio/answers/' + index + '.wav';


            // $('.js-popup-person-audio-player').attr('src', 'audio/answers/' + index + '.wav');
            $('.js-popup-person-img').attr('src', imgSrc);


            popupTrigger.append(LOADER_HTML).addClass('btn-loader').attr('disabled', 'disabled');


            setTimeout(function() {
                openModal();
                popupTrigger.html(popupTriggerHtml).removeClass('btn-loader').removeAttr('disabled');
            }, 100);

        });


        $(document).on('click touch', '.js-person-audio-play-trigger', function (e) {
            playPersonAudio(soundSrc);
        });

        function openModal() {
            $.fancybox.open({
                src  : '#popup-person',
                type : 'inline',
                opts : {
                    afterShow : function( instance, current ) {
                        // playPersonAudio($('.js-popup-person-audio-player'));
                        playPersonAudio(soundSrc);
                    },
                    beforeClose : function( instance, current ) {
                        stopPersonAudio($('.js-popup-person-audio-player'));
                    },
                    hash: false,
                    baseTpl:
                        '<div class="fancybox-container popup-person-wrap" role="dialog" tabindex="-1">' +
                        '<div class="fancybox-bg"></div>' +
                        '<div class="fancybox-inner">' +
                        '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
                        '<div class="fancybox-toolbar">{{buttons}}</div>' +
                        '<div class="fancybox-navigation">{{arrows}}</div>' +
                        '<div class="fancybox-stage"></div>' +
                        '<div class="fancybox-caption"></div>' +
                        "</div>" +
                        "</div>",
                    buttons: [],
                    animationEffect: "zoom-in-out",
                },

            });
        };

        function playPersonAudio(src) {

            sound = new Howl({
                src: [src]
            });

            sound.play();

            sound.on('play', function(){
                $('.popup-person').addClass('popup-person--playing');
            }).on('end', function(){
                $('.popup-person').removeClass('popup-person--playing');
            });

            // let audio = el[0];
            //
            // if (audio.paused !== false) {
            //     audio.currentTime = 0;
            //     audio.play();
            // };
            //
            // audio.onplaying = function () {
            //     $('.popup-person').addClass('popup-person--playing');
            // };
            //
            // audio.onpause = function () {
            //     $('.popup-person').removeClass('popup-person--playing');
            // };
        };

        function stopPersonAudio(el) {
            // let audio = el[0];
            //
            // if (audio.paused == false) {
            //     audio.pause();
            // }

            sound.stop();
        };

    };

    personPopup();




});
