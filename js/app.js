/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];
const deck = document.querySelector(".deck");
let openedCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

//set up the event listener for a card. If a card is clicked:
function addClickEventToLists() {
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click",  displayCard)
        }
    }

//display the card's symbol (put this functionality in another function that you call from this one)
function displayCard() {
    this.classList.toggle("show");
    this.classList.toggle("open");
    addCardToOpenCards(this);
    checkOpenedCards();
}

function addCardToOpenCards(element) {
    openedCards.push(element);
}

function checkOpenedCards() {
    console.log("length: " + openedCards.length);
    if (openedCards.length === 2) {
        if(openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className){
            cardsAreSame();
        } else {
            cardsAreDifferent();
        }
    }
}

function cardsAreSame() {
    console.log("Same Cards");
    for (let i = 0; i < openedCards.length; i++){
        openedCards[i].classList.toggle("match");
    }
    openedCards = [];
}

function cardsAreDifferent() {
    console.log("Different Cards");
    setTimeout(closeCards, 3000);
    function closeCards() {
        for (let i = 0; i < openedCards.length; i++){
            openedCards[i].classList.toggle("open");
            openedCards[i].classList.toggle("show");
        }
        openedCards = [];
    }
}

function ShuffledCards(){
    let shuffledCards = shuffle(cards);
    for (let i= 0; i < shuffledCards.length; i++){
        [].forEach.call(shuffledCards, function(item){
            deck.appendChild(item);
        });
    }
}

function startGame(){
    addClickEventToLists();
    //ShuffledCards();
}

function restartGame(){
    for (let i = 0; i < card.length; i++) {
        card[i].classList.remove("open");
        card[i].classList.remove("show");
        card[i].classList.remove("match");
    }
    //ShuffledCards()
}

window.onload = startGame();




/*
 * DONE set up the event listener for a card. If a card is clicked:
 *  DONE - display the card's symbol (put this functionality in another function that you call from this one)
 *  DONE - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  DONE - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
