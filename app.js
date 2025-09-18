// https://cookie-upgrade-api.vercel.app/api/upgrades
const brain = document.querySelector("img");
const cookiesDisplay = document.getElementById("numberCookies");
const cpsDisplay = document.getElementById("cps");
const upgradeDisplay = document.getElementById("upgrade-display");
const upgrade1 = document.getElementById("upgrade1");
let exampleData = [
  {
    id: 1,
    name: "Auto-Clicker",
    cost: 100,
    increase: 1,
  },
  {
    id: 2,
    name: "Enhanced Oven",
    cost: 500,
    increase: 5,
  },
];

// JS vars cookieCount, cps, state
let cookieCount = 0;
let cps = 1;
let state = {
  cookieCount: 0,
  cps: 1,
};

//start

brain.addEventListener("click", () => {
  cookieCount += cps;
  cookiesDisplay.textContent = cookieCount;
});

// upgrade1.addEventListener("click", () => {
//   cps++;
//   cpsDisplay.textContent = cps;
// });

setInterval(() => {
  cookieCount += cps;
  cookiesDisplay.textContent = cookieCount;
}, 1000);

// async function fetchData() {
//   const response = await fetch(
//     "https://cookie-upgrade-api.vercel.app/api/upgrades"
//   );
//   const data = await response.json();

// }

// fetchData();

function displayUpgrades() {
  exampleData.forEach(function (upgrade, index) {
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
    const upgradeButton = document.createElement("button");
    upgradeButton.innerText = "Buy";
    upgradeStock.setAttribute("class", "upg");
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

displayUpgrades();

// the upgrades are an array of objects

// we can use forEach or a for loop to loop over each of the upgrades.
// use create element to create tags for the upgrade name, cps, and increase.
// also need to make a buy button.
// listen for a click event on each of the buttons.
// try to purchase the upgrade
// can we afford the upgrade?
// if we can afford the upgrade -
// update cps to add the increase of the upgrade
// take away the cost of the upgrade from our cookies
// if we can't afford the upgrade?
// send an alert to say 'you can't afford that.
