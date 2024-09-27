// script.js

// script.js (main page)
document.addEventListener('DOMContentLoaded', function () {
    // Initialize elements
    const plantImage = document.getElementById('plant-image');
    const selectedPlant = localStorage.getItem('selectedPlant');

    // Set the plant image based on the selected plant
    if (selectedPlant) {
        plantImage.src = `img/${selectedPlant}_s1.png`;
    } else {
        plantImage.src = 'img/placeholder.png';
    }

    // Initialize functionalities
    handlePlantGrowth();
    openNav();
    closeNav();
    handleCardFlip();
    setupDragDrop();
    setupQuiz();
    initializeDataFetch();
});

 
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

// STAGE CHANGE
function handlePlantGrowth() {
    const plantImage = document.getElementById('plant-image');
    const selectedPlant = localStorage.getItem('selectedPlant');

    if (!plantImage || !selectedPlant) {
        console.error("Plant image element or selected plant not found.");
        return;
    }

    const stages = [
        `img/${selectedPlant}_s1.png`,
        `img/${selectedPlant}_s2.png`,
        `img/${selectedPlant}_s3.png`
    ];
    let currentStage = 0;

    // Optional: Set the current stage based on the current image
    const currentSrc = plantImage.src;
    if (currentSrc.includes('_s2.png')) {
        currentStage = 1;
    } else if (currentSrc.includes('_s3.png')) {
        currentStage = 2;
    }

    plantImage.addEventListener('click', function () { 
        currentStage = (currentStage + 1) % stages.length;
        plantImage.src = stages[currentStage];
    });
}



// FLIP CARD 
const card = document.querySelector(".card__inner");

card.addEventListener("click", function (e) {
  card.classList.toggle('is-flipped');
});

document.addEventListener('DOMContentLoaded', function() {
     const plantOne = document.getElementById('plant1');
     const infoCard = document.getElementById('info_card');
     const closeBtnFront = document.querySelector('.close_btn');
     const closeBtnBack = document.querySelector('.close_btn_back');

     // Function to hide the info card
     function hideInfoCard() {
         infoCard.style.display = 'none';
     }

     // Clicking on the plant image
     plantOne.addEventListener('click', hideInfoCard);

     // Clicking on the close buttons
     closeBtnFront.addEventListener('click', hideInfoCard);
     closeBtnBack.addEventListener('click', hideInfoCard);

     function showInfoCard() {
         infoCard.style.display = 'flex'; 
     }

     hideInfoCard();

     // Toggle the card visibility on plant click
     plantOne.addEventListener('click', function() {
         if (infoCard.style.display === 'none') {
             showInfoCard();
         } else {
             hideInfoCard();
         }
    });
});

//PLANT SELECT 

function selectPlant(plantId) {
    localStorage.setItem('selectedPlant', plantId);
}

function clearSelectedPlant() {
    localStorage.removeItem('selectedPlant');
}

document.addEventListener('DOMContentLoaded', function() {
    const plantImage = document.getElementById('plant-image');
    const selectedPlant = localStorage.getItem('selectedPlant');

    if (selectedPlant) {
        plantImage.src = `img/${selectedPlant}_s1.png`;
    } else {
        plantImage.src = 'img/placeholder.png';
    }

    handlePlantGrowth();
});

document.addEventListener('DOMContentLoaded', function() {
    const plantElements = document.querySelectorAll('.namestyle');
    let currentPlantId = null;

    plantElements.forEach(function(plantElement) {
        plantElement.addEventListener('click', function() {
            currentPlantId = plantElement.getAttribute('data-plant-id');
            showInfoCard();
            // Update card content if necessary
        });
    });

    const letsPlantButton = document.querySelector('.quiz-link');

    letsPlantButton.addEventListener('click', function(event) {
        if (currentPlantId) {
            selectPlant(currentPlantId);
        }
    });

    // Existing functions
    function selectPlant(plantId) {
        localStorage.setItem('selectedPlant', plantId);
    }

    function showInfoCard() {
        const infoCard = document.getElementById('info_card');
        infoCard.style.display = 'flex'; 
    }

    // Additional code for hiding the info card, etc.
});


