


// Sample fictional companies and their initial stock prices
const companies = [
  { name: "TechCom", price: 10 },
  { name: "EcoTech", price: 20 },
  { name: "GlobeCorp", price: 30 },
  { name: "InfoSys", price: 15 },
  { name: "InnovaTech", price: 25 },
  { name: "GlobalSoft", price: 18 },
  { name: "DataDynamics", price: 22 },
  { name: "CyberTech", price: 27 },
  { name: "TechLink", price: 13 },
  { name: "PrimeSystems", price: 32 },
  { name: "SmartSolutions", price: 16 },
  { name: "NexGen", price: 24 },
  { name: "MegaTech", price: 19 },
  { name: "ByteCorp", price: 29 },
  { name: "InfiniteSolutions", price: 21 },
  { name: "ElevateTech", price: 11 },
  { name: "VistaSoft", price: 26 },
  { name: "AgileSystems", price: 14 },
  { name: "TechWave", price: 17 },
  { name: "FutureTech", price: 23 }
];


// Function to update stock prices
function updateStockPrices() {
  // Loop through each company
  for (const company of companies) {
    // Simulate market trends, news events, or simulated market behavior
    // Adjust the stock price based on these factors

    // Example 1: Simulate random fluctuation
    const randomChange = Math.random() * 0.1 - 0.05; // Random change between -5% and +5%
    const priceChange = company.price * randomChange;
    company.price += priceChange;

    // Example 2: Simulate trending market
    const trend = Math.random() > 0.5 ? 1 : -1; // Positive or negative trend
    const trendChange = company.price * 0.02 * trend; // 2% change in price
    company.price += trendChange;

    // Example 3: Simulate news events
    if (Math.random() < 0.1) { // 10% chance of a news event
      const newsChange = company.price * 0.1; // 10% change in price
      company.price += newsChange;
    }
  }
  
  // Update the stock prices in the user interface
  updateStockPricesUI();
}

// Function to update the stock prices in the user interface
function updateStockPricesUI() {
  const stocksTableBody = document.getElementById("stocks-table-body");

  // Clear the existing rows
  stocksTableBody.innerHTML = "";

  // Loop through each company and update the price and buttons in the UI
  companies.forEach((company) => {
    const { name, price } = company;

    // Create a new row for the company
    const row = document.createElement("tr");

    // Create cells for company name, price, buy button, and sell button
    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = "$"+price.toFixed(2);
    row.appendChild(priceCell);

    const buyButtonCell = document.createElement("td");
    const buyButton = createButton("Buy", () => buyStock(name));
    buyButtonCell.appendChild(buyButton);
    row.appendChild(buyButtonCell);

    const sellButtonCell = document.createElement("td");
    const sellButton = createButton("Sell", () => sellStock(name));
    sellButtonCell.appendChild(sellButton);
    row.appendChild(sellButtonCell);

    // Append the row to the table body
    stocksTableBody.appendChild(row);
  });
}

// Helper function to create a button element with a specific text and click event handler
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}



// Function to update the net worth display
function updateNetWorthDisplay() {
  // Calculate the net worth based on the stocks owned and their current prices
  const netWorth = calculateNetWorth();
  
  // Update the net worth value in the UI
  document.getElementById("net-worth-value").textContent = `$${netWorth.toFixed(2)}`;
}



function getStockQuantity(companyName) {
  // Retrieve stock holdings from local storage
  const stockHoldingsStr = localStorage.getItem("stockHoldings");
  
  // If stock holdings exist in local storage, parse the JSON string
  // Otherwise, set an empty object as the default value
  const stockHoldings = JSON.parse(stockHoldingsStr) || {};

  // Retrieve the stock quantity for the given company
  const quantity = stockHoldings[companyName] || 0;

  return quantity;
}





function getPlayerCars() {
  // Retrieve the list of cars owned by the player from local storage
  const cars = JSON.parse(localStorage.getItem('playerCars')) || [];

  return cars;
}

function getPlayerHouses() {
  // Retrieve the list of houses owned by the player from local storage
  const houses = JSON.parse(localStorage.getItem('playerHouses')) || [];

  return houses;
}

// Sample car data
const cars = [
  { name: "Car A", price: 20000 },
  { name: "Car B", price: 15000 },
  { name: "Car C", price: 30000 },
  // Add more cars as needed
];

