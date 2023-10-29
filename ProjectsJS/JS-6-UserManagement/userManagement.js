const formRegister = document.getElementById('form-register');
const formLogin = document.getElementById('form-login');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const subRegister = document.getElementById('subRegister');

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const subLogin = document.getElementById('subLogin');

const search = document.getElementById('search');

let mood = 'הרשמה';
let tmp;

// Create products
let dataUser;
if (localStorage.users != null) {
    dataUser = JSON.parse(localStorage.users);
} else {
    dataUser = [];
}

formRegister.addEventListener('submit', e => {
    e.preventDefault();
    registerUser();
});

formLogin.addEventListener('submit', e => {
    e.preventDefault();
    loginUser();
});

function registerUser() {
    // Retrieve the list of users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
    const newUserId = lastUserId + 1;

    const newUser = {
        id: newUserId,
        firstname: firstname.value.trim().toLowerCase(),
        lastname: lastname.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        status: "מחובר",
    };

    if (firstname.value != '' && lastname.value != '' && email.value != '' && password.value != '') {
        if (mood === 'הרשמה') {
            dataUser.push(newUser);
        } else {
            dataUser[tmp] = newUser;
            showData();
            mood = 'הרשמה';
            subRegister.innerHTML = 'הרשמה';
            subRegister.style.background = '#2939c2';
        }
    } else {
        validateName();
        validateLastName();
        validateEmail();
        validatePassword();
    }

    clearData();
    // Add a new user to the array and save it into the local storage
    localStorage.setItem('users', JSON.stringify(dataUser));
}

// Function to log in a user
function loginUser() {
    const emailV = emailInput.value.trim();
    const passwordV = passwordInput.value.trim();
    
    // Retrieve the current list of users from local storage
    const users = JSON.parse(localStorage.getItem("users"));
    const userV = users.find(user => user.email === emailV && user.password === passwordV);

    if (emailV === "" && passwordV === "") {
        validateInputs();
    } 
    else if (userV) {
        userV.status = "מחובר";
        localStorage.setItem("users", JSON.stringify(users));
        validateInputs();
        alert(`התחברת בהצלחה ${userV.firstname} ${userV.lastname}`);
        showData();
        
        // Clear the input fields
        document.getElementById("emailInput").value = "";
        document.getElementById("passwordInput").value = "";
    } 
    else if (checkIfEmailExists(emailV)) {
        validateInputs();
    } 
    else {
        setError(emailInput, 'צריך להירשם קודם'); // You have to register first
        setError(passwordInput, 'צריך להירשם קודם');
    }
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');

    setTimeout(() => {
        errorDisplay.innerText = '';
        inputControl.classList.add('default');
    }, 5000);
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

    setTimeout(() => {
        inputControl.classList.add('default');
    }, 5000);
}

function validateInputs() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    
    switch (true) {
        case emailValue === '':
            setError(emailInput, 'יש צורך באימייל'); // Email is required
            break;
        case !isValidEmail(emailValue):
            setError(emailInput, 'ספק כתובת אימייל חוקית'); // Provide a valid email address
            break;
        default:
            setSuccess(emailInput);
    }

    switch (true) {
        case passwordValue === '':
            setError(passwordInput, 'דרושה סיסמא'); // Password is required
            break;
        case passwordValue.length < 8:
            setError(passwordInput, 'הסיסמה חייבת להיות 8 תווים לפחות.'); // Password must be at least 8 character.
            break;
        default:
            setSuccess(passwordInput);
    }
}

function validateName() {
    const firstNameValue = firstname.value.trim();
    if(firstNameValue === '') {
        setError(firstname, 'נדרש שם פרטי'); // First name is required
    } else {
        setSuccess(firstname);
    }
}

function validateLastName() {
    const lastNameValue = lastname.value.trim();
    if(lastNameValue === '') {
        setError(lastname, 'נדרש שם משפחה'); // Last name is required
    } else {
        setSuccess(lastname);
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    switch (true) {
        case emailValue === '':
            setError(email, 'יש צורך באימייל'); // Email is required
            break;
        case !isValidEmail(emailValue):
            setError(email, 'ספק כתובת אימייל חוקית'); // Provide a valid email address
            break;
        case checkIfEmailExists(emailValue):
            // Email already exists. Please try another email address.
            setError(email, 'האימייל כבר קיים. אנא נסה כתובת דוא"ל אחרת.');
            break;
        default:
            setSuccess(email);
    }
}

function validatePassword() {
    const passwordValue = password.value.trim();

    switch (true) {
        case passwordValue === '':
            setError(password, 'דרושה סיסמא'); // Password is required
            break;
        case passwordValue.length < 8:
            setError(password, 'הסיסמה חייבת להיות 8 תווים לפחות.'); // Password must be at least 8 character.
            break;
        case checkUserPassword(passwordValue):
            setError(password, 'הסיסמה הזו כבר קיימת, שנה אותה.'); // This password already exists, change it
            break;
        default:
            setSuccess(password);
    }
}

function isValidEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(String(email).toLowerCase());
}

function checkIfEmailExists(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email);
}

function checkUserPassword(password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.password === password);
}

function clearData() {
    firstname.value = '';
    lastname.value = '';
    email.value = '';
    password.value = '';
}

