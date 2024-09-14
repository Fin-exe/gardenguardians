document.addEventListener('DOMContentLoaded', function () {
    
    setupQuiz();
});

const quizData = [
    {
        question: "What color are the flowers of the Cut Leaf Daisy?",
        options: ["Yellow", "Purple", "Red"],
        answer: "Purple"
    },
    {
        question: "What is the scientific name for the Cut Leaf Daisy?",
        options: ["Brachyscome multifida", "Daisyus cutleafus", "Purpleus daisyus"],
        answer: "Brachyscome multifida"
    }, 
    {
        question: "How tall does the Cut leaf Daisy Grow?",
        options: ["15cm", "60cm", "1m"],
        answer: "60cm"
    }, 
    {
        question: "Where is the best place to grow a Cut Leaf Daisy?",
        options: ["Shady Spots", "Well-drained soil in full sun", "Wet areas"],
        answer: "Well-drained soil in full sun"
    }, 
    {
        question: "Which animals are attracted to the Cut Leaf Daisy?",
        options: ["Birds and frogs", "Bees and Lizards", "Butterflies and insects"],
        answer: "Bees and Lizards"
    },
];

let currentQuestion = 0;
let score = 0;

function setupQuiz() {
    
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    
    showQuestion(questionElement, optionsElement);
}

function showQuestion(questionElement, optionsElement) {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add('option'); 
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;

    if (selectedButton.innerText === answer) {
        selectedButton.classList.add('correct');  
        score++;
    } else {
        selectedButton.classList.add('incorrect');  
    }

 
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => button.disabled = true);

  
    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            const questionElement = document.getElementById("question");
            const optionsElement = document.getElementById("options");
            showQuestion(questionElement, optionsElement);
        } else {
            showResult();
        }
    }, 2000); 
}

function showResult() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `
      <h1 class="result-title">Quiz Completed!</h1>
      <p class="result-score">Your score: ${score}/${quizData.length}</p>
    `;
}