// Sample house data
const houses = [
  { name: "House A", price: 250000 },
  { name: "House B", price: 350000 },
  { name: "House C", price: 500000 },
  // Add more houses as needed
];
/*
// Update the player's car and house collections in local storage
localStorage.setItem('playerCars', JSON.stringify(cars));
localStorage.setItem('playerHouses', JSON.stringify(houses));
*/







function getPlayerCars() {
  // Retrieve the list of cars owned by the player from local storage
  const cars = JSON.parse(localStorage.getItem('playerCars')) || [];

  return cars;
}

function getPlayerHouses() {
  // Retrieve the list of houses owned by the player from local storage
  const houses = JSON.parse(localStorage.getItem('playerHouses')) || [];

  return houses;
}

function buyCar(car) {
  // Deduct the car price from the player's available funds
  const carPrice = car.price;
  deductFunds(carPrice);

  // Add the car to the player's car collection
  const playerCars = getPlayerCars();
  playerCars.push(car);

  // Update the player's car collection in local storage
  localStorage.setItem('playerCars', JSON.stringify(playerCars));
}

function buyHouse(house) {
  // Deduct the house price from the player's available funds
  const housePrice = house.price;
  deductFunds(housePrice);

  // Add the house to the player's house collection
  const playerHouses = getPlayerHouses();
  playerHouses.push(house);

  // Update the player's house collection in local storage
  localStorage.setItem('playerHouses', JSON.stringify(playerHouses));
}






function calculateCarValue() {
  // Retrieve the list of cars owned by the player from your data structure or storage mechanism
  const cars = getPlayerCars(); // Implement this function to get the list of cars owned
  
  // Calculate the total value of cars by summing up the individual car values
  const totalCarValue = cars.reduce((total, car) => {
    const carPrice = car.price; // Retrieve the price of the car
    const carQuantity = car.quantity; // Retrieve the quantity of the car owned
    return total + carPrice * carQuantity;
  }, 0);
  
  return totalCarValue;
}

function calculateHouseValue() {
  // Retrieve the list of houses owned by the player from your data structure or storage mechanism
  const houses = getPlayerHouses(); // Implement this function to get the list of houses owned
  
  // Calculate the total value of houses by summing up the individual house values
  const totalHouseValue = houses.reduce((total, house) => {
    const housePrice = house.price; // Retrieve the price of the house
    const houseQuantity = house.quantity; // Retrieve the quantity of the house owned
    return total + housePrice * houseQuantity;
  }, 0);
  
  return totalHouseValue;
}




function getAvailableFunds() {
  // Retrieve the available funds from local storage
  const fundsString = localStorage.getItem('availableFunds');
  
  // If no funds are stored, set the initial funds and return it
  if (!fundsString) {
    const initialFunds = 500;
    localStorage.setItem('availableFunds', initialFunds.toString());
    return initialFunds;
  }
  
  // Remove the stored funds from local storage
  localStorage.removeItem('availableFunds');
  
  // Parse the funds string to a number and return it
  return parseFloat(fundsString);
}


/*
// Function to get the player's available funds from the bank account
function getAvailableFunds() {
  // Retrieve the available funds from local storage
  const fundsString = localStorage.getItem('availableFunds');
  
  // If no funds are stored, return 0
  if (!fundsString) {
    return 0;
  }
  
  // Parse the funds string to a number and return it
  return parseFloat(fundsString);
}
*/


// Function to get the player's stock quantity for a given company
function deductFunds(amount) {
  // Retrieve the current available funds from local storage
  const currentFunds = getAvailableFunds();
  
  // Check if the amount is valid (positive and not exceeding the available funds)
  if (amount <= 0 || amount > currentFunds) {
    // Handle the error case (e.g., display an error message, throw an error, etc.)
    return;
  }
  
  // Deduct the specified amount from the current funds
  const newFunds = currentFunds - amount;
  
  // Update the available funds in local storage
  localStorage.setItem('availableFunds', newFunds.toString());
}


// Function to update the player's stock quantity for a given company
function getStockQuantity(companyName) {
  // Retrieve the stock quantity for the given company from your data structure or storage mechanism
  // Assuming you have a data structure called 'stockQuantities'
  const stockQuantities = { /* Your stock quantities data structure */ };
  
  // Check if the company exists in the stockQuantities object or map
  if (companyName in stockQuantities) {
    // Return the stock quantity for the company
    return stockQuantities[companyName];
  } else {
    // Company not found, return 0 or handle the error case accordingly
    return 0;
  }
}


