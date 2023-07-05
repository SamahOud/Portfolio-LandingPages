/**
    msgName
    msgEmail
    msgPhone
*/

const myForm = document.getElementById('my-form');
let msgName = document.getElementById('msgName');
let msgEmail = document.getElementById('msgEmail');
let msgPhone = document.getElementById('msgPhone');


const fullNameRegex = /^[a-zA-Z]{3,25}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^[0-9]{10}$/;

myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullNameInput = myForm.elments['fullname'];
    const emailInput = myForm.elments['email'];
    const phoneInput = myForm.elments['phone'];

    if (!fullNameRegex.test(fullNameInput.value)) {
        msgName.innerText += 'עליך להקליד שם בעל 3 אותיות לפחות';
        fullNameInput.style.borderBottomColor = "red";
        return;
    }

    else if (!emailRegex.test(emailInput.value)) {
        msgEmail.innerText += 'עליך להקליד כתובת אימייל תקינה';
        fullemailInputNameInput.style.borderBottomColor = "red";
        return;
    }

    else if (!phoneRegex.test(phoneInput.value)) {
        msgPhone.innerText += 'עליך להקליד מספר טלפון תקין';
        phoneInput.style.borderBottomColor = "red";
        return;
    }

    else {
        message.innerText = '';
    }
    myForm.submit();
});