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

// Function to calculate the net worth
function calculateNetWorth() {
  // Calculate the value of all stocks owned
  const stockValue = companies.reduce((total, company) => {
    const stockPrice = company.price;
    const stockQuantity = getStockQuantity(company.name); // Implement this function to get the stock quantity owned
    return total + stockPrice * stockQuantity;
  }, 0);
  
  // Add other assets like cash, cars, houses, etc. to the net worth calculation
  
  // Return the total net worth
  return stockValue;
}

// Example functions for buying and selling stocks (you need to implement the logic)
function buyStock(companyName) {
  // Logic for buying stocks
}

function sellStock(companyName) {
  // Logic for selling stocks
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


