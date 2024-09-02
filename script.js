// Plant Popup Card

const popupBuzzkid = document.getElementById("buzzkid");




popupBuzzkid.addEventListener("click", function() {
    if (modalBuzzkid.style.display === "none") {
      modalBuzzkid.style.display = "block";
    } else {
      modalBuzzkid.style.display = "none";
    }
  })

  closeBuzzkid.addEventListener("click", function(){
    modalBuzzkid.style.display = "none";
});