// script.js

// script.js (main page)
document.addEventListener('DOMContentLoaded', function () {
    // Initialize elements
    const plantImage = document.getElementById('plant-image');
    const selectedPlant = sessionStorage.getItem('selectedPlant');
    const allQuizData = parseInt(sessionStorage.getItem("selectedPlantIndex"))

    // Set the plant image based on the selected plant
    if (selectedPlant) {
        plantImage.src = `img/${selectedPlant}_s1.png`;
    } else {
        plantImage.src = 'img/placeholder.png';
    }


    // Initialize functionalities
    initializeDataFetch();
    getPlantCond();
    handlePlantGrowth();
    openNav();
    closeNav();
    handleCardFlip();
    setupDragDrop();
    createQuiz(allQuizData)
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
    const selectedPlant = sessionStorage.getItem('selectedPlant');

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
const plantData = {
cutleafdaisy: { //Cut Leaf Daisy Flower
    front: "img/frontcard_cd.png",
    back: "img/backcard_cd.png"
},
creepingboobialla: { //Creeping Boobialla
    front: 'img/frontcard_cb.png',
    back: 'img/backcard_cb.png'
},
nativeviolet: { //Native Violet
    front: 'img/frontcover_nv.png',
    back: 'img/backcover_nv.png'
},
knobcr: { // Knobby Club Rush
    front: 'img/frontcover_kcr.png',
    back: 'img/backcover_kcr.png'
},
blueflax: { //Blue Flax
  front: 'img/frontcard_bf.png',
  back: 'img/backcard_bf.png'
},
guinea: { //Guinea Vine
    front: 'img/frontcover_gv.png',
    back: 'img/backcover_gv.png'
},
teatreesmall: { //Tea Tree Small
    front: 'img/frontcard_tts.png',
    back: 'img/backcard_tts.png'
},
thyme: { //Thyme Honey Myrtle
    front: 'img/frontcard_t.png',
    back: 'img/backcard_t.png'
},
banksia: { //Banksia
    front: 'img/frontcard_b.png',
    back: 'img/backcard_b.png'
},
grevillea: { //Grevillea
    front: 'img/grevillea_front.jpg',
    back: 'img/grevillea_back.jpg'
},
teatreemedium: { //Tea Tree Medium
    front: 'img/teatreemedium_front.jpg',
    back: 'img/teatreemedium_back.jpg'
},
blushsatinash: { //Blush Satinash
    front: 'img/blue_front.jpg',
    back: 'img/blue_back.jpg'   
},
tulipwood: { //Tulipwood
    front: 'img/tulipwood_front.jpg',
    back: 'img/tulipwood_back.jpg'
},
fanflower: { //Fan Flower
    front: 'img/fan_front.jpg',
    back: 'img/fan_back.jpg'
},
matrush: { // Mat Rush
    front: 'img/frontcard_mr.png',
    back: 'img/backcard_mr.png'
}
};

function selectPlant(plantId) {
    sessionStorage.setItem('selectedPlant', plantId);
}

function clearSelectedPlant() {
     localStorage.removeItem('selectedPlant');
}

document.addEventListener('DOMContentLoaded', function() {
  const plantImage = document.getElementById('plant-image');
  const selectedPlant = sessionStorage.getItem('selectedPlant');
  const startStage = sessionStorage.getItem('stage')

  if (selectedPlant) {
      plantImage.src = `img/${selectedPlant}_s${startStage}.png`;
  } else {
      plantImage.src = 'img/placeholder.png';
  }
  handlePlantGrowth();
});

const letsPlantButton = document.querySelector('.quiz-link');

letsPlantButton.addEventListener('click', function(event) {
    if (currentPlantId) {
        selectPlant(currentPlantId);
    }
});

function selectPlant(plantId) {
    sessionStorage.setItem('selectedPlant', plantId);
    const plantsGrowCond = JSON.parse(sessionStorage.getItem("plantGrow"));      
    const plantType = plantsGrowCond.find(plant => {
      if (plant.plant_name === plantId){
        return  plant
      }
    })
    sessionStorage.setItem('stage', 1)
    sessionStorage.setItem('selectedPlantIndex', plantType.index);
}

document.addEventListener('DOMContentLoaded', function() {
  // Select all plant elements
  const plantElements = document.querySelectorAll('.namestyle');
  

  // Attach click event listeners to each plant
  plantElements.forEach(function(plantElement) {
      plantElement.addEventListener('click', function() {
          currentPlantId = plantElement.getAttribute('data-plant-id');
          showInfoCard();
          updateCardContent(currentPlantId);
      });
  });

  // Close buttons functionality
  document.querySelectorAll('.close_btn, .close_btn_back').forEach(function(btn) {
      btn.addEventListener('click', function() {
          document.getElementById('overlay').style.display = 'none';
          document.getElementById('info_card').style.display = 'none';
      });
  });

  // Function to show the info card
  function showInfoCard() {
      document.getElementById('overlay').style.display = 'block';
      document.getElementById('info_card').style.display = 'block';
  }

  // Function to update the card content based on the selected plant
  function updateCardContent(plantId) {
      const frontImage = document.querySelector('.front_context');
      const backImage = document.querySelector('.back_context');
      
      if (plantData[plantId]) {
          frontImage.src = plantData[plantId].front;
          backImage.src = plantData[plantId].back;
          frontImage.alt = `${capitalizeWords(plantId)} Front Image`;
          backImage.alt = `${capitalizeWords(plantId)} Back Image`;
      } else {
          // Default images or handling for undefined plant IDs
          frontImage.src = 'img/default_front.jpg';
          backImage.src = 'img/default_back.jpg';
          frontImage.alt = 'Default Front Image';
          backImage.alt = 'Default Back Image';
      }
  }
});

let currentPlantId = null;
sessionStorage.setItem('stage', 1)

const currentWeatherIcons = JSON.parse(localStorage.getItem("startingCond"))

//DRAG AND DROP
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
          default: 'img/greysunoutline.png',
          overPlant: 'img/sun.png'
      } 
  };

  // Retrieve starting conditions to change via icons
  let plantCare = JSON.parse(localStorage.getItem('startingCond'))
  // Growing conditions for the plant on the mainpage
  const growingCond = getPlantCond()
  // Startes at stage 1
  let stage = 1
  console.log()
  // Main page modal (congratulation message)
  const modal = document.getElementById('congratsModal');
  const closeBtn = document.querySelector('.close-btn-modal');


  // Open the modal
  function showCongratsModal() {
    modal.style.display = 'block';
  }

  // Close the modal via button
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

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
            // Change icon when over plant
            icon.src = iconOverPlantImages[iconType].overPlant;
            isOverPlant = true;


            // Update plantCareActions array based on the icon type
            if (iconType === 'watercan') {
                if (plantCare[0] < 100) {
                  plantCare[0] += 20; // Increase water level 
                }
            } else if (iconType === 'umbrella') {
                // Decrease water level & sun level
                if (plantCare[0] > 0 && plantCare[1] > 0) {
                  plantCare[0] -= 20; 
                  plantCare[1] -= 20;
                } else if (plantCare[0] === 0 && plantCare[1] > 0) {
                  plantCare[1] -= 20;
                } else if (plantCare[0] > 0 && plantCare[1] === 0) {
                  plantCare[0] -= 20;
                }
            } else if (iconType === 'sun') {
                if (plantCare[1] < 100) {
                  plantCare[1] += 20; // Increase sun state
                }
            }

            // Save the updated array to localStorage
            sessionStorage.setItem('plantCareActions', JSON.stringify(plantCare));
            console.log('Updated plantCareActions:', plantCare);

        } else if (!isOverlapping && isOverPlant) {
            // Revert only if the icon has not been updated during this drag
            icon.src = iconOverPlantImages[iconType].default;
            isOverPlant = false;
            
            // Optionally, revert the array state if the icon is dragged away
            if (iconType === 'watercan') {
              // Revert water level  
                plantCare[0] -= 20; 
                          
            } else if (iconType === 'umbrella') {
              // Revert water and sun leve
              if (plantCare[0] > 0 && plantCare[1] > 0) {
                plantCare[0] += 20; 
                plantCare[1] += 20;
              } else if (plantCare[0] === 0 && plantCare[1] > 0) {
                plantCare[1] += 20;
              } else if (plantCare[0] > 0 && plantCare[1] === 0) {
                plantCare[0] += 20;
              }            
            } else if (iconType === 'sun') {
              // Revert sun state
              plantCare[1] -= 20; 
              
            }
            // Save the updated array to localStorage
            sessionStorage.setItem('plantCareActions', JSON.stringify(plantCare));
            console.log('Reverted plantCareActions:', plantCare);
        }
    }

      function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        setTimeout(() => {
          // Set the transition time for the icon to return smoothly
          icon.style.transition = 'transform 0.5s ease'; 
          icon.style.zIndex = ''; 
          icon.style.transform = ''; 
          
          icon.src = iconOverPlantImages[iconType].default;
          isOverPlant = false;
          weatherBar(plantCare);
  
          // Check if plant care array matches growing conditions and grow plant if necessary
          if (arraysEqual(plantCare, growingCond) && stage < 3) {
              // Increases the stage of the plant to grow
              stage += 1;
              // Growing the plant based on its new stage
              growPlant(stage);
              // Resets to the starting plant condition to grow the plant in the new stage
              plantCare = JSON.parse(localStorage.getItem('startingCond'));
              weatherBar(plantCare);
              if (stage === 3) {
                  showCongratsModal();
              }
          }
        }, 200); // Delay of 0.2 seconds before moving the icon back
     }
  });
}

