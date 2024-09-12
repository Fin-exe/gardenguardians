document.addEventListener('DOMContentLoaded', function () {
    //please put all event listeners here
    
    setupQuiz();
    
});

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