// Hämta referenser, HTML-element
document.addEventListener('DOMContentLoaded', function() {
const guessInput = document.getElementById('guess-input');
const submitGuessButton = document.getElementById('submit-guess');
const resultDisplay = document.getElementById('result');
const leaderboardList = document.getElementById('leaderboard-list');

let leaderboardData = [];       // Array för att lagra ledartavledata

// Funktion för att uppdatera leaderboarden 
function updateLeaderboardUI() {
    leaderboardList.innerHTML = '';         // Rensa ledartavlan
    leaderboardData.forEach(entry => {      //För varje runda, skapa ett listelement i leaderboarden
        const listItem = document.createElement('li');                  // Visa namn, tid och antal gissningar för varje runda
        listItem.textContent = `${entry.name} - Time: ${entry.time} - Guesses: ${entry.guesses}`; // Lägg till listelementet till leaderboarden
        leaderboardList.appendChild(listItem);  // Lägger till det nya listelementet i leaderboarden
    });
}

// funktion som genererar ett nummer mellan min, max 
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;   // Returnerar ett slumpmässigt heltal mellan min och max
}

// Spellogiken
let targetNumber; // Det slumpmässiga numret som spelaren ska gissa
let startTime; // Starttid för spelet
let endTime; // Sluttid för spelet
let elapsedTime; // Total tid för spelet
let numGuesses = 0; // Antal gissningar
let playerName; // Spelarens namn

function startGame() {    // Funktion för att starta spelet
    targetNumber = getRandomNumber(1, 100);         // Generera ett slumpmässigt nummer mellan 1 och 100
    startTime = Date.now();         // Spara starttiden för spelet
}

function endGame() { // funktion för att avsluta spelet
    endTime = Date.now();           // Spara sluttiden för spelet
    elapsedTime = (endTime - startTime) / 1000;         // Beräkna totaltid för spelet i sekunder
    resultDisplay.textContent = `Grattis! Du gissade numret ${targetNumber} på ${numGuesses} gissningar och ${elapsedTime} sekunder.`;
         // Visa resultatet för spelaren inklusive det slumpmässiga numret, antal gissningar och tid
    playerName = prompt('Grattis! Du gissade numret. Skriv ditt namn för leaderboarden:');              
     // Frågar spelaren efter deras namn för att kunna spara det till leaderboarden
}

 // Lägg till event listener för att skicka gissning när knappen klickas
submitGuessButton.addEventListener('click', function() {
    const guess = parseInt(guessInput.value);           // Hämta gissningen från inputfältet och konvertera till ett heltal
    if (isNaN(guess) || guess < 1 || guess > 100) {        // Kontrollera om gissningen är ett giltigt nummer mellan 1 och 100
        resultDisplay.textContent = 'Vänligen ange ett giltigt nummer mellan 1 och 100.';   
        return;
    }
    numGuesses++;        // Öka antalet gissningar
    if (guess === targetNumber) {           // Jämför gissningen med det slumpmässiga numret
        endGame();              // Om gissningen är korrekt, avsluta spelet
    } else if (guess < targetNumber) {
        resultDisplay.textContent = 'För lågt! Testa ett högre nummer.';            // Om gissningen är för låg, visa meddelande
    } else {
        resultDisplay.textContent = 'För högt! Testa ett mindre nummer.';            // Om gissningen är för hög, visa meddelande

    }
});
startGame();    // Starta spelet när sidan laddas
});
