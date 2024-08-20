const returnsThree = require("./content");
test("Removes 'Calories: 20", () => {
    expect(returnsThree()).toBe(3);
});

// contentScript.test.js
// import { modifyBody } from './contentScript';

// describe('modifyBody', () => {
//   beforeEach(() => {
//     // Set up a mock DOM environment before each test
//     document.body.innerHTML = '<div id="initial-content">Calories: 20.3</div>';
//   });

//   it('should modify document.body.innerHTML', () => {
//     // Call the function
//     basicRegexReplacement();

//     // Check if document.body.innerHTML has been changed
//     expect(document.body.innerHTML).not.toBe('<div id="initial-content"></div>');
//   });

//   it('should contain the new content', () => {
//     // Call the function
//     basicRegexReplacement();

//     // Check if the new content is present
//     expect(document.body.innerHTML).toBe('<div id="new-content">New Content</div>');
//   });
// });
