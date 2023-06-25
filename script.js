
var daySpeedTimer = 5000; //10000 = 10sec 5000 = 5sec
var adTimer = 10; //10000 = 10sec 5000 = 5sec

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




  const storedStockPrices = localStorage.getItem('stockPrices');
  const stockPrices = storedStockPrices ? JSON.parse(storedStockPrices) : {};

  const updatedCompanies = market.map(company => {
    const { name } = company;
    const price = stockPrices[name] || company.price;


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
 
    
if (Math.random() < 0.8) { // 20% chance of a news event
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
      
document.getElementById("msg-Text").textContent = "";
      
      const newsEvent = `Breaking News: ${company.name} price ${isPositiveLabel} by ${changePercentageFormatted}`;
      addNewsEvent(newsEvent, "main", company.name); // Add the news event to the UI
console.log("33333333   ");

 
      
      console.log("newsEvent    " + newsEvent);
          }
        }
      }
   }
      
     stockPrices[company.name] = company.price;

   // Return the updated company data
    return { name, price };
  });


  // Store the updated stock prices in local storage
localStorage.setItem('stockPrices', JSON.stringify(stockPrices));

  return updatedCompanies;
}














function formatCurrency(number) {
  return "$" + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



// Example usage
var companies = getMarket();

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
//  console.log("stockData   " + stockData);
//  console.log("stockData   " + stockData.name);
 // console.log("stockData.name   " + stockData[0]);

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

  
  //console.log(portfolio+"    portfolioString    " + portfolioString);
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

var nextDayTimeout;


/// START UPDATE PRICES
 function updateStockPrices() {

 companies = getMarket();
   
console.log("111111111111111   ");
         timeAndDateFuncUI();

       // Update the stock prices in the user interface
console.log("222222   ");
updateNetWorthDisplay();


const msgText = document.getElementById("msg-Text");
  // Clear the existing rows
  msgText.innerHTML = "";
  

    openStockPopup('');



console.log('daySpeedTimer:', daySpeedTimer);

// Clear the existing timeout
clearTimeout(nextDayTimeout);

// Set a new timeout to run the NewDayFunc() after a specified time interval
nextDayTimeout = setTimeout(() => {
//  console.log("Executing NewDayFunc()");
  NewDayFunc();
    console.log("77777777777777777777777777777   ");

}, parseInt(daySpeedTimer));

    console.log("888888888888888888888888888888888888888888888888888   ");

}



function NewDayFunc(){

console.log("9999999999999999999999999999999999999   ");
timeAndDateFunc();
  
 updateStockPricesUI();

 

}






function howMuchStock(stockPrice, availableFunds) {
  const quantity = Math.floor(availableFunds / stockPrice);
  document.getElementById("stock-popup-input").value = quantity;
}


function getStockOwned(xxx){
//  console.log("????????????????????????????? xxxx   " + xxx);
  
document.getElementById("stock-popup-input").value = xxx;

}


let theCompany;
let theCompanyName;

  const stockPopup = document.getElementById("stock-popup");
  const stockPopupTitle = document.getElementById("stock-popup-title");
  const stockPopupPrice = document.getElementById("stock-popup-price");
  const stockPopupQuantity = document.getElementById("stock-popup-quantity");

  const stockPopupCash = document.getElementById("stock-popup-cash");

  var stockPopupBuy = document.getElementById("stock-popup-buy");
  var stockPopupSell = document.getElementById("stock-popup-sell");
  const stockPopupInput = document.getElementById("stock-popup-input");


// Open the stock popup and populate it with the company details
function openStockPopup(xxx, stockName) {

    //console.log("xxxxxxxxxxxxxxxxxxxxxxx   " + xxx);

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
      if(theCompanyName){

  const stockPrices = getStockPrices(theCompanyName);
//  console.log("stockPrices xxxx   " + stockPrices);

  generateStockChart(stockPrices, theCompanyName);
  

 // const stockPrice = getStockPrice(theCompanyName);
//  console.log("stockPrice?? xxxx   " + stockPrice);
  


  stockPopupTitle.textContent = theCompanyName;

    stockPopupPrice.textContent = `Price: $${getStockPrice(theCompanyName).toFixed(2) || 0}`;
stockPopupQuantity.textContent = `Own: ${getStockQuantity(theCompanyName)?.stockQuantity || 0}`;
  stockPopupCash.textContent = `Cash: $${getAvailableFunds().toFixed(2) || 0}`;


//addLimitedEventListener(stockPopupBuy, "click", () => buyStock(theCompanyName, parseInt(stockPopupInput.value)));
//addLimitedEventListener(stockPopupSell, "click", () => sellStock(theCompanyName, parseInt(stockPopupInput.value)));

  let stockValue = stockPopupInput.value;
stockPopupBuy.addEventListener("click", buyStock(theCompanyName, parseInt(stockValue)));
stockPopupSell.addEventListener("click", sellStock(theCompanyName, parseInt(stockValue)));

//stockPopupBuy.addEventListener("click", () => buyStock(theCompanyName, parseInt(stockValue)));
//stockPopupSell.addEventListener("click", () => sellStock(theCompanyName, parseInt(stockValue)));
  }
  
if (xxx !== '' && xxx !== null && xxx !== undefined) {
  openPopup("stock-popup");
          stockPopupInput.value = "";


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

    if(stockName){
        closePopup("portfolio-popup");
  openPopup("stock-popup");
 
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

}



let eventListenerCounter = 0;

function addLimitedEventListener(element, event, callback) {
  if (eventListenerCounter < 1) {
    element.addEventListener(event, callback);
    eventListenerCounter++;
  }
}



// Close the stock popup and remove event listeners
function closeStockPopup() {


stockPopupBuy.removeEventListener("click", buyStock);
 stockPopupSell.removeEventListener("click", sellStock);
  closePopup("stock-popup");
}

document.getElementById("close-stock-popup").addEventListener("click", function () {
  closePopup("stock-popup");
});

// Function to update the UI for stock prices
function updateStockPricesUI() {
  const stocksTableBody = document.getElementById("stocks-table-body");

  // Clear the existing rows
  stocksTableBody.innerHTML = "";
  
//console.log("updateStockPricesUI nxxxxxxxxxxxxxxxxx   ");

  // Loop through each company and update the price and buttons in the UI
  companies.forEach((company) => {
    const { name, price, quantity } = company;
    
  // console.log(company.price+"   company   " + company.name+"  name   ");
    
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
var eventDayCount = 0;



function timeAndDateFuncUI() {
  incrementCounter++;
    counterValue++;

    localStorage.setItem('counterValue', counterValue.toString());

    // Output the current counter value
//  console.log('counterValue:', counterValue);

      // Output the current counter value
  console.log('incrementCounter:', incrementCounter);

    const counter = document.getElementById("counter");

if (counterValue > 365) {
  const years = Math.floor(counterValue / 365);
  const remainingDays = counterValue % 365;
  counter.innerHTML = `${years} years<br> ${remainingDays} days`;
  // Show reminder or perform any other actions
} else {
  counter.textContent = `${counterValue} days`;
}
}

function timeAndDateFunc() {


  if(eventDayCount > 20){

  pauseGame(); // Pause the game
     eventDayCount = 0;
  }
  eventDayCount++;

 console.log("eventDayCount   "+eventDayCount);


     console.log("day end");

  
// Increment the new week counter
if (incrementCounter > 6) {
  incrementCounter = 0;
  newWeek(); // Call the newWeek function
} else if (incrementCounter === 5) {
  weekend(); // Call the weekend function
} else {
  updateNetWorthDisplay();
  updateStockPrices();
}




}




var adCounter;
var weekendTimer;


function adCounterFunc() {
console.log("adCounter   " + adCounter);
  if(adCounter === 0){
        clearInterval(weekendTimer); // Stop the timer

newWeek();
  }else{
  let adTimerBox = document.getElementById("ad-body");
  adTimerBox.innerHTML = adCounter+" sec left";
    adCounter--;
  }
}
  


function weekend() {
  const event = `Weekend Market Closed`;
          addNewsEvent(event, "main"); // Add the news event to the UI

        clearTimeout(nextDayTimeout);


  openPopup("weekend-popup");
if(adCounter > 0){
adCounter = adTimer;
// Start the timer
 weekendTimer = setInterval(() => {
adCounterFunc();
  }, 1000); // Run the timer every 10 seconds (10 000 milliseconds)
}else{
  newWeek();
}
}


function newWeek() {
  const event = `New Week Market Open`;
          addNewsEvent(event, "main"); // Add the news event to the UI
    closePopup("weekend-popup");

updateNetWorthDisplay();
  updateStockPrices();
  
}




// Function to update the net worth display
function updateNetWorthDisplay() {
//  console.log('updateNetWorthDisplay');

  
  // Calculate the net worth based on the stocks owned and their current prices
  let netWorth = calculateNetWorth();

     let totalCashCell = document.getElementById("cash-total-value");
  let cash = getAvailableFunds();
  totalCashCell.textContent =  formatCurrency(cash);  // "$" +  `${cash.toFixed(2)}`;
  // Update the net worth value in the UI
//document.getElementById("net-worth-value").textContent = `$${netWorth.toFixed(2).toLocaleString()}`;
     
document.getElementById("net-worth-value").textContent =  formatCurrency(netWorth);


  lenderCheckFunc();
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


function getPlayerItems(itemType) {
  // Retrieve the list of items owned by the player from local storage based on the itemType
  const items = JSON.parse(localStorage.getItem(`player${itemType}`)) || [];

  return items;
}

function buyItem(itemType, item) {
  // Deduct the item price from the player's available funds
  const itemPrice = item.price;
  deductFunds(itemPrice);

  // Add the item to the player's item collection
  const playerItems = getPlayerItems(itemType);
  playerItems.push(item);

  // Update the player's item collection in local storage
  localStorage.setItem(`player${itemType}`, JSON.stringify(playerItems));
}

function calculateItemValue(itemType) {
  // Retrieve the list of items owned by the player from your data structure or storage mechanism based on the itemType
  const items = getPlayerItems(itemType); // Implement this function to get the list of items owned

  // Calculate the total value of items by summing up the individual item values
  const totalItemValue = items.reduce((total, item) => {
    const itemPrice = item.price; // Retrieve the price of the item
    const itemQuantity = item.quantity; // Retrieve the quantity of the item owned
    return total + itemPrice * itemQuantity;
  }, 0);

  return totalItemValue;
}

function showStoreItems() {
  // Retrieve the store items from your data structure or storage mechanism
  const storeItems = [
    { name: "Car A", price: 20000, image: "car-a.jpg" },
    { name: "Car B", price: 15000, image: "car-b.jpg" },
    { name: "Car C", price: 30000, image: "car-c.jpg" },
    { name: "House A", price: 250000, image: "house-a.jpg" },
    { name: "House B", price: 350000, image: "house-b.jpg" },
    { name: "House C", price: 500000, image: "house-c.jpg" },
    { name: "Gadget X", price: 1000, image: "gadget-x.jpg" },
    { name: "Gadget Y", price: 800, image: "gadget-y.jpg" },
    { name: "Gadget Z", price: 1200, image: "gadget-z.jpg" },
    // Add more items as needed
  ];

  // Get the container element to display the store items
  const storeContainer = document.getElementById("store-container");

  // Clear the existing content of the store container
  storeContainer.innerHTML = "";

  // Loop through the store items and create HTML elements to display each item
  storeItems.forEach(item => {
    // Create a div element for the item
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("store-item");

    // Create an image element for the item
    const imageElement = document.createElement("img");
    imageElement.src = "placeholder.jpg"; // Replace "placeholder.jpg" with the actual image source
    imageElement.alt = item.name;
    itemDiv.appendChild(imageElement);

    // Create a span element to display the item name
    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;
    itemDiv.appendChild(nameSpan);

    // Create a span element to display the item price
    const priceSpan = document.createElement("span");
    priceSpan.textContent = "$" + item.price.toFixed(2);
    itemDiv.appendChild(priceSpan);

    // Create a button element to buy the item
    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", () => {
      // Handle the buying functionality for the item
      buyItem(item);
    });
    itemDiv.appendChild(buyButton);

    // Append the item div to the store container
    storeContainer.appendChild(itemDiv);
  });
}





/*
// Uncomment the following code to update the player's item collections in local storage
localStorage.setItem('playerCars', JSON.stringify([]));
localStorage.setItem('playerHouses', JSON.stringify([]));
localStorage.setItem('playerExpensiveItems', JSON.stringify([]));

// Example usage:

// Buy a car from the store
const carToBuy = storeItems.find(item => item.name === "Car A");
buyItem('Cars', carToBuy);

// Buy a house from the store
const houseToBuy = storeItems.find(item => item.name === "House A");
buyItem('Houses', houseToBuy);

// Calculate the total value of cars owned by the player
const totalCarValue = calculateItemValue('Cars');
console.log('Total value of cars:', totalCarValue);

// Calculate the total value of houses owned by the player
const totalHouseValue = calculateItemValue('Houses');
console.log('Total value of houses:', totalHouseValue);


*/








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
  const event = `Funds are low $${amount.toFixed(2)}`;
          addNewsEvent(event, "bank"); // Add the news event to the UI
    
let networth = calculateNetWorth();
      if (amount <= 0 || amount > networth) {
  const event = `Bankrupt`;
          addNewsEvent(event, "main"); // Add the news event to the UI
endGame(); 
      }
    
    // Handle the error case (e.g., display an error message, throw an error, etc.)
    return;
  }
  
  // Deduct the specified amount from the current funds
  const newFunds = currentFunds - amount;
  // Update the available funds in local storage
  localStorage.setItem('availableFunds', newFunds.toString());

    const event = `$${amount.toFixed(2)} Deducted from account`;
          addNewsEvent(event, "bank"); // Add the news event to the UI    
  
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
  const event = `Funds are low $${amount.toFixed(2)}`;
          addNewsEvent(event, "bank"); // Add the news event to the UI    return;
  }
  
  // Add the specified amount to the current funds
  const newFunds = currentFunds + amount;

        // console.log("newFunds add   "+newFunds);
  const event = `$${amount.toFixed(2)} added to account`;
  addNewsEvent(event, "bank"); // Add the news event to the UI  
  
  // Update the available funds in local storage
  localStorage.setItem('availableFunds', newFunds.toString());
       updateNetWorthDisplay();
}


function displayStatusMessage(xxx, message) {
  const statusMessageElement = document.getElementById(xxx+"-status");
  statusMessageElement.textContent = message;
}



function calculateNetWorth() {
  // Calculate the value of all stocks owned
  const stockValue = companies.reduce((total, company) => {
    const stockPrice = getStockPrice(company.name); // Retrieve the current stock price for the company
    const stockQuantity = getStockQuantity(company.name).stockQuantity || 0; // Retrieve the stock quantity owned

    return total + stockPrice * stockQuantity;
  }, 0);

  // Calculate the value of other assets like cash, cars, houses, etc.
  const cashValue = getAvailableFunds(); // Implement this function to get the available funds
  const carValue = calculateItemValue('Cars'); // Calculate the value of cars using the generic function
  const houseValue = calculateItemValue('Houses'); // Calculate the value of houses using the generic function
  const expensiveItemValue = calculateItemValue('ExpensiveItems'); // Calculate the value of other expensive items

  // Calculate the total net worth by adding the stock value and other assets value
  const netWorth = stockValue + cashValue + carValue + houseValue + expensiveItemValue;

  // Return the total net worth
  return netWorth;
}

var counT = 0;

function buyStock(companyName, quantityToBuy, event) {
  const company = companies.find((company) => company.name === companyName);
  const stockPrice = company.price;
  const availableFunds = getAvailableFunds();
counT++;
  

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

  //alert(`Successfully bought ${quantityToBuy} ${companyName} stocks for $${totalCost.toFixed(2)}. total stock price: $${stockCost.toFixed(2)}.`);
displayStatusMessage("stock",`Successfully bought ${quantityToBuy} ${companyName} stocks for $${totalCost.toFixed(2)}. total stock price: $${stockCost.toFixed(2)}.`);


        // console.log(counT+"    event buy   "+event);

      updateNetWorthDisplay();

      const eventBuy = `Bought ${quantityToBuy} shares of ${companyName} for $${totalCost.toFixed(2)}`;
  addNewsEvent(eventBuy); // Add the news event to the UI  
  
    }else{
displayStatusMessage("stock",`Invalid quantity or insufficient funds to buy stocks.`);
      //alert(counT+"    buy : Invalid quantity or insufficient funds to buy stocks.");

}
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

      //alert(`Successfully sold ${quantityToSell} ${companyName} stocks for $${totalEarnings.toFixed(2)}.`);
displayStatusMessage("stock",`Successfully sold ${quantityToSell} ${companyName} stocks for $${totalEarnings.toFixed(2)}.`);

      updateNetWorthDisplay();

      const eventSell = `Sold ${quantityToSell} shares of ${companyName} for $${totalEarnings.toFixed(2)}`;
  addNewsEvent(eventSell); // Add the news event to the UI    
      
    } else {
    //  alert("1 sell : Invalid quantity or insufficient stocks to sell.");
      displayStatusMessage("stock",`sell : Invalid quantity or insufficient stocks to sell.`);

    }
  closePopup("stock-popup");

}




