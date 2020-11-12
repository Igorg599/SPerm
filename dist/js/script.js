window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Слайдер на чистом JS
    const sliders = (slides, dir, prev, next) => {
        let slideIndex = 1,
            paused = false;
    
        const items = document.querySelectorAll(slides);
    
        function showSlides(n) {
            if (n > items.length) {
                slideIndex = 1;
            }
    
            if (n < 1) {
                slideIndex = items.length;
            }
    
            items.forEach(item => {
                item.classList.add("animated");
                item.style.display = "none";
            });
    
            items[slideIndex - 1].style.display = 'block';
        }
    
        showSlides(slideIndex);
    
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
    
        try {
            const prevBtn = document.querySelector(prev),
                nextBtn = document.querySelector(next);
    
            prevBtn.addEventListener('click', () => {
                plusSlides(-1);
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
            });
    
            nextBtn.addEventListener('click', () => {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            });
        } catch(e){}
    
        function activateAnimation () {
            if (dir === 'vertical') {
                paused = setInterval(function () {
                    plusSlides(1);
                    items[slideIndex - 1].classList.add('slideInDown');
                }, 2500);
            } else {
                paused = setInterval(function () {
                    plusSlides(1);
                    items[slideIndex - 1].classList.remove('slideInRight');
                    items[slideIndex - 1].classList.add('slideInLeft');
                }, 2500);
            }
        }
        activateAnimation();
    
        items[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(paused);
        });
        items[0].parentNode.addEventListener('mouseleave', () => {
            activateAnimation();
        });
    };
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');



    //Реализация всплытия отдельных блоков взамен других
    let more = document.querySelectorAll('.info_item');
    more.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.querySelector('.info_des').style.display = 'none';
            item.querySelector('.info_descr').style.display = 'block';
        });
        item.addEventListener('mouseout', () => {
            item.querySelector('.info_descr').style.display = 'none';
            item.querySelector('.info_des').style.display = 'block';
        });
    });


    //Плавный скроллинг на чистом JS
    const scrolling = (upSelector) => {
        const upElem = document.querySelector(upSelector);
    
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 700) {
                upElem.classList.add('animated', 'fadeIn');
                upElem.classList.remove('fadeOut');
            } else {
                upElem.classList.add('fadeOut');
                upElem.classList.remove('fadeIn');
            }
        });
    
        let links = document.querySelectorAll('[href^="#"]'),
            speed = 0.3;
    
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
    
                let widthTop = document.documentElement.scrollTop,
                    hash = this.hash, 
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,
                    start = null;
    
                requestAnimationFrame(step);
    
                function step(time) {
                    if (start === null) {
                        start = time;
                    }
    
                    let progress = time - start,
                        r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
    
                        document.documentElement.scrollTo(0, r);
    
                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                }
            });
        });
    }
    scrolling('.pageup');


    //Встроенный Главный слайдер на первой странице
    var mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;

    var mainSliderOptions = {
        loop: true,
        speed:1000,
        autoplay:{
            delay:5000
        },
        loopAdditionalSlides: 10,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function(){
            this.autoplay.stop();
            },
            imagesReady: function(){
            this.el.classList.remove('loading');
            this.autoplay.start();
            },
            slideChangeTransitionEnd: function(){
            var swiper = this,
                captions = swiper.el.querySelectorAll('.caption');
            for (var i = 0; i < captions.length; ++i) {
                captions[i].classList.remove('show');
            }
            swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
            },
            progress: function(){
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress,
                    innerOffset = swiper.width * interleaveOffset,
                    innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                "translate3d(" + innerTranslate + "px, 0, 0)";
            }
            },
            touchStart: function() {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
            }
            },
            setTransition: function(speed) {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                speed + "ms";
            }
            }
        }
        };
    var mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

    var navSliderOptions = {
        loop: true,
        loopAdditionalSlides: 20,
        speed:1000,
        spaceBetween: 5,
        slidesPerView: 3,
        centeredSlides : true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        direction: 'vertical',
        on: {
            imagesReady: function(){
            this.el.classList.remove('loading');
            },
            click: function(){
            mainSlider.autoplay.stop();
            }
        }
        };
    var navSlider = new Swiper(navSliderSelector, navSliderOptions);

    mainSlider.controller.control = navSlider;
    navSlider.controller.control = mainSlider;


});


//Встроенный слайдер на второстепенных страницах
$(function() {
    let showcase = $("#showcase");
    showcase.Cloud9Carousel({
        yOrigin: 30,
        yRadius: 50,
        itemClass: "card",
        buttonLeft: $(".snav-left"),
        buttonRight: $(".snav-right"),
        bringToFront: true,
        onLoaded: function() {
            showcase.css('visibility', 'visible');
            showcase.fadeIn( 100 );
        }
    });
});



