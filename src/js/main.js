// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


var wWidth = 0;
    W_SM = 576
    W_MD = 768,
    W_LG = 992,
    W_XL = 1200,

    LOADER_HTML = '<div class="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
;




$(document).ready(function () {
    wWidth =  $(window).width();

    $(window).on('resize', function() {
        wWidth =  $(window).width();
    });

    if ( wWidth < W_MD ) {

    }

    let sectionsId = []; //use in: pagepilingInit()

    $('.section').each(function () {
        var sec = $(this);

        sectionsId.push(sec.attr('id'));
    });



    let answersRun = false; //use in: answers(),  pagepilingInit()

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

    function pagepilingInit() {
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
            normalScrollElementTouchThreshold: 1,
            touchSensitivity: 1,
            keyboardScrolling: true,
            sectionSelector: '.section',
            animateAnchor: true,

            //events
            onLeave: function (index, nextIndex, direction) {

            },

            afterLoad: function (anchorLink, index) {
                pagepilingLoadStep(anchorLink, index);

                // clearMouseWheel();
            },

            afterRender: function () {
                let initAnchorLink = $('.pp-section.active').attr('id');

                pagepilingLoadStep(initAnchorLink);
            },
        });

        function pagepilingLoadStep (anchorLink, index) {

            if (anchorLink === 'answers') {
                setTimeout(function () {
                    answersRun = true;
                }, 500);
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
    };

    if ( $('.pagepiling').length ) {
        pagepilingInit();
    }

    function answers () {
        let wrap = $('.s-answers'),
            cards = wrap.find('.s-answers__cards'),
            touchY,
            dir,
            scrolling = false,
            stage = 1,
            cardsStage = 1;




        // wrap.on('touchstart', function (e){
        //     touchY = e.originalEvent.touches[0].clientY;
        // });
        //
        // wrap.on('touchend', function (e) {
        //     let newTouchY = e.originalEvent.changedTouches[0].clientY;
        //
        //     dir = (touchY > newTouchY + 5) ? -1 :
        //         (touchY < newTouchY - 5) ? 1 : 0;
        //
        //     slideAnimate(dir);
        //
        //     devMsg('touchend  -  .s-answers');
        //     console.log('touchend  -  .s-answers', dir);
        //
        //     // console.log(dir);
        // });



        //         wrap.on("mousewheel", function (e) {
        //             if ( scrolling ) { return };
        //
        // ;
        //
        //
        //             let obj = $(e.target);
        //
        //             if (!obj.closest('.s-answers__cards').length) {
        //                 slideAnimate(e.deltaY);
        //                 devMsg('mousewheel  -  .s-answers')
        //             } else  {
        //                 cardsAnimate(e.deltaY);
        //                 devMsg('mousewheel  -  .s-answers__cards')
        //             }
        //
        //             devMsg("mousewheel -" + e.deltaX  + '  ' + '  ' +  e.deltaY + '  ' + e.deltaFactor);
        //
        //
        //         });

        scrollScript();

        personPopup();

        function scrollScript() {
            let container = wrap,
                scrollingSpeed = 300,
                scrollDelay = 300,
                scrollings = [],
                lastAnimation = 0,
                prevTime = new Date().getTime();

            addMouseWheelHandler();

            function MouseWheelHandler(e) {
                let curTime = new Date().getTime();

                // cross-browser wheel delta
                e = e || window.event;
                let value = e.wheelDelta || -e.deltaY || -e.detail;
                let delta = Math.max(-1, Math.min(1, value));

                let obj = $(e.target);

                let animFunction =  (!obj.closest('.s-answers__cards').length) ? slideAnimate : cardsAnimate;




                let horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
                let isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

                //Limiting the array to 150 (lets not waste memory!)
                if(scrollings.length > 149){
                    scrollings.shift();
                }

                //keeping record of the previous scrollings
                scrollings.push(Math.abs(value));

                //time difference between the last scroll and the current one
                let timeDiff = curTime-prevTime;
                prevTime = curTime;

                //haven't they scrolled in a while?
                //(enough to be consider a different scrolling action to scroll another section)
                if(timeDiff > 200){
                    //emptying the array, we dont care about old scrollings for our averages
                    scrollings = [];
                }

                if ( !isMoving() ) {


                    let averageEnd = getAverage(scrollings, 10);
                    let averageMiddle = getAverage(scrollings, 70);
                    let isAccelerating = averageEnd >= averageMiddle;

                    if ( isAccelerating && isScrollingVertically ) {

                        if ( delta < 0 || delta > 0 ) {
                            //slideAnimate(delta);
                            animFunction(delta);
                        };
                    }

                    return false;
                }
            }

            function slideAnimate (dir) {
                // if ( scrolling || (dir === 0) ) { return };

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

                cardsStage = $('.s-answers__people-item--' + stage).find('.s-answers__cards').attr('data-stage');

                setTriggerPopupBtnIndex(stage, cardsStage);

                var timeNow = new Date().getTime();
                lastAnimation = timeNow;



                // scrolling = true;
                //
                // setTimeout(function () {
                //     scrolling = false;
                // }, 1300);
            };

            function cardsAnimate(dir) {

                let cardsEl = $('.s-answers__people-item--' + stage).find('.s-answers__cards'),
                    cardsMax = cardsEl.find('.s-answers__card').length
                ;

                cardsStage = cardsEl.attr('data-stage');

                (dir === -1) ? ++cardsStage : --cardsStage;

                if ( cardsStage < 1 ) {
                    cardsStage = cardsMax;
                } else if ( cardsStage > cardsMax ) {
                    cardsStage = 1;
                }


                setCardsStage(cardsEl, stage, cardsStage);

                var timeNow = new Date().getTime();
                lastAnimation = timeNow;
            };

            function getAverage(elements, number){
                var sum = 0;

                //taking `number` elements from the end to make the average, if there are not enought, 1
                var lastElements = elements.slice(Math.max(elements.length - number, 1));

                for(var i = 0; i < lastElements.length; i++){
                    sum = sum + lastElements[i];
                }

                return Math.ceil(sum/number);
            }

            function isMoving(){
                var timeNow = new Date().getTime();
                // Cancel scroll if currently animating or within quiet period
                if (timeNow - lastAnimation < scrollDelay + scrollingSpeed) {
                    return true;
                }
                return false;
            }




            /**
             * Adds the auto scrolling action for the mouse wheel and tackpad.
             * After this function is called, the mousewheel and trackpad movements will scroll through sections
             */
            function addMouseWheelHandler(){
                if (container.get(0).addEventListener) {
                    container.get(0).addEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
                    container.get(0).addEventListener('wheel', MouseWheelHandler, false); //Firefox
                } else {
                    container.get(0).attachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
                }
            }



            $(window).on("keydown", function (a) {
                let dir = ( 38 === a.keyCode || 37 === a.keyCode ) ? 1 : ( 40 === a.keyCode || 39 === a.keyCode ) && -1;

                if ( answersRun ) {
                    let dir = ( 38 === a.keyCode || 37 === a.keyCode ) ? 1 : ( 40 === a.keyCode || 39 === a.keyCode ) && -1;

                    (!!dir && !isMoving()) ? slideAnimate(dir) : '';
                }
            });


            var el = wrap[0];

            swipedetect(el, function(swipedir, e){
                //swipedir contains either "none", "left", "right", "top", or "down"

                dir = ( ( swipedir === 'left' ) || ( swipedir === 'up' ) ) ? -1 :
                    ( ( swipedir === 'right' ) || ( swipedir === 'down' ) ) ? 1 : 0;

                let obj = $(e);

                let animFunction =  (!obj.closest('.s-answers__cards').length) ? slideAnimate : cardsAnimate;

                // slideAnimate(dir);
                (!!dir && !isMoving()) ? animFunction(dir) : '';
            });

            // var elCards = cards[0];
            //
            // swipedetect(el, function(swipedir, e){
            //     //swipedir contains either "none", "left", "right", "top", or "down"
            //
            //     dir = ( ( swipedir === 'left' ) || ( swipedir === 'up' ) ) ? -1 :
            //         ( ( swipedir === 'right' ) || ( swipedir === 'down' ) ) ? 1 : 0;
            //
            //     console.log(e);
            //
            //     // slideAnimate(dir);
            //     (!!dir && !isMoving()) ? slideAnimate(dir) : '';
            // });


            // function slideAnimate(dir) {
            //     if ( scrolling || (dir === 0) ) { return };
            //
            //     scrolling = true;
            //
            //     (dir === -1) ? ++stage : --stage;
            //
            //     if ( stage < 1 ) {
            //         stage = 1;
            //         $.fn.pagepiling.moveSectionUp();
            //         $.fn.pagepiling.setAllowScrolling(true);
            //         $.fn.pagepiling.setKeyboardScrolling(true);
            //     } else if ( stage > 6 ) {
            //         stage = 6;
            //         $.fn.pagepiling.moveSectionDown();
            //         $.fn.pagepiling.setAllowScrolling(true);
            //         $.fn.pagepiling.setKeyboardScrolling(true);
            //     } else {
            //         wrap.attr('data-stage', stage);
            //     }
            //
            //     cardsStage = $('.s-answers__people-item--' + stage).find('.s-answers__cards').attr('data-stage');
            //
            //     setTriggerPopupBtnIndex(stage, cardsStage);
            //
            //     clearMouseWheel(wrap);
            //
            //     setTimeout(function () {
            //         scrolling = false;
            //     }, 2500);
            // };


            // function cardsAnimate(dir) {
            //     if ( scrolling || (dir === 0) ) { return };
            //
            //
            //     scrolling = true;
            //
            //     let cardsEl = $('.s-answers__people-item--' + stage).find('.s-answers__cards'),
            //         cardsMax = cardsEl.find('.s-answers__card').length
            //     ;
            //
            //     cardsStage = cardsEl.attr('data-stage');
            //
            //     (dir === -1) ? ++cardsStage : --cardsStage;
            //
            //     if ( cardsStage < 1 ) {
            //         cardsStage = cardsMax;
            //     } else if ( cardsStage > cardsMax ) {
            //         cardsStage = 1;
            //     }
            //
            //
            //     setCardsStage(cardsEl, stage, cardsStage);
            //
            //
            //
            //     clearMouseWheel(cards);
            //
            //     setTimeout(function () {
            //         scrolling = false;
            //     }, 1300);
            // };





        }
        function setCardsStage (element, stage, cardsStage) {
            element.attr('data-stage', cardsStage);

            setTriggerPopupBtnIndex(stage, cardsStage);

            $('.s-answers__card').removeClass('hover');

            $('.s-answers__people-item--' + stage + ' .s-answers__card--' + cardsStage).addClass('hover')

        };

        function setTriggerPopupBtnIndex (stage, cardsStage) {
            // let cadrsCurrentIndex = $('.s-answers__people-item--' + stage).find('.s-answers__cards').attr('data-stage');

            $('.js-answers-popup-trigger-btn').attr('data-index', stage + '_' + cardsStage);
        };

        function personPopup() {
            let sound,
                soundSrc = [];

            $(document).on('click touch', '.s-answers__card, .js-answers-popup-trigger-btn', function (e) {
                e.preventDefault();

                let sound,
                    popupTrigger = $(this),
                    index = popupTrigger.attr('data-index'),
                    popupTriggerHtml = popupTrigger.html(),
                    imgSrc = 'img/answers/' + index + '.jpg'
                ;

                soundSrc = [
                    'audio/answers/ogg/' + index + '.ogg',
                    'audio/answers/m4a/' + index + '.m4a'
                ];

                $('.js-popup-person-img').attr('src', imgSrc);




                popupTrigger.append(LOADER_HTML).addClass('btn-loader').attr('disabled', 'disabled');


                setTimeout(function() {
                    openModal();
                    popupTrigger.html(popupTriggerHtml).removeClass('btn-loader').removeAttr('disabled');
                }, 100);

            });


            $(document).on('click touch', '.s-answers__card', function (e) {
                let index = $(this).attr('data-index'),
                    elIndex = $(this).index() + 1;


                let cardsEl = $('.s-answers__people-item--' + stage).find('.s-answers__cards');
                cardsStage = elIndex;

                cardsEl.attr('data-stage', cardsStage);

                setTriggerPopupBtnIndex(index);
            });

            $(document).on('click touch', '.js-person-audio-play-trigger', function (e) {
                playPersonAudio(soundSrc);
            });

            $('.s-answers__card').hover(
                function() {
                    let $this = $(this);

                    $this.addClass('hover');
                },
                function() {
                    let $this = $(this);

                    $this.removeClass('hover');
                }
            );

            function openModal() {
                $.fancybox.open({
                    src  : '#popup-person',
                    type : 'inline',
                    opts : {
                        afterShow : function( instance, current ) {
                            playPersonAudio(soundSrc);
                            $('.popup-person-wrap .popup-person__inner').addClass('popup-person__inner--shadow');
                        },
                        beforeClose : function( instance, current ) {
                            stopPersonAudio($('.js-popup-person-audio-player'));
                            $('.popup-person-wrap .popup-person__inner').removeClass('popup-person__inner--shadow');
                            $('.s-answers__card').removeClass('hover');
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
                        animationEffect: "circular",
                    },

                });
            };

            function playPersonAudio(srcArr) {

                sound = new Howl({
                    src: srcArr
                });

                sound.play();

                sound.on('play', function(){
                    $('.popup-person').addClass('popup-person--playing');
                }).on('end', function(){
                    $('.popup-person').removeClass('popup-person--playing');
                });

            };

            function stopPersonAudio() {
                sound.stop();
            };

        };




    };

    if ( $('.s-answers').length ) {
       answers();
    };



    function clearMouseWheel(el) {

        el.stop().clearQueue();
        $(window).stop().clearQueue();
        $(document).stop().clearQueue();
        $('html', 'body').stop().clearQueue();
    };

});



function devMsg(msg) {


    var el = document.createElement("p");
    el.innerText = msg;

    // $('.dev-msg').append(el);
    // $('.dev-msg').show();

    setTimeout(function () {
        el.remove();

        if ( !$('.dev-msg p').length ) {
            $('.dev-msg').hide();
        };

    }, 3000);
};




function swipedetect(el, callback){

    let  touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir, e){},
        startEvent ;


    touchsurface.addEventListener('touchstart', function(e){
        let touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault();

        startEvent = e.target;
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        let touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir, startEvent)
        e.preventDefault()
    }, false);

    return startEvent;
}