//DRAG AND DROP
//PLEASE INVESTIGATE WHY CODE IS SO DEPENDENT ON THIS WHEN IT IS FOR FLIP CARD
function handleCardFlip() {

    const plantOne = document.getElementById('plantOne');
    const infoCard = document.getElementById('info_card');
    const closeBtnFront = document.querySelector('.close_btn');
    const closeBtnBack = document.querySelector('.close_btn_back');

    if (!plantOne || !infoCard) return;
}

function setupDragDrop() {
    const icons = document.querySelectorAll('.top_right_icons img'); 
    const plantImage = document.getElementById('plant-image'); // Access the plant image

    if (!icons || !plantImage) return;

    
    const iconOverPlantImages = {
        'watercan': {
            default: 'img/watercan1.png',
            overPlant: 'img/watercan2.png'
        },
        'umbrella': {
            default: 'img/umbrella.png',
            overPlant: 'img/umbrella1.png'
        },
        'sun': {
            default: 'img/sun.png',
            overPlant: 'img/sun.png'
        }
        // add whatever icons you wan6
    };

    icons.forEach((icon) => {
        const iconType = icon.getAttribute('data-icon-type');
        if (!iconType || !iconOverPlantImages[iconType]) {
            return; 
        }

        let startX, startY; 
        let currentX = 0, currentY = 0; 
        let isOverPlant = false; 

        icon.addEventListener('mousedown', (e) => {
            e.preventDefault();

            startX = e.clientX;
            startY = e.clientY;

            icon.style.transition = 'none';
            icon.style.zIndex = 1000; 

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            currentX = deltaX;
            currentY = deltaY;

            icon.style.transform = `translate(${currentX}px, ${currentY}px)`;

            
            const iconRect = icon.getBoundingClientRect();
            const plantRect = plantImage.getBoundingClientRect();

            // Check for overlap
            const isOverlapping = !(
                iconRect.right < plantRect.left ||
                iconRect.left > plantRect.right ||
                iconRect.bottom < plantRect.top ||
                iconRect.top > plantRect.bottom
            );

            if (isOverlapping && !isOverPlant) {
                
                icon.src = iconOverPlantImages[iconType].overPlant;
                isOverPlant = true;
            } else if (!isOverlapping && isOverPlant) {
                
                icon.src = iconOverPlantImages[iconType].default;
                isOverPlant = false;
            }
        }

        function onMouseUp(e) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            icon.style.transition = ''; 
            icon.style.zIndex = ''; 
            icon.style.transform = '';

            
            icon.src = iconOverPlantImages[iconType].default;
        }
    });
}


window.onload = function() {
    setupDragDrop();
};

//QUIZ
function setupQuiz() {
    
    const feedback = document.getElementById('feedback');
    const options = document.querySelectorAll('.option'); 
    const tryAgainButton = document.getElementById('try-again'); 

    
    if (!feedback) {
        console.error("Feedback element not found.");
        return;
    }

   
    options.forEach(button => {
        button.addEventListener('click', function () {
            
            const isCorrect = button.getAttribute('data-correct') === 'true';  
            checkAnswer(button, isCorrect);
        });
    });

   
    function checkAnswer(button, isCorrect) {
        if (isCorrect) {
            button.style.backgroundColor = '#a3e3a1'; //green
            feedback.style.display = 'none'; 
        } else {
            button.style.backgroundColor = '#f4a19e'; 
            feedback.style.display = 'flex'; // Show try again if the answer is wrong
        }
            
        options.forEach(opt => {
            opt.disabled = true;
        });
    }
  
    function resetQuiz() {
        
        feedback.style.display = 'none'; 
          
        options.forEach(button => {
            button.style.backgroundColor = '#f7d8a8'; 
            button.disabled = false; 
        });
    }
    
    if (tryAgainButton) {
        tryAgainButton.addEventListener('click', resetQuiz);
    }
}