// Function to add funds to the player's bank account
function addFunds(amount) {
  // Retrieve the current available funds from local storage
  const currentFunds = getAvailableFunds();
  
  // Check if the amount is valid (positive)
  if (amount <= 0) {
    // Handle the error case (e.g., display an error message, throw an error, etc.)
    return;
  }
  
  // Add the specified amount to the current funds
  const newFunds = currentFunds + amount;
  
  // Update the available funds in local storage
  localStorage.setItem('availableFunds', newFunds.toString());
}






// Function to calculate the net worth
function calculateNetWorth() {
  // Calculate the value of all stocks owned
  const stockValue = companies.reduce((total, company) => {
    const stockPrice = company.price;
    const stockQuantity = getStockQuantity(company.name); // Implement this function to get the stock quantity owned
    return total + stockPrice * stockQuantity;
  }, 0);
  
  // Calculate the value of other assets like cash, cars, houses, etc.
  const cashValue = getAvailableFunds(); // Implement this function to get the available funds
  const carValue = calculateCarValue(); // Implement this function to calculate the value of cars
  const houseValue = calculateHouseValue(); // Implement this function to calculate the value of houses
  
  // Calculate the total net worth by adding the stock value and other assets value
  const netWorth = stockValue + cashValue + carValue + houseValue;
  
  // Return the total net worth
  return netWorth;
}


function buyStock(companyName) {
  // Retrieve the stock price for the given company
  const company = companies.find((company) => company.name === companyName);
  const stockPrice = company.price;

  // Retrieve the player's available funds from the bank account
  const availableFunds = getAvailableFunds();

  // Prompt the player to enter the quantity of stocks to buy
  const quantityToBuy = parseInt(prompt(`Enter the quantity of ${companyName} stocks to buy:`), 10);

  // Calculate the total cost of buying stocks
  const totalCost = stockPrice * quantityToBuy;

  // Check if the player has enough funds to make the purchase
  if (totalCost <= availableFunds) {
    // Deduct the total cost from the player's available funds
    deductFunds(totalCost);

    // Update the player's stock holdings
    const currentStockQuantity = getStockQuantity(companyName);
    const updatedStockQuantity = currentStockQuantity + quantityToBuy;
    updateStockQuantity(companyName, updatedStockQuantity);

    // Display a success message to the player
    alert(`Successfully bought ${quantityToBuy} ${companyName} stocks.`);
  } else {
    // Display an error message to the player
    alert("Insufficient funds to buy stocks.");
  }
}

function sellStock(companyName) {
  // Retrieve the stock price for the given company
  const company = companies.find((company) => company.name === companyName);
  const stockPrice = company.price;

  // Retrieve the player's stock quantity for the given company
  const stockQuantity = getStockQuantity(companyName);

  // Prompt the player to enter the quantity of stocks to sell
  const quantityToSell = parseInt(prompt(`Enter the quantity of ${companyName} stocks to sell:`), 10);

  // Check if the player has enough stocks to make the sale
  if (quantityToSell <= stockQuantity) {
    // Calculate the total amount earned from selling stocks
    const totalEarnings = stockPrice * quantityToSell;

    // Add the total earnings to the player's available funds
    addFunds(totalEarnings);

    // Update the player's stock holdings
    const updatedStockQuantity = stockQuantity - quantityToSell;
    updateStockQuantity(companyName, updatedStockQuantity);

    // Display a success message to the player
    alert(`Successfully sold ${quantityToSell} ${companyName} stocks.`);
  } else {
    // Display an error message to the player
    alert("Insufficient stocks to sell.");
  }
}



// List of fictional lenders and their information
const lenders = [
  { name: "Lender A", funds: 100000, interestRate: 0.1 },
  { name: "Lender B", funds: 50000, interestRate: 0.15 },
  // Add more lenders as needed
];

// Function to update the lender options in the select element
function updateLenderOptions() {
  const lenderSelect = document.getElementById("lender-select");
  
  // Clear existing options
  lenderSelect.innerHTML = "";
  
  // Create new options based on the lenders list
  lenders.forEach(lender => {
    const option = document.createElement("option");
    option.value = lender.name;
    option.textContent = lender.name;
    lenderSelect.appendChild(option);
  });
}

