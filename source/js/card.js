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
