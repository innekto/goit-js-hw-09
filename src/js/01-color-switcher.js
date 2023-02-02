//ініціалізуємо елементи

const body = document.body;
const startBtn = document.querySelector('button[data-start');
const stopBtn = document.querySelector('button[data-stop');

let indervalId = null;

onLoad();

//вішаємо слухачів подій

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

//пишемо функції:

// 1.функція для рандомного кольору

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// 2.функція для зміни кольору раз на секунду при натисканні на start

function onStartClick({ target }) {
  indervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  target.disabled = true;
  stopBtn.disabled = false;
}

// 3. функція яка перериває зміну кольорів

function onStopClick({ target }) {
  clearInterval(indervalId);
  target.disabled = true;
  startBtn.disabled = false;
}

// 4. функція яка робіть кнопку stop  неактивною при загрузці сторінки

function onLoad() {
  stopBtn.disabled = true;
}
