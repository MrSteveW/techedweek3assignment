// https://cookie-upgrade-api.vercel.app/api/upgrades
const brain = document.querySelector("img");
const neuronsDisplay = document.getElementById("numberCookies");
const npsDisplay = document.getElementById("nps");
const upgradeDisplay = document.getElementById("upgrade-display");
const messageDisplay = document.getElementById("message");
const clickSound = document.getElementById("clickSound");
const reset = document.getElementById("reset");

// Set state of Neuron counter & Neurons/sec

const upgradeNames = {
  1: "Student",
  2: "Coach",
  3: "Mentor",
  4: "Leader",
  5: "Sensai",
  6: "Zen master",
  7: "Savant",
  8: "Guru",
  9: "Genius",
  10: "God-emperor",
};
let state = {
  neuronCount: 0,
  nps: 50,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
};

// ## ON STARTUP ##
fetchData();
displayState();

// ## SAVE STATE ##
function saveState() {
  localStorage.setItem("state", JSON.stringify(state));
}

// ## DISPLAY STATE ##
function displayState() {
  state = JSON.parse(localStorage.getItem("state"));
  neuronsDisplay.textContent = state.neuronCount.toLocaleString("en-UK"); //this is loading from PC state <- move to localStorage state?
  npsDisplay.textContent = state.nps.toLocaleString("en-UK"); //this is loading from PC state <- move to localStorage state?
}

// ## CLICKING ON BRAIN ##
brain.addEventListener("click", () => {
  state.neuronCount += state.nps;
  clickSound.play();
  saveState();
  displayState();
});

// ## UPDATING NEURON COUNT EVERY SECOND ##
setInterval(() => {
  state.neuronCount += state.nps;
  saveState();
  displayState();
}, 1000);

// ## UPDATE STOCK ##
function updateStock(upgradeId) {
  state[upgradeId]++;
  document.getElementById(`stock${upgradeId}`).textContent = state[upgradeId];
}

// ## CHECK IF ENOUGH NEURONS TO BUY UPGRADE ##
function checkUpgradePurchase(
  upgradeId,
  upgradeName,
  upgradeCost,
  npsIncrease
) {
  if (state.neuronCount >= upgradeCost) {
    buyUpgrade(upgradeId, upgradeCost, npsIncrease);
    displayMessage(`Your growth mindset is at ${upgradeName}`);
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
function buyUpgrade(upgradeID, neuronCost, npsIncrease) {
  state.nps += npsIncrease;
  state.neuronCount -= neuronCost;
  saveState();
  displayState();
  updateStock(upgradeID);
}

// This fetches the API once on page load
async function fetchData() {
  try {
    const response = await fetch(
      "https://cookie-upgrade-api.vercel.app/api/upgrades"
    );
    const data = await response.json();
    data.forEach(function (upgrade) {
      const upgradeName = document.createElement("div");
      upgradeName.innerText = upgradeNames[upgrade.id];
      upgradeName.setAttribute("class", "upgname");
      //
      const upgradeCost = document.createElement("div");
      upgradeCost.innerText = upgrade.cost.toLocaleString("en-UK");
      upgradeCost.setAttribute("class", "upg");
      //
      const upgradeIncrease = document.createElement("div");
      upgradeIncrease.innerText = `+${upgrade.increase}`;
      upgradeIncrease.setAttribute("class", "upg");
      //
      const upgradeStock = document.createElement("div");
      upgradeStock.innerText = state[upgrade.id];
      upgradeStock.setAttribute("class", "upg");
      upgradeStock.setAttribute("id", "stock" + upgrade.id);
      //
      const upgradeButton = document.createElement("button");
      upgradeButton.innerText = "Learn";
      upgradeButton.setAttribute("class", "upg");
      upgradeButton.addEventListener("click", () => {
        checkUpgradePurchase(
          upgrade.id,
          upgradeNames[upgrade.id],
          upgrade.cost,
          upgrade.increase
        ); //run function when clicked this button...
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
  } catch (error) {
    console.error(error);
  }
}

// ## RESET BUTTON
reset.addEventListener("click", () => {
  state = {
    neuronCount: 0,
    nps: 50,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  };
  localStorage.clear();
  saveState();
  displayState();
});
