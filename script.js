function getMarket() {
  const market = [
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

  // Retrieve the stored stock prices from local storage
  const storedStockPrices = localStorage.getItem('stockPrices');
//console.log("storedStockPrices   "+storedStockPrices);
  // Parse the stored stock prices string into an object or set it to an empty object if null
  const stockPrices = JSON.parse(storedStockPrices) || {};

  // Update the prices of the companies with the stored stock prices
  const updatedCompanies = market.map(company => {
    const { name } = company;
    const price = company.price || stockPrices[name];
    return { name, price };
  });

  // Now the updatedCompanies array contains the companies with the updated stock prices

  // You can use the updatedCompanies array in your code as needed

  return updatedCompanies;
}


// Example usage
var companies = getMarket();
//console.log(companies);



function updateStockQuantity(companyName, updatedStockQuantity) {
  // Retrieve the current portfolio from local storage
  const portfolioString = localStorage.getItem('portfolio');

  // Parse the portfolio string to an object or initialize an empty object if no portfolio is stored
  const portfolio = portfolioString ? JSON.parse(portfolioString) : {};

  // Update the stock quantity for the given company in the portfolio
  portfolio[companyName] = updatedStockQuantity;

  // Save the updated portfolio back to local storage
  localStorage.setItem('portfolio', JSON.stringify(portfolio));

  // You can also update the UI to reflect the updated stock quantity if necessary
  // For example, you can update a stock quantity display on the screen
  console.log("portfolioString 44   "+portfolioString); // Display the entire portfolio object
}


function getStockPrice(companyName) {
  // Retrieve the stock prices from local storage
  const storedStockPrices = localStorage.getItem('stockPrices');
  
  // If no stock prices are stored, return null or a default value
  if (!storedStockPrices) {
    return null; // or a default value like 0
  }
  
  // Parse the stored stock prices object
  const stockPrices = JSON.parse(storedStockPrices);
  
  // Retrieve the stock price for the given company name
  const stockPrice = stockPrices[companyName];

  // Return the stock price
  return stockPrice;
}



function displayPortfolio() {
  // Clear the existing portfolio display
  const portfolioContainer = document.getElementById("portfolio-body");
  portfolioContainer.innerHTML = "";

  // Retrieve the portfolio from local storage
  const portfolioString = localStorage.getItem('portfolio');

  // Parse the portfolio string into an object
  const portfolio = JSON.parse(portfolioString);

  // Initialize the total value variable
  let totalValue = 0;

  // Iterate over each company in the portfolio
  for (const [name, stockQuantity] of Object.entries(portfolio)) {
    // Retrieve the stock price for the current company (assuming it's stored somewhere)
    const stockPrice = getStockPrice(name);

    // Calculate the value of the current company's stocks
    const companyValue = stockPrice * stockQuantity;

    // Add the company value to the total value
    totalValue += companyValue;

    // Create a new table row for the company in the portfolio display
    const row = document.createElement("tr");

    // Create table cells for the company name, stock price, stock quantity, and company value
    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    const priceCell = document.createElement("td");
    priceCell.textContent = "$" + stockPrice.toFixed(2);
    const quantityCell = document.createElement("td");
    quantityCell.textContent = stockQuantity;
    const valueCell = document.createElement("td");
    valueCell.textContent = "$" + companyValue.toFixed(2);

    // Append the table cells to the row
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(valueCell);

    // Append the row to the portfolio display
    portfolioContainer.appendChild(row);
  }



  // Display the total value of the portfolio
  const totalValueCell = document.getElementById("portfolio-total-value");
  totalValueCell.textContent = "$" + totalValue.toFixed(2);
}




function updateStockPrices() {
  // Retrieve the stock prices from local storage
  const storedStockPrices = localStorage.getItem('stockPrices');



  // Parse the stored stock prices object
  let stockPrices = JSON.parse(storedStockPrices);

  // If stockPrices is null or not an object, initialize it as an empty object
  if (!stockPrices || typeof stockPrices !== 'object') {
    stockPrices = {};
  }

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

    // Save the updated company price in your data structure or storage mechanism
    // For example, you can store it in the stockPrices object
    stockPrices[company.name] = company.price;
  }

  // Save the updated stock prices object in local storage
  localStorage.setItem('stockPrices', JSON.stringify(stockPrices));

  // Update the stock prices in the user interface
updateStockPricesUI();
  // updateNetWorthDisplay();
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
     updateNetWorthDisplay();
}

