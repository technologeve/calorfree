
// Define the Reguldar Expression string
const wordMatchRegExp = /([0-9]+) ?(calories?|cal|kcals?)|(calories?|cal|kcals?):? ?([0-9]+)/g; // regular expression

// Make this a RegExp() object
const regex = new RegExp(wordMatchRegExp, 'gi'); // 'gi' for case-insensitive replacement

// Replace all instances of text with said regular expression
document.body.innerHTML = document.body.innerHTML.replaceAll(regex, "");
