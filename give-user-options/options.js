// Save options chrome.storage
const saveOptions = () => {
    const flower = document.getElementById("flower").value;
    const likesFlower = document.getElementById("like").checked;
    
    chrome.storage.sync.set(
        { favouriteFlower: flower, likesFlower: likesFlower},
        () => {
            /* Update status to let user know their 
               preferences were saved. */
            const status = document.getElementById("status");
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
        {favouriteFlower: 'rose', likesFlower: true},
        (items) => {
            document.getElementById('flower').value = items.favouriteFlower;
            document.getElementById('like').checked = items.likesFlower;
        }
    );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
