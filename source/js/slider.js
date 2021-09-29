'use strict';

(function (){
  const slider = document.querySelector('.js-slider');
  const pagination = document.querySelector('.js-slider-pagination');

  if (!slider || !pagination) {
    return false;
  }

  new Swiper(slider, {
    //slidesPerView: 1,
    pagination: {
      el: pagination,
      clickable: true,
      type: 'custom',
      //renderCustom:	function(swiper, current, total) {},
    },

    autoplay: {
      delay: 5000,
    },
  });

}());
