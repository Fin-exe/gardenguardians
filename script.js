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