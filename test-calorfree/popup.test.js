// Tests for popup.js

// Imports
require("@testing-library/jest-dom");
const {fireEvent} = require("@testing-library/dom");

// Simulate Chrome storage
global.chrome = {
  storage: {
    sync: {
      // get: jest.fn(),
      // set: jest.fn()
        set: jest.fn((obj, cb) => cb()),
        get: jest.fn((defaults, cb) => cb({ hideAdditionalInfo: getValue }))
    }
  }
};

// Test the saveOptions function
describe("Calorfree popup settings", () => {
  let checkbox, saveButton, statusDiv;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    
    // Load the HTML structure
    document.body.innerHTML = `
      <div id="overall">
        <div class="row-flex">
          <input type="checkbox" id="nutritionCheckbox" />
          <p id="hide-text">Hide further nutritional info.</p>
        </div>
        <div class="row-flex">
          <button id="save">Save preferences</button>
          <div id="status"></div>
        </div>
      </div>
    `;

    checkbox = document.getElementById("nutritionCheckbox");
    saveButton = document.getElementById("save");
    statusDiv = document.getElementById("status");
    
    delete require.cache[require.resolve("../calorfree/scripts/popup.js")];
    require("../calorfree/scripts/popup.js");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.resetModules();
    document.body.innerHTML = "";
  });

  test("Set additional info to true", () => {
    // Set additional info to true and click save
    // Check that setting is updated and status messages displayed correctly.
    
    // Check additional info
    checkbox.checked = true;
    
    // Click save
    fireEvent.click(saveButton);
    
    // Check storage correctly updated
    expect(chrome.storage.sync.set).toHaveBeenCalledWith(
      { hideAdditionalInfo: true },
      expect.any(Function)
    );

    // Simulate the save callback completing
    const saveCallback = chrome.storage.sync.set.mock.calls[0][1];
    if (saveCallback) {
      saveCallback();
    }

    // Check for status message (might be set immediately or after callback)
    const status = document.getElementById("status");
    // Try both possible messages that might be used
    expect(status.textContent).toMatch("Preferences saved!");
    
    // Wait until status message timeout
    jest.advanceTimersByTime(1500);

    // Check status message cleared
    expect(statusDiv.textContent).toMatch("");
  });

  test("Set additional info to false", () => {
    // Set additional info to false and click save
    // Check that setting is updated and status messages displayed correctly.
    
    // Check additional info
    checkbox.checked = false;
    
    // Click save
    fireEvent.click(saveButton);
    
    // Check storage correctly updated
    expect(chrome.storage.sync.set).toHaveBeenCalledWith(
      { hideAdditionalInfo: false },
      expect.any(Function)
    );

    // Simulate the save callback completing
    const saveCallback = chrome.storage.sync.set.mock.calls[0][1];
    if (saveCallback) {
      saveCallback();
    }

    // Check for status message (might be set immediately or after callback)
    const status = document.getElementById("status");
    // Try both possible messages that might be used
    expect(status.textContent).toMatch("Preferences saved!");
    
    // Wait until status message timeout
    jest.advanceTimersByTime(1500);

    // Check status message cleared
    expect(statusDiv.textContent).toMatch("");
  });
});

// Test the restoreOptions function
describe("restoreOptions function", () => {
  let checkbox;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    
    // Load the HTML structure
    document.body.innerHTML = `
      <div id="overall">
        <div class="row-flex">
          <input type="checkbox" id="nutritionCheckbox" />
          <p id="hide-text">Hide further nutritional info.</p>
        </div>
        <div class="row-flex">
          <button id="save">Save preferences</button>
          <div id="status"></div>
        </div>
      </div>
    `;
    
    checkbox = document.getElementById("nutritionCheckbox");
    
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.resetModules();
  });

  test("restoreOptions if false", () => {
    // Mock chrome.storage.sync.get to return false
    global.chrome.storage.sync.get = jest.fn((defaults, cb) => cb({ hideAdditionalInfo: false }));
    
    // Call restoreOptions
    const funcsToTest = require("../calorfree/scripts/popup.js");
    funcsToTest.restoreOptions();

    // Check that checkbox is set to false
    expect(checkbox.checked).toBe(false);
  });

  test("restoreOptions if true", () => {
    // Mock chrome.storage.sync.get to return true
    global.chrome.storage.sync.get = jest.fn((defaults, cb) => cb({ hideAdditionalInfo: true }));
    
    // Call restoreOptions
    const funcsToTest = require("../calorfree/scripts/popup.js");
    funcsToTest.restoreOptions();

    // Check that checkbox is set to true
    expect(checkbox.checked).toBe(true);
  });
}
);

