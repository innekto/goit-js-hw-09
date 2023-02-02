import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let selectedTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getTime.call(options, selectedDates[0]);
  },
};

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

flatpickr(inputEl, options);
startBtn.addEventListener('click', onStartClick);

//функція конвертування мілісекунд  у дні/часи/хвилини/секунди
function convertMs(ms) {
  const days = addZero(Math.floor(ms / (1000 * 60 * 60 * 24)));
  const hours = addZero(Math.floor((ms / (1000 * 60 * 60)) % 24));
  const minutes = addZero(Math.floor((ms / (1000 * 60)) % 60));
  const seconds = addZero(Math.floor((ms / 1000) % 60));

  return { days, hours, minutes, seconds };
}

//додає нуль на початок числа якщо число не двузначне(9-->09, 8-->08...)
function addZero(value) {
  return String(value).padStart(2, '0');
}

//вибір дати : якщо дата в минулому то попросити ввести корректну дату(майбутнє)
//
function getTime(selectedDate) {
  if (this.defaultDate > selectedDate) {
    Notify.failure('Please choose a date in the future', {
      clickToClose: true,
    });
    return;
  }

  selectedTime = selectedDate;
  startBtn.disabled = false;
}

function onStartClick() {
  setTimer();
  intervalId = setInterval(setTimer, 1000);
  startBtn.disabled = true;
}

function setTimer() {
  const currentTime = Date.now();
  const deltaTime = selectedTime - currentTime;

  if (deltaTime < 1000) {
    elTimerValue(convertMs(deltaTime));
    clearInterval(intervalId);
    return;
  }
  elTimerValue(convertMs(deltaTime));
}

//записуємо значення у спани
function elTimerValue({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
