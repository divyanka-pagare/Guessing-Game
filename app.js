let randomNum;
let attempts;
let maxRange;
let timeLeft;
let timerInterval;
let score = 0;
let low = 1;
let high = 1;

// 🔊 Sound Effects
const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

function playSafe(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {}); // ignore autoplay-block errors
}

// 🎯 Start Game
function startGame() {
  const difficulty = document.getElementById("difficulty").value;
  const rangeText = document.getElementById("rangeText");

  if (difficulty === "easy") {
    maxRange = 50;
    timeLeft = 30;
  } else if (difficulty === "medium") {
    maxRange = 100;
    timeLeft = 45;
  } else {
    maxRange = 500;
    timeLeft = 60;
  }

  rangeText.innerText = `Pick a number between 1 and ${maxRange}`;

  randomNum = Math.floor(Math.random() * maxRange) + 1;
  attempts = 0;
  score = 0;
  low = 1;
  high = maxRange;

  document.getElementById("message").innerText = "";
  document.getElementById("attempts").innerText = "";
  document.getElementById("score").innerText = "Score: 0";
  const input = document.getElementById("guessInput");
  input.disabled = false;
  input.value = "";

  startTimer();
}

// ⏱ Timer
function startTimer() {
  clearInterval(timerInterval);

  document.getElementById("timer").innerText = `⏱ Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `⏱ Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("message").innerText = "⏰ Time's up!";
      document.getElementById("guessInput").disabled = true;
    }
  }, 1000);
}

// 🎮 Guess Logic
function checkGuess() {
  const input = document.getElementById("guessInput");
  const message = document.getElementById("message");
  const attemptsText = document.getElementById("attempts");
  const scoreText = document.getElementById("score");

  if (input.disabled) return;

  let guess = parseInt(input.value, 10);

  if (isNaN(guess)) {
    message.innerText = "❌ Enter a valid number!";
    return;
  }

  if (guess < 1 || guess > maxRange) {
    message.innerText = `⚠️ Enter a number between 1 and ${maxRange}`;
    return;
  }

  attempts++;

  if (guess < randomNum) {
    low = guess;
    message.innerText = `📉 Too low! Try between ${low} and ${high}`;
    message.style.color = "orange";
    playSafe(wrongSound);
    shake(input);
  } else if (guess > randomNum) {
    high = guess;
    message.innerText = `📈 Too high! Try between ${low} and ${high}`;
    message.style.color = "red";
    playSafe(wrongSound);
    shake(input);
  } else {
    message.innerText = `🎉 Correct! Number was ${randomNum}`;
    message.style.color = "green";
    playSafe(correctSound);

    score = Math.max(0, 100 - attempts * 5);
    scoreText.innerText = `Score: ${score}`;

    saveBestScore(score);

    clearInterval(timerInterval);
    input.disabled = true;
    return;
  }

  // 🔥 Close hint
  if (Math.abs(guess - randomNum) <= 5) {
    message.innerText += " 🔥 Very close!";
  }

  // 🧠 Bonus hint after 8 attempts
  if (attempts === 8) {
    message.innerText += randomNum % 2 === 0 ? " 💡 Hint: Number is EVEN" : " 💡 Hint: Number is ODD";
  }

  attemptsText.innerText = `Attempts: ${attempts}`;
  input.value = "";
  input.focus();
}

// 🏆 Save Best Score
function saveBestScore(currentScore) {
  let best = Number(localStorage.getItem("bestScore")) || 0;

  if (currentScore > best) {
    localStorage.setItem("bestScore", currentScore);
    alert("🏆 New High Score!");
  }
}

// 🔄 Restart
function restartGame() {
  clearInterval(timerInterval);
  startGame();
}

// 🎨 Shake Animation
function shake(element) {
  element.style.transition = "0.1s";
  element.style.transform = "translateX(-5px)";
  setTimeout(() => { element.style.transform = "translateX(5px)"; }, 100);
  setTimeout(() => { element.style.transform = "translateX(0)"; }, 200);
}

// 🌙 Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const btn = document.querySelector(".toggle-btn");
  btn.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// 📘 Rules Modal
function openRules() {
  document.getElementById("rulesModal").style.display = "block";
}

function closeRules() {
  document.getElementById("rulesModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("rulesModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// 🎚 Difficulty preview text before starting
const difficultySelect = document.getElementById("difficulty");
const rangeTextEl = document.getElementById("rangeText");

difficultySelect.addEventListener("change", function () {
  let tempRange = this.value === "easy" ? 50 : this.value === "medium" ? 100 : 500;
  rangeTextEl.innerText = `Pick a number between 1 and ${tempRange}`;
});

// ⌨️ Enter Support
document.getElementById("guessInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});
