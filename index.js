const emojiArray = [
    {
        emoji: "👨🏼‍🌾🏪",
        answer: "farmers market",
        hint: "Type of market",
        completed: false
    },
    {
        emoji: "🍇🪨",
        answer: "fruity pebbles",
        hint: "Flint Stones cereal",
        completed: false
    },
    {
        emoji: "🐓🕺🏼",
        answer: "chicken dance",
        hint: "Popular dance",
        completed: false
    },
    {
        emoji: "🚪🏃🏼‍♂️",
        answer: "doordash",
        hint: "Food delivery service",
        completed: false
    },
    {
        emoji: "🦁👑",
        answer: "lion king",
        hint: "Disney movie",
        completed: false
    },
    {
        emoji: "🕷️🚶🏼‍♂️",
        answer: "spiderman",
        hint: "Marvel superhero",
        completed: false
    },
    {
        emoji: "📼🐛",
        answer: "tapeworm",
        hint: "Parasite",
        completed: false
    },
    {
        emoji: "👻🏠",
        answer: "haunted house",
        hint: "Spooky",
        completed: false
    },
    {
        emoji: "⌚️🐶",
        answer: "watch dog",
        hint: "We could all use one of these",
        completed: false
    },
    {
        emoji: "🔍🐟",
        answer: "finding nemo",
        hint: "Disney movie",
        completed: false
    },
    {
        emoji: "🗻💦",
        answer: "mountain dew",
        hint: "Fizzy drink",
        completed: false
    },
    {
        emoji: "⭐️💵",
        answer: "starbucks",
        hint: "Coffee shop",
        completed: false
    },
    {
        emoji: "🧈☝🏼",
        answer: "butterfinger",
        hint: "Type of candy",
        completed: false
    },
    {
        emoji: "🤖👮🏼‍♂️",
        answer: "robocop",
        hint: "Film series",
        completed: false
    }
];

let currentEmoji = null;
let score = 0;
let incorrectAttempts = 0;

function displayRandomEmoji() {
    let uncompletedEmojis = emojiArray.filter(emoji => !emoji.completed);
    if (uncompletedEmojis.length === 0) {
        currentEmoji = null;
        document.querySelector(".js-input").disabled = true;
        document.querySelector(".js-input").placeholder  = `Complete!`;
        alert("All emojis have been completed!");
        return;
    }

    currentEmoji = uncompletedEmojis[Math.floor(Math.random() * uncompletedEmojis.length)];
    document.querySelector(".shown-emoji").innerText = currentEmoji.emoji;
    document.querySelector(".js-input").placeholder  = `Answer Length: ${currentEmoji.answer.length}`;
}

function answerResult(event) {
    event.preventDefault();
    if (!currentEmoji) return;

    const userInput = document.querySelector(".js-input").value.toLowerCase();
    const correctAnswer = currentEmoji.answer;

    if (userInput === correctAnswer) {
        alert("Correct!");
        score += 1;
        currentEmoji.completed = true;
        displayRandomEmoji();
    } else if (!userInput) {
        alert("Empty input");
    } else {
        incorrectAttempts += 1;
        if (incorrectAttempts >= 3) {
            document.querySelector(".js-input").disabled = true;
            document.querySelector(".js-input").placeholder  = `Game Over!`;
            alert("You lose! Try again.");
            currentEmoji = null;
        }
    }
    document.querySelector(".js-input").value = "";
    updateScore();
}

function updateScore() {
    document.querySelector(".js-score").innerText = `Score: ${score}`;
    document.querySelector(".js-incorrect").innerText = `Incorrect: ${incorrectAttempts}`;
}

function getHint() {
    alert(currentEmoji.hint);
}

function restartGame() {
    for (let i = 0; i < emojiArray.length; i++) {
        emojiArray[i].completed = false;
    }
    score = 0;
    incorrectAttempts = 0;
    document.querySelector(".js-input").disabled = false;
    document.querySelector(".js-input").value = "";
    updateScore();
    displayRandomEmoji();
}

window.addEventListener('load', () => {
    displayRandomEmoji();
    updateScore();
});