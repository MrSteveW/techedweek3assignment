// https://cookie-upgrade-api.vercel.app/api/upgrades
const brain = document.querySelector("img");
const neuronsDisplay = document.getElementById("numberCookies");
const npsDisplay = document.getElementById("nps");
const upgradeDisplay = document.getElementById("upgrade-display");
const warningDisplay = document.getElementById("warning");

// JS vars neuronCount, nps, state
let neuronCount = 0;
let nps = 1;
let state = {
  neuronCount: 0,
  nps: 1,
};

//startup
loadUpgrades();

brain.addEventListener("click", () => {
  neuronCount += nps;
  neuronsDisplay.textContent = neuronCount;
});

function setWarning() {
  warningDisplay.style.display = "inline";
  setTimeout(() => {
    warningDisplay.style.display = "none";
  }, 2000);
}

neuronsDisplay.addEventListener("click", () => {
  setWarning();
});

// upgrade1.addEventListener("click", () => {
//   nps++;
//   npsDisplay.textContent = nps;
// });

setInterval(() => {
  neuronCount += nps;
  neuronsDisplay.textContent = neuronCount;
}, 1000);

async function loadUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  data.forEach(function (upgrade, index) {
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
    // upgradeButton.setAttribute("id", upgrade.id);
    upgradeButton.id = "upgbutton" + upgrade.id;
    upgradeButton.setAttribute("class", "upg");
    //
    upgradeDisplay.append(
      upgradeName,
      upgradeCost,
      upgradeIncrease,
      upgradeStock,
      upgradeButton
    );
    upg1 = document.getElementById("upgbutton1");
    upg1.addEventListener("click", () => {
      nps += 1;
      npsDisplay.textContent = nps;
    });
  });
}

// the upgrades are an array of objects

// we can use forEach or a for loop to loop over each of the upgrades.
// use create element to create tags for the upgrade name, nps, and increase.
// also need to make a buy button.
// listen for a click event on each of the buttons.
// try to purchase the upgrade
// can we afford the upgrade?
// if we can afford the upgrade -
// update nps to add the increase of the upgrade
// take away the cost of the upgrade from our cookies
// if we can't afford the upgrade?
// send an alert to say 'you can't afford that.
