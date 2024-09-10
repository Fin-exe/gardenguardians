// Card Flip Animation
const card = document.querySelector(".card__inner");

card.addEventListener("click", function (e) {
  card.classList.toggle('is-flipped');
});

 document.addEventListener('DOMContentLoaded', function() {
     const plantOne = document.getElementById('plantOne');
     const infoCard = document.getElementById('info_card');
     const closeBtnFront = document.querySelector('.close_btn');
     const closeBtnBack = document.querySelector('.close_btn_back');

     // Function to hide the info card
     function hideInfoCard() {
         infoCard.style.display = 'none';
     }

     // Clicking on the plant image
     plantOne.addEventListener('dblclick', hideInfoCard);

     // Clicking on the close buttons
     closeBtnFront.addEventListener('click', hideInfoCard);
     closeBtnBack.addEventListener('click', hideInfoCard);

     function showInfoCard() {
         infoCard.style.display = 'flex';  // Maintain the centering
     }

     hideInfoCard();

     // Toggle the card visibility on plant click
     plantOne.addEventListener('dblclick', function() {
         if (infoCard.style.display === 'none') {
             showInfoCard();
         } else {
             hideInfoCard();
         }
    });
});

// DRAG DROP FUNCTION

const icon = document.getElementsByClassName('top_right_icons')[0]; // Access the first element
const target = document.getElementsByClassName('center_content')[0]; // Access the first element
let initialX, initialY;

icon.addEventListener('mousedown', (e) => {
    initialX = e.clientX - icon.offsetLeft;
    initialY = e.clientY - icon.offsetTop;

    icon.src = 'img/watercan1.png'; // Change image to pouring can

    document.addEventListener('mousemove', moveIcon);
    document.addEventListener('mouseup', dropIcon);
});

function moveIcon(e) {
    icon.style.left = `${e.clientX - initialX}px`;
    icon.style.top = `${e.clientY - initialY}px`;
}

function dropIcon(e) {
    document.removeEventListener('mousemove', moveIcon);
    document.removeEventListener('mouseup', dropIcon);

    const canRect = icon.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    if (
        canRect.right > targetRect.left &&
        canRect.left < targetRect.right &&
        canRect.bottom > targetRect.top &&
        canRect.top < targetRect.bottom
    ) {
        // Center the watering can over the target
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        const canHalfWidth = canRect.width / 2;
        const canHalfHeight = canRect.height / 2;

        icon.style.left = `${targetCenterX - canHalfWidth}px`;
        icon.style.top = `${targetCenterY - canHalfHeight}px`;
    }

    /* Reset image and position
    setTimeout(() => {
        icon.src = 'img/watercan1.png'; // Change back to original image
        icon.style.left = '0px';
        icon.style.top = '0px';
    }, 200); // Delay before resetting, allowing the watering action to be visible*/
}

function checkAnswer(button, isCorrect) {
    const feedback = document.getElementById('feedback');
    const tryAgainMessage = document.getElementById('try-again');

    // If the answer is correct
    if (isCorrect) {
        button.style.backgroundColor = '#a3e3a1'; // Change button to green
        feedback.style.display = 'none'; // hide feedback
    } else {
        button.style.backgroundColor = '#f4a19e'; // Change button to red for wrong
        feedback.style.display = 'flex'; // show feedback
    }
}

function resetQuiz() {
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'none'; 
    // Reset all option buttons
    const options = document.querySelectorAll('.option');
    options.forEach(button => {
        button.style.backgroundColor = '#f7d8a8'; 
        button.disabled = false; 
    });
}

const nativePlantsURL = 'https://data.brisbane.qqld.gov.au/api/explore/v2.1/catalog/datasets/free-native-plants-species/records?limit=40' 
const weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=-27.4679&longitude=153.0281&hourly=temperature_2m,apparent_temperature,rain,showers,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high&daily=temperature_2m_max&timezone=auto&models=bom_access_global'

async function fetchData(URL) {
        try {
            const firstResponse = await fetch(URL);
            const firstJSON = await firstResponse.json();
            //Return the second key of the JSON containing the array needed
            const Result = firstJSON
            console.log(Result)
        } catch (error) {
            console.error('Couldnt fetch the data :(');
        }

    }
function filterDay() {
    const today = new Date();
    const year = today.getFullYear();  
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(today.getDate()).padStart(2, '0'); // Pad single-digit day with a leading zero

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
}

async function cardProperties() {
    const data = await fetchData(nativePlantsURL)
    const plantData = data.results
    
    const descriptions = plantData.map(plant => plant.description_and_growing_requirements)
    
    const indexAndSpecies = plantData.map(plant => ({
        species: plant.species,
        descript: plant.description_and_growing_requirements,
        attract: plant.attracts
    }));
    console.log(indexAndSpecies)
}

async function weatherProperties() {
    const data = await fetchData(weatherURL)
    const weatherData = data.hourly

    weatherData
}

async function saveCache(filename, data) {
    try {
        // Ensure filename includes file extension if needed
        const filePath = `${filename}`;
        
        // Write data to the file, pretty-print JSON
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        
    } catch (error) {
        console.error("Error saving cache:", error);
    }
}

async function readCache(filename) {
    if (enableReadCache) {
        try {
            const data = await fs.readFile(filename, 'utf-8'); // Read file content as a string
            
            return JSON.parse(data); // Parse the JSON string back into an object
            
        } catch (error) {
            console.error("Error reading cache:", error);
            return null;
        }
    }
    return null;
}

