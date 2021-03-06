const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const doneButton = document.getElementById("done-btn");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const pEl = document.getElementById("p");
const titleEl = document.getElementById("title");

var seconds = document.getElementById("timer").textContent;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});
doneButton.addEventListener("click", done);

function startGame() {

    var countdown = setInterval(function() {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
    }, 1000);
    titleEl.classList.add("hide")
    pEl.classList.add("hide")
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")
    setNextQuestion()
    
};

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
};

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }
};

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide")
    } else {
        doneButton.classList.remove("hide")
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
};

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
};

function done() {
    
}

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "High Text Maker Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Hopping Talking Music Language", correct: false},
            { text: "Hyper Text Message Language", correct: false}
        ]
    },
    {
        question: "How do you make a comment in HTML?",
        answers: [
            { text: "<!-->", correct: true},
            { text: "/**/", correct: false},
            { text: "//", correct: false},
            { text: "(#)", correct: false}
        ]
    },
    {
        question: "How do you make a comment in CSS?",
        answers: [
            { text: "//", correct: false},
            { text: "<!-->", correct: false},
            { text: "/**/", correct: true},
            { text: "(#)", correct: false}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheet", correct: true},
            { text: "Crazy Silly Sheet", correct: false},
            { text: "Computer Styling Sheet", correct: false},
            { text: "Cool Style Sheet", correct: false}
        ]
    },
    {
        question: "True or False: Bootstrap is a JavaScript framework.",
        answers: [
            { text: "True, it is a JavaScript framework", correct: false},
            { text: "False, it is a CSS framework", correct: true}
        ]
    }
];

//SOURCES
//https://youtu.be/riDzcEQbX6k
//https://tonnygaric.com/blog/create-a-seconds-countdown-in-6-lines-of-javascript