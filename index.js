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

// Wait for the window to load before executing the following code
window.addEventListener('load', () => {
    // Initial setup
    displayRandomEmoji();
    updateScore();
});

// Function to display a random emoji
function displayRandomEmoji() {
    // Filter uncompleted emojis
    let uncompletedEmojis = emojiArray.filter(emoji => !emoji.completed);

    // Check if all emojis are completed
    if (uncompletedEmojis.length === 0) {
        currentEmoji = null;
        document.querySelector(".js-input").disabled = true;
        document.querySelector(".js-input").placeholder = `Complete!`;
        return;
    }

    // Select a random uncompleted emoji
    currentEmoji = uncompletedEmojis[Math.floor(Math.random() * uncompletedEmojis.length)];

    // Display the selected emoji and set the input placeholder to the answer length
    document.querySelector(".shown-emoji").innerText = currentEmoji.emoji;
    document.querySelector(".js-input").placeholder = `Answer Length: ${currentEmoji.answer.length}`;
}

// Function to handle user input and check the answer
function answerResult(event) {
    event.preventDefault();

    // Check if there is a current emoji
    if (!currentEmoji) return;

    const userInput = document.querySelector(".js-input").value.toLowerCase().replace(/\s/g, "");
    const correctAnswer = currentEmoji.answer;

    // Check if the user input matches the correct answer
    if (userInput === correctAnswer) {
        // Success alert
        Swal.fire({
            title: "Correct",
            text: "You got it right!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });

        // Update score and set current emoji as completed
        score += 1;
        currentEmoji.completed = true;
        displayRandomEmoji();
    } else if (!userInput) {
        // Warning alert
        Swal.fire({
            title: "Empty Input",
            text: "The input field is empty",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        // Increase incorrect count
        incorrectAttempts += 1;

        // Incorrect alert
        Swal.fire({
            title: "Incorrect",
            text: "Try again!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
        });

        // Check if the player has exceeded the maximum incorrect attempts
        if (incorrectAttempts >= 3) {
            document.querySelector(".js-input").disabled = true;
            document.querySelector(".js-input").placeholder = `Game Over!`;
            currentEmoji = null;
        }
    }

    // Clear the input field and update the score
    document.querySelector(".js-input").value = "";
    updateScore();
}

// Function to update the score
function updateScore() {
    document.querySelector(".js-score").innerText = `Score: ${score}`;
    document.querySelector(".js-incorrect").innerText = `Incorrect: ${incorrectAttempts}`;
}

// Function to display a hint for the current emoji
function getHint() {
    Swal.fire({
        title: "Hint",
        text: currentEmoji.hint,
        icon: "info",
    });
}

// Function to restart the game
function restartGame() {
    // Reset completion status, score, and incorrect attempts
    for (let i = 0; i < emojiArray.length; i++) {
        emojiArray[i].completed = false;
    }
    score = 0;
    incorrectAttempts = 0;

    // Enable the input field and clear its value
    document.querySelector(".js-input").disabled = false;
    document.querySelector(".js-input").value = "";

    // Update the score and display a random emoji
    updateScore();
    displayRandomEmoji();
}