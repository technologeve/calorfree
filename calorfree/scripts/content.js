

const wordMatchRegExp = /([0-9]+) ?(calories?|cal|kcals?)|(calories?|cal|kcals?):? ?([0-9]+)/g; // regular expression
// const words = text.matchAll(wordMatchRegExp);


const regex = new RegExp(wordMatchRegExp, 'gi'); // 'gi' for case-insensitive replacement
document.body.innerHTML = document.body.innerHTML.replaceAll(regex, "");
