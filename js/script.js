// unordered list where player's guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");
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

// function to add placeholders for each letter
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("🔵");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// add event listener for the Guess button
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  let chosenLetter = guessInput.value;
  console.log(chosenLetter);
  guessInput.value = "";
});