function initializeDataFetch() {
    const nativePlantsURL = 'https://data.brisbane.qqld.gov.au/api/explore/v2.1/catalog/datasets/free-native-plants-species/records?limit=40';
    const weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=-27.4679&longitude=153.0281&current=temperature_2m,rain,cloud_cover,wind_speed_10m&timezone=Australia%2FSydney&forecast_days=1'
    
    async function fetchData(URL) {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Couldn\'t fetch the data :(', error);
        }
    }

    /*async function cardProperties() {
        const data = await fetchData(nativePlantsURL);
        if (data) {
            const plantData = data.results;
            const descriptions = plantData.map(plant => plant.description_and_growing_requirements);
            const indexAndSpecies = plantData.map(plant => ({
                species: plant.species,
                descript: plant.description_and_growing_requirements,
                attract: plant.attracts
            }));
            return indexAndSpecies;
        }
    }*/

    async function weatherProperties() {
        const data = await fetchData(weatherURL);
        if (data) {
            const currentWeather = data.current;
            localStorage.setItem("weatherData", JSON.stringify(currentWeather));
            return currentWeather;
        }
    }


    async function evaluateWeather() {
        const weatherData = JSON.parse(localStorage.getItem("weatherData"));
    
        if (!weatherData) {
            // If no data in localStorage, fetch it
            weatherData = await weatherProperties(); 
        }

        // Updates temperature on mainpage dynamically
        const temperatureElement = document.getElementById("temperature");
        const temperature = weatherData.temperature_2m; 
        temperatureElement.textContent = `${temperature}°C`; 

        const windSpeed = weatherData.wind_speed_10m;
        const rain = weatherData.rain;
        const cloudCover = weatherData.cloud_cover;
      
        // Determine wind level
        let windLevel;
        if (windSpeed >= 39) {
          windLevel = 'High';
        } else if (windSpeed >= 11) {
          windLevel = 'Medium';
        } else {
          windLevel = 'Low';
        }
      
        let rain_level = 0
        // Determine rain level
        let rainLevel;
        if (rain > 7.6) {
          rainLevel = 'High';
          let rain_level = 75
        } else if (rain > 2.5) {
          rainLevel = 'Medium';
          let rain_level = 50
        } else if (rain > 0) {
          rainLevel = 'Low';
          let rain_level = 25
        } else {
          rainLevel = 'No Rain';
          let rain_level = 0
        }
        
        // Updates rain% dynamically on mainpage based on rain level
        const rainElement = document.getElementById("rain_level");
        rainElement.textContent = `${rain_level}%`
        
        // Updates sun% dynamically on mainpage based on cloudcover
        let sun_level = 100 - cloudCover
        const sunElement = document.getElementById("sun_level");
        sunElement.textContent = `${sun_level}%`

        // Determine cloud cover level
        let cloudLevel;
        if (cloudCover > 75) {
          cloudLevel = 'High';
        } else if (cloudCover > 25) {
          cloudLevel = 'Medium';
        } else {
          cloudLevel = 'Low';
        }
      
        // Return appropriate string based on the highest condition
        if (windLevel === 'High' || rainLevel === 'High' || cloudLevel === 'High') {
          if (windLevel === 'High') return 'Windy';
          if (rainLevel === 'High') return 'Rainy';
          return 'Cloudy';
        }
      
        if (windLevel === 'Medium' || rainLevel === 'Medium' || cloudLevel === 'Medium') {
          if (windLevel === 'Medium') return 'Windy';
          if (rainLevel === 'Medium') return 'Rainy';
          return 'Cloudy';
        }
      
        return 'Sunny';
      }

    weatherProperties()
    evaluateWeather()

}

initializeDataFetch()

