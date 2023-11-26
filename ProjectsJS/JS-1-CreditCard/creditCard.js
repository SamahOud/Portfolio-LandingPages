const credit = {
    title: `Let's Make Payment`,
    description:
        `To start your subscription, input your card details to make payment. 
        You will be redirected to your banks authorization page.`,
    cardHolder: `Cardholder's Name`,
    number: `Card Number`,
    expiry: "Expiry",
    cvc: "CVC",
    discountCode: "Discount Code",
    apply: "Apply",
    paying: `You're paying,`,
    finalPrice: 450.0,

    order1: "Custom Gucci Shoes",
    price1: 400.0,
    size1: "Size: m  Color: Red",

    order2: "Nivea Cream 400ml",
    price2: 50.0,
    size2: "Size: m  Color: Blue",

    order3: "Discounts & Offers",
    price3: 0.0,

    tax: "Tax",
    price4: 0.0,
    total: "Total",
    totalAmount: 450.0,
};

let template = `
    <div class="container">
        <div class="credit-card">
                <h1 class="heading">${credit.title}</h1>

                <p class="description">${credit.description}</p>

                <form id="my-form" action="#" method="post">
                    <div class="form_control">
                        <label for="cardholder-name">${credit.cardHolder}</label>
                        <input type="text" id="cardholder-name" name="cardholder-name" placeholder="PAULINA CHIMAROKE" >
                        <div class="error"></div>
                    </div>

                    <div class="form_control">
                        <label for="cardNumber">${credit.number}</label>
                        <div class="form_input">
                            <img class="icon" src="./images/mastercard.png" alt="mastercard">
                            <input type="text" id="cardNumber" class="input_mastercard" name="cardNumber" placeholder="9870 3456 7890 6473">
                            <div class="error"></div>
                        </div>
                    </div>

                    <div class="form_control_flexrow">
                        <div class="form_control_flexcolumn">
                            <label for="expiry">${credit.expiry}</label>
                            <input type="text" id="expiry" class="input_box" name="expiry" placeholder="03 / 25">
                            <div class="error"></div>
                        </div>

                        <div class="form_control_flexcolumn">
                            <label for="cvc">${credit.cvc}</label>
                            <input type="text" id="cvc" class="input_box" name="cvc" placeholder="654">
                            <div class="error"></div>
                        </div>
                    </div>

                    <div class="form_control">
                        <label for="discount">${credit.discountCode}</label>
                        <input type="text" id="discount" name="discount" placeholder="CHIKAMSO-20-OFF" >
                        <a href="#">${credit.apply}</a>
                        <div class="error"></div>
                    </div>

                    <div class="content">
                        <button type="submit" id="pay" data-popup-id="error-popup" onclick="openPopup(this)">Pay</button>
                    </div>
                </form>

                <!-- Success Popup -->
                <div class="popup" id="success-popup">
                    <img src="./images/tick.png" alt="image">
                    <h2>Thank you</h2>
                    <p>Your details have been successfully submitted. Thanks!</p>
                    <button type="button" onclick="closePopup('success-popup')">OK</button>
                </div>

                <!-- Error Popup -->
                <div class="popup" id="error-popup">
                    <img src="./images/error.png" alt="image">
                    <h2>Ops!!</h2>
                    <p>Please fill in all the required fields correctly.</p>
                    <div class="content" id="popup-content">
                        <button type="button" onclick="removeErrorPopup()">OK</button>
                    </div>
                </div>
            </div>

            <div class="card-paying">
                <div class="blob"></div>
                <p  class="p_paying">${credit.paying}</p>
                <h2>$${credit.finalPrice}</h2>

                <div class="flex">
                    <p class="left_p">${credit.order1}</p>
                    
                    <span class="right_s">$ ${credit.price1}</span>
                </div>

                <p class="p_sizing">${credit.size1}</p>

                <div class="flex">
                    <p class="left_p">${credit.order2}</p>
                    
                    <span class="right_s">$ ${credit.price2}</span>
                </div>
                
                <p class="p_sizing">${credit.size2}</p>

                <div class="flex">
                    <p class="left_p discount">${credit.order3}</p>
                    
                    <span class="right_s">$ ${credit.price3}</span>
                </div>

                <hr>

                <div class="flex">
                    <p class="left_p tax_total">${credit.tax}</p>
                    
                    <span class="right_s">$ ${credit.price4}</span>
                </div>

                <div class="flex">
                    <p class="left_p tax_total">${credit.total}</p>
                    
                    <span class="right_s">$ ${credit.totalAmount}</span>
                </div>
            </div>
        </div>
    `;
