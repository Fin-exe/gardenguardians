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

const currentWeatherIcons = JSON.parse(localStorage.getItem("startingCond"))
console.log(currentWeatherIcons)

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
        // add whatever icons you want
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

async function initializeDataFetch() {
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
      
        const rain_level = rainPercent(rain)
        // Determine rain level
        let rainLevel;
        if (rain > 10) {
          rainLevel = 'High';
        } else if (rain > 2.6) {
          rainLevel = 'Medium';
        } else if (rain > 0) {
          rainLevel = 'Low';
        } else {
          rainLevel = 'No Rain';
        }
        const sun_level = 100 - cloudCover
        const rainSunCond = weatherCond(rain_level, sun_level)
        // Updates rain% dynamically on mainpage based on rain level
        const rainElement = document.getElementById("rain_level");
        rainElement.textContent = `${rainSunCond[0]}`
        
        // Updates sun% dynamically on mainpage based on cloudcover 
        const sunElement = document.getElementById("sun_level");
        sunElement.textContent = `${rainSunCond[1]}`

        weatherMeter(rain_level, sun_level)
        getStartingCond(rain_level, sun_level)

        // Determine cloud cover level
        let cloudLevel;
        if (cloudCover > 75) {
          cloudLevel = 'High';
        } else if (cloudCover > 50) {
          cloudLevel = 'Medium';
        } else {
          cloudLevel = 'Low';
        }
      
        // Return appropriate string based on the highest condition
        if (windLevel === 'High' || rainLevel === 'High' || cloudLevel === 'High') {
          if (windLevel === 'High') return 'windy';
          if (rainLevel === 'High') return 'rain';
          return 'overcast';
        }
      
        if (windLevel === 'Medium' || rainLevel === 'Medium' || cloudLevel === 'Medium') {
          if (windLevel === 'Medium') return 'windy';
          if (rainLevel === 'Medium') return 'rain';
          return 'overcast';
        }
      
        return 'sunny';
      }
    
    function rainPercent (rain) {
        let rainIntense = 0

        if (rain > 20) {
          rainIntense = 100;
        } else if (rain > 10) {
          rainIntense = 80;
        } else if (rain > 5) {
          rainIntense = 60;
        } else if (rain > 2.5) {
          rainIntense = 40
        } else if (rain > 0) {
          rainIntense = 20
        } else {
          rainIntense = 0
        }
        
        return rainIntense
    }

    function weatherCond (rain, sun) {
      let rainCond = 0
      let sunCond = 0

      if (rain > 20) {
        rainCond = 'High Rain'  ;
      } else if (rain > 10) {
        rainCond = 'Medium-High Rain';
      } else if (rain > 5) {
        rainCond = 'Medium Rain';
      } else if (rain > 2.5) {
        rainCond = 'Low-Medium Rain'
      } else if (rain > 0) {
        rainCond = 'Low-Rain'
      } else {
        rainCond = 'No Rain'
      }
      
      if (sun > 50) {
        sunCond = 'Very Sunny';
      } else if (sun > 0) {
        sunCond = 'Sunny'
      } else {
        sunCond = 'Overcast'
      }

      return([rainCond, sunCond])

  }

    async function weatherMeter(rain, sun) {
        let rainIcons = 0
        let sunIcons = 0
        if (rain > 80) {
            rainIcons = 5;
          } else if (rain > 60) {
            rainIcons = 4;
          } else if (rain > 40) {
            rainIcons = 3;
          } else if (rain > 20) {
            rainIcons = 2
          } else if (rain > 0) {
            rainIcons = 1
          } else {
            rainIcons = 0
          }
        
        for(let i=1; i <= rainIcons; i++) {
            let waterElement = document.getElementById(`waterIcon${i}`);
            waterElement.src = 'img/waterdrop.png'
        }

        if (sun > 50) {
            sunIcons = 2;
          } else if (sun > 0) {
            sunIcons = 1
          } else {
            sunIcons = 0
          }

        for (let i=1; i <= sunIcons; i++) {
            let waterElement = document.getElementById(`sunIcon${i}`);
            waterElement.src = 'img/sun.png'
        }
    }

    function getStartingCond(rain, sun){
      let rainStart = 0
      let sunStart = 0
      if (rain > 80) {
          rainStart = 80;
        } else if (rain > 60) {
          rainStart = 60;
        } else if (rain > 40) {
          rainStart = 40;
        } else if (rain > 20) {
          rainStart = 20
        } else if (rain > 0) {
          rainStart = 0
        } else {
          rainStart = 0
        }

      if (sun > 50) {
          sunStart = 40;
        } else if (sun > 0) {
          sunStart = 20
        } else {
          sunStart = 0
        }
      
      localStorage.setItem("startingCond", JSON.stringify([rainStart, sunStart]))
    }

    weatherProperties()
    evaluateWeather()
    const weatherImg = await evaluateWeather()
    console.log(weatherImg)
    // Get the body element with the class 'mainpage'
    const weatherElement = document.querySelector("body.mainpage");
    // Change the background image dynamically based on the weatherImg variable
    weatherElement.style.backgroundImage = `url("img/${weatherImg}.gif")`;
}

filterSelection("all")

//SEED PAGE FILTERING

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function flickrAPI(){
    const baseFlickr = ""
    const keyFlickr= "eecd5014501ebeeec6d473f4c8311e32"

}