const lenders = [
  { id: "1", name: "Fortune Finance", funds: 1000, interestRate: 20, minNetWorth: 100, loanLength: "30" },
  { id: "2", name: "Prestige Bank", funds: 10000, interestRate: 15, minNetWorth: 500, loanLength: "15" },
  { id: "3", name: "Elite Capital", funds: 50000, interestRate: 25, minNetWorth: 2500, loanLength: "15" },
  { id: "4", name: "ABC Lenders", funds: 100000, interestRate: 20, minNetWorth: 10000, loanLength: "20" },
  { id: "5", name: "Global Investments", funds: 500000, interestRate: 10, minNetWorth: 50000, loanLength: "45" },
  { id: "6", name: "Wealthy Funding", funds: 1000000, interestRate: 15, minNetWorth: 100000, loanLength: "10" },
  { id: "7", name: "Prime Lenders", funds: 5000000, interestRate: 30, minNetWorth: 500000, loanLength: "40" },
  { id: "8", name: "Golden Bank", funds: 10000000, interestRate: 25, minNetWorth: 1000000, loanLength: "15" },
  { id: "9", name: "Silver Finance", funds: 40000000, interestRate: 10, minNetWorth: 5000000, loanLength: "5" },
  { id: "10", name: "Diamond Capital", funds: 100000000, interestRate: 20, minNetWorth: 10000000, loanLength: "10" }
];

