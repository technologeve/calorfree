
// Define the Reguldar Expression string
const wordMatchRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)/g; // regular expression

// Make this a RegExp() object
const regex = new RegExp(wordMatchRegExp, 'gi'); // 'gi' for case-insensitive replacement

// Replace all instances of text with said regular expression
document.body.innerHTML = document.body.innerHTML.replaceAll(regex, "");

// Remove nutritional informayion from Nutrifox plugin
const wordMatchRegExpNutrifox = /https:\/\/nutrifox.com\/embed\/label\/[0-9]+/g; // regular expression
const regexNutri = new RegExp(wordMatchRegExpNutrifox, 'gi'); // 'gi' for case-insensitive replacement
document.body.innerHTML = document.body.innerHTML.replaceAll(regexNutri, "");
