const cards = document.querySelectorAll(".card");

let matchedCard = 0, score = 0, steps = 0;
let cardOne, cardTwo;
let disableDeck = false;

const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", shuffleCard);

function flipCard(e) {
    let clickedCard = e.target; // getting user clicked card
        
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        if (!cardOne) {
            // return the cardOne value to clickedCard
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);

        // Increment steps counter only when the second card is flipped
        steps++;
        document.getElementById("steps").textContent = `Steps: ${steps}`;

        // Check for win condition
        if (matchedCard == 8) {
            setTimeout(() => {
                showPopup("Congratulations! You've won!");
            }, 1000);
        }
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        steps++;
        score += 12.5; 
        matchedCard++; // increment matched value by 1
        
        // if matched value is 8 that means user has matched all the cards (8 * 2 = 16 cards)
        if (matchedCard == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000); // calling shuffleCard function after 1 sec
        }
        // Update score and steps display
        document.getElementById("score").textContent = `Score: ${score}`;
        document.getElementById("steps").textContent = `Steps: ${steps}`;

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; // setting both card value to blank
        return disableDeck = false;
    }

    // if two card not matched
    setTimeout(() => {
        // adding shake class to both card after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        // removing both shake & flip classes from the both card after 1.2 seconds
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; // setting both card value to blank
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne, cardTwo = "";
    disableDeck = false;
    // creating array of 16 items and each item is repeated twice
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    
    // sorting array item randomly
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    score = 0;
    steps = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("steps").textContent = `Steps: ${steps}`;

    // removing flip class from all cards and passing random image to each card
    cards.forEach((card, index) => { 
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `./Images/img-${arr[index]}.png`
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => { // adding click event to all cards
    card.addEventListener("click", flipCard);
});

const popup = document.getElementById('popup');

// Function to show the popup with a custom message
function showPopup(message) {
    const popupMessage = document.getElementById('popupMessage');
    const popupContent = document.querySelector('.popup-content');
    const closePopupButton = document.getElementById('closePopup');

    // Set the message
    popupMessage.textContent = message;
    popup.setAttribute('id', 'messagePopup');

    // Create an img element
    const imageElement = document.createElement('img');
    imageElement.setAttribute('id', 'imageInPopup');
    imageElement.src = "./Images/winer.jpg";
    imageElement.alt = 'Congratulations Image';

    popupContent.appendChild(imageElement);
   
    // Show the popup
    popup.style.display = 'block';

    // Close the popup when the close button is clicked
    closePopupButton.addEventListener('click', closePopup);
}

// Function to close the popup
function closePopup() {
    popup.style.display = 'none';
}