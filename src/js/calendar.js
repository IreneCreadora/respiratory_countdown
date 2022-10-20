import { refs } from './refs';
import { christmasTasks } from './christmasTasks';

import * as basicLightbox from 'basiclightbox';

export function calendar() {
  const markup = [...christmasTasks].map(createMarkup);
  // console.log(markup);
  refs.calendar.insertAdjacentHTML('beforeend', markup.join(''));
}

function createMarkup({ day }) {
  return `<li class="calendar__item" data-day="${day}"><a href=""><span>${day}</span>
    </a>
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
        <p class="calendar__title">${title}</p>
        <p class="calendar__text">${text}</p>
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
