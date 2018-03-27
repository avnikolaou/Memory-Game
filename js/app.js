const card = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
let cards = [...card];
let openedCards = [];
let movesCounter = 0;
let stars = document.getElementsByClassName("stars");
let second = 1, minute = 0;
let timer = document.querySelector(".timer");
let interval;
let timeLeft = 9;
let reverseInterval;
let matchedCards = 0;
let modal = document.querySelector(".modal");
let playAgainButton = document.querySelector(".playAgain");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Adding Event Listeners
function addListeners() {
    playAgainButton.addEventListener("click", resetGame);
    window.addEventListener("click", windowOnClick);
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click",  displayCard)
        }
    }

// Basic functionality
function displayCard() {
    if (!this.classList.contains("open") && !this.classList.contains("show")) {
        if (openedCards.length !== 2) {
            this.classList.toggle("show");
            this.classList.toggle("open");
            addCardToOpenCards(this);
            checkOpenedCards();
        }
    }
}

function addCardToOpenCards(element) {
    openedCards.push(element);
}

function checkOpenedCards() {
    if (openedCards.length === 2) {
        if(openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
            cardsAreSame();
        } else {
            cardsAreDifferent();
        }
    }
}

function cardsAreSame() {
    for (let i = 0; i < openedCards.length; i++) {
        openedCards[i].classList.toggle("match");
    }
    openedCards = [];
    incrementMoveCounter();
    matchedCards++;
    endGame();
}

function cardsAreDifferent() {
    setTimeout(closeCards, 1500);
    function closeCards() {
        for (let i = 0; i < openedCards.length; i++) {
            openedCards[i].classList.toggle("open");
            openedCards[i].classList.toggle("show");
        }
        openedCards = [];
    }
    incrementMoveCounter();
}

function ShuffledCards() {
    let shuffledCards = shuffle(cards);
    for (let i= 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function(item){
            deck.appendChild(item);
        });
    }
}

function startGame() {
    document.getElementsByClassName('moves')[0].innerText = 0;
    resetStars();
    ShuffledCards();
    showAllCards();
    countDown();
    setTimeout(hideAllCards, 10000);
    setTimeout(function() {
        startTimer();
    }, 10000);
}

function resetGame() {
    hideAllCards();
    modal.classList.remove("show-modal");
    movesCounter = 0;
    matchedCards = 0;
    resetTimer();
    resetStars();
    resetMoves();
}

function showAllCards() {
    for (let i = 0; i < card.length; i++) {
        card[i].classList.add("open");
        card[i].classList.add("show");
        card[i].classList.remove("match");
    }
}

function hideAllCards() {
    for (let i = 0; i < card.length; i++) {
        card[i].classList.remove("open");
        card[i].classList.remove("show");
        card[i].classList.remove("match");
    }
}

function incrementMoveCounter() {
    movesCounter++;
    document.getElementsByClassName('moves')[0].innerText = movesCounter;
    checkStars();
}

function resetMoves() {
    document.getElementsByClassName('moves')[0].innerText = 0;
}

//Star rating system
function checkStars() {
    if (movesCounter > 9 && movesCounter < 13) {
        stars[0].firstElementChild.style.visibility = "collapse";
    }
    else if (movesCounter > 13) {
        stars[0].firstElementChild.nextElementSibling.style.visibility = "collapse";
    }
}

function resetStars() {
    stars[0].firstElementChild.style.visibility = "";
    stars[0].firstElementChild.nextElementSibling.style.visibility = "";
}

// Timer and countdown timer
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " Mins " + second + " Secs";
        second++;
        if(second === 60) {
            minute++;
            second=0;
        }
        if(minute === 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function countDown() {
    reverseInterval = setInterval(function() {
        timer.innerHTML = 0 + " Mins " + timeLeft + " Secs";
        timeLeft--;
        if(timeLeft < 0)
            clearInterval(reverseInterval);
    }, 1000);
}

function resetTimer() {
    clearInterval(reverseInterval);
    clearInterval(interval);
    second = 1; minute = 0; timeLeft = 9;
    timer.innerHTML = minute + " Mins " + 0 + " Secs";
}

// End-game Modal
function endGame() {
    if (matchedCards === 8) {
        clearInterval(interval);
        document.querySelector(".modalTimer").innerText = "Completed in " + timer.innerHTML;
        document.querySelector(".modalMoves").innerText = "Moves: " + movesCounter;
        document.querySelector(".modalStars").innerHTML = document.querySelector(".stars").innerHTML;
        matchedCards = 0;
        toggleModal();
    }
}

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
        hideAllCards();
    }
}

addListeners();