// Initialize with total user count
let displayedUserCount = dataUser.length;

// Read data
function showData() {
    let table = '';
    for(let i = 0; i < dataUser.length; i++) {
        table += `
            <tr>
                <td data-label="שם פרטי">${dataUser[i].firstname}</td>
                <td data-label="שם משפחה">${dataUser[i].lastname}</td>
                <td data-label="דוא'ל">${dataUser[i].email}</td>
                <td data-label="סיסמה">${dataUser[i].password}</td>
                <td data-label="סטטוס" id="statusV">${dataUser[i].status}</td>
                <td data-label="פעולות"><div class="tdBtn">
                    <button onclick="updateData(${i})" id="update">
                        <i class="fas fa-edit"></i>עדכן</button>
                    <button onclick="deleteData(${i})" id="delete">
                        <i class="fas fa-trash"></i>מחק</button>
                    <button onclick="disconnect(this, ${i})" id="disconnect">
                        <i class="fas fa-unlink"></i>ניתוק</button>
                </div></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
    const btnDelete = document.getElementById('deleteAll');
    if (displayedUserCount > 0) {
        btnDelete.innerHTML = `
            <button onclick="deleteAll()" id="delete-all">מחק הכל (${displayedUserCount})</button>
        `;
    } else {
        btnDelete.innerHTML = ''; // Remove the button if there are no users
    }
}
showData();

// Delete user
function deleteData(i) {
    dataUser.splice(i, 1);
    localStorage.users = JSON.stringify(dataUser);
    showData();
}

// Delete user by name
function deleteUserByName(firstName) {
    // Retrieve the users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Keep track of how many users were deleted
    let deletedCount = 0;

    // Loop through the array in reverse order
    for (let i = users.length - 1; i >= 0; i--) {
        if (users[i].firstname === firstName) {
            users.splice(i, 1); // Remove the user from the array
            deletedCount++; // Increment the deleted count
            deleteData(i);
        }
    }

    if (deletedCount > 0) {
        localStorage.setItem("users", JSON.stringify(users)); // Update localStorage
        displayedUserCount = users.length; // Update displayed user count
    }

    search.value = "";
    showData(); // Refresh the table
}

// Delete all data 
function deleteAll() {
    const confirmDeleteAll = confirm("Are you sure you want to delete all users?");
    if (confirmDeleteAll) {
        dataUser.splice(0);
        localStorage.users = JSON.stringify(dataUser);
        showData(); 
    }
}

// Update data
function updateData(i) {
    firstname.value = dataUser[i].firstname;
    lastname.value = dataUser[i].lastname;
    email.value = dataUser[i].email;
    password.value = dataUser[i].password;

    subRegister.innerHTML = 'עדכן';
    subRegister.style.background = '#ff3300';
    mood = 'עדכן';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// Search 
let searchMood = 'שם';
function getSearchMood() {
    let search = document.getElementById('search');
    search.placeholder = 'חפש לפי  ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

// Search data
function searchData(value) {
    let count = 0;
    let table = '';
    for (let i = 0; i < dataUser.length; i++) {
        if (dataUser[i].firstname.includes(value.toLowerCase())) {
            table += `
                <tr>
                    <td data-label="שם פרטי">${dataUser[i].firstname}</td>
                    <td data-label="שם משפחה">${dataUser[i].lastname}</td>
                    <td data-label="דוא'ל">${dataUser[i].email}</td>
                    <td data-label="סיסמה">${dataUser[i].password}</td>
                    <td data-label="סטטוס" id="statusV">${dataUser[i].status}</td>
                    <td data-label="פעולות"><div class="tdBtn">
                        <button onclick="updateData(${i})" id="update">
                            <i class="fas fa-edit"></i>עדכן</button>
                        <button onclick="deleteData(${i})" id="delete">
                            <i class="fas fa-trash"></i>מחק</button>
                        <button onclick="disconnect(this, ${i})" id="disconnect">
                            <i class="fas fa-unlink"></i>ניתוק</button>
                    </div></td>
                </tr>
            `;
            count++;
        }
    }
    displayedUserCount = count;
    document.getElementById('tbody').innerHTML = table;
    const btnDelete = document.getElementById('deleteAll');
    
    if (displayedUserCount > 0) {
        btnDelete.innerHTML = `
            <button id="deleteName" onclick="deleteUserByName('${value}')">מחק הכל (${displayedUserCount})</button>
        `;
    } 
}

// Function to toggle disconnect
function disconnect(button, userId) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    for (const userIds of users) {
        const status = document.getElementById('statusV');

        if (userIds && userIds.status === "מחובר" && (button.innerText === "ניתוק")) {
            button.innerHTML = `<i class="fas fa-link"></i> מחובר`;
            userIds.status = userIds.status === "מחובר" ? "ניתוק" : "מחובר";
            status.textContent = "ניתוק";
            break;
        } 
        else if (userIds && userIds.status === "ניתוק" && (button.innerText === "מחובר" || button.innerText === "ניתוק")) {
            button.innerHTML = `<i class="fas fa-unlink"></i> ניתוק`;
            userIds.status = userIds.status === "ניתוק" ? "מחובר" : "ניתוק";
            status.textContent = "מחובר";
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
}