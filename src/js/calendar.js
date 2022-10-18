import { refs } from './refs';
import { christmasTasks } from './christmasTasks';

import * as basicLightbox from 'basiclightbox';

export function calendar() {
  const markup = [...christmasTasks].map(createMarkup);
  console.log(markup);
  refs.calendar.innerHTML = markup.join('');
}

function createMarkup({ day, title, text }) {
  return `<li class="calendar__item"><a><span>${day}</span>
    <p class="calendar__title is-hidden">${title}</p>
    <p class="calendar__text is-hidden">${text}</p>
    </a>
    </li>`;
}

refs.calendar.addEventListener('click', onCalendarClick);

function onCalendarClick(e) {
  if (e.target.nodeName !== 'LI') {
    console.log(`click not li`);
    return;
  }
  e.preventDefault();
  console.log(`${e}`);
  modalShow();
}

let instance;

function modalShow({ title, text }) {
  instance = basicLightbox.create(
    `<div class="modal" width="800" height="600">
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
