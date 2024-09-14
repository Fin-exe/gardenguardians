document.addEventListener('DOMContentLoaded', function () {
    //please put all event listeners here
    handlePlantGrowth();
    handleCardFlip();
    setupDragDrop();
    setupQuiz();
    initializeDataFetch();
});

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



function setupDragDrop() {
    const icons = document.querySelectorAll('.top_right_icons img'); 
    const target = document.querySelector('.center_content'); 

    if (!icons || !target) return;

    icons.forEach((icon) => {
        let startX, startY; 
        let currentX = 0, currentY = 0; 

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
        }

        function onMouseUp(e) {
            
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            icon.style.transition = ''; 
            icon.style.zIndex = ''; 

            
            const iconRect = icon.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            
            if (
                iconRect.right > targetRect.left &&
                iconRect.left < targetRect.right &&
                iconRect.bottom > targetRect.top &&
                iconRect.top < targetRect.bottom
            ) {
                
                console.log('Icon dropped over the target!');
            }

            
            icon.style.transform = '';
        }
    });
}


window.onload = function() {
    setupDragDrop();
};


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
            console.log(data); // Log the fetched data
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

    cardProperties();
    weatherProperties();
}
