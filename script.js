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