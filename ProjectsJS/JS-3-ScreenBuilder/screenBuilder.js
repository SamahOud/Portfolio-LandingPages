const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "מצב אור";
    } else {
        modeText.innerText = "מצב כהה";
    }
});

const container = document.getElementById("container");
const tagElement = document.getElementById("tagElement");
const useColor = document.getElementById("useColor");
const txtContent = document.getElementById("txtContent");
const widthNum = document.getElementById("widthNum");
const heightNum = document.getElementById("heightNum");
const fontColor = document.getElementById("fontColor");
const fontSize = document.getElementById("fontSize");
const fontWeight = document.getElementById("fontWeight");

const border = document.getElementById("border");
const borderStyle = document.getElementById("borderStyle");
const borderRadius = document.getElementById("borderRadius");
const borderColor = document.getElementById("borderColor");

const shadowX = document.getElementById("shadowX");
const shadowY = document.getElementById("shadowY");
const shadowColor = document.getElementById("shadowColor");

const marginNum = document.getElementById("marginNum");
const paddingNum = document.getElementById("paddingNum");

const saveBtn = document.getElementById("save");
const addBtn = document.getElementById("add");
const showBtn = document.getElementById("show");
const clearBtn = document.getElementById("clear");
const form = document.getElementById("form");

// ********** Saving to LocalStorage **********
if (saveBtn) {
    saveBtn.addEventListener("click", function() {
        // Get the element selector and other input elements
        const elementSelector = document.getElementById("elementSelector");
        const selectedElement = elementSelector.value || "div"; // Default to <div> if no selection
        const box = document.createElement(selectedElement);
        
        box.title = 'Created at: ' + new Date().toLocaleString();
        box.classList.add("box"); // Add the "box" class
        const boxId = 'box-' + Date.now();
        box.id = boxId;

        box.style.backgroundColor = useColor.value;
        box.style.width = widthNum.value + 'px';
        box.style.height = heightNum.value + 'px';
        box.innerText = txtContent.value; 
        box.style.color = fontColor.value; 
        box.style.fontSize = fontSize.value + 'px';
        box.style.fontWeight = fontWeight.value;
        
        box.style.border = border.value + 'px ' + borderStyle.value + ' ' + borderColor.value;
        box.style.borderRadius = borderRadius.value + 'px';
        
        const boxShadowValue = shadowX.value + 'px ' + shadowY.value + 'px ' + shadowColor.value;
        box.style.boxShadow = boxShadowValue;

        box.style.margin = marginNum.value + 'px';
        box.style.padding = paddingNum.value + 'px';
        saveStoredItems(box.id, box.outerHTML); // Save to localStorage after additionn
        box.appendChild(document.createElement('br')); // Add line break
    
    });
}

// Function to save content to LocalStorage
function saveStoredItems(index, content) {
    const key = "savedBox_" + index;
    localStorage.setItem(key, content);
}

function displayStoredItems() {
    container.innerHTML = ""; // Clear the container
    let box;
    // Loop through LocalStorage keys and retrieve stored items
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("savedBox_")) {
            const content = localStorage.getItem(key);
            if (content) {
                box = document.createElement("div");
                box.innerHTML = content;
                container.appendChild(box);
            }
        }
    }
    container.style.display = "block"; // Show the container
}

// ********** Adding to the page web **********
if (addBtn) {
    // addBtn.addEventListener("click", displayStoredItems);
    addBtn.addEventListener("click", function() {
        container.innerHTML = ""; // Clear the container

        // Loop through LocalStorage keys and retrieve stored items
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("savedBox_")) {
                const content = localStorage.getItem(key);
                if (content) {
                    const box = document.createElement("div");
                    box.innerHTML = content;
                    container.appendChild(box);
                    console.log(box);
                }
            }
        }
        container.style.display = "block"; // Show the container
    });
}

// ********** Show saved from LocalStorage **********
if (showBtn) {
    showBtn.addEventListener("click", displayStoredItems);
}

// ********** Clearing the page web **********
if (clearBtn) {
    clearBtn.addEventListener("click", function() {
        // Clear the container
        document.getElementById("container").innerHTML = ""; 
    });
}