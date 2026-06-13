const quiz = [
  {
    question: "What is HTML?",
    answers: ["Programming Language", "Markup Language", "Database"],
    correct: 1
  },
  {
    question: "What is CSS used for?",
    answers: ["Styling", "Logic", "Database"],
    correct: 0
  },
  {
    question: "What is JavaScript?",
    answers: ["Styling", "Programming Language", "Server"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

function loadQuestion() {
  const q = quiz[currentQuestion];

  document.getElementById("question").innerText = q.question;
  document.getElementById("progress").innerText =
    `Question ${currentQuestion + 1} / ${quiz.length}`;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => selectAnswer(index, btn);
    answersDiv.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timeLeft = 10;
  updateTimerUI();

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function updateTimerUI() {
  document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

  const bar = document.getElementById("timer-bar");
  bar.style.width = `${(timeLeft / 10) * 100}%`;
}

function selectAnswer(index, btn) {
  clearInterval(timer);

  const correctIndex = quiz[currentQuestion].correct;

  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((b, i) => {
    b.disabled = true;

    if (i === correctIndex) {
      b.classList.add("correct");
    } else if (i === index) {
      b.classList.add("wrong");
    }
  });

  if (index === correctIndex) {
    score++;
  }

  setTimeout(nextQuestion, 800);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  let message = "";

  if (score === quiz.length) {
    message = "🏆 Excellent!";
  } else if (score >= quiz.length / 2) {
    message = "👍 Good job!";
  } else {
    message = "😅 Try again!";
  }

  document.querySelector(".quiz-container").innerHTML = `
    <h2>${message}</h2>
    <p>Your Score: ${score}/${quiz.length}</p>
    <button onclick="restartQuiz()">Restart Quiz</button>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

loadQuestion();