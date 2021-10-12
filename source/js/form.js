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
