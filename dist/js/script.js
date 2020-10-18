window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    
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
});


