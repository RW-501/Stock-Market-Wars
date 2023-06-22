
var dayTimer = 5000; //10000 = 10sec 5000 = 5sec

var runCount = 0;


function getMarket() {

  const market = [
    { id: 1, name: "TechCom", price: 10 },
    { id: 2, name: "EcoTech", price: 20 },
    { id: 3, name: "GlobeCorp", price: 30 },
    { id: 4, name: "InfoSys", price: 15 },
    { id: 5, name: "InnovaTech", price: 25 },
    { id: 6, name: "GlobalSoft", price: 18 },
    { id: 7, name: "DataDynamics", price: 22 },
    { id: 8, name: "CyberTech", price: 27 },
    { id: 9, name: "TechLink", price: 13 },
    { id: 10, name: "PrimeSystems", price: 32 },
    { id: 11, name: "SmartSolutions", price: 16 },
    { id: 12, name: "NexGen", price: 24 },
    { id: 13, name: "MegaTech", price: 19 },
    { id: 14, name: "ByteCorp", price: 29 },
    { id: 15, name: "InfiniteSolutions", price: 21 },
    { id: 16, name: "ElevateTech", price: 11 },
    { id: 17, name: "VistaSoft", price: 26 },
    { id: 18, name: "AgileSystems", price: 14 },
    { id: 19, name: "TechWave", price: 17 },
    { id: 20, name: "FutureTech", price: 23 }
  ];




  // Retrieve the stored stock prices from local storage
  const storedStockPrices = localStorage.getItem('stockPrices');
//console.log("storedStockPrices   "+storedStockPrices);

 // Check if stockPrices data exists in local storage
 // if (storedStockPrices) {
if (storedStockPrices !== "" && storedStockPrices !== null && storedStockPrices !== undefined) {

  // Parse the stored stock prices string into an object or set it to an empty object if null
  const stockPrices = JSON.parse(storedStockPrices) || {};

  // Update the prices of the companies with the stored stock prices
  const updatedCompanies = market.map(company => {
    const { name } = company;
    const price = company.price || stockPrices[name];
    return { name, price };
  });

  // You can use the updatedCompanies array in your code as needed

  return updatedCompanies;
}
  
// If stockPrices data doesn't exist in local storage, return the default market data
  return market;
}







// Example usage
var companies = getMarket();
//console.log(companies);

function saveStockPrices(xxx) {
  let data = JSON.parse(JSON.stringify(xxx));

  // Convert the updatedStockData to an array of objects
  const stockData = Object.entries(data).map(([name, price]) => ({ name, price }));

  // Retrieve the existing stock prices from local storage or initialize an empty object
  const storedStockPrices = JSON.parse(localStorage.getItem('stockPrices7Day')) || {};

  // Update the stock prices for each stock in the stockData array
  stockData.forEach(stock => {
    const { name, price } = stock;
    let lastSevenPrices = storedStockPrices[name] || [];

    // Ensure lastSevenPrices is an array
    if (!Array.isArray(lastSevenPrices)) {
      lastSevenPrices = [];
    }

    lastSevenPrices.push(price.toFixed(2)); // Round the price to two decimal places

    // Limit the array to store only the last 7 prices
    if (lastSevenPrices.length > 12) {
      lastSevenPrices.shift();
    }

    storedStockPrices[name] = lastSevenPrices;
  });

  // Save the updated stock prices to local storage
  localStorage.setItem('stockPrices7Day', JSON.stringify(storedStockPrices));
}



function getStockPrices(stockName) {
  // Retrieve the stored stock prices from local storage
  const storedStockPrices = JSON.parse(localStorage.getItem('stockPrices7Day')) || {};

  // Retrieve the last 7 stock prices for the given stock name
  const stockPrices = storedStockPrices[stockName] || [];

  return stockPrices;
}






