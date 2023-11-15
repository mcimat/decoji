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
        emoji: "🐓🕺🏼",
        answer: "chicken dance",
        hint: "A popular dance",
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
        hint: "A parasite",
        completed: false
    },
    {
        emoji: "👻🏠",
        answer: "haunted house",
        hint: "Spooky",
        completed: false
    }
];

let currentEmoji = null;
let score = 0;
let incorrectAttempts = 0;

function displayRandomEmoji() {
    let uncompletedEmojis = emojiArray.filter(emoji => !emoji.completed);
    if (uncompletedEmojis.length === 0) {
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
    document.querySelector(".js-input").value = "";
    updateScore();
    displayRandomEmoji();
}

window.addEventListener('load', () => {
    displayRandomEmoji();
    updateScore();
});