window.onload = function() {
    setupDragDrop();
};


function weatherBar(weatherCond) {
  const rain = weatherCond[0];
  const sun = weatherCond[1];

  let rainIcons = 0;
  let sunIcons = 0;

  // Determine the number of rain icons to color
  if (rain > 80) {
    rainIcons = 5;
  } else if (rain > 60) {
    rainIcons = 4;
  } else if (rain > 40) {
    rainIcons = 3;
  } else if (rain > 20) {
    rainIcons = 2;
  } else if (rain > 0) {
    rainIcons = 1;
  } else {
    rainIcons = 0;
  }

  // Update rain icons (colored and grey)
  for (let i = 1; i <= 5; i++) {
    let waterElement = document.getElementById(`waterIcon${i}`);
    if (i <= rainIcons) {
      waterElement.src = 'img/waterdrop.png';  // Fill with colored water icon
    } else {
      waterElement.src = 'img/greywaterdrop.png';  // Fill the rest with grey water icons
    }
  }

  // Determine the number of sun icons to color
  if (sun > 80) {
    sunIcons = 5;
  } else if (sun > 60) {
    sunIcons = 4;
  } else if (sun > 40) {
    sunIcons = 3;
  } else if (sun > 20) {
    sunIcons = 2;
  } else if (sun > 0) {
    sunIcons = 1;
  } else {
    sunIcons = 0;
  }

  // Update sun icons (colored and grey)
  for (let i = 1; i <= 5; i++) {
    let sunElement = document.getElementById(`sunIcon${i}`);
    if (i <= sunIcons) {
      sunElement.src = 'img/sun.png';  // Fill with colored sun icon
    } else {
      sunElement.src = 'img/greysun.png';  // Fill the rest with grey sun icons
    }
  }
}

