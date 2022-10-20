import { refs } from './js/refs';
import { calendar } from './js/calendar';
import { Timer } from './js/timer';
import * as basicLightbox from 'basiclightbox';

calendar();

const newYearDate = new Date('2023-01-01 00:00:00');

const timer = new Timer('.timer__items', newYearDate);

refs.startTimer.addEventListener('click', timer.start.bind(timer));
