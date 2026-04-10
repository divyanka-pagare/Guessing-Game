let randomNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const input = document.getElementById("guessInput");
    const message = document.getElementById("message");
    const attemptsText = document.getElementById("attempts");

    let guess = parseInt(input.value);

    if (!guess) {
        message.innerText = "❌ Please enter a valid number!";
        message.style.color = "black";
        return;
    }

    attempts++;

    if (guess < randomNum) {
        message.innerText = "📉 Too low!";
        message.style.color = "orange";
    } else if (guess > randomNum) {
        message.innerText = "📈 Too high!";
        message.style.color = "red";
    } else {
        message.innerText = `🎉 Correct! The number was ${randomNum}`;
        message.style.color = "green";
        input.disabled = true;
    }

    attemptsText.innerText = `Attempts: ${attempts}`;
    input.value = "";
}

function restartGame() {
    randomNum = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("message").innerText = "";
    document.getElementById("attempts").innerText = "";
}

// Press Enter to submit
document.getElementById("guessInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        checkGuess();
    }
});
