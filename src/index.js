let progressInterval = null;
let progressEndValue = 100,
  speed = 20;

const container = document.createElement("div");
container.className = "container";

const circularProgress = document.createElement("div");
circularProgress.className = "circular-progress";
container.append(circularProgress);

const settingsDiv = document.createElement("div");
settingsDiv.className = "settings";

const progressInput = document.createElement("input");
progressInput.className = "field-control";
progressInput.type = "number";
progressInput.id = "progress-input";
progressInput.oninput = function () {
  if (this.value !== "") {
    if (parseInt(this.value) > 100) {
      this.value = 100;
    } else if (parseInt(this.value) < 0) {
      this.value = 0;
    }
  }
};
settingsDiv.append(progressInput);

const valueLabel = document.createElement("div");
valueLabel.className = "label";
valueLabel.textContent = "Value";
settingsDiv.append(valueLabel);

const animateSwitchLabel = document.createElement("label");
animateSwitchLabel.className = "switch";

const animateCheckbox = document.createElement("input");
animateCheckbox.type = "checkbox";
animateCheckbox.id = "animate-checkbox";
animateSwitchLabel.append(animateCheckbox);

const animateSlider = document.createElement("span");
animateSlider.className = "slider";
animateSwitchLabel.append(animateSlider);

settingsDiv.append(animateSwitchLabel);

const animateLabel = document.createElement("label");
animateLabel.className = "label";
animateLabel.id = "animate-text";
animateLabel.textContent = "Animate";
settingsDiv.append(animateLabel);

const hideSwitchLabel = document.createElement("label");
hideSwitchLabel.className = "switch";

const hideCheckbox = document.createElement("input");
hideCheckbox.type = "checkbox";
hideCheckbox.id = "hide-checkbox";
hideSwitchLabel.append(hideCheckbox);

const hideSlider = document.createElement("span");
hideSlider.className = "slider";
hideSwitchLabel.append(hideSlider);

settingsDiv.append(hideSwitchLabel);

const hideLabel = document.createElement("label");
hideLabel.className = "label";
hideLabel.id = "hide-text";
hideLabel.textContent = "Hide";
settingsDiv.append(hideLabel);

container.append(settingsDiv);
const h1 = document.createElement("h1");
h1.textContent = "Progress";
container.append(h1);
document.querySelector(".main-preloader-container").append(h1, container); //<--- по селектору ".main-preloader-container" добавляется данный PRELOADER.

progressInput.addEventListener("input", () => {
  if (animateCheckbox.checked) {
    clearInterval(progressInterval); // Останавливаем интервал
    animateCheckbox.checked = false; // Возвращаем свич на unchecked

    circularProgress.style.background = `conic-gradient(#001AFF ${progressInput.value * 3.6}deg, #ededed 0deg)`;
  } else {
    circularProgress.style.background = `conic-gradient(#001AFF ${progressInput.value * 3.6}deg, #ededed 0deg)`;
  }
});

animateCheckbox.addEventListener("change", () => {
  let progressStartValue = 0;
  if (animateCheckbox.checked) {
    progressInterval = setInterval(() => {
      progressStartValue++;
      const endAngle = progressStartValue + Number(progressInput.value);

      if (endAngle * 3.6 <= 360) {
        circularProgress.style.background = `conic-gradient(
        #ededed ${progressStartValue * 3.6}deg, 
        #001AFF ${progressStartValue * 3.6}deg, 
        #001AFF ${endAngle * 3.6}deg, 
        #ededed ${endAngle * 3.6}deg)`;
      } else {
        const wrappedEndAngle = endAngle - 100;
        console.log("wrappedEndAngle", wrappedEndAngle);
        console.log("progressStartValue", progressStartValue);
        circularProgress.style.background = `conic-gradient(
            #001AFF ${wrappedEndAngle * 3.6}deg, 
            #ededed ${wrappedEndAngle * 3.6}deg, 
            #ededed ${progressStartValue * 3.6}deg, 
            #001AFF ${progressStartValue * 3.6}deg)`;
      }
      if (endAngle === progressEndValue + Number(progressInput.value)) {
        progressStartValue = 0; // Сбрасываем значение прогресса
      }
    }, speed);
  } else {
    clearInterval(progressInterval); // чекбокс снят, останавливаем интервал
    endAngle = -Number(progressInput.value); // Сбрасываем значение прогресса
    circularProgress.style.background = `conic-gradient(#001AFF 0deg, #ededed 0deg)`; // Сбрасываем стиль
  }
});

hideCheckbox.addEventListener("change", () => {
  if (hideCheckbox.checked) {
    circularProgress.style.opacity = 0;
    clearInterval(progressInterval); // Останавливаем интервал
    animateCheckbox.checked = false; // Возвращаем свич на unchecked
  } else {
    circularProgress.style.opacity = 1;
  }
});
