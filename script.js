// Plant Popup Card

const popupPlantOne = document.getElementById("plantOne");
const modalPlantOne = document.getElementById("plant_one_popup");
const closePlantOne = document.getElementById("close_plant_one");
const overlay = document.getElementById("overlay");

popupPlantOne.addEventListener("click", function() {
    if (modalPlantOne.style.display === "none") {
      modalPlantOne.style.display = "block";
      overlay.style.display = "block";
    } else {
      modalPlantOne.style.display = "none";
      overlay.style.display = "none";
    }
});

closePlantOne.addEventListener("click", function(){
    modalPlantOne.style.display = "none";
    overlay.style.display = "none"; 
});

overlay.addEventListener("click", function(event){
    if (event.target === overlay) {
        modalPlantOne.style.display = "none";
        overlay.style.display = "none"; 
    }
});