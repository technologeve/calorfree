
const funcsToTest = require("../calorfree/scripts/content");

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
test("replaces regex where present", () => {
  setupDocumentBody('Test Text')
  const generalCalorieRegExp = /Test /g;
  funcsToTest.basicRegexReplacement(generalCalorieRegExp)
  expect(document.body.innerHTML).toBe("Text");
});

test("doesn't replace non present regex", () => {
  setupDocumentBody('More Text')
  const generalCalorieRegExp = /Test/g;
  funcsToTest.basicRegexReplacement(generalCalorieRegExp)
  expect(document.body.innerHTML).toBe("More Text");
});

test("Removes 'Calories: 20'", () => {
  setupDocumentBody('<div id="app">Calories: 20</div>')
  const generalCalorieRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)(.[0-9]+)? ?(\\([0-9]+%\\))?/g;
  funcsToTest.basicRegexReplacement(generalCalorieRegExp)
  expect(document.body.innerHTML).toBe("<div id=\"app\"></div>");
  
});

// Test replaceInfoSplitByChevrons
// test("two chevrons", () => {
//   setupDocumentBody('Before<test><text>After')
//   const generalCalorieRegExp = / /g;
//   funcsToTest.replaceInfoSplitByChevrons(generalCalorieRegExp)
//   expect(document.body.innerHTML).toBe("Before<>After");
// })

// test("Removes 'Calories:{one}{two}20'", () => {
//   const generalCalorieRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)(.[0-9]+)? ?(\\([0-9]+%\\))?/g;
//   basicRegexReplacement(generalCalorieRegExp)
//   expect(document.body.innerHTML).toBe("<div id=\"app\"></div>");
  
// });
