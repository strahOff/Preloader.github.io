let circularProgress = document.querySelector(".circular-progress");
let progressInput = document.querySelector("#progressInput");
let animateCheckbox = document.querySelector("#animateCheckbox");
let hideCheckbox = document.querySelector("#hideCheckbox");
let progressInterval = null;
let progressStartValue = 0,
  progressEndValue = 100,
  speed = 10;

progressInput.addEventListener("input", () => {
  if (animateCheckbox.checked) {
    clearInterval(progressInterval); // Останавливаем интервал
    progressStartValue = 0; // Сбрасываем значение прогресса
    animateCheckbox.checked = false; // Возвращаем свич на unchecked

    circularProgress.style.background = `conic-gradient(#001AFF ${progressInput.value * 3.6}deg, #ededed 0deg)`;
  } else {
    circularProgress.style.background = `conic-gradient(#001AFF ${progressInput.value * 3.6}deg, #ededed 0deg)`;
  }
});

animateCheckbox.addEventListener("change", () => {
  if (animateCheckbox.checked) {
    progressInput.value = "";
    progressInterval = setInterval(() => {
      progressStartValue++;
      circularProgress.style.background = `conic-gradient(#001AFF ${progressStartValue * 3.6}deg, #ededed 0deg)`;

      if (progressStartValue === progressEndValue) {
        progressStartValue = 0; // Сбрасываем значение прогресса
        circularProgress.style.background = `conic-gradient(#001AFF ${progressStartValue * 3.6}deg, #ededed 0deg)`;
      }
    }, speed);
  } else {
    clearInterval(progressInterval); // чекбокс снят, останавливаем интервал
    progressStartValue = 0; // Сбрасываем значение прогресса
    circularProgress.style.background = `conic-gradient(#001AFF 0deg, #ededed 0deg)`; // Сбрасываем стиль
  }
});

hideCheckbox.addEventListener("change", () => {
  if (hideCheckbox.checked) {
    circularProgress.style.opacity = 0;
    clearInterval(progressInterval); // Останавливаем интервал
    progressStartValue = 0; // Сбрасываем значение прогресса
    animateCheckbox.checked = false; // Возвращаем свич на unchecked
    progressInput.value = "";
    circularProgress.style.background = `conic-gradient(#001AFF ${progressInput.value * 3.6}deg, #ededed 0deg)`;
  } else {
    circularProgress.style.opacity = 1;
  }
});
