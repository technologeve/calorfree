// Saves settings in chrome.storage
const saveOptions = () => {
    const hideAdditionalInfo = document.getElementById("like").checked;
    
    chrome.storage.sync.set(
        {hideAdditionalInfo: hideAdditionalInfo},
        () => {
            // Add text to show settings saved
            const status = document.getElementById("status");
            status.textContent = "Preferences saved!";
            
            // Remove text popup after some time
            setTimeout(() => {
                status.textContent = "";
            }, 750);
        }
    );
};


// Resets settings
const restoreOptions = () => {
    chrome.storage.sync.get(
        {hideAdditionalInfo: false},
        (items) => {
            document.getElementById('like').checked = items.hideAdditionalInfo;
        }
    );
};

// Listen for content load
document.addEventListener("DOMContentLoaded", restoreOptions);

// Listen for button click
document.getElementById("save").addEventListener("click", saveOptions);
