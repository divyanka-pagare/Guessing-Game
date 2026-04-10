let randomNum;
let attempts;
let maxRange;
let timeLeft;
let timerInterval;
let score = 0;

// 🔊 Sound Effects
const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

// 🎯 Start Game
function startGame() {

    const difficulty = document.getElementById("difficulty").value; // ✅ FIX
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

    // 🔥 Update UI dynamically
    rangeText.innerText = `Pick a number between 1 and ${maxRange}`;

    randomNum = Math.floor(Math.random() * maxRange) + 1;
    attempts = 0;
    score = 0;

    document.getElementById("message").innerText = "";
    document.getElementById("attempts").innerText = "";
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("guessInput").disabled = false;

    startTimer();
}

// ⏱ Timer
function startTimer() {
    clearInterval(timerInterval);

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

    let guess = parseInt(input.value);

    if (!guess) {
        message.innerText = "❌ Enter a valid number!";
        return;
    }

    attempts++;

    if (guess < randomNum) {
        message.innerText = "📉 Too low!";
        message.style.color = "orange";
        wrongSound.play();
        shake(input);
    } 
    else if (guess > randomNum) {
        message.innerText = "📈 Too high!";
        message.style.color = "red";
        wrongSound.play();
        shake(input);
    } 
    else {
        message.innerText = `🎉 Correct! Number was ${randomNum}`;
        message.style.color = "green";
        correctSound.play();

        score = Math.max(0, 100 - attempts * 5);
        scoreText.innerText = `Score: ${score}`;

        saveBestScore(score);

        clearInterval(timerInterval);
        input.disabled = true;
    }

    attemptsText.innerText = `Attempts: ${attempts}`;
    input.value = "";
}

// 🏆 Save Best Score
function saveBestScore(currentScore) {
    let best = localStorage.getItem("bestScore") || 0;

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
    setTimeout(() => {
        element.style.transform = "translateX(5px)";
    }, 100);
    setTimeout(() => {
        element.style.transform = "translateX(0)";
    }, 200);
}

// 🌙 Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const btn = document.querySelector(".toggle-btn");
    if (document.body.classList.contains("dark")) {
        btn.innerText = "☀️";
    } else {
        btn.innerText = "🌙";
    }
}


const difficultySelect = document.getElementById("difficulty");
const rangeText = document.getElementById("rangeText");

difficultySelect.addEventListener("change", function () {
    let selected = this.value;
    let tempRange;

    if (selected === "easy") {
        tempRange = 50;
    } else if (selected === "medium") {
        tempRange = 100;
    } else {
        tempRange = 500;
    }

    // 🔥 Instant UI update
    rangeText.innerText = `Pick a number between 1 and ${tempRange}`;
});

function openRules() {
    document.getElementById("rulesModal").style.display = "block";
}

function closeRules() {
    document.getElementById("rulesModal").style.display = "none";
}

// Close when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("rulesModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


// ⌨️ Enter Support
document.getElementById("guessInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        checkGuess();
    }
});