let startTime;
let endTime;
let alertCount = 0;
let reactionTimes = [];
let resultsDisplayed = false;

function startTest() {
    alertCount = 0;
    reactionTimes = [];
    resultsDisplayed = false;

    document.getElementById("results").classList.remove("show");
    document.getElementById("results").classList.add("hidden");

    startTime = new Date().getTime();
    endTime = startTime + 10000; // 10 seconds from now
    showRandomAlert();
}

// Function to show alerts at random positions and random intervals
function showRandomAlert() {
    if (new Date().getTime() < endTime) {
        alertCount++;
        let alertTime = new Date().getTime();

        // Create a new alert box
        const alertBox = document.createElement("div");
        alertBox.classList.add("custom-alert");
        alertBox.innerHTML = `
            <p>Alert Box ${alertCount}<br>Click OK as quickly as possible!</p>
            <button onclick="handleAlertClick(${alertTime}, this)">OK</button>
        `;

        // Set random position for the alert box
        alertBox.style.top = Math.random() * 80 + "%";
        alertBox.style.left = Math.random() * 80 + "%";
        document.body.appendChild(alertBox);

        // Show the next alert after a random interval (300ms to 1500ms)
        setTimeout(showRandomAlert, Math.random() * 1200 + 300);
    } else {
        showResults();
    }
}

// Function to handle alert box click
function handleAlertClick(alertTime, button) {
    let reactionTime = new Date().getTime() - alertTime;
    reactionTimes.push(reactionTime);

    // Remove the alert box
    button.parentElement.remove();
}

// Function to show results\
function showResults() {
    if (resultsDisplayed) return;
    resultsDisplayed = true;

    // Fade out all remaining alert boxes
    const alertBoxes = document.querySelectorAll(".custom-alert");
    alertBoxes.forEach(alertBox => {
        alertBox.style.transition = "opacity 0.5s ease";
        alertBox.style.opacity = "0";  // Fade out
        setTimeout(() => alertBox.remove(), 500);  // Remove after 0.5s
    });

    let totalReactionTime = reactionTimes.reduce((a, b) => a + b, 0);
    let averageReactionTime = totalReactionTime / reactionTimes.length;

    document.querySelector("#results .result-data").innerText = 
        `Average reaction time: ${averageReactionTime.toFixed(2)} ms`;

    document.getElementById("results").classList.remove("hidden");
    document.getElementById("results").classList.add("show");
}


document.getElementById("start-btn").addEventListener("click", startTest);