function getPlantCond() {
  const plantsGrowCond = JSON.parse(sessionStorage.getItem("plantGrow"));
  const plantName = (sessionStorage.getItem("selectedPlant"))
  
  const plantType = plantsGrowCond.find(plant => {
    if (plant.plant_name === plantName){
      return  plant
    }
  })
  
  let sun = parseInt(plantType.sun_level)
  let water = parseInt(plantType.water_level)
  sessionStorage.setItem('plantGrowCond', JSON.stringify([water,sun]));
  return [water,sun]
}

function growPlant(stage) {
  const growingCond = getPlantCond()
  const currentPlant = (sessionStorage.getItem("selectedPlant"))
  const startingCond = (localStorage.getItem("startingCond"))

  const plantPot = document.getElementById('plant-image');
  plantPot.src = `img/${currentPlant}_s${stage}.png`
  sessionStorage.setItem('plantCareActions', (startingCond));
    
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((value, index) => value === arr2[index]);
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
        if (cloudCover > 80) {
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
      
        if (windLevel === 'Medium' || rainLevel === 'Medium') {
          if (windLevel === 'Medium') return 'windy';
          if (rainLevel === 'Medium') return 'rain';
        }
      
        return 'sunny2';
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
      
      if (sun > 70) {
        sunCond = 'Very Sunny';
      } else if (sun > 10) {
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

        if (sun > 70) {
            sunIcons = 2;
          } else if (sun > 10) {
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

    async function loadCSV() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Fin-exe/gardenguardians/refs/heads/main/csv/growing%20plants%20data.csv');
        const csvText = await response.text();
        let parsedData = Papa.parse(csvText, {
          header: true,    // Use the first row as headers
          skipEmptyLines: true  // Skip empty lines in the CSV
        });
    
        const plantGrowth = parsedData.data;  // Parsed quiz data in array format
        sessionStorage.setItem("plantGrow", JSON.stringify(plantGrowth));
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    }

    async function fetchData(URL) {
      try {
          const response = await fetch(URL);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Couldn\'t fetch the data :(', error);
      }
    }
    

    function extractDetails(descriptions) {
      const description = descriptions 
  
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
      const data = await fetchData('https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/free-native-plants-species/records?limit=40');
      const usedPlants = [1,2,3,4,5,6,7,8,16,17,18,20,22,23,27]
      if (data) {
          const plants = data.results
          const filteredPlants = plants.filter(plant => usedPlants.includes(plant.index));
          const sortedData = filteredPlants.sort((a, b) => a.index - b.index)
          return sortedData
      }
    }
  
  
    async function cardProperties() {
      const data = await sortPlants();
      if (data) {
          const indexAndSpecies = data.map(plant=> ({
              id: plant.index,
              species: plant.species,
              type: plant.type,
              descript: plant.description_and_growing_requirements,
              attract: plant.attracts,
              color: extractDetails(plant.description_and_growing_requirements).colors,
              height: extractDetails(plant.description_and_growing_requirements).height,
              grown: 'testing'
          }));
          sessionStorage.setItem("plantData", JSON.stringify(indexAndSpecies));
      }
    }

    async function loadCSVQuiz() {
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

    loadCSV()
    loadCSVQuiz()
    weatherProperties()
    evaluateWeather()
    cardProperties()
    const weatherImg = await evaluateWeather()
    // Get the body element with the class 'mainpage'
    const weatherElement = document.querySelector("body.mainpage");
    // Change the background image dynamically based on the weatherImg variable
    weatherElement.style.backgroundImage = `url("img/${weatherImg}.gif")`;
}

// SEED PAGE FILTERING

// Initial call to display all items
filterSelection("all");

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Loop through all elements and hide those that don't match the filter
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  arr2.forEach(function(n) {
    if (arr1.indexOf(n) == -1) {
      arr1.push(n);
    }
  });
  element.className = arr1.join(" ");
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  arr1 = arr1.filter(function(n) {
    return arr2.indexOf(n) === -1;
  });
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
Array.from(btns).forEach(function(btn) {
  btn.addEventListener("click", function() {
    var current = btnContainer.getElementsByClassName("active");
    if (current.length > 0) current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
});

// SEEDPAGE PHOTO LOADING
// document.addEventListener('DOMContentLoaded', function() {
// function updatePlantImages() {
//     fetch('test.php')
//         .then(response => response.json())
//         .then(data => {
//             if (data.url) {
//                 // Update all plant images with the Flickr image
//                 document.querySelectorAll('.plant_image_sizing').forEach(img => {
//                     img.src = data.url;
//                     img.alt = 'Flickr plant image';
//                 });
//             } else {
//                 console.error('Error fetching Flickr image:', data.error);
//             }
//         })
//         .catch(error => console.error('Error:', error));
// }

// });

