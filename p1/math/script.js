const startBtn = document.getElementById("startBtn");
const scoreText = document.getElementById("score");
const activeBlock = document.getElementById("activeBlock");
const answerDisplay = document.getElementById("answerDisplay");

let currentAnswer = "";
let correctAnswer = 0;

let score = 0;
let totalQuestions = 20;
let currentQuestion = 0;
let gameRunning = false;

function randomQuestion() {

    const type = Math.random() < 0.5 ? "add" : "subtract";

    let question = "";

    if (type === "add") {

        let a = Math.floor(Math.random() * 10);
        let b = Math.floor(Math.random() * 10);

        correctAnswer = a + b;
        question = `${a} + ${b} = ?`;

    } else {

        let a = Math.floor(Math.random() * 21);
        let b = Math.floor(Math.random() * (a + 1));

        correctAnswer = a - b;
        question = `${a} - ${b} = ?`;
    }

    return question;
}

function createQuestion() {

    answerDisplay.textContent = "?";
    currentAnswer = "";

    const q = randomQuestion();

    activeBlock.className = "block";
    activeBlock.textContent = q;

    void activeBlock.offsetWidth;

    activeBlock.classList.add("falling");
}

function startGame() {

    score = 0;
    currentQuestion = 0;

    gameRunning = true;

    updateScore();

    activeBlock.classList.remove("hidden");

    createQuestion();
}

function updateScore() {
    scoreText.textContent =
        `⭐ Score: ${score} / ${totalQuestions}`;
}

function nextQuestion() {

    score++;
    currentQuestion++;

    updateScore();

    if (currentQuestion >= totalQuestions) {

        setTimeout(() => {

            activeBlock.textContent = "🏆 YOU WIN!";
            activeBlock.className = "block correct";

        }, 500);

        gameRunning = false;
        return;
    }

    setTimeout(() => {
        createQuestion();
    }, 800);
}

function checkAnswer() {

    if (!gameRunning) return;

    if (Number(currentAnswer) === correctAnswer) {

        const original =
            activeBlock.textContent.replace("?", correctAnswer);

        activeBlock.textContent = original;
        activeBlock.classList.add("correct");

        nextQuestion();

    } else {

        answerDisplay.textContent = "❌";

        setTimeout(() => {

            answerDisplay.textContent = "?";
            currentAnswer = "";

        }, 700);
    }
}

startBtn.addEventListener("click", startGame);

document.querySelectorAll(".num").forEach(btn => {

    btn.addEventListener("click", () => {

        if (!gameRunning) return;

        if (currentAnswer.length >= 2) return;

        currentAnswer += btn.textContent;
        answerDisplay.textContent = currentAnswer;
    });
});

document.getElementById("clearBtn")
.addEventListener("click", () => {

    currentAnswer = "";
    answerDisplay.textContent = "?";
});

document.getElementById("enterBtn")
.addEventListener("click", checkAnswer);
