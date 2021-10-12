'use strict';

(function (){
  const cardList = document.querySelector('.js-card-list');
  const cardSelector = '.js-card-list > .card';
  let currentElem = null;

  if (!cardList) {
    return false;
  }

  if (!window.matchMedia('(min-width: 1024px)').matches) {
    return false;
  }

  window.gsap.registerPlugin(window.ScrollTrigger);

  window.gsap.set(cardSelector, {autoAlpha: 0, yPercent: 30});

  window.ScrollTrigger.batch(cardSelector, {
    start: 'top 90%',
    onEnter: function (batch) {
      window.gsap.to(batch, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: 'back.out(1.4)',
        overwrite: true,
        stagger: {
          each: 0.15,
          grid: [1, 5],
          axis: 'x',
        },
      });
    },
  });

  window.ScrollTrigger.addEventListener('refreshInit', () => window.gsap.set(cardSelector, {yPercent: 0}));

  cardList.addEventListener('mouseover', (evt) => {
    if (currentElem) {
      return false;
    }

    const card = evt.target.closest('.card');

    if (!card) {
      return false;
    }

    currentElem = card;

    window.gsap.to(currentElem, {duration: 0.35, scale: 1.05});
  });

  cardList.addEventListener('mouseout', (evt) => {
    if (!currentElem) {
      return false;
    }

    let relatedTarget = evt.relatedTarget;

    while (relatedTarget) {
      // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
      // если да, то это переход внутри элемента – игнорируем
      if (relatedTarget === currentElem) {
        return false;
      }

      relatedTarget = relatedTarget.parentNode;
    }

    // мы действительно покинули элемент
    window.gsap.to(currentElem, {duration: 0.35, scale: 1});
    currentElem = null;
  });

})();

'use strict';

(function (){
  let data = [];

  function onFetchSuccess(json) {
    data = json;

    const cardTemplate = document.querySelector('#card').content;
    const cardList = document.querySelector('.cards__list');

    for(let i = 0; i < 6; i++) {
      const photoUrl = `https://source.unsplash.com/random/320x185?coin&rand=${Math.random()}`;

      const card = data[i];
      const cardElement = cardTemplate.cloneNode(true);
      const cardElementLi = cardElement.querySelector('.card');

      cardElement.querySelector('.card__image').src = photoUrl;

      cardElement.querySelector('.card__subtitle').textContent = card.title;
      cardElement.querySelector('.card__information').textContent = card.body;

      window.gsap.fromTo(cardElementLi, {autoAlpha: 0, scale: 0.8}, {autoAlpha: 1, scale: 1, duration: 0.5});

      cardList.appendChild(cardElement);
    }
  }

  function fetchData(onSuccess) {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?${Math.random()}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((json) => {
      onSuccess(json);
    });
  }

  const cardAddButton = document.querySelector('.cards__button');
  cardAddButton.addEventListener('click', () => {
    fetchData(onFetchSuccess);
  });
})();

'use strict';

(function () {
  const formList = document.querySelectorAll('.js-form');
  const INPUT_ERROR_CLASS = 'form__input--error';
  const TEXTAREA_ERROR_CLASS = 'form__textarea--error';

  if (!formList.length) {
    return false;
  }

  for (let i = 0; i < formList.length; i++) {
    const form = formList[i];

    const inputList = form.querySelectorAll('.js-form-input');
    const textareaList = form.querySelectorAll('.js-form-textarea');

    form.addEventListener('submit', (evt) => {
      for (let k = 0; k < inputList.length; k++) {
        const input = inputList[k];

        input.classList.remove(INPUT_ERROR_CLASS);
      }

      for (let y = 0; y < textareaList.length; y++) {
        const textarea = textareaList[y];

        textarea.classList.remove(TEXTAREA_ERROR_CLASS);
      }

      if (!form.checkValidity()) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    });

    for (let k = 0; k < inputList.length; k++) {
      const input = inputList[k];

      input.addEventListener('invalid', () => {
        input.classList.add(INPUT_ERROR_CLASS);
      });
    }

    for (let y = 0; y < textareaList.length; y++) {
      const textarea = textareaList[y];

      textarea.addEventListener('invalid', () => {
        textarea.classList.add(TEXTAREA_ERROR_CLASS);
      });
    }
  }
})();

'use strict';

(function () {
  window.MicroModal.init({
    openClass: 'modal--open',
    disableScroll: true,
  });
})();

'use strict';

(function (){
  const header = document.querySelector('.js-header');
  const headerButton = document.querySelector('.js-header-menu-button');
  const page = document.querySelector('.js-page');

  const headerOpenedClass = 'header--opened';
  const headerClosedClass = 'header--closed';
  const pageNavOpenedClass = 'page--nav-opened';

  if(!page || !header || !headerButton) {
    return false;
  }

  header.classList.add(headerClosedClass);

  const open = function () {
    header.classList.remove(headerClosedClass);
    header.classList.add(headerOpenedClass);
    page.classList.add(pageNavOpenedClass);
  };

  const close = function () {
    header.classList.remove(headerOpenedClass);
    header.classList.add(headerClosedClass);
    page.classList.remove(pageNavOpenedClass);
  };

  headerButton.addEventListener('click', () => {
    if(header.classList.contains(headerClosedClass)) {
      open();
    } else {
      close();
    }
  });
})();

'use strict';

(function (){
  const navLinks = document.querySelectorAll('.js-nav-list a');
  const DEFAULT_COLOR = '#ffffff';
  const HOVER_COLOR = '#c2ab81';

  if (!navLinks.length) {
    return false;
  }

  if (!window.matchMedia('(min-width: 1024px)').matches) {
    return false;
  }

  for (let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];

    navLink.addEventListener('mouseenter', () => {
      window.gsap.to(navLink, { css: { color: HOVER_COLOR }, ease: window.Back.easeOut });
    });

    navLink.addEventListener('mouseleave', () => {
      window.gsap.to(navLink, { css: { color: DEFAULT_COLOR }, ease: window.Back.easeOut });
    });
  }
})();

'use strict';

(function () {
  const slider = document.querySelector('.js-slider');
  const paginationElement = document.querySelector('.js-slider-pagination');

  if (!slider || !paginationElement) {
    return false;
  }

  const mySlider = new window.Swiper(slider, {
    pagination: {
      el: paginationElement,
      clickable: true,
      type: 'custom',
      renderCustom: function (swiper) {
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

  paginationElement.addEventListener('click', (evt) => {
    const button = evt.target;
    const index = Array.from(button.parentNode.children).indexOf(button);
    mySlider.slideTo(index);
  });

}());
