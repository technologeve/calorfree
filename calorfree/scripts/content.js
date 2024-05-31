/** Main script which removes calorie information. */

function basicRegexReplacement(regexInput){
    /** Takes a regular expression, creates a RegExp object, 
    and uses this to remove all instances of the regular 
    expression from the innerHTML of a webpage. */
    
    // Make this a RegExp() object
    let regex = new RegExp(regexInput, 'gi'); // 'gi' for case-insensitive replacement

    // Replace all instances of text with said regular expression
    document.body.innerHTML = document.body.innerHTML.replaceAll(regex, "");
}

// Remove general calorie descriptions
const generalCalorieRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)/g;
basicRegexReplacement(generalCalorieRegExp)

// Remove nutritional informayion from Nutrifox plugin
// TODO: allow this to either remove whole label or just calorie count
const nutrifoxLinkRegExp = /https:\/\/nutrifox.com\/embed\/label\/[0-9]+/g;
basicRegexReplacement(nutrifoxLinkRegExp)
