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
    setupQuiz();
    cardProperties();
});

async function getPlantData(options, key, id) {
    let plantsData = JSON.parse(sessionStorage.getItem("plantData"));
    
    if (!plantsData) {
        // If no data in localStorage, fetch it
        plantsData = await cardProperties(); 
    }

    // Find the plant with the matching id
    const plant = plantsData.find(plant => plant.id === id);

    // Handle different keys specifically
    let plantProperty = plant[key];

    // Special handling for species (extracting the scientific name)
    if (key === 'species') {
        const match = plant.species.match(/\(([^)]+)\)/);  // Extract text inside parentheses
        plantProperty = match ? match[1] : plant.species;  // If match, use scientific name, else full species name
    }

    // Special handling for height (convert number to string with 'cm')
    if (key === 'height') {
        plantProperty = `${plant.height} cm`;
    }

    // Handle description with partial matching
    if (key === 'descript') {
        const lowerDescript = plantProperty.toLowerCase(); // Convert plant description to lowercase
        const correctOption = options.find(option => {
            return lowerDescript.includes(option.toLowerCase());
        });
        return correctOption || null;
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
            const optionValues = option.toLowerCase().split(' and '); // Handling 'and' in options
            return optionValues.every(val => plantValues.includes(val.trim()));
        });

        return correctOption || null;  // Return the correct option if found
    }
    
    return null; // If no match is found
}


let currentQuestion = 0;
let score = 0;

const selectedPlantId = "3"
const selectPlantIdNum = parseInt(selectedPlantId)
loadCSV()
const quizData = createQuiz(selectedPlantId)

async function setupQuiz() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    // Make sure all answers are set properly
    for (const question of quizData) {
            question.answer = await getPlantData(question.options, question.type, selectPlantIdNum);
    }

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
      <button id="try-again-btn" class="try-again">Try Again</button>
    `;

    //Accessing the try-again-btn and adding eventlistener
    //calling tryAgainQuiz() function
    document.getElementById("try-again-btn").addEventListener("click", tryAgainQuiz);
}

const nativePlantsURL = 'https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/free-native-plants-species/records?limit=40';

async function fetchData(URL) {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Couldn\'t fetch the data :(', error);
    }
}

function extractDetails(descriptions, i) {
    const description = descriptions[i] 

    // Regular expressions to find colors and heights
    const colorRegex = /\b(?:red|blue|green|yellow|purple|white|pink|mauve|golden|cream|orange|violet)\b/gi;
    const heightRegex = /(\d+\.?\d*)\s*(m²|metre|metres|centimetre|centimetres)|\b(one|two|three|four|five|six|seven|eight|nine|ten)\s*(m²|metre|metres|centimetre|centimetres)\b/gi;
    // Create a dictionary to convert word numbers to digits
    const wordToNumber = {
        one: 1, two: 2, three: 3, four: 4, five: 5,
        six: 6, seven: 7, eight: 8, nine: 9, ten: 10
    };
    
    // Extract colors
    const colors = description.match(colorRegex) || [];
    
    // Extract heights
    let heightMatch = description.match(heightRegex);
    let height = null;
    
    if (heightMatch) {
        heightMatch = heightMatch[0]; // Get the first match
        const wordHeightMatch = heightMatch.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    
        if (wordHeightMatch) {
        height = wordToNumber[wordHeightMatch[0].toLowerCase()];
        } else {
        const numHeightMatch = heightMatch.match(/(\d+\.?\d*)/);
        height = numHeightMatch ? parseFloat(numHeightMatch[0]) : null;
        }
    }
    
    const heightColor = {
        colors: colors.map(color => color.toLowerCase()), // Return array of colors in lowercase
        height: height // Return height as a number
    };
    return heightColor
    }

async function sortPlants() {
    const data = await fetchData(nativePlantsURL);
    if (data) {
        const plants = data.results
        const sortedData = plants.sort((a, b) => a.index - b.index)
        return sortedData
    }
}


async function cardProperties() {
    const data = await sortPlants();
    if (data) {
        const descriptions = data.map(plant => plant.description_and_growing_requirements);
        const indexAndSpecies = data.map(plant=> ({
            id: plant.index,
            species: plant.species,
            type: plant.type,
            descript: plant.description_and_growing_requirements,
            attract: plant.attracts,
            color: extractDetails(descriptions, plant.index - 1).colors,
            height: extractDetails(descriptions, plant.index - 1).height
        }));
        sessionStorage.setItem("plantData", JSON.stringify(indexAndSpecies));
    }
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
            header: true,    // Use the first row as headers
            skipEmptyLines: true  // Skip empty lines in the CSV
        }); 

    // The data is now correctly parsed into rows with quoted fields handled
        const quizData = parsedData.data  // Parsed quiz data in array format
        sessionStorage.setItem("quizData", JSON.stringify(quizData));
  })
  .catch(error => console.error('Error fetching CSV:', error));
}

function createQuiz(selectedPlant) {
    const plantsData = JSON.parse(sessionStorage.getItem("quizData"));
    
    //function to find a specific plant by index of plant being grown
    const findObjectByIndex = (arr, index) => {
            return arr.find(item => item.index === index);
        };
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
    console.log(quizData)
    return quizData
       
}


