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


function replaceInfoSplitByChevrons(multiLineRegExp){
    /* Replaces info input which is split by two sets of <> 
    with just the <> and their content. */
    
    let words =  document.body.innerHTML.matchAll(multiLineRegExp);
    words = [...words];

    // Remove them
    // TODO: account for that there may be multiple pairs of <>
    const reg = /\<([^<]*)\>\<([^<]*)\>/g;
    for (i in words){
        let toReplaceWith = [...words[i][0].matchAll(reg)][0][0];
        document.body.innerHTML = document.body.innerHTML.replaceAll(words[i][0], toReplaceWith)
    }
}
module.exports = {
    basicRegexReplacement, 
    replaceInfoSplitByChevrons}
;

function removeCalorieDescriptions(){
    /* Replaces calorie count in html with empty stringe*/
    
    // Remove general calorie descriptions
    const generalCalorieRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)(.[0-9]+)? ?(\\([0-9]+%\\))?/g;
    basicRegexReplacement(generalCalorieRegExp)

    // Remove nutritional information from Nutrifox plugin
    // TODO: allow this to either remove whole label or just calorie count
    const nutrifoxLinkRegExp = /https:\/\/nutrifox.com\/embed\/label\/[0-9]+/g;
    basicRegexReplacement(nutrifoxLinkRegExp)

    // Remove calorie descriptions when separated by <>
    // Find all calorie counts of this form
    const calorieMultiLineRegExp = /(calories?|cal|kcals?)( per serving)?:? ?\<([^<]*)\>\<([^<]*)\>[0-9]+(.[0-9]+)?(<([^<]*)\>\<([^<]*)\>)?(cals?)? ?(<([^<]*)\>\<([^<]*)\>)?(\\([0-9]+%\\))?/gi;
    replaceInfoSplitByChevrons(calorieMultiLineRegExp);
}

// Set list of other nutritional info to be removed
let otherNutritionalInfo = [" ?((poly)?(un)?saturate(s|d)?) ?(fat)?", " ?fats? ?", " ?carb(ohydrate)?s? ?", 
                                " ?((carbohydrates)? ?of which are)? ?sugar(s)? ?", " ?fib(re|er)s? ?", 
                                " ?proteins?", " ?salts?", " ?cholesterol", " ?sodium", " ?potassium", 
                                " ?vitamin a", " ?vitamin c", " ?vitamin b ?12", " ?iron", " ?calcium"
                            ]
                                
function removeAdditionalNutritionalInfo(){
    /* Removes additional nutritional info, such as fat and sugar count */
    
    for (info in otherNutritionalInfo){

        // Replace the basic forms of nutritional info
        let regexNumberFirst = RegExp("[0-9]+ ?m?g?" + otherNutritionalInfo[info] + "( ?per serving)? ?(\\([0-9]+%\\))?", "gi")
        let regexNumberSecond = RegExp(otherNutritionalInfo[info] + "( ?per serving)?:? ?[0-9]+ ?m?g?( ?per serving)? ?(\\([0-9]+%\\))?", "gi")

        document.body.innerHTML = document.body.innerHTML.replaceAll(regexNumberFirst, "");
        document.body.innerHTML = document.body.innerHTML.replaceAll(regexNumberSecond, "");

        // Replace nutritional info in HTMl which are split by chevrons <><>
        let otherMultiLineRegExp = RegExp("([0-9]+) ?(\<([^<]*)\>\<([^<]*)\>)? ?(<!-- -->)?m?g?" + "( per serving)?:? ?\<([^<]*)\>\<([^<]*)\>[0-9]+(.[0-9]+)?(<([^<]*)\>\<([^<]*)\>)?(m?g)? ?(<([^<]*)\>\<([^<]*)\>)? ?(\\([0-9]+%\\))?" + otherNutritionalInfo[info], "gi");
        replaceInfoSplitByChevrons(otherMultiLineRegExp);
        
        let otherMultiLineRegExp2 = RegExp(otherNutritionalInfo[info] + ":? ?\<([^<]*)\>\<([^<]*)\>[0-9]+(.[0-9]+)? ?(\<([^<]*)\>\<([^<]*)\>)? ?(<!-- -->)? ?(m?g)? ?( per serving)? ?(\<([^<]*)\>\<([^<]*)\>)? ?(\\([0-9]+%\\))?", "gi");
        replaceInfoSplitByChevrons(otherMultiLineRegExp2);
        
    }
    
}

function getSettingsAndBlockInfo(){
    /* Main function to block calorie and 
    nutritional info based on user settings. */
    
    // Get settings info from chrome storage
    chrome.storage.sync.get("hideAdditionalInfo", function (obj) {  
        // Put these settings into variable addInfo
        let addInfo = obj.hideAdditionalInfo; 

        // Always remove calorie count
        removeCalorieDescriptions()
        
        // If user specified, remove addditional calorie info
        if (addInfo == true){
            removeAdditionalNutritionalInfo()}
        return addInfo;
        }
    );
}
getSettingsAndBlockInfo()