// Helper function to create a button element with a specific text and click event handler
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}


let counterValue = 0;

// Function to update the net worth display
function updateNetWorthDisplay() {
  // Calculate the net worth based on the stocks owned and their current prices
  const netWorth = calculateNetWorth();

     const totalCashCell = document.getElementById("cash-total-value");
  let cash = getAvailableFunds();
  totalCashCell.textContent = "$" +  `${cash.toFixed(2)}`;
  // Update the net worth value in the UI
  document.getElementById("net-worth-value").textContent = `$${netWorth.toFixed(2)}`;
  
    counterValue++;

    const counter = document.getElementById("counter");
  counter.textContent = counterValue;

  newDayFunc(counterValue);
}


// Function to update the player's stock quantity for a given company
function getStockQuantity(companyName) {
  // Retrieve stock holdings from local storage
  const stockHoldingsStr = localStorage.getItem("portfolio");
  
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
    const initialFunds = 100;
    localStorage.setItem('availableFunds', initialFunds.toString());
    return initialFunds;
  }
  
  // Remove the stored funds from local storage
  //localStorage.removeItem('availableFunds');
  
  // Parse the funds string to a number and return it
  return parseFloat(fundsString);
}



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
       updateNetWorthDisplay();
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

         console.log("newFunds add   "+newFunds);

  // Update the available funds in local storage
  localStorage.setItem('availableFunds', newFunds.toString());
       updateNetWorthDisplay();
}






