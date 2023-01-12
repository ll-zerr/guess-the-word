const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const label = document.querySelector("label");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesLeft = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
  const wordList = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await wordList.text();
  const wordArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  // console.log(randomIndex);
  word = wordArray[randomIndex].trim();
  // console.log(word);
  placeholder(word);
};
getWord();

const placeholder = function(word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("🔵");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  message.innerText = "";
  let chosenLetter = guessInput.value;
  guessInput.value = "";
  const outputMessage = validateInput(chosenLetter);
  if (outputMessage) {
    makeGuess(chosenLetter);
  }
});

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

const makeGuess = function(chosenLetter) {
  chosenLetter = chosenLetter.toUpperCase();
  if (guessedLetters.includes(chosenLetter)) {
    message.innerText = "You've already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(chosenLetter);
    lettersGuessed();
    guessCount(chosenLetter);
    updateWordInProgress(guessedLetters);
  }
};

const lettersGuessed = function() {
  guessedLettersList.innerHTML = "";
  guessedLetters.forEach(function(letter) {
    let li = document.createElement("li");
    li.innerHTML = `${letter}`;
    guessedLettersList.append(li);
  });
};

const updateWordInProgress = function(guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const showWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push("🔵");
    }
  }
  wordInProgress.innerText = showWord.join("");
  checkIfWinner();
};

const guessCount = function(chosenLetter) {

  if (word.toUpperCase().includes(chosenLetter)) {
    message.innerText = `Good guess! The word contains the letter ${chosenLetter}.`;
  } else {
    message.innerText = `Sorry, the word does not contain the letter ${chosenLetter}.`;
    remainingGuesses--;
  }

  if (remainingGuesses === 0) {
    message.innerText = `Game Over. The word is ${word.toUpperCase()}.`;
    guessesLeft.innerText = "0 guesses";
    startOver();
  } else if (remainingGuesses === 1) {
    guessesLeft.innerText = "1 guess";
  } else {
    guessesLeft.innerText = `${remainingGuesses} guesses`;
  }

};

const checkIfWinner = function() {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }

};

const startOver = function() {
  guessButton.classList.add("hide");
  guessesRemaining.classList.add("hide");
  guessedLettersList.classList.add("hide");
  guessInput.classList.add("hide");
  label.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
  message.classList.remove("win");
  message.innerHTML = "";
  guessedLettersList.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  guessesLeft.innerText = `${remainingGuesses} guesses`;
  guessButton.classList.remove("hide");
  guessesRemaining.classList.remove("hide");
  guessedLettersList.classList.remove("hide");
  guessInput.classList.remove("hide");
  label.classList.remove("hide");
  playAgainButton.classList.add("hide");
  getWord();
});
