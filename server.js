var express = require('express');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');

var importAllQuestions = require("./questions.json");
const { shuffle } = require("./logic.js"); // Ensure shuffle is imported correctly

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main' // Specify default layout
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use('/templates', express.static('public/questionPartTemplate.js')); // Add this line to include the precompiled templates
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse form data
app.use(session({
  secret: 'trivia-game-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
	console.log("== Request made");
	console.log("  - Method:", req.method);
	console.log("  - URL:", req.url);
	next();
});

// Homepage
app.get('/', function(req, res) {
  res.render('home', { categories: Object.keys(importAllQuestions) });
});

// Start game
app.post('/start', function(req, res) {
  const category = req.body.category;
  console.log("Selected category:", category); // Debugging line
  if (!importAllQuestions[category]) {
    return res.status(400).send("Invalid category selected");
  }
  req.session.category = category;
  req.session.lives = 3;
  req.session.score = 0;
  req.session.questions = shuffle([...importAllQuestions[category]]); // Shuffle questions
  res.redirect('/game');
});

// Game page
app.get('/game', function(req, res) {
  if (req.session.lives <= 0) {
    return res.redirect('/gameover');
  }
  if (req.session.questions.length === 0) {
    return res.redirect('/gameover');
  }
  const question = req.session.questions[req.session.questions.length - 1];
  res.render('game', { question: question.question, choices: question.choices, lives: req.session.lives, score: req.session.score, message: req.session.message });
  req.session.message = null; // Clear message after displaying
});

// Answer question
app.post('/game', function(req, res) {
  const answer = req.body.answer;
  const correctAnswer = req.session.questions.pop().answer;
  if (answer === correctAnswer) {
    req.session.score++;
    req.session.message = "Correct!";
  } else {
    req.session.lives--;
    req.session.message = "Incorrect!";
  }
  res.redirect('/game');
});

// Game over
app.get('/gameover', function(req, res) {
  res.render('gameover', { score: req.session.score });
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});