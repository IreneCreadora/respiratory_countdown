import { refs } from './refs';

const newYearDate = new Date('2023-01-01 00:00:00');

export class Timer {
  #timerId = null;
  #refs = {};
  #datasetValues = {
    days: ['день', 'дня', 'днів'],
    hours: ['година', 'години', 'годин'],
    minutes: ['хвилина', 'хвилини', 'хвилин'],
    seconds: ['секунда', 'секунди', 'секунд'],
  };

  constructor(selector) {
    this.selector = selector;
  }

  start() {
    this.#getRefs();
    refs.startTimer.classList.add('is-hidden');
    this.#timerId = setInterval(() => {
      const dif = newYearDate - Date.now();
      if (dif < 1000) {
        clearInterval(this.#timerId);
      }

      const data = this.convertMs(dif);
      Object.entries(data).forEach(([name, value], index) => {
        this.#refs.output[index].textContent = this.addLeadingZero(value);
        this.#refs.output[index].dataset.title = this.#declensionNum(
          value,
          this.#datasetValues[name]
        );
        this.#drawCircle(index, value);
      });
    }, 1000);
  }

  #getRefs() {
    console.log(this.selector);
    this.#refs.output = {};
    this.#refs.output = document.querySelectorAll(
      `${this.selector} .timer__item`
    );
    this.#refs.canvas = {};
    this.#refs.canvas = document.querySelectorAll(
      `${this.selector} #stockGraph`
    );
    console.log(this.#refs);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  #declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }

  #drawCircle(index, value) {
    const ctx = this.#refs.canvas[index].getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    ctx.beginPath();
    ctx.strokeStyle = 'lawngreen';

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    let path = 60 / 2;
    if (index === 0) {
      path = 20 / 2;
    }

    if (index === 1) {
      path = 24 / 2;
    }
    ctx.arc(
      100,
      100,
      100 - 2,
      (Math.PI / path) * (value - path / 2),
      (Math.PI / path) * (path * 2 - path / 2 - 0.01),
      true
    );

    ctx.stroke();
  }
}