function updateLenderDetails() {
  const lenderSelect = document.getElementById("lender-select");
  const selectedLenderName = lenderSelect.value;
  const selectedLender = lenders.find((lender) => lender.name === selectedLenderName);

  if (selectedLender) {

          // Check if the user already has a loan with the selected lender
      const existingLoanInfo = JSON.parse(localStorage.getItem('lenderPaymentInfo'));
      if (existingLoanInfo && existingLoanInfo.id === selectedLender.id) {
        console.log("You already have a loan with this lender.");
let newAmount = selectedLender.funds - existingLoanInfo.borrowedAmount ;
displayStatusMessage("lender", "You already have a $" + existingLoanInfo.borrowedAmount.toFixed(2) + " loan with " + selectedLender.name);

       // console.log(newAmount +"  selectedLender.funds  "+ selectedLender.funds+"   existingLoanInfo.borrowedAmount    " + existingLoanInfo.borrowedAmount);
if(newAmount < 0){newAmount = 0; }
            document.getElementById("lender-Max").textContent = "$" + newAmount;
    document.getElementById("lender-Rate").textContent = selectedLender.interestRate +"% per day";
    document.getElementById("lender-LoanLength").textContent = selectedLender.loanLength + " days";
      }else{
    document.getElementById("lender-Max").textContent = "$" + selectedLender.funds;
    document.getElementById("lender-Rate").textContent = selectedLender.interestRate +"% per day";
    document.getElementById("lender-LoanLength").textContent = selectedLender.loanLength + " days";
      }
  }

}



