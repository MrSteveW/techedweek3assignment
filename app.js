// https://cookie-upgrade-api.vercel.app/api/upgrades
const brain = document.querySelector("img");
const neuronsDisplay = document.getElementById("numberCookies");
const npsDisplay = document.getElementById("nps");
const upgradeDisplay = document.getElementById("upgrade-display");
const messageDisplay = document.getElementById("message");

// JS vars neuronCount, nps, state
let neuronCount = 100;
let nps = 20;
let state = {
  neuronCount: 0,
  nps: 1,
};

// ## ON STARTUP ##
fetchData();
neuronsDisplay.textContent = neuronCount.toLocaleString("en-UK");
npsDisplay.textContent = nps.toLocaleString("en-UK");

// ## LISTEN FOR CLICKING ON BRAIN ##
brain.addEventListener("click", () => {
  neuronCount += nps;
  neuronsDisplay.textContent = neuronCount.toLocaleString("en-UK");
});

// ## UPDATING NEURON COUNT EVERY SECOND ##
setInterval(() => {
  neuronCount += nps;
  neuronsDisplay.textContent = neuronCount;
}, 1000);

// ## CHECK IF ENOUGH NEURONS TO BUY UPGRADE ##
function checkUpgradePurchase(upgradeName, upgradeCost, npsIncrease) {
  if (neuronCount >= upgradeCost) {
    buyUpgrade(upgradeName, upgradeCost, npsIncrease);
    displayMessage(`You now have a ${upgradeName}`);
  } else {
    displayMessage("You don't have enough neurons yet... keep clicking!");
  }
}

// ## DISPLAY MESSAGE
function displayMessage(message) {
  messageDisplay.style.display = "inline";
  messageDisplay.textContent = message;
  setTimeout(() => {
    messageDisplay.style.display = "none";
  }, 2000);
}

// ## BUY THE UPGRADE ##
function buyUpgrade(upgradeName, neuronCost, npsIncrease) {
  nps += npsIncrease;
  neuronCount -= neuronCost;
  neuronsDisplay.textContent = neuronCount.toLocaleString("en-UK");
  npsDisplay.textContent = nps.toLocaleString("en-UK");
}

// This fetches the API - TO-DO inside it I want a function that creates DIVs
async function fetchData() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  displayUpgrades(data); //forEach api object, display upgrade
}

// This will loop through api data and
function displayUpgrades(apidata) {
  apidata.forEach(function (upgrade) {
    const upgradeName = document.createElement("div");
    upgradeName.innerText = upgrade.name;
    upgradeName.setAttribute("class", "upg");
    //
    const upgradeCost = document.createElement("div");
    upgradeCost.innerText = upgrade.cost;
    upgradeCost.setAttribute("class", "upg");
    //
    const upgradeIncrease = document.createElement("div");
    upgradeIncrease.innerText = upgrade.increase;
    upgradeIncrease.setAttribute("class", "upg");
    //
    const upgradeStock = document.createElement("div");
    upgradeStock.innerText = 0;
    upgradeStock.setAttribute("class", "upg");
    //
    const upgradeButton = document.createElement("button");
    upgradeButton.innerText = "Buy";
    upgradeButton.setAttribute("class", "upg");
    upgradeButton.addEventListener("click", () => {
      checkUpgradePurchase(upgrade.name, upgrade.cost, upgrade.increase); //run function when clicked this button...
    });
    //
    upgradeDisplay.append(
      upgradeName,
      upgradeCost,
      upgradeIncrease,
      upgradeStock,
      upgradeButton
    );
  });
}

// listen for a click event on each of the buttons.
// try to purchase the upgrade
// can we afford the upgrade?
// if we can afford the upgrade -
// update nps to add the increase of the upgrade
// take away the cost of the upgrade from our cookies
// if we can't afford the upgrade?
// send an alert to say 'you can't afford that.
