// https://cookie-upgrade-api.vercel.app/api/upgrades
const brain = document.querySelector("img");
const neuronsDisplay = document.getElementById("numberCookies");
const npsDisplay = document.getElementById("nps");
const upgradeDisplay = document.getElementById("upgrade-display");
const messageDisplay = document.getElementById("message");
const clickSound = document.getElementById("clickSound");
const upgradeSound = document.getElementById("upgradeSound");
const soundToggle = document.getElementById("soundToggle");
const reset = document.getElementById("reset");

// ## MODIFY UPGRADE NAMES ##
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

// ## SET STATE OF NEURON COUNTER, NPS & STOCK COUNTERS ##
let state = {
  neuronCount: 0,
  nps: 1,
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

// ## SOUND TOGGLE ##
soundToggle.addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("clickSound").volume = 1;
    document.getElementById("upgradeSound").volume = 1;
  } else {
    document.getElementById("clickSound").volume = 0;
    document.getElementById("upgradeSound").volume = 0;
  }
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

// ## BUY THE UPGRADE ##
function buyUpgrade(upgradeID, neuronCost, npsIncrease) {
  state.nps += npsIncrease;
  state.neuronCount -= neuronCost;
  saveState();
  displayState();
  updateStock(upgradeID);
  upgradeSound.play();
}

// ## DISPLAY MESSAGE
function displayMessage(message) {
  messageDisplay.style.display = "inline";
  messageDisplay.textContent = message;
  setTimeout(() => {
    messageDisplay.style.display = "none";
  }, 2000);
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
      upgradeName.setAttribute("aria-hidden", "true");
      upgradeName.setAttribute("class", "upgname");
      //
      const upgradeCost = document.createElement("div");
      upgradeCost.innerText = upgrade.cost.toLocaleString("en-UK");
      upgradeCost.setAttribute("aria-hidden", "true");
      upgradeCost.setAttribute("class", "upg");
      //
      const upgradeIncrease = document.createElement("div");
      upgradeIncrease.innerText = `+${upgrade.increase}`;
      upgradeIncrease.setAttribute("aria-hidden", "true");
      upgradeIncrease.setAttribute("class", "upg");
      //
      const upgradeStock = document.createElement("div");
      upgradeStock.innerText = state[upgrade.id];
      upgradeStock.setAttribute("class", "upg");
      upgradeStock.setAttribute("aria-hidden", "true");
      upgradeStock.setAttribute("id", "stock" + upgrade.id);
      //
      const upgradeButton = document.createElement("button");
      upgradeButton.innerText = "Learn";
      upgradeButton.setAttribute("class", "btn btn-success upg");
      //
      const descId = `desc-upgrade-${upgrade.id}`;
      const descSpan = document.createElement("span");
      descSpan.id = descId;
      descSpan.className = "visually-hidden";
      descSpan.textContent = `Click to buy upgrade ${upgradeNames[upgrade.id]}`;
      upgradeDisplay.appendChild(descSpan);

      // Set aria-describedby to the id
      upgradeButton.setAttribute("aria-describedby", descId);

      upgradeButton.addEventListener("click", () => {
        checkUpgradePurchase(
          upgrade.id,
          upgradeNames[upgrade.id],
          upgrade.cost,
          upgrade.increase
        );
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
    saveState();
    displayState();
  } catch (error) {
    console.error(error);
  }
}

// ## RESET BUTTON
reset.addEventListener("click", () => {
  confirm("Are you sure you wish to delete all game data?");
  if (true) {
    localStorage.clear();
    state = {
      neuronCount: 0,
      nps: 1,
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
    // Reset all stock totals
    for (let i = 1; i <= 10; i++) {
      const stockDiv = document.getElementById(`stock${i}`);
      stockDiv.textContent = 0;
    }
    saveState();
    displayState();
  }
});
