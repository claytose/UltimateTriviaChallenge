document.addEventListener('DOMContentLoaded', function() {
  var timeLeft = 10;
  var timerElement = document.getElementById('timer');
  var timer = setInterval(function() {
    timeLeft--;
    timerElement.textContent = 'Time left: ' + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.querySelector('form').submit();
    }
  }, 1000);

  // Modal handling
  var modal = document.getElementById("rulesModal");
  var btn = document.getElementById("rulesButton");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});