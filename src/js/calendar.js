import { refs } from './refs';
import { christmasTasks } from './christmasTasks';

import * as basicLightbox from 'basiclightbox';

export function calendar() {
  const markup = [...christmasTasks].map(createMarkup);
  // console.log(markup);
  refs.calendar.insertAdjacentHTML('beforeend', markup.join(''));
}

function createMarkup({ day }) {
  return `<li class="calendar__item" data-day="${day}"><span>${day}</span>
    </li>`;
}

refs.calendar.addEventListener('click', onCalendarClick);

function onCalendarClick(e) {
  if (e.target.nodeName === 'UL') {
    return;
  }
  e.preventDefault();
  const currentDay = e.target.dataset.day;
  modalShow(currentDay);
}

let instance;

function modalShow(currentDay) {
  const { title, text } = christmasTasks.find(task => task.day === currentDay);
  instance = basicLightbox.create(
    `<div class="modal">
      <ul class="lightrope">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li> 
      </ul>
      <p class="modal__title">${title}</p>
      <p class="modal__text">${text}</p>
    </div>`,
    {
      onShow: instance => {
        addListener();
      },
      onClose: instance => {
        removeListener();
      },
    }
  );
  instance.show();
}

function onEscClick(e) {
  if (e.code === 'Escape') {
    instance.close();
  }
}

function addListener() {
  window.addEventListener('keydown', onEscClick);
}

function removeListener() {
  window.removeEventListener('keydown', onEscClick);
}
