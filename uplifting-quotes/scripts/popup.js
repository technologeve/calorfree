const allQuotes = ["You are loved", 
    "You are special", "Be the best you can be",
    "Failure is success in progress", 
    "Stay hopeful", "You are magic",
    "You deserve happiness", "You're doing great!",
    "Happiness is an inside job", "You are smart",
    "Every day is a new day", "You matter."];

function getAndAddQuote(){
    // Get the quote box
    const quoteTextBox = document.getElementById("quote")

    // Randomly select quote
    const selectedQuoteIndex = Math.floor(Math.random() * allQuotes.length);
    const selectedQuote = allQuotes[selectedQuoteIndex];

    // Put this quote in the extension popup
    quoteTextBox.textContent = selectedQuote;
}

const joyNeededButton = document.getElementById("generateQuote");
joyNeededButton.addEventListener("click", getAndAddQuote);
