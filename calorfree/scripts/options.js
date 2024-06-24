// Save options chrome.storage
const saveOptions = () => {
    const hideAdditionalInfo = document.getElementById("like").checked;
    
    chrome.storage.sync.set(
        {hideAdditionalInfo: hideAdditionalInfo},
        () => {
            /* Update status to let user know their 
               preferences were saved. */
            const status = document.getElementById("status");
            console.log("saved", hideAdditionalInfo);
            status.textContent = "Preferences saved!";
            setTimeout(() => {
                status.textContent = "";
            }, 750);
        }
    );
};

/* Restores select box and checkbox state using 
preferences stored in chrome.storage */

const restoreOptions = () => {
    chrome.storage.sync.get(
        {hideAdditionalInfo: false},
        (items) => {
            document.getElementById('like').checked = items.hideAdditionalInfo;
        }
    );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
// document.addEventListener("DOMContentLoaded", (event) => {
//     const el = document.getElementById("save");
//     if (el) {
//       el.addEventListener("save", saveOptions);
//     }
// });
document.getElementById("save").addEventListener("click", saveOptions);
