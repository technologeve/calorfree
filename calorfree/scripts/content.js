/** Main script which removes calorie information. */

const generalCalorieRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)(.[0-9]+)? ?(\\([0-9]+%\\))?/g;
const calorieMultiLineRegExp1 = /(<([^<]*)\>\<([^<]*)\>)?(calories?|cal|kcals?)( per serving)?:? ?(\<([^<]*)\>)+ ?[0-9]+(.[0-9]+)?(<([^<]*)\>\<([^<]*)\>)?(cals?)? ?((<([^<]*)\>\<([^<]*)\>)?(\\([0-9]+%\\)))?/gi;
const calorieMultiLineRegExp2 = /[0-9]+(.[0-9]+)?(<([^<]*)\>\<([^<]*)\>)?(<([^<]*)\>)?(cals?)? ?(<([^<]*)\>\<([^<]*)\>)?(\\([0-9]+%\\))? ?(calories?|cal|kcals?)( ?per serving)?/gi;


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

    const reg = /(\<([^<]*)\>)+/g;
    
    for (const match of document.body.innerHTML.matchAll(multiLineRegExp)) {
        const matched_str = match[0];
        console.log(typeof(matched_str));
        if(matched_str != " "){
            console.log([...matched_str.matchAll(reg)]);
            const toReplaceWith = [...matched_str.matchAll(reg)][0]
            if (toReplaceWith != undefined){
                console.log(matched_str);
                console.log(toReplaceWith[0]);
                document.body.innerHTML = document.body.innerHTML.replaceAll(matched_str, toReplaceWith[0]);
            }
        }
    }
}


function removeCalorieDescriptions(){
    /* Replaces calorie count in html with empty stringe*/
    
    // Remove general calorie descriptions
    basicRegexReplacement(generalCalorieRegExp)

    // Remove nutritional information from Nutrifox plugin
    // TODO: allow this to either remove whole label or just calorie count
    const nutrifoxLinkRegExp = /https:\/\/nutrifox.com\/embed\/label\/[0-9]+/g;
    basicRegexReplacement(nutrifoxLinkRegExp)

    // Remove calorie descriptions when separated by <>
    replaceInfoSplitByChevrons(calorieMultiLineRegExp1);
    replaceInfoSplitByChevrons(calorieMultiLineRegExp2);
}

// Set list of other nutritional info to be removed
let otherNutritionalInfo = [" ?((poly)?(un)?saturate(s|d)?) ?(fat)?", " ?fats? ?", " ?carb(ohydrate)?s? ?", 
                                " ?((carbohydrates)? ?of which are)? ?sugar(s)? ?", " ?fib(re|er)s? ?", 
                                " ?proteins?", " ?salts?", " ?cholesterol", " ?sodium", " ?potassium", 
                                " ?vitamin a", " ?vitamin c", " ?vitamin b ?12", " ?iron", " ?calcium", "fat"
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
        let otherMultiLineRegExp = RegExp("([0-9]+)(\\.[0-9]+)? ?(\<([^<]*)\>\<([^<]*)\>)? ?(<!-- -->)?m?g?" + "( per serving)?:? ?(\<([^<]*)\>)?(\<([^<]*)\>)?([0-9]+(.[0-9]+)?)?(<([^<]*)\>\<([^<]*)\>)?(m?g)? ?(<([^<]*)\>\<([^<]*)\>)? ?(\\([0-9]+%\\))?" + otherNutritionalInfo[info], "gi");
        replaceInfoSplitByChevrons(otherMultiLineRegExp);
        
        let otherMultiLineRegExp2 = RegExp(otherNutritionalInfo[info] + ":? ?(\<([^<]*)\>)*[0-9]+(.[0-9]+)? ?(\<([^<]*)\>\<([^<]*)\>)? ?(<!-- -->)? ?(m?g)? ?( per serving)? ?(\<([^<]*)\>\<([^<]*)\>)? ?(\\([0-9]+%\\))?", "gi");
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

module.exports = {
    basicRegexReplacement, 
    replaceInfoSplitByChevrons,
    calorieMultiLineRegExp1,
    calorieMultiLineRegExp2,
    removeAdditionalNutritionalInfo
};