function updateLenderOptions() {
  const lenderSelect = document.getElementById("lender-select");
  const newWorth = calculateNetWorth();
  const eligibleLenders = lenders.filter(lender => lender.minNetWorth <= newWorth);

 lenderSelect.innerHTML = "";
document.getElementById("loan-amount").value='';
  eligibleLenders.forEach(lender => {
    const option = document.createElement("option");
    option.value = lender.name;
    option.textContent = lender.name;
    lenderSelect.appendChild(option);
  });
      updateLenderDetails();

  
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

      // Check if the user already has a loan with the selected lender
      const existingLoanInfo = JSON.parse(localStorage.getItem('lenderPaymentInfo'));
      let newAmount = amount;
      
      if (existingLoanInfo && existingLoanInfo.id === selectedLender.id) {
        console.log("You already have a loan with this lender.");
        newAmount += existingLoanInfo.borrowedAmount;
      }
          if (selectedLender.funds >= newAmount) {

      // Deduct the loan amount from the lender's funds
      selectedLender.funds -= newAmount;

      // Add the loan amount to the player's funds
      addFunds(amount);
    //  closePopup("lender-popup");
      
      // Create an object to store the lender payment information
      const lenderPaymentInfo = {
        id: selectedLender.id,
        borrowedAmount: newAmount,
        name: selectedLender.name,
        interestRate: selectedLender.interestRate,
        loanLength: selectedLender.loanLength,
        startDay: counterValue
      };
   
      // Save the lender payment information to local storage
      localStorage.setItem('lenderPaymentInfo', JSON.stringify(lenderPaymentInfo));

      // Add news event
      const event = `Borrowed $${newAmount.toFixed(2) } from ${selectedLender.name}`;
      addNewsEvent(event);
        displayStatusMessage("lender","Loan approved! Amount: $" + newAmount.toFixed(2) );

      // updateNetWorthDisplay();
     // console.log("Loan approved! Amount: $" + amount);
          }else{
      //console.log("Loan request denied. Insufficient funds.");
        displayStatusMessage("lender","Loan request denied. Insufficient funds." );

          }
    } else {
      // Display error message or update UI elements
     // console.log("Loan request denied. Insufficient funds.");
              displayStatusMessage("lender","Loan request denied. Insufficient funds.");

    }
  } else {
    // Display error message or update UI elements for invalid input
                  displayStatusMessage("lender","Invalid loan request. Please enter a valid amount and select a lender.");

  //  console.log("Invalid loan request. Please enter a valid amount and select a lender.");
  }
        updateLenderDetails();

}



       function lenderCheckFunc() {
  const lenderPaymentInfoString = localStorage.getItem('lenderPaymentInfo');

  if (lenderPaymentInfoString) {
    // Retrieve the lender payment information from local storage
    const lenderPaymentInfo = JSON.parse(lenderPaymentInfoString);
    
    let startDay = lenderPaymentInfo.startDay || 0;
let interestRate = lenderPaymentInfo.interestRate;
let loanLength = parseInt(lenderPaymentInfo?.loanLength) || 0;
let borrowedAmount = parseInt(lenderPaymentInfo?.borrowedAmount) || 0;
    let interest = borrowedAmount / interestRate;
  let loanNewTotal = borrowedAmount + interest;
let loanDueDate = parseInt(startDay) + parseInt(loanLength, 10);


    if (loanDueDate >= 0) {
let daysRemaining = Math.floor(loanDueDate - counterValue);
      
      const lenderPaymentInfoNew = {
        id: lenderPaymentInfo.id,
        borrowedAmount: loanNewTotal,
        name: lenderPaymentInfo.name,
        interestRate: interestRate,
        loanLength: loanLength,
        startDay: startDay
      };
   
      // Save the lender payment information to local storage
      localStorage.setItem('lenderPaymentInfo', JSON.stringify(lenderPaymentInfoNew));
         
            //  console.log(borrowedAmount +"  borrowedAmount  "+startDay);
             // console.log(loanNewTotal +"  loanNewTotal  "+ interestRate+"   interestRate    " + (interestRate * 10));

      if (daysRemaining < 4 && daysRemaining > -3 ) {

        const event = `$${loanNewTotal.toFixed(2)} is Due to ${lenderPaymentInfo.name} in ${daysRemaining} Days`;
        addNewsEvent(event, "loan");
      } else if (daysRemaining === 0) {
        const event = `You Loan with ${lenderPaymentInfo.name} is Due`;
        addNewsEvent(event, "loan");
      } else if (daysRemaining < 3) {
        const event = `${lenderPaymentInfo.name} came and got $${loanNewTotal.toFixed(2)}`;
        addNewsEvent(event, "loan");
        
        // Deduct funds for past-due loan
        deductFunds(loanNewTotal);
        
        // Clear lender payment info from local storage
localStorage.removeItem('lenderPaymentInfo');
      }
      }
  }
           displayPortfolio();

}

      
// Function to add news event
function addNewsEvent(event, xxx,name) {
   //    console.log(xxx +"  xxx  "+ name+"   event    " + event);

  eventDayCount = 0;
  
if(xxx =="main" && name){

      const newsContent = document.getElementById("msg-Text");
    const newsItem = document.createElement("div");
  
     newsItem.addEventListener("click", () => openStockPopup('',name));

    newsItem.classList.add("breaking-news-item");
    newsItem.textContent = event;
    newsContent.prepend(newsItem); // Add the event to the top of the news content
    newsContent.scrollTop = 0; // Scroll to the top of the news content

}
  if(xxx =="loan" ){

      const newsContent = document.getElementById("msg-Text");
    const newsItem = document.createElement("div");
  
     newsItem.addEventListener("click", () => openPopup("loans-popup"));

    newsItem.classList.add("breaking-news-item");
    newsItem.textContent = event;
    newsContent.prepend(newsItem); // Add the event to the top of the news content
    newsContent.scrollTop = 0; // Scroll to the top of the news content


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



  function getStockEvents(){
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
  
  // Reverse the order of savedEvents array to display the events in descending order (latest events on top)
 // const reversedEvents = savedEvents.reverse();
  
  savedEvents.forEach(function (event) {
    const newsContent = document.getElementById("news-content");
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.textContent = event;
    newsContent.prepend(newsItem); // Add the event to the top of the news content
    newsContent.scrollTop = 0; // Scroll to the top of the news content
  });
  }



  function  getBankEvents(){
  const savedEvents = JSON.parse(localStorage.getItem("savedBankEvents")) || [];
  
  // Reverse the order of savedEvents array to display the events in descending order (latest events on top)
//  const reversedEvents = savedEvents.reverse();
  
  savedEvents.forEach(function (event) {
    const newsContent = document.getElementById("bank-content");
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.textContent = event;
    newsContent.prepend(newsItem); // Add the event to the top of the news content
    newsContent.scrollTop = 0; // Scroll to the top of the news content
  });
  }


// Function to retrieve loan information from local storage
function getLoanInfo() {

  // Retrieve the portfolio from local storage

const info = localStorage.getItem('lenderPaymentInfo');
let loanInfo;

if (info) {
  try {
    loanInfo = JSON.parse(info);
  } catch (error) {
    // Handle JSON parsing error
    console.error('Error parsing lenderPaymentInfo:', error);
  }
}


  
  return loanInfo || [];
}





// Function to display loan history on the loans page
function displayLoanHistory() {
  const loansContent = document.getElementById('loans-content');
  
  loansContent.innerHTML = ''; // Clear previous loan history
  
  const parsedLoanInfo = getLoanInfo();


    if (!parsedLoanInfo) {
      // Handle the case when parsedLoanInfo is not an array
      loansContent.textContent = 'No loan history found.';
      return;
    }
  


const nameCell = document.createElement("div");
const borrowedAmountCell = document.createElement("div");
const loanLengthCell = document.createElement("div");
let dueDate = parsedLoanInfo.startDay + parsedLoanInfo.loanLength;
  let daysLeft = dueDate - counterValue;
nameCell.innerHTML = parsedLoanInfo.name;
borrowedAmountCell.innerHTML = "$" + (parsedLoanInfo.borrowedAmount ? parsedLoanInfo.borrowedAmount.toFixed(2) : "0") + " due";
loanLengthCell.innerHTML = daysLeft + "  days left";

const loanCellsWrapper = document.createElement("div");
loanCellsWrapper.classList.add('loan-item');
//loanCellsWrapper.addEventListener('click', () => makePayment(parsedLoanInfo));

loanCellsWrapper.appendChild(nameCell);
loanCellsWrapper.appendChild(borrowedAmountCell);
loanCellsWrapper.appendChild(loanLengthCell);

loansContent.appendChild(loanCellsWrapper);



  
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
// Retrieve payment container and buttons
const paymentContainer = document.getElementById("payment-container");
const paymentAmountInput = document.getElementById("payment-amount");
const payButton = document.getElementById("pay-button");
const payFullButton = document.getElementById("pay-full-button");

// Add click event listener to pay button
payButton.addEventListener("click", makePayment);

// Add click event listener to pay in full button
payFullButton.addEventListener("click", makeFullPayment);

function makePayment() {
  const paymentAmount = parseFloat(paymentAmountInput.value);
  if (!isNaN(paymentAmount) && paymentAmount > 0) {
    const lenderPaymentInfo = JSON.parse(localStorage.getItem("lenderPaymentInfo")) || {};
    const availableFunds = getAvailableFunds();

    if (paymentAmount <= availableFunds) {
      deductFunds(paymentAmount);
     // updateLoan(paymentAmount);

      // Update lender payment info
      lenderPaymentInfo.borrowedAmount = lenderPaymentInfo.borrowedAmount - paymentAmount;
    //  lenderPaymentInfo.paymentDate = new Date().toISOString();

      localStorage.setItem("lenderPaymentInfo", JSON.stringify(lenderPaymentInfo));

      // Add news event
      const event = `Paid $${paymentAmount.toFixed(2)} towards loan from ${selectedLender.name}`;
      addNewsEvent(event);
    } else {
      //alert("Insufficient funds");
                        displayStatusMessage("loans","Insufficient funds");

    }
  } else {
   // alert("Please enter a valid payment amount");
                      displayStatusMessage("loans","Please enter a valid payment amount");

  }
}

function makeFullPayment() {
  const lenderPaymentInfo = JSON.parse(localStorage.getItem("lenderPaymentInfo")) || {};
  const availableFunds = getAvailableFunds();
    if (paymentAmount <= availableFunds) {

  deductFunds(availableFunds);
  updateLoan(availableFunds);

  // Update lender payment info
  lenderPaymentInfo.borrowedAmount = availableFunds;
 // lenderPaymentInfo.paymentDate = new Date().toISOString();

  localStorage.setItem("lenderPaymentInfo", JSON.stringify(lenderPaymentInfo));

  // Add news event
  const event = `Paid in full towards loan from ${selectedLender.name}`;
  addNewsEvent(event);
         } else {
      alert("Insufficient funds");
    }
}






  getStockEvents();

  getBankEvents();



 updateStockPricesUI();

updateStockPrices();
























// Function to open the specified popup window
function openPopup(popupId) {
  // Check if the popupId matches specific conditions, and don't take any action
  if (popupId === "portfolio-popup" || popupId === "news-popup" || popupId === "bank-popup" || popupId === "stock-popup") {
    // Do nothing for specific popups
    if (nextDayTimeout) {
  console.log("Timeout is running.");
} else {
updateStockPrices();
}
  } else {
        clearTimeout(nextDayTimeout);
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
    console.log("Open popup  ?????"+popupId);
   popupElement.style.display = "block";
   popupElement.classList.add("popupOpened");
  }
}

 




// Function to close the specified popup window
function closePopup(popupId) {
if (nextDayTimeout) {
  console.log("Timeout is running.");
} else {
}
  updateStockPrices();

  console.log("closePopup");
  document.getElementById(popupId).classList.remove("popupOpened");

  var popup = document.getElementById(popupId);
  popup.style.display = "none";

}

// Function to open the portfolio popup
function openPortfolioPopup() {
  displayPortfolio();
  openPopup("portfolio-popup");
}

// Function to close the portfolio popup
function closePortfolioPopup() {
  closePopup("portfolio-popup");
}

// Event listener for opening the portfolio popup
document.getElementById("portfolio-button").addEventListener("click", openPortfolioPopup);
document.getElementById("portfolio-BTN").addEventListener("click", openPortfolioPopup);

// Event listener for closing the portfolio popup
document.getElementById("close-portfolio-popup").addEventListener("click", closePortfolioPopup);





document.getElementById("counter").addEventListener("click", function() {
  openPopup("news-popup");
});























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

document.getElementById("open-buy-item-popup").addEventListener("click", function() {
  showStoreItems();
  openPopup("buy-item-popup");
});

document.getElementById("close-buy-item-popup").addEventListener("click", function() {
  closePopup("buy-item-popup");
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
  updateStockPrices();
  closePopup("options-popup");
});


document.getElementById("open-news-popup").addEventListener("click", function() {
  openPopup("news-popup");
});

document.getElementById("close-news-popup").addEventListener("click", function() {
  closePopup("news-popup");
});


// Function to pause the game
function pauseGame() {
  // Logic to pause the game
  // Update UI elements or perform necessary actions
      closePopup("options-popup");

  console.log("Game paused");
        clearTimeout(nextDayTimeout);
  //  clearInterval(weekendTimer); // Stop the timer
    openPopup("pause-popup");
}





// Event listener for the Pause Game button
document.getElementById("pause-game-btn").addEventListener("click", function() {
  pauseGame(); // Pause the game
});

document.getElementById("close-pause-popup").addEventListener("click", function() {
updateStockPrices();
  closePopup("pause-popup");
});




// Function to restart the game
function restartGame() {
  pauseGame(); // Pause the game
  closePopup("pause-popup");

  // Clear local storage
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

 companies = getMarket();
  
  // Reset game state, UI elements, or perform necessary actions
  console.log("Game restarted");

 updateStockPricesUI();

updateStockPrices();


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





// Retrieve the slider, slider value display elements, and the checkbox
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
const skipWeekendsCheckbox = document.getElementById('skipWeekends');

// Retrieve the saved game options from local storage
const savedGameOptions = JSON.parse(localStorage.getItem('gameOptions')) || {};



// Set the initial checkbox state
skipWeekendsCheckbox.checked = savedGameOptions.skipAds || false;

// Function to handle slider change event
function handleSliderChange() {
  // Get the selected slider value
const sliderSpeed = parseInt(slider.value);

const convertedSpeed = 1000 * sliderSpeed;

    let dayspeedLabel = sliderSpeed + " secend days";


  // Update the display with the selected slider value
  sliderValue.textContent = `Slider Speed: ${dayspeedLabel}`;

  // Update the game options object with the new slider speed
  savedGameOptions.sliderSpeed = sliderSpeed;

  // Save the game options to local storage
  localStorage.setItem('gameOptions', JSON.stringify(savedGameOptions));

  // Update the timer speed (replace this with your actual timer logic)
  slider.speed = parseInt(convertedSpeed);
}

// Function to handle checkbox change event
function handleCheckboxChange() {
  // Get the checkbox state
  const skipWeekends = skipWeekendsCheckbox.checked;

  // Update the game options object with the new checkbox state
  savedGameOptions.skipAds = skipWeekends;

  // Save the game options to local storage
  localStorage.setItem('gameOptions', JSON.stringify(savedGameOptions));

  

  if(skipWeekends){
    adTimer = 0;
  }else{
    adCounter = adTimer;
  }

    
}

// Add event listener for slider change event
slider.addEventListener('change', handleSliderChange);

// Add event listener for checkbox change event
skipWeekendsCheckbox.addEventListener('change', handleCheckboxChange);

// Set initial timer speed (replace this with your actual timer logic)
slider.speed = parseInt(savedGameOptions.sliderSpeed) || 5;

handleCheckboxChange();
handleSliderChange();