document.body.innerHTML += template;

// =====================================
// ================== END ==============

const myForm = document.getElementById('my-form');
const nameRegex = /^[a-zA-Z]{3,20}$/;
// const cardNumberRegex = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;
const cardNumberRegex = /^5[1-5][0-9]{14}$/;
const expiryDateRegex = /^\d{2}\/\d{2}$/;
const cvcRegex = /^\d{3}$/;
const discountCodeRegex = /^[A-Z]{8}-[0-9]{2}-[A-Z]{3}$/; 

/**
    example inputs:
    --------
    CardName            : User Name
    MasterCard Number   : 5432109876543210
    Expiry Date         : 03/25
    CVC Code            : 654
    Discount Code       : CHIKAMSO-20-OFF
*/ 
// const popup = document.getElementById("popup");
const successPopup = document.getElementById('success-popup');
const errorPopup = document.getElementById('error-popup');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nameInput = myForm.elements['cardholder-name'];
    const cardNumberInput = myForm.elements['cardNumber'];
    const expiryDateInput = myForm.elements['expiry'];
    const cvcInput = myForm.elements['cvc'];
    const discountCodeInput = myForm.elements['discount'];
    const payButton = myForm.elements['pay'];

    let isValid = true;

    /** ***** Check the cardholder name input ***** */
    if (!nameRegex.test(nameInput.value)) {
        nameInput.style.borderBottomColor = "red";
        setError(nameInput, 'Username is required');
        isValid = false;
    } else {
        nameInput.style.borderBottomColor = "green";
        setSuccess(nameInput);
    }

    /** ***** Check the card number input ***** */
    // Remove existing spaces and non-numeric characters
    const sanitizedInput = cardNumberInput.value.replace(/\D/g, '');

    // Add spaces after every four digits
    const formattedInput = sanitizedInput.replace(/(\d{4})/g, '$1 ');

    if (!cardNumberRegex.test(sanitizedInput)) {
        cardNumberInput.style.borderBottomColor = "red";
        setError(cardNumberInput, 'Card number is required');
        isValid = false;
    } else {
        cardNumberInput.style.borderBottomColor = "green";
        setSuccess(cardNumberInput);
    }
    // Update the input value with formatted version
    cardNumberInput.value = formattedInput.trim();
    
    /** ***** Check the expiry date ***** */
    const expiryValue = expiryDateInput.value;
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Adding 1 because getMonth() returns zero-based month
    const currentMonth = currentDate.getMonth() + 1; 

    // Extract the month and year from the input value
    const [month, year] = expiryValue.split('/').map(Number);

    // Check if the input value matches the required format and the date is valid
    const isValidFormat = expiryDateRegex.test(expiryValue);
    const isValidMonth = month >= 1 && month <= 12;
    const isValidYear = year >= currentYear - 2000 && (year > currentYear - 2000 || month >= currentMonth);
    const isValidExpiry = isValidFormat && isValidMonth && isValidYear;

    if (isValidExpiry) {
        expiryDateInput.style.borderBottomColor = "green";
        setSuccess(expiryDateInput);
    } else {
        expiryDateInput.style.borderBottomColor = "red";
        setError(expiryDateInput, 'Expiry date is required');
        isValid = false;
    }

    /** ***** Check the cvc input ***** */
    if (!cvcRegex.test(cvcInput.value)) {
        cvcInput.style.borderBottomColor = "red";
        setError(cvcInput, 'CVC is required');
        isValid = false;
    } else {
        cvcInput.style.borderBottomColor = "green";
        setSuccess(cvcInput);
    }

    /** ***** Check the discount code input ***** */
    if (!discountCodeRegex.test(discountCodeInput.value)) {
        discountCodeInput.style.borderBottomColor = "red";
        setError(discountCodeInput, 'Discount code is required');
        isValid = false;
    } else {
        discountCodeInput.style.borderBottomColor = "green";
        setSuccess(discountCodeInput);
    }
       
    // Disable the "Pay" button if any field is invalid or empty
    payButton.disabled = !isValid;

    if (isValid) {
        payButton.style.opacity = "1";
        openPopup('success-popup');
    } else {
        payButton.disabled = isValid;
        payButton.style.opacity = "0.5";
        openPopup('error-popup');
    }
});

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.add("open-popup");
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove("open-popup");
}

function removeErrorPopup() {
    closePopup('error-popup');
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.textContent = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.textContent = ''; // Clear error message
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}