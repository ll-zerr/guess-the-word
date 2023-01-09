// unordered list where player's guessed letters appear
const guessedLettersList = document.querySelector(".guessed-letters");
// button with the text Guess in it
const guessButton = document.querySelector(".guess");
// the text input where player guesses letter
const guessInput = document.querySelector(".letter");
// empty paragraph where the word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where remaining guesses displays
const guessesRemaining = document.querySelector(".remaining");
// span inside paragraph displaying remaining guesses
const guessesLeft = document.querySelector(".remaining span");
// empty paragraph where message appears when player guesses letter
const message = document.querySelector(".message");
// hidden button prompting player to play again
const playAgainButton = document.querySelector(".play-again");

// starting word to test out game function
const word = "magnolia";
// array containing all letters guessed
const guessedLetters = [];

// function to add placeholders for each letter
const placeholder = function(word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("🔵");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// add event listener for the Guess button
guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  message.innerText = "";
  let chosenLetter = guessInput.value;
  console.log(chosenLetter);
  guessInput.value = "";
  const outputMessage = validateInput(chosenLetter);
  console.log(outputMessage);
  if (outputMessage) {
    makeGuess(chosenLetter);
  }
});

// validate player's input
const validateInput = function(chosenLetter) {
  const acceptedLetter = /[a-zA-Z]/;
  if (chosenLetter.length === 0) {
    message.innerText = "Please enter a letter from A to Z.";
  } else if (chosenLetter.length > 1) {
    message.innerText = "Please enter just ONE letter from A to Z.";
  } else if (!chosenLetter.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return chosenLetter;
  }
};

// function to capture guessed letter input
const makeGuess = function(chosenLetter) {
  chosenLetter = chosenLetter.toUpperCase();
  if (guessedLetters.includes(chosenLetter)) {
    message.innerText = "You've already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(chosenLetter);
    lettersGuessed();
    updateWordInProgress(guessedLetters);
  }
  console.log(guessedLetters);
};

// function to display guessed letters
const lettersGuessed = function () {
  guessedLettersList.innerHTML = "";
  guessedLetters.forEach(function(letter) {
    let li = document.createElement("li");
    li.innerHTML = `${letter}`;
    guessedLettersList.append(li);
  });
};

// function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  console.log(wordArray);
  const showWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push("🔵");
    }
  }
  console.log(showWord);
  wordInProgress.innerText = showWord.join("");
  checkIfWinner();
};

// function to see if player is winner
const checkIfWinner = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