// Function to calculate the net worth
function calculateNetWorth() {
  // Calculate the value of all stocks owned
  const stockValue = companies.reduce((total, company) => {
    const stockPrice = getStockPrice(company.name); // Retrieve the current stock price for the company
    const stockQuantity = getStockQuantity(company.name); // Retrieve the stock quantity owned
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
    alert(`Successfully sold ${quantityToSell} ${companyName} stocks. for  `+ stockPrice);
  } else {
    // Display an error message to the player
    alert("Insufficient stocks to sell.");
  }
}



// List of fictional lenders and their information
const lenders = [
  { id: "1", name: "Fortune Finance", funds: 100000, interestRate: 0.1, minNetWorth: 500, automaticPayments: true, paymentAmount: 50, paymentFrequency: "30" },
  {  id: "2", name: "Prestige Bank", funds: 50000, interestRate: 0.15, minNetWorth: 2500, automaticPayments: false, paymentAmount: 100, paymentFrequency: "" },
  {  id: "3", name: "Elite Capital", funds: 75000, interestRate: 0.12, minNetWorth: 3000, automaticPayments: true, paymentAmount: 25, paymentFrequency: "15" },
  {  id: "4", name: "Opulent Investments", funds: 200000, interestRate: 0.08, minNetWorth: 15000, automaticPayments: true, paymentAmount: 50, paymentFrequency: "30" },
  {  id: "5", name: "Prosperity Lending", funds: 150000, interestRate: 0.11, minNetWorth: 55000, automaticPayments: false, paymentAmount: 100, paymentFrequency: "" },
  {  id: "6", name: "Wealthy Trust", funds: 300000, interestRate: 0.07, minNetWorth: 250500, automaticPayments: true, paymentAmount: 25, paymentFrequency: "15" },
  {  id: "7", name: "Grandiose Bank", funds: 1000000, interestRate: 0.05, minNetWorth: 5000000, automaticPayments: true, paymentAmount: 50, paymentFrequency: "30" },
  {  id: "8", name: "Noble Finance", funds: 250000, interestRate: 0.09, minNetWorth: 800000, automaticPayments: true, paymentAmount: 25, paymentFrequency: "15" },
  {  id: "9", name: "Luxe Lenders", funds: 400000, interestRate: 0.06, minNetWorth: 2000000, automaticPayments: true, paymentAmount: 25, paymentFrequency: "30" },
  {  id: "10", name: "Exquisite Funding", funds: 600000, interestRate: 0.04, minNetWorth: 20500100, automaticPayments: false, paymentAmount: 100, paymentFrequency: "" }
];

function updateLenderDetails() {
  const lenderSelect = document.getElementById("lender-select");
  const selectedLenderName = lenderSelect.value;
  const selectedLender = lenders.find(lender => lender.name === selectedLenderName);

  if (selectedLender) {
    document.getElementById("lender-Max").textContent = selectedLender.funds;
    document.getElementById("lender-Rate").textContent = selectedLender.interestRate;
    document.getElementById("lender-AutoPayments").textContent = selectedLender.automaticPayments ? "Yes" : "No";
    document.getElementById("lender-PaymentAmount").textContent = selectedLender.paymentAmount;
    document.getElementById("lender-PaymentFrequency").textContent = selectedLender.paymentFrequency;
  }
}

function updateLenderOptions() {
  const lenderSelect = document.getElementById("lender-select");
  const newWorth = calculateNetWorth();
  const eligibleLenders = lenders.filter(lender => lender.minNetWorth <= newWorth);

  lenderSelect.innerHTML = "";

  eligibleLenders.forEach(lender => {
    const option = document.createElement("option");
    option.value = lender.name;
    option.textContent = lender.name;
    lenderSelect.appendChild(option);
  });

  const selectedLender = eligibleLenders.find(lender => lender.name === lenderSelect.value);

  if (selectedLender) {
    document.getElementById("lender-Max").textContent = `Funding Maximum: $${selectedLender.funds}`;
    document.getElementById("lender-Rate").textContent = `Interest Rate: ${selectedLender.interestRate * 100}%`;
  } else {
    document.getElementById("lender-Max").textContent = "";
    document.getElementById("lender-Rate").textContent = "";
  }
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
      let lenderID = selectedLender.id;
      let lenderPaymentFrequency = selectedLender.paymentFrequency;
      let lenderInterestRate = selectedLender.interestRate;
      let lenderPaymentAmount = selectedLender.paymentAmount;
      let lenderAutomaticPayments = selectedLender.automaticPayments;
    
      // Start tracking repayment terms
       console.log("lenderAutomaticPayments 597   "+lenderAutomaticPayments);
       console.log("lenderPaymentAmount 597   "+lenderPaymentAmount);
       console.log("lenderInterestRate 597   "+lenderInterestRate);
      // Display success message or update UI elements

        // updateNetWorthDisplay();
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


newDayFunc(counterValue){


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

// Function to open the portfolio popup
function openPortfolioPopup() {
  openPopup("portfolio-popup");
  displayPortfolio();
}

// Function to close the portfolio popup
function closePortfolioPopup() {
  closePopup("portfolio-popup");
}

// Event listener for opening the portfolio popup
document.getElementById("portfolio-button").addEventListener("click", openPortfolioPopup);

// Event listener for closing the portfolio popup
document.getElementById("close-portfolio-popup").addEventListener("click", closePortfolioPopup);


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


document.getElementById("open-news-popup").addEventListener("click", function() {
  openPopup("options-popup");
});

document.getElementById("close-news-popup").addEventListener("click", function() {
  closePopup("news-popup");
});



// Event listener for the Pause Game button
document.getElementById("pause-game-btn").addEventListener("click", function() {
    closePopup("options-popup");
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
document.addEventListener('DOMContentLoaded', function() {
  localStorage.clear();
for (const key in localStorage) {
  localStorage.setItem(key, null);
}

//getMarket();
  
    // Update the stock prices in the user interface
    playerFunds = 500; // Reset initial funds to 500

updateStockPrices();
// Call the updateNetWorthDisplay function initially and whenever there's a change in net worth
updateNetWorthDisplay();
  
  });
  clearInterval(interval); // Clear the interval to stop updating stock prices
    interval = setInterval(updateStockPrices, 5000); // Restart the interval to resume updating stock prices

  // Reset game state, UI elements, or perform necessary actions
  console.log("Game restarted");
}






// Event listener for restart game button
document.getElementById("restart-game-btn").addEventListener("click", function() {
    closePopup("options-popup");
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
    closePopup("options-popup");
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




