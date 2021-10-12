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