// Function to request a loan
function requestLoan() {
  const amountInput = document.getElementById("loan-amount");
  const lenderSelect = document.getElementById("lender-select");
  
  const amount = parseFloat(amountInput.value);
  const lender = lenderSelect.value;
  
  // Find the selected lender
  const selectedLender = lenders.find(l => l.name === lender);
  
  // Check if the lender and loan amount are valid
  if (selectedLender && !isNaN(amount) && amount > 0) {
    // Check if the lender has enough funds
    if (selectedLender.funds >= amount) {
      // Implement additional checks for loan approval based on credit score, debt, or collateral
    
      // If the loan is approved, deduct the loan amount from the lender's funds and add it to the player's funds
      selectedLender.funds -= amount;
      addFunds(amount);
    
      // Start tracking repayment terms
      
      // Display success message or update UI elements
      console.log("Loan approved! Amount: $" + amount);
    } else {
      // Display error message or update UI elements
      console.log("Loan request denied. Insufficient funds.");
    }
  } else {
    // Display error message or update UI elements for invalid input
    console.log("Invalid loan request. Please enter a valid amount and select a lender.");
  }
}



// Update the lender options in the select element
updateLenderOptions();








// Call the updateStockPrices function every 5 seconds (adjust the interval as desired)
var interval = setInterval(updateStockPrices, 5000);


// Call the updateNetWorthDisplay function initially and whenever there's a change in net worth
updateNetWorthDisplay();


























// Function to pause the game
function pauseGame() {
  // Logic to pause the game
  // Update UI elements or perform necessary actions
  console.log("Game paused");
}




// Function to open the specified popup window
function openPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "block";
}

// Function to close the specified popup window
function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "none";
}



// Add event listeners for other popups in a similar manner
document.getElementById("open-bank-popup").addEventListener("click", function () {
  openPopup("bank-popup");
});

document.getElementById("close-bank-popup").addEventListener("click", function () {
  closePopup("bank-popup");
});

document.getElementById("open-lender-popup").addEventListener("click", function () {
  openPopup("lender-popup");
});

document.getElementById("close-lender-popup").addEventListener("click", function () {
  closePopup("lender-popup");
});

document.getElementById("open-buy-car-popup").addEventListener("click", function() {
  openPopup("buy-car-popup");
});

document.getElementById("close-buy-car-popup").addEventListener("click", function() {
  closePopup("buy-car-popup");
});

document.getElementById("open-buy-house-popup").addEventListener("click", function() {
  openPopup("buy-house-popup");
});

document.getElementById("close-buy-house-popup").addEventListener("click", function() {
  closePopup("buy-house-popup");
});

document.getElementById("open-business-popup").addEventListener("click", function() {
  openPopup("business-popup");
});

document.getElementById("close-business-popup").addEventListener("click", function() {
  closePopup("business-popup");
});

document.getElementById("open-options-popup").addEventListener("click", function() {
  openPopup("options-popup");
});

document.getElementById("close-options-popup").addEventListener("click", function() {
  closePopup("options-popup");
});

// Event listener for the Pause Game button
document.getElementById("pause-game-btn").addEventListener("click", function() {
  clearInterval(interval); // Clear the interval to stop updating stock prices
  openPopup("pause-popup");
  pauseGame(); // Pause the game
});

document.getElementById("close-pause-popup").addEventListener("click", function() {
  interval = setInterval(updateStockPrices, 5000); // Restart the interval to resume updating stock prices
  closePopup("pause-popup");
});



// Function to restart the game
function restartGame() {
  // Clear local storage
  localStorage.clear();
  
  // Reset game state, UI elements, or perform necessary actions
  playerFunds = 500; // Reset initial funds to 500
  console.log("Game restarted");
}


// Event listener for restart game button
document.getElementById("restart-game-btn").addEventListener("click", function() {
  openPopup("restart-popup"); // Open the restart confirmation popup
});

// Event listener for confirm restart button
document.getElementById("confirm-restart-btn").addEventListener("click", function() {
  restartGame(); // Restart the game
  closePopup("restart-popup"); // Close the restart confirmation popup
});

// Event listener for cancel restart button
document.getElementById("cancel-restart-btn").addEventListener("click", function() {
  closePopup("restart-popup"); // Close the restart confirmation popup
});




// Event listener for the End Game button
document.getElementById("end-game-btn").addEventListener("click", endGame);




// Function to end the game
function endGame() {
  // Prompt the player to confirm ending the game
  const confirmed = confirm("Are you sure you want to end the game?");
  
  if (confirmed) {
    // Logic to end the game
    // Perform necessary cleanup, save game data, or navigate to a different page
    console.log("Game ended");
  } else {
    // Player canceled, do nothing or handle the cancellation as desired
  }
}




