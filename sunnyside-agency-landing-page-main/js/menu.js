/*  DOOM ELEMENTS   */

const menuIcon = document.querySelector('.hero__button');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', () => {
  if (menu.style.display == 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
});
