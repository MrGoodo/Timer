const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Функция для форматирования времени в "hh:mm:ss"
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// Обновление элемента таймера с новым временем
const updateTimerElement = (timeInSeconds) => {
  const formattedTime = formatTime(timeInSeconds);
  timerEl.textContent = formattedTime;
};

// Напишите реализацию createTimerAnimator
const createTimerAnimator = () => {
  let timerInterval;

  return (seconds) => {
    // Остановить предыдущий интервал, если есть
    clearInterval(timerInterval);

    let remainingSeconds = seconds;
    updateTimerElement(remainingSeconds);

    timerInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds >= 0) {
        updateTimerElement(remainingSeconds);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000); // 1 секунда
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
