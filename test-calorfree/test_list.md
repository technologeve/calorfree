# Tests

Tracking tests written, and to write for calorfree.

To run, from the test-calorfree directory, run jest --setupFilesAfterEnv=./jest.mock.js

### Functions to test
##### Content
- [ ] basicRegexReplacement
- [ ] replaceInfoSplitByChevrons
- [ ] removeCalorieDescriptions
- [ ] removeAdditionalNutritionalInfo
- [ ] getSettingsAndBlockInfo
##### Popup
- [ ] saveOptions
- [ ] restoreOptions
- [ ] Running the two above functions on document loaded & click

- replaces regex that is there
- doesnt replace non-matches

Cals: 20
20 cals
12.34 kcals
054.21kcal
34. calories
calories:<calories><ahhhh>20
