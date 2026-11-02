
// Preguntas del Quiz Cósmico
const questions = [
    {
        question: "¿Cuántos planetas tiene nuestro Sistema Solar?",
        answers: ["7 planetas", "8 planetas", "9 planetas", "10 planetas"],
        correct: 1,
        explanation: "El Sistema Solar tiene 8 planetas."
    },
    {
        question: "¿Cuál es la estrella más cercana a la Tierra?",
        answers: ["Sirio", "Próxima Centauri", "El Sol", "Betelgeuse"],
        correct: 2,
        explanation: "El Sol es la estrella más cercana a la Tierra."
    },
    {
        question: "¿Cuál es la galaxia donde se encuentra nuestro Sistema Solar?",
        answers: ["Andrómeda", "Vía Láctea", "Galaxia del Sombrero", "Triángulo"],
        correct: 1,
        explanation: "Nuestro Sistema Solar se encuentra en la Vía Láctea."
    },
    {
        question: "¿Qué teoría explica la evolución temprana del universo?",
        answers: ["Teoría de la gravedad", "Teoría del Big Bang", "Teoría solar", "Teoría lunar"],
        correct: 1,
        explanation: "La teoría del Big Bang describe la expansión del universo desde un estado muy caliente y denso."
    },
    {
        question: "¿Qué planeta es conocido como el planeta rojo?",
        answers: ["Venus", "Júpiter", "Marte", "Mercurio"],
        correct: 2,
        explanation: "Marte tiene una apariencia rojiza debido a los minerales de hierro de su superficie."
    },
    {
        question: "¿Qué es un agujero negro?",
        answers: [
            "Un planeta sin luz",
            "Una región donde la gravedad es tan intensa que ni la luz puede escapar",
            "Una estrella pequeña",
            "Un espacio vacío"
        ],
        correct: 1,
        explanation: "Un agujero negro es una región del espacio con una gravedad extremadamente intensa."
    },
    {
        question: "¿Qué son los exoplanetas?",
        answers: [
            "Planetas fuera del Sistema Solar",
            "Lunas de Júpiter",
            "Estrellas lejanas",
            "Asteroides gigantes"
        ],
        correct: 0,
        explanation: "Los exoplanetas orbitan estrellas distintas al Sol."
    },
    {
        question: "¿Qué es la materia oscura?",
        answers: [
            "Polvo negro",
            "Una nube de humo espacial",
            "Materia detectada principalmente por sus efectos gravitatorios",
            "Una estrella apagada"
        ],
        correct: 2,
        explanation: "La materia oscura se estudia por sus efectos gravitatorios, aunque su naturaleza sigue siendo desconocida."
    },
    {
        question: "¿Cuál es el planeta más grande del Sistema Solar?",
        answers: ["Saturno", "Júpiter", "Neptuno", "Tierra"],
        correct: 1,
        explanation: "Júpiter es el planeta más grande del Sistema Solar."
    },
    {
        question: "¿Se ha confirmado científicamente la existencia de vida extraterrestre?",
        answers: ["Sí, en Marte", "Sí, en una galaxia", "No, todavía no", "Sí, en Júpiter"],
        correct: 2,
        explanation: "Hasta ahora no existe evidencia científica confirmada de vida fuera de la Tierra."
    }
];

// Variables del quiz
let currentQuestion = 0;
let score = 0;
let answered = false;

// Elementos HTML
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const counterElement = document.getElementById("question-counter");
const scoreElement = document.getElementById("quiz-score");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const resultElement = document.getElementById("quiz-result");
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// Mostrar pregunta
function showQuestion() {
    answered = false;

    const questionData = questions[currentQuestion];

    questionElement.textContent = questionData.question;
    counterElement.textContent =
        `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    scoreElement.textContent = `Puntos: ${score}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultado →"
            : "Siguiente pregunta →";

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "quiz-answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

// Revisar respuesta
function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const questionData = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll(".quiz-answer");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === questionData.correct) {
        score++;

        selectedButton.classList.add("correct");

        feedbackElement.textContent =
            "¡Correcto! " + questionData.explanation;

        feedbackElement.className = "quiz-feedback correct-feedback";
    } else {
        selectedButton.classList.add("incorrect");

        buttons[questionData.correct].classList.add("correct");

        feedbackElement.textContent =
            "Respuesta incorrecta. " + questionData.explanation;

        feedbackElement.className = "quiz-feedback incorrect-feedback";
    }

    scoreElement.textContent = `Puntos: ${score}`;
    nextButton.disabled = false;
}

// Siguiente pregunta
function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Mostrar resultado final
function showResult() {
    questionElement.classList.add("hidden");
    answersElement.classList.add("hidden");
    counterElement.classList.add("hidden");
    scoreElement.classList.add("hidden");
    feedbackElement.classList.add("hidden");
    nextButton.classList.add("hidden");
    progressBar.style.width = "100%";

    resultElement.classList.remove("hidden");

    finalScore.textContent =
        `Obtuviste ${score} de ${questions.length} puntos.`;

    if (score === questions.length) {
        resultMessage.textContent =
            "¡Excelente! Eres un verdadero explorador del cosmos. 🌌";
    } else if (score >= 7) {
        resultMessage.textContent =
            "¡Muy bien! Tienes grandes conocimientos del universo. 🚀";
    } else if (score >= 4) {
        resultMessage.textContent =
            "¡Buen intento! Sigue explorando los secretos del universo. ✨";
    } else {
        resultMessage.textContent =
            "¡No te rindas! Explora las páginas y vuelve a intentarlo. 🌠";
    }
}

// Reiniciar quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    questionElement.classList.remove("hidden");
    answersElement.classList.remove("hidden");
    counterElement.classList.remove("hidden");
    scoreElement.classList.remove("hidden");
    feedbackElement.classList.remove("hidden");
    nextButton.classList.remove("hidden");

    resultElement.classList.add("hidden");

    showQuestion();
}

// Eventos de botones
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Iniciar quiz
showQuestion();