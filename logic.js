// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to shuffle choices for each question
function shuffleChoices(questions) {
    return questions.map(question => {
        question.choices = shuffle(question.choices);
        return question;
    });
}

module.exports = { shuffle, shuffleChoices };