
const basicRegexReplacement = require("../calorfree/scripts/content");

beforeEach(() => {
        // Set up a mock DOM environment before each test
        Object.defineProperty(global, 'document.body.html', {});
        document.body.innerHTML = '<div id="app">Calories: 20</div>';
        
        chrome.storage.sync.clear();
        // chrome.stroage.set({"hideAdditionalInfo": false});
        chrome.storage.sync.set({hideAdditionalInfo: false, key2: 'value2' }, () => {
          console.log('sync storage initialized');
        });
      });
    
afterAll(() => {
  document.body.innerHTML = "";
})

test("Removes 'Calories: 20'", () => {
    const generalCalorieRegExp = /([0-9]+) ?(calorie|cal|kcal)s?( per serving)?|(calories?|cal|kcals?)( per serving)?:? ?([0-9]+)(.[0-9]+)? ?(\\([0-9]+%\\))?/g;
    basicRegexReplacement(generalCalorieRegExp)
    expect(document.body.innerHTML).toBe("<div id=\"app\"></div>");
    
});
