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
});


