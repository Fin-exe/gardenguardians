// NAV BAR
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("nav_overlay").style.display = "block";

  }
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("nav_overlay").style.display = "none";

  }

document.getElementById("nav_overlay").addEventListener("click", closeNav);


document.addEventListener('DOMContentLoaded', function () { 
    const plantIndex = parseInt(sessionStorage.getItem("selectedPlantIndex"))
    const choosePlant = document.getElementById('quiz-choose');
    if (plantIndex) {
      startScreen()
    } else {
        choosePlant.style.display = 'block'
    }
    
    
});

async function getPlantData(options, key, id) {
    let plantsData = JSON.parse(sessionStorage.getItem("plantData"));
    
    if (!plantsData) {
        // If no data in session Storage, fetch it
        plantsData = await cardProperties(); 
    }

    // Find the plant with the matching id
    const plant = plantsData.find(plant => plant.id === id);

    // Handle different keys specifically
    let plantProperty = plant[key];

    // Special handling for species (extracting the scientific name)
    if (key === 'species') {
        const match = plant.species.match(/\(([^)]+)\)/);  
        plantProperty = match ? match[1] : plant.species;  
    }

    // Special handling for height (convert number to string with 'cm' or 'm')
    if (key === 'height') {
        // Convert the plant's height to centimeters
        const plantHeightCm = plant.height;
        const plantHeightM = plant.height; 

        const correctHeightCm = `${plantHeightCm} cm`;
        const correctHeightM = `${plantHeightM} m`;

        // Normalize the height options to handle both units
        const correctOption = options.find(option => {
            const normalizedOption = option.toLowerCase().trim();
            return (
                normalizedOption === correctHeightCm.toLowerCase() || 
                normalizedOption === correctHeightM.toLowerCase()
            );
        });
        // Return the correct option if found
        return correctOption || 'none';  
    }

    // Handle description with partial matching
    if (key === 'descript') {
        return options[2];
    }

    // If the plant has the property, compare the options array
    if (plantProperty) {
        let plantValues = [];
        
        // Handle arrays (e.g., color) and strings differently
        if (Array.isArray(plantProperty)) {
            plantValues = plantProperty.map(value => value.toLowerCase());
        } else if (typeof plantProperty === 'string') {
            plantValues = plantProperty.toLowerCase().split(', ');
        }

        // Check if any of the options match the plant values
        const correctOption = options.find(option => {
            const optionValues = option.toLowerCase().split(' and '); 
            return optionValues.every(val => plantValues.includes(val.trim()));
        });
        // Return the correct option if found or red (for one plant)
        return correctOption || 'Red';  
    }
    
    return null;
}

let currentQuestion = 0;
let score = 0;

const plantIndex = parseInt(sessionStorage.getItem("selectedPlantIndex"))
const quizData = createQuiz(`${plantIndex}`)

function startScreen() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `
      <h1 class="start-title">Press the button to start the Quiz!</h1>
      <button id="start-btn" class="start-quiz">Start!</button>
    `;
    //Accessing the start-btn and adding eventlistener
    //calling startQuiz() function
    document.getElementById("start-btn").addEventListener("click", startQuiz);
}

function startQuiz() {
    // Setting up the quiz layout
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `
        <div class="question" id="question"></div>
        <div class="options" id="options"></div>
    `;

    // Using setupQuiz to Start the quiz
      

    setupQuiz();  
}


async function setupQuiz() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    // Choose plant first message
    const choosePlant = document.getElementById('quiz-choose');
    const plantIndex = parseInt(sessionStorage.getItem("selectedPlantIndex"))

    if (plantIndex) {
        questionElement.style.display = 'block'
        optionsElement.style.display = 'flex'
        for (const question of quizData) {
            question.answer = await getPlantData(question.options, question.type, plantIndex);
            console.log(question.answer)
        }
    } else {
        choosePlant.style.display = 'block'
    }

    showQuestion(questionElement, optionsElement);
}

// Handles displaying both the question and option depending on quizData
function showQuestion(questionElement, optionsElement) {
    const quizData = createQuiz(`${plantIndex}`)

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

// Handles selecting an answer in the quiz
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
    }, 1000); 
}

function showResult() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `
      <h1 class="result-title">Quiz Completed!</h1>
      <p class="result-score">Your score: ${score}/${quizData.length}</p>
      <button id="try-again-btn" class="try-again">Try Again</button>
    `;

    //Accessing the try-again-btn and adding eventlistener
    //calling tryAgainQuiz() function
    document.getElementById("try-again-btn").addEventListener("click", tryAgainQuiz);
}

function tryAgainQuiz() {
    //Setting the variables to 0
    currentQuestion = 0;
    score = 0;

    // Setting up the quiz layout
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `
        <div class="question" id="question"></div>
        <div class="options" id="options"></div>
    `;

    // Using setupQuiz to restart the quiz
    setupQuiz();  
}


async function loadCSV() {
  await fetch('https://raw.githubusercontent.com/Fin-exe/gardenguardians/main/csv/plant_quiz_data.csv')
    .then(response => response.text())
    .then(csvText => {
        // Parse CSV with PapaParse
        let parsedData = Papa.parse(csvText, {
            header: true,    
            skipEmptyLines: true  
        }); 
        const quizData = parsedData.data 
        sessionStorage.setItem("quizData", JSON.stringify(quizData));
  })
  .catch(error => console.error('Error fetching CSV:', error));
}

function createQuiz(selectedPlant) {
    const plantsData = JSON.parse(sessionStorage.getItem("quizData"));
    //function to find a specific plant by index of plant being grown
    const findObjectByIndex = (arr, index) => {
          return arr.find(item => item.index === index);
    }
    // Retrieving quiz data of a single plant using the function
    const quizDataRaw = findObjectByIndex(plantsData, selectedPlant);
    const quizData = [
        {
            type: 'color',
            question: quizDataRaw.q_1,
            options: quizDataRaw.o_1.split(","),
            answer: 1
        },
        {
            type: 'species',
            question: quizDataRaw.q_2,
            options: quizDataRaw.o_2.split(","),
            answer: 2
        }, 
        {
            type: 'height',
            question: quizDataRaw.q_3,
            options: quizDataRaw.o_3.split(","),
            answer: 3
        }, 
        {
            type: 'descript',
            question: quizDataRaw.q_4,
            options: quizDataRaw.o_4.split(","),
            answer: 4
        }, 
        {
            type: 'attract',
            question: quizDataRaw.q_5,
            options: quizDataRaw.o_5.split(","),
            answer: 5
        },
    ];
    return quizData
}


