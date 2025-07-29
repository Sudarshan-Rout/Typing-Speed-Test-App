const sampleText = document.getElementById("sampleText").innerText;
const inputArea = document.getElementById("inputArea");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");

let startTime, interval;

startBtn.onclick = () => {
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  timerDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "0";
  startTime = new Date().getTime();
  interval = setInterval(updateTimer, 1000);
};

inputArea.oninput = () => {
  const typedText = inputArea.value;
  const elapsedTime = (new Date().getTime() - startTime) / 1000;

  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / elapsedTime) * 60);
  wpmDisplay.textContent = isNaN(wpm) ? 0 : wpm;

  let correct = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === sampleText[i]) correct++;
  }

  const accuracy = Math.round((correct / typedText.length) * 100);
  accuracyDisplay.textContent = isNaN(accuracy) ? 0 : accuracy;

  if (typedText === sampleText) {
    clearInterval(interval);
    inputArea.disabled = true;
  }
};

function updateTimer() {
  const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
  timerDisplay.textContent = elapsedTime;
}
