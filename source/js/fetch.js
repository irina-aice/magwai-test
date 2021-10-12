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
