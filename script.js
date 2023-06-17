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
    priceCell.textContent = price.toFixed(2);
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


// Call the updateStockPrices function every 5 seconds (adjust the interval as desired)
setInterval(updateStockPrices, 5000);

// Call the updateNetWorthDisplay function initially and whenever there's a change in net worth
updateNetWorthDisplay();





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


