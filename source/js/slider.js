'use strict';

(function () {
  const slider = document.querySelector('.js-slider');
  const pagination = document.querySelector('.js-slider-pagination');

  if (!slider || !pagination) {
    return false;
  }

  let mySlider = new window.Swiper(slider, {
    pagination: {
      el: pagination,
      clickable: true,
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        let pagination = '';

        for (let i = 0; i < swiper.slides.length; i++) {
          const slide = swiper.slides[i];
          let paginationTitle = slide.getAttribute('data-pagination');

          let isActive = false;

          if (swiper.activeIndex === i) {
            isActive = true;
          }

          paginationTitle = `<button type="button" class="slider__bullet ${isActive ? 'slider__bullet--active' : ''}">${paginationTitle}</button>`;

          pagination += paginationTitle;
        }

        return pagination;
      },
    },

    autoplay: {
      delay: 5000,
    },
  });

  pagination.addEventListener('click', (evt) => {
    const button = evt.target;
    const index = Array.from(button.parentNode.children).indexOf(button);
    mySlider.slideTo(index);
  });

}());
