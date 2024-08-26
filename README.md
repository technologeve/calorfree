# calorfree

Creating a Chrome Extension which blocks calorie count content from websites.

##### Before
![Before calorfree extension](https://github.com/technologeve/calorfree/blob/main/readme-images/before.png)
##### After: Just remove calorie count
![After calorfree extension: just calories](https://github.com/technologeve/calorfree/blob/main/readme-images/just_calories.png)
##### After: Remove all nutritional info
![After calorfree extension: all nutritional info](https://github.com/technologeve/calorfree/blob/main/readme-images/all_info.png)


##### User settings popup
![Screenshot of user settings popup](https://github.com/technologeve/calorfree/blob/main/readme-images/user_settings.png?)

### Directory structure
- calorfree: The main project - blocks calorie counts from websites.
- give-user-options: Following Chrome tutorial to allow users to specify settings. Here users can select their favourite flower and whether they like flowers.
- initial_extension: Following the first Chrome extension tutorial, "Hello World" style popup on clicking the extension icon.
- reading-time: Following the second chrome extension tutorial: displaying estimated reading time on Chrome Extension tutorials.
- uplifting-quotes: A short project which gives users a motivational quote when they click on the extension.
- test-calorfree: Unit tests for key functions. Run locally with jest --setupFilesAfterEnv=./jest.mock.js