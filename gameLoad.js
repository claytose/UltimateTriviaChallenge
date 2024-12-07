document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("game-container");

  // Fetch the Handlebars template from a script tag or external source
  function loadTemplate(templateId) {
    const templateSource = document.getElementById(templateId).innerHTML;
    return Handlebars.compile(templateSource);
  }

  // Render the question component
  function renderQuestion(data) {
    const questionTemplate = loadTemplate("question-template");
    gameContainer.innerHTML = questionTemplate(data);
  }

  // Timer functionality
  function startTimer(seconds, onTimeout) {
    const timerElement = document.getElementById("timer");
    let timeLeft = seconds;

    const interval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time left: ${timeLeft} seconds`;

      if (timeLeft <= 0) {
        clearInterval(interval);
        onTimeout();
      }
    }, 1000);
  }

  // Initialize the game
  function initGame() {
    // Replace this with a call to your backend to fetch game data
    fetch("/api/game-data")
      .then((response) => response.json())
      .then((data) => {
        renderQuestion(data);

        // Start the timer if the data includes a time limit
        if (data.timer) {
          startTimer(data.timer, () => {
            alert("Time's up!");
            // Add logic to move to the next question or handle timeout
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
        gameContainer.innerHTML = "<p>Failed to load game data. Please try again later.</p>";
      });
  }

  initGame();
});
