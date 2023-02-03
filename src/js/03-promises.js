import { Notify } from 'notiflix/build/notiflix-notify-aio';

const fromEl = document.querySelector('.form');

fromEl.addEventListener('submit', onFormSubmit);

const inputValues = {};

//сабмітимо форму
function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  // console.log(delay, step, amount);
  // console.log(event.currentTarget.elements);
  getInputValue(delay, step, amount);
  promisesCycle();
}

//отримуємо значення інпутів
function getInputValue(delay, step, amount) {
  inputValues.delay = Number(delay.value);
  inputValues.step = Number(step.value);
  inputValues.amount = Number(amount.value);
}

//створюємо проміс
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//оновлюємо проміси циклом
function promisesCycle() {
  for (i = 1; i <= inputValues.amount; i += 1) {
    createPromise(i, inputValues.delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    inputValues.delay += inputValues.step;
  }
}
