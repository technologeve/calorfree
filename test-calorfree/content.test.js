
const funcsToTest = require("../calorfree/scripts/content");

function decodeHtmlEntities(input_string) {
  const element = document.createElement('div');
  element.innerHTML = input_string;
  return element.textContent;
}

function setupDocumentBody(textToSetup){
  // Set up a mock DOM environment before each test
  Object.defineProperty(global, 'document.body.html', {});
  document.body.innerHTML = textToSetup;
  
  chrome.storage.sync.clear();
  // chrome.stroage.set({"hideAdditionalInfo": false});
  chrome.storage.sync.set({hideAdditionalInfo: false, key2: 'value2' }, () => {
    console.log('sync storage initialized');
  });
}
    
afterAll(() => {
  document.body.innerHTML = "";
})

// Test basicRegexReplacement
// test("replaces regex where present", () => {
//   setupDocumentBody('Test Text')
//   const generalCalorieRegExp = /Test /g;
//   funcsToTest.basicRegexReplacement(generalCalorieRegExp)
//   expect(document.body.innerHTML).toBe("Text");
// });

// test("doesn't replace non present regex", () => {
//   setupDocumentBody('More Text')
//   const generalCalorieRegExp = /Test/g;
//   funcsToTest.basicRegexReplacement(generalCalorieRegExp)
//   expect(document.body.innerHTML).toBe("More Text");
// });

// test("Removes 'Calories: 20'", () => {
//   setupDocumentBody('<div id="app">Calories: 20</div>')
//   const generalCalorieRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)(.[0-9]+)? ?(\\([0-9]+%\\))?/g;
//   funcsToTest.basicRegexReplacement(generalCalorieRegExp)
//   expect(document.body.innerHTML).toBe("<div id=\"app\"></div>");
  
// });

// // Test replaceInfoSplitByChevrons
// test("no chevrons, unchanged", () => {
//   setupDocumentBody('Text not to be changed')
//   const generalCalorieRegExp = / /g;
//   funcsToTest.replaceInfoSplitByChevrons(generalCalorieRegExp)
//   expect(document.body.innerHTML).toBe("Text not to be changed");
// })
// test("two chevrons, unchanged", () => {
//   setupDocumentBody("Text not<><> to be changed")
//   const generalCalorieRegExp = /a/g;
//   funcsToTest.replaceInfoSplitByChevrons(generalCalorieRegExp)
//   expect(decodeHtmlEntities(document.body.innerHTML)).toEqual("Text not<><> to be changed");
// })
// test("no chevrons, key words", () => {
//   setupDocumentBody("Calories<><> don't change3")
//   const generalCalorieRegExp = /a/g;
//   funcsToTest.replaceInfoSplitByChevrons(generalCalorieRegExp)
//   expect(decodeHtmlEntities(document.body.innerHTML)).toEqual("Calories<><> don't change3");
// })
  
// test("even number of chevrons, cals second, changed", () => {
//   setupDocumentBody("<div>Info: 20.62</div><div> Calories</div>")
//   funcsToTest.replaceInfoSplitByChevrons(funcsToTest.calorieMultiLineRegExp2);
//   expect(document.body.innerHTML).toEqual("<div>Info: </div><div></div>");
// })
// test("odd number of chevrons, cals second, changed", () => {
//   setupDocumentBody("<div>Info: 20.62</div><div> Calories</div>")
//   funcsToTest.replaceInfoSplitByChevrons(funcsToTest.calorieMultiLineRegExp2);
//   expect(document.body.innerHTML).toEqual("<div>Info: </div><div></div>");
// })

// test("odd number of chevrons, cals first, changed", () => {
//   setupDocumentBody("<div><h3>Calories<h3/> 20</div>")
//   funcsToTest.replaceInfoSplitByChevrons(funcsToTest.calorieMultiLineRegExp1);
//   expect(document.body.innerHTML).toEqual("<div><h3></h3></div>");
// })


// removeAdditionalNutritionalInfo
// test("remove additional, unchanged", () => {
//   setupDocumentBody("<div><h3>hello world</h3> 20</div>")
//   funcsToTest.removeAdditionalNutritionalInfo();
//   expect(document.body.innerHTML).toEqual("<div><h3>hello world</h3> 20</div>");
// })
// test("remove additional, 50g fat", () => {
//   setupDocumentBody("<div><h3>50g fat</div>")
//   funcsToTest.removeAdditionalNutritionalInfo();
//   expect(document.body.innerHTML).toEqual("<div><h3></h3></div>");
// })
// test("remove additional, sugar: 20g, salt: 2g</h1><h2>iron: 3mg", () => {
//   setupDocumentBody("<h1>sugar: 20g, salt: 2g</h1><h2>iron: 3mg</h2>")
//   funcsToTest.removeAdditionalNutritionalInfo();
//   expect(document.body.innerHTML).toEqual("<h1>,</h1><h2></h2>");
// })
// test("remove additional, 50g fat, split by chevrons", () => {
//   setupDocumentBody("<div><h3>50 g</h3> fat</div>") 
//   funcsToTest.removeAdditionalNutritionalInfo();
//   expect(document.body.innerHTML).toEqual("<div><h3></h3></div>");
// })
// test("remove additional, 50g fat, split by chevrons", () => {
//   setupDocumentBody("50g fat") 
//   funcsToTest.removeAdditionalNutritionalInfo();
//   expect(document.body.innerHTML).toEqual("");
// })
// test("remove additional, 50.2mg vit C, split by chevrons", () => {
//   setupDocumentBody("<div><h3>50.2mg</h3><h2>vitamin C</h2></div>")
//   funcsToTest.removeAdditionalNutritionalInfo();
//   expect(document.body.innerHTML).toEqual("<div><h3></h3><h2></h2></div>");
// })
test("remove additional, multiple info", () => {
  setupDocumentBody("<div><h3>salt: 10mg</h3>5 tsp sugar </div>")
  funcsToTest.removeAdditionalNutritionalInfo();
  expect(document.body.innerHTML).toEqual("<div><h3></h3></div>");
})
test("remove additional, salt:10mg", () => {
  setupDocumentBody("salt:10mg")
  funcsToTest.removeAdditionalNutritionalInfo();
  expect(document.body.innerHTML).toEqual("");
})
test("remove additional,5 g sugar", () => {
  setupDocumentBody("5 g sugar")
  funcsToTest.removeAdditionalNutritionalInfo();
  expect(document.body.innerHTML).toEqual("");
})
test("remove additional, sugar 5g", () => {
  setupDocumentBody("sugar 5g")
  funcsToTest.removeAdditionalNutritionalInfo();
  expect(document.body.innerHTML).toEqual("");
})
