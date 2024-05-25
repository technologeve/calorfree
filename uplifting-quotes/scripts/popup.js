const allQuotes = ["You are loved", 
    "You are special", "Be the best you can be",
    "Failure is success in progress", "You are magic",
    "Happiness is an inside job", "You're doing great!"];

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
