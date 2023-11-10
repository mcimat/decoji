const emojiArray = [
    {
        emoji: "👨🏼‍🌾🏪",
        answer: "farmers market",
        hint: "A market",
        completed: false
    },
    {
        emoji: "🍇🪨",
        answer: "fruity pebbles",
        hint: "Flint Stones cereal",
        completed: false
    },
    {
        emoji: "🐓🕺",
        answer: "chicken dance",
        hint: "A popular dance",
        completed: false
    },
    {
        emoji: "🚪💨",
        answer: "doordash",
        hint: "Food delivery service",
        completed: false
    }
];

let incorrectAttempts = 0;
let currentEmojiIndex = -1;

function getRandomIndex() {
    return Math.floor(Math.random() * emojiArray.length);
}

function displayRandomEmoji() {
    currentEmojiIndex = getRandomIndex();
    document.querySelector(".shown-emoji").innerText = emojiArray[currentEmojiIndex].emoji;
    document.querySelector(".emoji-length").innerText = `Answer Length: ${emojiArray[currentEmojiIndex].answer.length}`;
}

function updateScore() {
    document.querySelector(".js-score").innerText = `Incorrect: ${incorrectAttempts}`;
}

function getHint() {
    if (currentEmojiIndex !== -1) {
        alert(emojiArray[currentEmojiIndex].hint);
    }
}

function answerResult(event) {
    event.preventDefault();
    if (currentEmojiIndex === -1) return;

    const userInput = document.querySelector(".js-input").value.toLowerCase();
    const correctAnswer = emojiArray[currentEmojiIndex].answer;

    if (userInput === correctAnswer) {
        alert("Correct!");
        emojiArray[currentEmojiIndex].completed = true;
        displayRandomEmoji();
    } else if (!userInput) {
        alert("Empty input");
    } else {
        incorrectAttempts += 1;
        if (incorrectAttempts >= 3) {
            alert("Game Over!");
            currentEmojiIndex = -1;
        }
    }
    updateScore();
    console.log(emojiArray);
}

function restartGame() {
    incorrectAttempts = 0;
    updateScore();
    displayRandomEmoji();
}

window.addEventListener('load', () => {
    displayRandomEmoji();
    updateScore();
});