const emojiArray = [
    {
        emoji: "👨🏼‍🌾🏪",
        answer: "farmersmarket",
        hint: "Type of market",
        completed: false
    },
    {
        emoji: "🍇🪨",
        answer: "fruitypebbles",
        hint: "Flint Stones cereal",
        completed: false
    },
    {
        emoji: "🐓🕺🏼",
        answer: "chickendance",
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
        answer: "lionking",
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
        answer: "hauntedhouse",
        hint: "Spooky",
        completed: false
    },
    {
        emoji: "⌚️🐶",
        answer: "watchdog",
        hint: "We could all use one of these",
        completed: false
    },
    {
        emoji: "🔍🐟",
        answer: "findingnemo",
        hint: "Disney movie",
        completed: false
    },
    {
        emoji: "🗻💦",
        answer: "mountaindew",
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

window.addEventListener('load', () => {
    displayRandomEmoji();
    updateScore();
});

function displayRandomEmoji() {
    let uncompletedEmojis = emojiArray.filter(emoji => !emoji.completed);
    if (uncompletedEmojis.length === 0) {
        currentEmoji = null;
        document.querySelector(".js-input").disabled = true;
        document.querySelector(".js-input").placeholder  = `Complete!`;
        return;
    }

    currentEmoji = uncompletedEmojis[Math.floor(Math.random() * uncompletedEmojis.length)];
    document.querySelector(".shown-emoji").innerText = currentEmoji.emoji;
    document.querySelector(".js-input").placeholder  = `Answer Length: ${currentEmoji.answer.length}`;
}

function answerResult(event) {
    event.preventDefault();
    if (!currentEmoji) return;

    const userInput = document.querySelector(".js-input").value.toLowerCase().replace(/\s/g, "");
    const correctAnswer = currentEmoji.answer;

    if (userInput === correctAnswer) {
        Swal.fire({
            title: "Correct",
            text: "You got it right!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
        score += 1;
        currentEmoji.completed = true;
        displayRandomEmoji();
    } else if (!userInput) {
        Swal.fire({
            title: "Empty Input",
            text: "The input field is empty",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        incorrectAttempts += 1;
        Swal.fire({
            title: "Incorrect",
            text: "Try again!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
        });
        if (incorrectAttempts >= 3) {
            document.querySelector(".js-input").disabled = true;
            document.querySelector(".js-input").placeholder  = `Game Over!`;
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
    Swal.fire({
        title: "Hint",
        text: currentEmoji.hint,
        icon: "info",
    });
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