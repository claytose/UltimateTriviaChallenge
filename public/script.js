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
});