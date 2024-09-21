document.addEventListener('DOMContentLoaded', function () {
    //Put all event listeners here
    openNav();
    closeNav();
    handlePlantGrowth();
    handleCardFlip();
    setupDragDrop();
    setupQuiz();
    initializeDataFetch();
});
 
// NAV BAR
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

// STAGE CHANGE
function handlePlantGrowth() {
    const plantImage = document.getElementById('plant-image');

    
    if (!plantImage) {
        console.error("Plant image element not found.");
        return;
    }

    const stages = ['img/stage1.png', 'img/stage2.png', 'img/stage3.png'];
    let currentStage = 0;

    
    plantImage.addEventListener('click', function () {
        
        currentStage = (currentStage + 1) % stages.length;
        
        
        plantImage.src = stages[currentStage];
    });
}

//FLIP CARD
function handleCardFlip() {
    const card = document.querySelector(".card__inner");

    if (card) {
        card.addEventListener("click", function () {
            card.classList.toggle('is-flipped');
        });
    }

    const plantOne = document.getElementById('plantOne');
    const infoCard = document.getElementById('info_card');
    const closeBtnFront = document.querySelector('.close_btn');
    const closeBtnBack = document.querySelector('.close_btn_back');

    
    if (!plantOne || !infoCard) return;

    
    function hideInfoCard() {
        infoCard.style.display = 'none';
    }

    function showInfoCard() {
        infoCard.style.display = 'flex'; 
    }

    hideInfoCard(); 

    plantOne.addEventListener('dblclick', function () {
        if (infoCard.style.display === 'none') {
            showInfoCard();
        } else {
            hideInfoCard();
        }
    });

    if (closeBtnFront) closeBtnFront.addEventListener('click', hideInfoCard);
    if (closeBtnBack) closeBtnBack.addEventListener('click', hideInfoCard);
}


//DRAG AND DROP
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
    const weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=-27.4679&longitude=153.0281&hourly=temperature_2m,apparent_temperature,rain,showers,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high&daily=temperature_2m_max&timezone=auto&models=bom_access_global';

    async function fetchData(URL) {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Couldn\'t fetch the data :(', error);
        }
    }

    async function cardProperties() {
        const data = await fetchData(nativePlantsURL);
        if (data) {
            const plantData = data.results;
            const descriptions = plantData.map(plant => plant.description_and_growing_requirements);
            const indexAndSpecies = plantData.map(plant => ({
                species: plant.species,
                descript: plant.description_and_growing_requirements,
                attract: plant.attracts
            }));
            console.log(indexAndSpecies);
        }
    }

    async function weatherProperties() {
        const data = await fetchData(weatherURL);
        if (data) {
            console.log(data.hourly);
        }
    }

}