function generateStockChart(stockData, theName) {
  console.log("stockData   " + stockData);
  console.log("stockData   " + stockData.name);
  console.log("stockData.name   " + stockData[0]);

  const canvas = document.getElementById("stock-chart");
  const ctx = canvas.getContext("2d");

  // Define the chart dimensions and margins
  const chartWidth = canvas.width - 40;
  const chartHeight = canvas.height - 40;
  const marginTop = 20;
  const marginBottom = 20;
  const marginLeft = 20;
  const marginRight = 20;

  // Calculate the maximum and minimum values of the stock data
  const maxValue = Math.max(...stockData);
  const minValue = Math.min(...stockData);

  // Calculate the height of each data point on the chart
  const dataHeight = (chartHeight - marginTop - marginBottom) / (maxValue - minValue);

  // Calculate the width of each data point on the chart
  const dataWidth = (chartWidth - marginLeft - marginRight) / (stockData.length - 1);

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the chart background
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(marginLeft, marginTop, chartWidth, chartHeight);

  // Draw the chart axes
  ctx.beginPath();
  ctx.moveTo(marginLeft, marginTop);
  ctx.lineTo(marginLeft, chartHeight - marginBottom);
  ctx.lineTo(chartWidth + marginLeft, chartHeight - marginBottom);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw the data points on the chart
  ctx.beginPath();
  ctx.moveTo(marginLeft, chartHeight - marginBottom - (stockData[0] - minValue) * dataHeight);
  for (let i = 1; i < stockData.length; i++) {
    const x = marginLeft + i * dataWidth;
    const y = chartHeight - marginBottom - (stockData[i] - minValue) * dataHeight;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw the data point markers
  ctx.fillStyle = "#007bff";
  for (let i = 0; i < stockData.length; i++) {
    const x = marginLeft + i * dataWidth;
    const y = chartHeight - marginBottom - (stockData[i] - minValue) * dataHeight;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Add labels to the axes
  ctx.font = "12px Arial";
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.textAlign = "center";
  ctx.fillText(theName, canvas.width / 2, chartHeight + marginBottom - 5);
  ctx.textAlign = "right";
  ctx.fillText(maxValue.toFixed(2), marginLeft - 5, marginTop + 12);
  ctx.fillText(minValue.toFixed(2), marginLeft - 5, chartHeight - marginBottom + 12);  
  
  //ctx.fillText(maxValue, marginLeft - 5, marginTop + 12);
  //ctx.fillText(minValue, marginLeft - 5, chartHeight - marginBottom + 12);
}



function updateStockQuantity(companyName, updatedStockQuantity, totalStockCost) {
  // Retrieve the current portfolio from local storage
  const portfolioString = localStorage.getItem('portfolio');

  // Parse the portfolio string to an object or initialize an empty object if no portfolio is stored
  const portfolio = portfolioString ? JSON.parse(portfolioString) : {};

  // Update the stock quantity for the given company in the portfolio
  portfolio[companyName] = {
    stockQuantity: updatedStockQuantity,
    totalCost: totalStockCost
  };

  // Save the updated portfolio back to local storage
  localStorage.setItem('portfolio', JSON.stringify(portfolio));

  // You can also update the UI to reflect the updated stock quantity if necessary
  // For example, you can update a stock quantity display on the screen
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



function isOdd(number) {
  return number % 2 === 1;
}


//// DISPLAY PORFTFOLIO

function displayPortfolio() {
  // Clear the existing portfolio display
  const portfolioContainer = document.getElementById("portfolio-body");
  portfolioContainer.innerHTML = "";

  // Retrieve the portfolio from local storage
  const portfolio = localStorage.getItem('portfolio');

  // Parse the portfolio string into an object
 const portfolioString = JSON.parse(portfolio);

  
  ///console.log(portfolio+"    portfolioString    " + portfolioString);
// Check if the portfolio is null or undefined
  if (portfolioString == "" || portfolioString == null || portfolioString == "undefined" || portfolioString == undefined  ) {
    // Handle the case when the portfolio is empty or not available
 //   console.log("Portfolio is empty or not available");
    return;
  }

  // Initialize the total value variable
  let totalValue = 0;
  

// Iterate over each company in the portfolio
for (const [name, { stockQuantity, totalCost }] of Object.entries(portfolioString)) {
  // Skip companies with stock quantity of 0
  if (stockQuantity === 0) {
//    continue;
       // Remove the company from the portfolio object
    delete portfolioString[name];
  }

  // Retrieve the stock price for the current company (assuming it's stored somewhere)
  const stockPrice = getStockPrice(name);

  // Calculate the value of the current company's stocks
  const companyValue = stockPrice * stockQuantity;

  // Add the company value to the total value
  totalValue += companyValue;

  // Create a new table row for the company in the portfolio display
  const row = document.createElement("tr");


  
  // Create table cells for the company name, stock price, average stock price, stock quantity, and company value
  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  const priceCell = document.createElement("td");
  const totalCostCell = document.createElement("td");
  const quantityCell = document.createElement("td");
  quantityCell.textContent = stockQuantity || "";
  const valueCell = document.createElement("td");
  priceCell.textContent = "$" + (stockPrice.toFixed(2) || 0);
  totalCostCell.textContent = "$" + (totalCost.toFixed(2) || 0);
  valueCell.textContent = "$" + (companyValue.toFixed(2) || 0);

    // Apply conditional styling based on totalCost and companyValue
  if (totalCost < companyValue) {
    row.style.backgroundColor = "#4CAF50";
  } else if (totalCost > companyValue) {
    row.style.backgroundColor = "#f44336";
  } else {
    row.style.backgroundColor = "white";
  }
  
  row.addEventListener("click", () => openStockPopup('', name));
  row.appendChild(priceCell);

  // Append the table cells to the row
  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(totalCostCell);
  row.appendChild(quantityCell);
  row.appendChild(valueCell);

  // Append the row to the portfolio display
  portfolioContainer.appendChild(row);
}

// Save the updated portfolio back to local storage
localStorage.setItem('portfolio', JSON.stringify(portfolioString));

  // Display the total value of the portfolio
  const totalValueCell = document.getElementById("portfolio-total-value");
  totalValueCell.textContent = "$" + totalValue.toFixed(2);
}


/// START UPDATE PRICES
function updateStockPrices() {

     timeAndDateFunc();
  // Update the stock prices in the user interface
updateStockPricesUI();
  
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


let randomNum = Math.floor(Math.random() * 15) + 1;
//console.log("randomNum   "+randomNum); 
   if(randomNum == 8){
//   if(isOdd(randomNum)  == true){
 
    
if (Math.random() < 0.1) { // 10% chance of a news event
  const numCompaniesAffected = Math.floor(Math.random() * 2) + 1; // Randomly select 1 to 2 companies

  for (let i = 0; i < numCompaniesAffected; i++) {
    const randomCompanyIndex = Math.floor(Math.random() * companies.length);
    const company = companies[randomCompanyIndex];

    const newsChance = Math.random() * 0.6 + 0.1; // Random chance between 10% and 70%

    if (Math.random() < newsChance) { // Check if the news event occurs based on the chance
      const newsChangePercentage = (Math.random() * 0.05 + 0.5) * 100; // Random change between 5% and 10%

      const isPositiveChange = Math.random() < 0.5; // 50% chance of positive change

      const changePercentage = Math.min(newsChangePercentage, 30); // Limit change to 30%

      const newsChange = (isPositiveChange ? 1 : -1) * (company.price * (changePercentage / 100)); // Calculate the news change

      company.price += newsChange; // Apply the news change to the company's stock price

      stockPrices[company.name] = company.price; // Update the stock price in the stockPrices object

      const isPositiveChangeNew = newsChange >= 0;
      const changePercentageFormatted = `${Math.abs(changePercentage).toFixed(2)}%`;
      const isPositiveLabel = isPositiveChangeNew ? 'increased' : 'decreased';
      const newsEvent = `Breaking News: ${company.name} price ${isPositiveLabel} by ${changePercentageFormatted}`;
      
document.getElementById("msg-area").textContent = "";

      addNewsEvent(newsEvent, "main", company.name); // Add the news event to the UI

      console.log("newsEvent    " + newsEvent);
    }
  }
}





  }
   

    // Save the updated company price in your data structure or storage mechanism
    // For example, you can store it in the stockPrices object
     stockPrices[company.name] = company.price;

  }

 //   console.log(JSON.stringify(stockPrices)+" <br> stockPrices 44   "+stockPrices);
//saveStockPrices(JSON.parse(JSON.stringify(stockPrices)));
saveStockPrices(stockPrices);

  // Save the updated stock prices object in local storage
  localStorage.setItem('stockPrices', JSON.stringify(stockPrices));
}


function howMuchStock(stockPrice, availableFunds) {
  const quantity = Math.floor(availableFunds / stockPrice);
  document.getElementById("stock-popup-input").value = quantity;
}


function getStockOwned(xxx){
//  console.log("????????????????????????????? xxxx   " + xxx);
  
document.getElementById("stock-popup-input").value = xxx;

}


var intervalStock;
let theCompany;
let theCompanyName;

function startUITimer() {
    console.log("startUITimer");
//setInterval
  clearTimeout(intervalStock);
  intervalStock = setTimeout(() => {
    openStockPopup('');
  }, 5000);
}

// Open the stock popup and populate it with the company details
function openStockPopup(xxx, stockName) {

     console.log("xxxxxxxxxxxxxxxxxxxxxxx   " + xxx);

if (xxx !== '' && xxx !== null && xxx !== undefined) {
  theCompany = xxx;
  theCompanyName = xxx.name;
 // console.log("company.name   " + theCompanyName);
  
}else{
    //  console.log("storged company.name   " + theCompanyName);
// console.log("????????????????????????????????????>   ");
}
  if(stockName){
theCompanyName = stockName;
  }
  const stockPrices = getStockPrices(theCompanyName);
//  console.log("stockPrices xxxx   " + stockPrices);

  generateStockChart(stockPrices, theCompanyName);
  

 // const stockPrice = getStockPrice(theCompanyName);
//  console.log("stockPrice?? xxxx   " + stockPrice);
  
  const stockPopup = document.getElementById("stock-popup");
  const stockPopupTitle = document.getElementById("stock-popup-title");
  const stockPopupPrice = document.getElementById("stock-popup-price");
  const stockPopupQuantity = document.getElementById("stock-popup-quantity");
  const stockPopupInput = document.getElementById("stock-popup-input");
  const stockPopupBuy = document.getElementById("stock-popup-buy");
  const stockPopupSell = document.getElementById("stock-popup-sell");
  const stockPopupCash = document.getElementById("stock-popup-cash");

  stockPopupTitle.textContent = theCompanyName;

    stockPopupPrice.textContent = `Price: $${getStockPrice(theCompanyName).toFixed(2) || 0}`;
stockPopupQuantity.textContent = `Own: ${getStockQuantity(theCompanyName)?.stockQuantity || 0}`;
  stockPopupCash.textContent = `Cash: $${getAvailableFunds().toFixed(2) || 0}`;




if (xxx !== '' && xxx !== null && xxx !== undefined) {
  openPopup("stock-popup");
    startUITimer();
 stockPopupBuy.removeEventListener("click", buyStock);
  stockPopupSell.removeEventListener("click", sellStock);
        stockPopupInput.value = "";
        stockPopupBuy.addEventListener("click", () => buyStock(theCompanyName, parseInt(stockPopupInput.value)));
  stockPopupSell.addEventListener("click", () => sellStock(theCompanyName, parseInt(stockPopupInput.value)));
stockPopupQuantity.addEventListener("click", () => {
  const stockQuantity = getStockQuantity(theCompanyName)?.stockQuantity || 0;
getStockOwned(stockQuantity);
});

        stockPopupCash.addEventListener("click", () => {
  const stockPrice = getStockPrice(theCompanyName).toFixed(2) || 0;
  const availableFunds = getAvailableFunds().toFixed(2) || 0;
howMuchStock(stockPrice, availableFunds);
});
return;
}
  if(theCompanyName){
    startUITimer();
  }
    if(stockName){
        closePopup("portfolio-popup");
  openPopup("stock-popup");
 
 stockPopupBuy.removeEventListener("click", buyStock);
  stockPopupSell.removeEventListener("click", sellStock);
        stockPopupInput.value = "";
        stockPopupBuy.addEventListener("click", () => buyStock(theCompanyName, parseInt(stockPopupInput.value)));
  stockPopupSell.addEventListener("click", () => sellStock(theCompanyName, parseInt(stockPopupInput.value)));
stockPopupQuantity.addEventListener("click", () => {
  const stockQuantity = getStockQuantity(theCompanyName)?.stockQuantity || 0;
getStockOwned(stockQuantity);
});


      stockPopupCash.addEventListener("click", () => {
  const stockPrice = getStockPrice(theCompanyName).toFixed(2) || 0;
  const availableFunds = getAvailableFunds().toFixed(2) || 0;
howMuchStock(stockPrice, availableFunds);
});
  }   

  //clearInterval(intervalStock);
}

// Close the stock popup and remove event listeners
function closeStockPopup() {
  const stockPopupBuy = document.getElementById("stock-popup-buy");
  const stockPopupSell = document.getElementById("stock-popup-sell");

 stockPopupBuy.removeEventListener("click", buyStock);
  stockPopupSell.removeEventListener("click", sellStock);
clearInterval(intervalStock);
  closePopup("stock-popup");
}

document.getElementById("close-stock-popup").addEventListener("click", function () {
  clearInterval(intervalStock);
  closePopup("stock-popup");
});

// Function to update the UI for stock prices
function updateStockPricesUI() {
  const stocksTableBody = document.getElementById("stocks-table-body");

  // Clear the existing rows
  stocksTableBody.innerHTML = "";

  // Loop through each company and update the price and buttons in the UI
  companies.forEach((company) => {
    const { name, price, quantity } = company;
    
 //   console.log("company   " + company);
    
    // Create a new row for the company
    const row = document.createElement("tr");
    row.classList.add("stock-row");

    // Create cells for company name, price, buy button, and sell button
    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    nameCell.addEventListener("click", () => openStockPopup(company));
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = "$" + price.toFixed(2);
    priceCell.addEventListener("click", () => openStockPopup(company));
    row.appendChild(priceCell);

    // Append the row to the table body
    stocksTableBody.appendChild(row);

  });
}

var incrementCounter = 0;
var weekendCounter = 0;
var newWeekCounter = 0;
var counterValue = parseInt(localStorage.getItem('counterValue')) || 0;

function timeAndDateFunc() {
  incrementCounter++;
    counterValue++;

    localStorage.setItem('counterValue', counterValue.toString());

    // Output the current counter value
  console.log('counterValue:', counterValue);

      // Output the current counter value
  console.log('incrementCounter:', incrementCounter);

    const counter = document.getElementById("counter");

if (counterValue > 365) {
  const years = Math.floor(counterValue / 365);
  const remainingDays = counterValue % 365;
  counter.textContent = `${years} years, ${remainingDays} days`;
  // Show reminder or perform any other actions
} else {
  counter.textContent = `${counterValue} days`;
}




    const msgArea = document.getElementById("msg-area");
  // Clear the existing rows
  msgArea.innerHTML = "";


  // Increment the new week counter
  if (incrementCounter === 7) {
    newWeek(); // Call the newWeek function
    incrementCounter = 0;
  }
  // Increment the weekend counter
  if (incrementCounter === 6) {
    weekend(); // Call the weekend function
  }


    displayPortfolio();
updateNetWorthDisplay();


}





var weekendTimer;
function weekend() {
  const event = `Weekend Market Closed`;
          addNewsEvent(event, "main"); // Add the news event to the UI
    clearInterval(intervalStock); // Stop the timer
    clearInterval(interval); // Stop the timer
    clearTimeout(weekendTimer); // Stop the timer
  
// Start the timer
 weekendTimer = setTimeout(() => {
  counterValue = 7; // Increment the counter by 1
     console.log('weekend counterValue:', counterValue);
   
 clearInterval(interval); // Stop the timer
    interval = setInterval(updateStockPrices, dayTimer);
   
 // timeAndDateFunc();
  }, 10000); // Run the timer every 10 seconds (10 000 milliseconds)
}

function newWeek() {
  const event = `New Week Market Open`;
          addNewsEvent(event, "main"); // Add the news event to the UI
       console.log('new week counterValue:', counterValue);

//      clearInterval(intervalStock); // Stop the timer
  //  clearInterval(interval); // Stop the timer
    //  clearInterval(weekendTimer); // Stop the timer
   // interval = setInterval(updateStockPrices, dayTimer);
  updateStockPrices();
}




// Function to update the net worth display
function updateNetWorthDisplay() {
  console.log('updateNetWorthDisplay');

  
  // Calculate the net worth based on the stocks owned and their current prices
  let netWorth = calculateNetWorth();

     let totalCashCell = document.getElementById("cash-total-value");
  let cash = getAvailableFunds();
  totalCashCell.textContent = "$" +  `${cash.toFixed(2)}`;
  // Update the net worth value in the UI
document.getElementById("net-worth-value").textContent = `$${netWorth.toFixed(2).toLocaleString()}`;
     


  newDayFunc();
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
    const initialFunds = 500;
      const event = `$${initialFunds} added to account`;
          addNewsEvent(event, "bank"); // Add the news event to the UI
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
        // Add the news event
  const event = `Funds are low $${amount}`;
          addNewsEvent(event, "bank"); // Add the news event to the UI

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

    // Add the news event
  const event = `Funds are low $${amount}`;
          addNewsEvent(event, "bank"); // Add the news event to the UI    return;
  }
  
  // Add the specified amount to the current funds
  const newFunds = currentFunds + amount;

        // console.log("newFunds add   "+newFunds);
  const event = `$${amount} added to account`;
  addNewsEvent(event, "bank"); // Add the news event to the UI  
  
  // Update the available funds in local storage
  localStorage.setItem('availableFunds', newFunds.toString());
       updateNetWorthDisplay();
}






// Function to calculate the net worth
function calculateNetWorth() {
  // Calculate the value of all stocks owned
  const stockValue = companies.reduce((total, company) => {
    const stockPrice = getStockPrice(company.name); // Retrieve the current stock price for the company
    const  stockQuantity  = getStockQuantity(company.name).stockQuantity || 0; // Retrieve the stock quantity owned


    return total + stockPrice * stockQuantity;
  }, 0);
  
  // Calculate the value of other assets like cash, cars, houses, etc.
  const cashValue = getAvailableFunds(); // Implement this function to get the available funds
  const carValue = calculateCarValue(); // Implement this function to calculate the value of cars
  const houseValue = calculateHouseValue(); // Implement this function to calculate the value of houses


              // console.log(cashValue +"    calculate   "+carValue+"   NetWorth    "+houseValue);

  // Calculate the total net worth by adding the stock value and other assets value
  const netWorth = stockValue + cashValue + carValue + houseValue;
    //console.log("stockValue    " + stockValue);

  // Return the total net worth
  return netWorth;
}

var counT = 0;

function buyStock(companyName, quantityToBuy, event) {
  const company = companies.find((company) => company.name === companyName);
  const stockPrice = company.price;
  const availableFunds = getAvailableFunds();
counT++;
  
       //  console.log(counT+"    event buy   "+event);

  const totalCost = stockPrice * quantityToBuy;

if (totalCost <= availableFunds && quantityToBuy > 0) {
  deductFunds(totalCost);
  const currentStock = getStockQuantity(companyName);
  let stockQuantity = currentStock.stockQuantity || 0;
  
  const updatedStockQuantity = stockQuantity + quantityToBuy;
  
  const currentTotalCost = currentStock.totalCost || 0;

  let stockCost = currentTotalCost + totalCost;
  
//    console.log(currentTotalCost + " currentTotalCost " + totalCost);
  
//  console.log("stockCost    " + stockCost);

  updateStockQuantity(companyName, updatedStockQuantity, stockCost);

  alert(`Successfully bought ${quantityToBuy} ${companyName} stocks for $${totalCost.toFixed(2)}. total stock price: $${stockCost.toFixed(2)}.`);



        // console.log(counT+"    event buy   "+event);

      updateNetWorthDisplay();

      const eventBuy = `Bought ${quantityToBuy} shares of ${companyName} for $${totalCost.toFixed(2)}`;
  addNewsEvent(eventBuy); // Add the news event to the UI  
  
      alert(counT+"    buy : Invalid quantity or insufficient funds to buy stocks.");
    }
  clearInterval(intervalStock);
  closePopup("stock-popup");

}

function sellStock(companyName, quantityToSell) {
  const company = companies.find((company) => company.name === companyName);
  const stockPrice = company.price;
  const stockQuantity = getStockQuantity(companyName).stockQuantity;
  const availableFunds = getAvailableFunds();



    if (quantityToSell <= stockQuantity && quantityToSell > 0) {
      const totalEarnings = stockPrice * quantityToSell;
      addFunds(totalEarnings);
       //  console.log("totalEarnings sell   "+totalEarnings);

 const updatedStockQuantity = stockQuantity - quantityToSell || 0;

      
  let stockCost = updatedStockQuantity / stockPrice;

      
      updateStockQuantity(companyName, updatedStockQuantity, stockCost);

      alert(`Successfully sold ${quantityToSell} ${companyName} stocks for $${totalEarnings.toFixed(2)}.`);

      updateNetWorthDisplay();

      const eventSell = `Sold ${quantityToSell} shares of ${companyName} for $${totalEarnings.toFixed(2)}`;
  addNewsEvent(eventSell); // Add the news event to the UI    
      
    } else {
      alert("1 sell : Invalid quantity or insufficient stocks to sell.");
    }
  clearInterval(intervalStock);
  closePopup("stock-popup");

}




const lenders = [
  { id: "1", name: "Fortune Finance", funds: 100000, interestRate: 0.1, minNetWorth: 100, loanLength: "30" },
  { id: "2", name: "Prestige Bank", funds: 50000, interestRate: 0.15, minNetWorth: 300, loanLength: "" },
  { id: "3", name: "Elite Capital", funds: 75000, interestRate: 0.12, minNetWorth: 3000, loanLength: "15" },
  { id: "4", name: "ABC Lenders", funds: 200000, interestRate: 0.09, minNetWorth: 500, loanLength: "20" },
  { id: "5", name: "Global Investments", funds: 1500000, interestRate: 0.08, minNetWorth: 10000, loanLength: "45" },
  { id: "6", name: "Wealthy Funding", funds: 300000, interestRate: 0.07, minNetWorth: 2000, loanLength: "25" },
  { id: "7", name: "Prime Lenders", funds: 500000, interestRate: 0.06, minNetWorth: 5000, loanLength: "40" },
  { id: "8", name: "Golden Bank", funds: 80000, interestRate: 0.11, minNetWorth: 800, loanLength: "10" },
  { id: "9", name: "Silver Finance", funds: 250000, interestRate: 0.13, minNetWorth: 1500, loanLength: "35" },
  { id: "10", name: "Diamond Capital", funds: 400000, interestRate: 0.05, minNetWorth: 50000, loanLength: "30" }
];

function updateLenderDetails() {
  const lenderSelect = document.getElementById("lender-select");
  const selectedLenderName = lenderSelect.value;
  const selectedLender = lenders.find((lender) => lender.name === selectedLenderName);

  if (selectedLender) {
    document.getElementById("lender-Max").textContent = "$" + selectedLender.funds;
    document.getElementById("lender-Rate").textContent = selectedLender.interestRate;
    document.getElementById("lender-LoanLength").textContent = selectedLender.loanLength + " days";
  }

}


// Event listener for opening the loans popup
document.getElementById('open-loans-popup').addEventListener('click', () => {
  displayLoanHistory();
  openPopup('loans-popup');
});

// Event listener for closing the loans popup
document.getElementById('close-loans-popup').addEventListener('click', () => {
  closePopup('loans-popup');
});

function updateLenderOptions() {
  const lenderSelect = document.getElementById("lender-select");
  const newWorth = calculateNetWorth();
  const eligibleLenders = lenders.filter(lender => lender.minNetWorth <= newWorth);

//  lenderSelect.innerHTML = "";

  eligibleLenders.forEach(lender => {
    const option = document.createElement("option");
    option.value = lender.name;
    option.textContent = lender.name;
    lenderSelect.appendChild(option);
  });

      updateLenderDetails();

  
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
  closePopup("lender-popup");
      
// Create an object to store the lender payment information
const lenderPaymentInfo = {
  id: selectedLender.id,
  borrowedAmount: amount,
  name: selectedLender.name,
  interestRate: selectedLender.interestRate,
  loanLength: selectedLender.loanLength,
  startDay: counterValue
};

// Save the lender payment information to local storage
localStorage.setItem('lenderPaymentInfo', JSON.stringify(lenderPaymentInfo));

 // Add news event
  const event = `Borrowed $${amount} from ${selectedLender.name}`;
  addNewsEvent(event);
      
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

var eventDayCount = 0;

function newDayFunc(){
// Retrieve the lender payment information from local storage
const lenderPaymentInfoString = localStorage.getItem('lenderPaymentInfo');
const lenderPaymentInfo = JSON.parse(lenderPaymentInfoString);
  let startDay = lenderPaymentInfo?.startDay || 0;
  let paymentFrequency = lenderPaymentInfo?.paymentFrequency || 0;

  
// Check if automaticPayments is true and paymentFrequency is valid
if (lenderPaymentInfo && lenderPaymentInfo.automaticPayments && counterValue - startDay > paymentFrequency) {
  const paymentFrequency = lenderPaymentInfo.paymentFrequency;
  const counterValue = parseInt(localStorage.getItem('counterValue')) || 0;

  // Calculate the number of payment cycles based on paymentFrequency and counterValue
  const paymentCycles = Math.floor(counterValue / paymentFrequency);
  

  // Check if the borrower owes any payment
  if (lenderPaymentInfo.borrowedAmount < lenderPaymentInfo.paymentAmount) {
    const paymentToDeduct = borrowedAmount;

    // Deduct funds from available funds
    deductFunds(paymentToDeduct);
    // Add news event
  const event = `Made a loan payment of $${paymentToDeduct} to ${lenderPaymentInfo.name} `;
  addNewsEvent(event);
    
  } else {
    // Calculate the total payment amount based on paymentCycles
    const totalPaymentAmount = lenderPaymentInfo.paymentAmount * paymentCycles;

    if (lenderPaymentInfo.borrowedAmount < totalPaymentAmount) {
      const paymentToDeduct = lenderPaymentInfo.borrowedAmount;

      // Deduct funds from available funds
      deductFunds(paymentToDeduct);
        const event = `Made a loan payment of $${paymentToDeduct} to ${lenderPaymentInfo.name} `;
  addNewsEvent(event);
    } else {
      // Handle the case when the borrower owes more than the total payment amount
      // You can add your own logic here based on your requirements
    }
  }
}

      // Start tracking repayment terms
//       console.log("paymentToDeduct 597   "+paymentToDeduct);

  if(eventDayCount > 20){
    clearInterval(interval); // Clear the interval to stop updating stock prices
  openPopup("pause-popup");
  pauseGame(); // Pause the game
     eventDayCount = 0;
  }
  eventDayCount++;
//  console.log("eventDayCount   "+eventDayCount);
}




// Function to add news event
function addNewsEvent(event, xxx,name) {
        console.log(xxx +"  xxx  "+ name+"   event    " + event);

  eventDayCount = 0;
  
if(xxx =="main"){

      const newsContent = document.getElementById("msg-area");
    const newsItem = document.createElement("div");
  
     newsItem.addEventListener("click", () => openStockPopup('',name));

    newsItem.classList.add("breaking-news-item");
    newsItem.textContent = event;
    newsContent.prepend(newsItem); // Add the event to the top of the news content
    newsContent.scrollTop = 0; // Scroll to the top of the news content
  
 // openPopup("news-popup");

}
  
if(xxx =="bank"){


  
  // Save the event to localStorage
const savedBankEvents = JSON.parse(localStorage.getItem("savedBankEvents")) || [];
// Push the new event to the array
savedBankEvents.push(event);
// Keep only the last 20 entries in the array
if (savedBankEvents.length > 20) {
  savedBankEvents.shift(); // Remove the oldest entry from the beginning of the array
}
// Save the updated array in local storage
localStorage.setItem("savedBankEvents", JSON.stringify(savedBankEvents));

//  updateNetWorthDisplay();
   getBankEvents();
}else{

const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
// Push the new event to the array
savedEvents.push(event);
// Keep only the last 20 entries in the array
if (savedEvents.length > 20) {
  savedEvents.splice(0, savedEvents.length - 20); // Remove the oldest entries from the beginning of the array
}
if (savedEvents.length > 20) {
  savedEvents.shift(); // Remove the oldest entry from the beginning of the array
}
  
// Save the updated array in local storage
localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

  //updateNetWorthDisplay();
     getStockEvents();

}
}



//window.addEventListener("DOMContentLoaded", function () {

  function getStockEvents(){
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
  
  // Reverse the order of savedEvents array to display the events in descending order (latest events on top)
  const reversedEvents = savedEvents.reverse();
  
  reversedEvents.forEach(function (event) {
    const newsContent = document.getElementById("news-content");
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.textContent = event;
    newsContent.prepend(newsItem); // Add the event to the top of the news content
    newsContent.scrollTop = 0; // Scroll to the top of the news content
  });
  }
  getStockEvents();
  
//});



//window.addEventListener("DOMContentLoaded", function () {

  function  getBankEvents(){
  const savedEvents = JSON.parse(localStorage.getItem("savedBankEvents")) || [];
  
  // Reverse the order of savedEvents array to display the events in descending order (latest events on top)
  const reversedEvents = savedEvents.reverse();
  
  reversedEvents.forEach(function (event) {
    const newsContent = document.getElementById("bank-content");
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.textContent = event;
    newsContent.prepend(newsItem); // Add the event to the top of the news content
    newsContent.scrollTop = 0; // Scroll to the top of the news content
  });
  }
  getBankEvents();
//});









// Call the updateStockPrices  see 27 dayTimer
var interval = setInterval(updateStockPrices, dayTimer);

updateStockPrices();
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
  // Check if the popupId matches specific conditions, and don't take any action
  if (popupId === "portfolio-popup" || popupId === "news-popup" || popupId === "bank-popup" || popupId === "stock-popup") {
    // Do nothing for specific popups
  } else {
    clearInterval(interval); // Clear the interval to stop updating stock prices
    console.log("Timer stopped");
  }

  // Check if the popupId is "news-popup"
  if (popupId === "news-popup") {
    const popups = document.querySelectorAll(".popup");
    for (const popup of popups) {
      if (popup.classList.contains("popupOpened")) {
        console.log("popupOpened");
        return; // Exit the function if the "news-popup" is already opened
      } else {
        var popupElement = document.getElementById(popupId);
        console.log("Open news popup");
        popupElement.style.display = "block";
      }
    }
  } else {
    // Get the specified popup element
    var popupElement = document.getElementById(popupId);
    console.log("Open popup  ?????");
   popupElement.style.display = "block";
   popupElement.classList.add("popupOpened");
  }
}

 




// Function to close the specified popup window
function closePopup(popupId) {
if (interval) {
  console.log("Interval is running.");
} else {
  interval = setInterval(updateStockPrices, dayTimer); // Restart the interval to resume updating stock prices
}
  console.log("closePopup");
  document.getElementById(popupId).classList.remove("popupOpened");

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





// Function to retrieve loan information from local storage
function getLoanInfo() {

  // Retrieve the portfolio from local storage
  const info = localStorage.getItem('lenderPaymentInfo');

  // Parse the portfolio string into an object
 const Info = JSON.parse(info);

const loanInfo = JSON.stringify(Info, null, 2);

  return loanInfo || [];
}





// Function to display loan history on the loans page
function displayLoanHistory() {
  const loansContent = document.getElementById('loans-content');
  loansContent.innerHTML = ''; // Clear previous loan history
  
  const loanInfo = getLoanInfo();
  

//console.log("    loanInfo   " + loanInfo);
  const parsedLoanInfo = JSON.parse(loanInfo);

if (Object.keys(parsedLoanInfo).length === 0) {
  loansContent.textContent = 'No loan history found.';
  return;
}


const loanElement = document.createElement('div');

Object.keys(parsedLoanInfo).forEach((key) => {
  if (Object.hasOwnProperty.call(parsedLoanInfo, key)) {
    const { name, borrowedAmount, loanLength } = parsedLoanInfo;

    const loanItem = document.createElement('div');
    loanItem.classList.add('loan-item');
    loanItem.textContent = `${name} ${borrowedAmount} ${loanLength}`;

    // Add click event listener to make payment
    loanItem.addEventListener('click', () => makePayment(parsedLoanInfo));

    loanElement.appendChild(loanItem);
  }
});

loansContent.appendChild(loanElement);

/*
    // Apply conditional styling based on totalCost and companyValue
  if (totalCost < companyValue) {
    row.style.backgroundColor = "#4CAF50";
  } else if (totalCost > companyValue) {
    row.style.backgroundColor = "#f44336";
  } else {
    row.style.backgroundColor = "white";
  }
  */

  
}

// Function to make a payment for a specific loan
function makePayment(newLoan) {
    console.log("newLoan  ?????    "  + newLoan.name);

  const loanInfo = getLoanInfo();
  const loan = loanInfo.find((loan) => loan.id === newLoan.id);

  if (!loan) {
    console.log('Loan not found.');
    return;
  }

  // Perform payment logic here
  // ...
  console.log(`Payment made for loan: ${loan.name}`);
}































// Add event listeners for other popups in a similar manner
document.getElementById("open-bank-popup").addEventListener("click", function () {
  openPopup("bank-popup");
});

document.getElementById("close-bank-popup").addEventListener("click", function () {
  closePopup("bank-popup");
});

document.getElementById("open-lender-popup").addEventListener("click", function () {
  updateLenderOptions();
  
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
    interval = setInterval(updateStockPrices, dayTimer);
});


document.getElementById("open-news-popup").addEventListener("click", function() {
  openPopup("news-popup");
});

document.getElementById("close-news-popup").addEventListener("click", function() {
  closePopup("news-popup");
});





// Event listener for the Pause Game button
document.getElementById("pause-game-btn").addEventListener("click", function() {
    closePopup("options-popup");
      clearInterval(intervalStock); // Stop the timer
    clearInterval(interval); // Stop the timer
      clearInterval(weekendTimer); // Stop the timer
  openPopup("pause-popup");
  pauseGame(); // Pause the game
});

document.getElementById("close-pause-popup").addEventListener("click", function() {
  interval = setInterval(updateStockPrices, dayTimer);
  closePopup("pause-popup");
});




// Function to restart the game
function restartGame() {
    clearInterval(interval); // Clear the interval to stop updating stock prices

      closePopup("options-popup");

  // Clear local storage
document.addEventListener('DOMContentLoaded', function() {
  // Clean variables
counterValue = 0;

  localStorage.clear();


  function getLocalStorageKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
  return keys;
}
const keys = getLocalStorageKeys();
for (const key in keys) {
  localStorage.setItem(key, null);
}
  
console.log(keys);


  
  });

  // Reset game state, UI elements, or perform necessary actions
  console.log("Game restarted");
}

/*
//getMarket();
  
    // Update the stock prices in the user interface
    playerFunds = 500; // Reset initial funds to 500

updateStockPrices();
// Call the updateNetWorthDisplay function initially and whenever there's a change in net worth
updateNetWorthDisplay();
*/





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

