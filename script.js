const plantsData = https://l.facebook.com/l.php?u=https%3A%2F%2Fdata.brisbane.qld.gov.au%2Fexplore%2Fdataset%2Ffree-native-plants-species%2Ftable%2F%3Fsort%3D-index%26dataChart%3DeyJxdWVyaWVzIjpbeyJjb25maWciOnsiZGF0YXNldCI6ImZyZWUtbmF0aXZlLXBsYW50cy1zcGVjaWVzIiwib3B0aW9ucyI6e319LCJjaGFydHMiOlt7ImFsaWduTW9udGgiOnRydWUsInR5cGUiOiJjb2x1bW4iLCJmdW5jIjoiQVZHIiwieUF4aXMiOiJpbmRleCIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiMwMDY3YjEifV0sInhBeGlzIjoidHlwZSIsIm1heHBvaW50cyI6NTAsInNvcnQiOiIifV0sInRpbWVzY2FsZSI6IiIsImRpc3BsYXlMZWdlbmQiOnRydWUsImFsaWduTW9udGgiOnRydWV9%26fbclid%3DIwZXh0bgNhZW0CMTAAAR3ICFFTQ-u6jF1uRryQWb3TPu3CMh-aBg5MwgTQw9NplYAHqowz5JmFHjQ_aem_v2XUUglhiBcwqGAgT9zVyA&h=AT3XAKib0Q47V83QakhervqtwLDJWsNlh2Uzqfk8A1mol8C3r_7jGKNenoziafuCod9jDte1GTABrIQwh04k2PNcAGh7Dpl2p2XMmcohmRh8KNV14VVz1QGnK5D9zh96oHTfLg
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

async function fetchAndStoreTableData(apiUrl) {
    try {
      // Fetch data from the API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the response as JSON
      const data = await response.json();
      
      // Assuming the API returns an array of objects, each representing a row
      // If the structure is different, you may need to adjust this part
      const tableData = data.map(row => {
        // Convert each row to a JSON string
        return JSON.stringify(row);
      });
      
      // Store the table data in localStorage
      localStorage.setItem('tableData', JSON.stringify(tableData));
      
      console.log('Table data stored successfully');
      return tableData;
    } catch (error) {
      console.error('Error fetching or storing data:', error);
      throw error;
    }
}

console.log(fetchAndStoreTableData())