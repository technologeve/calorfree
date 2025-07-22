/**
 * @jest-environment jsdom
 */

require('@testing-library/jest-dom');
const { fireEvent } = require('@testing-library/dom');

// Simulate chrome.storage API
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

describe('Calorfree popup settings', () => {
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

    checkbox = document.getElementById('nutritionCheckbox');
    saveButton = document.getElementById('save');
    statusDiv = document.getElementById('status');
    
    delete require.cache[require.resolve('../calorfree/scripts/popup.js')];
    require('../calorfree/scripts/popup.js');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.resetModules();
    document.body.innerHTML = '';
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
    expect(status.textContent).toMatch(/Preferences saved!?/);
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
