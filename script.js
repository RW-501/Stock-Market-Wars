// Function to open the pop-up window
function openPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
}

// Function to close the pop-up window
function closePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

// Event listener for opening the pop-up window
document.getElementById("net-worth").addEventListener("click", openPopup);

// Event listener for closing the pop-up window
document.getElementById("close-popup").addEventListener("click", closePopup);
