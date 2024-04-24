        document.addEventListener('DOMContentLoaded', function() {// När HTML-dokumentet laddas, kör denna funktion
            const choices = ['sten', 'papper', 'sax']; //Array med valmöjligheter
            const buttons = document.querySelectorAll('.choice-button'); // Hämta alla knappar med klassen "choice-button"
            const resultDisplay = document.getElementById('result');// Referens till elementet som visar resultatet
            const scoreDisplay = document.getElementById('score');// Refererar till elementet som visar poängen
            let computerScore = 0; //resetar score / gör så att det börjar på 0
            let userScore = 0; //resetar score / gör så att det börjar på 0

            buttons.forEach(button => {         // Lägger till en event listener för varje knapp
                button.addEventListener('click', function() {           // Spelarens val baserat på knappens ID
                    const playerChoice = this.id;        // Spelarens val baserat på knappens ID        
                    const computerChoice = choices[Math.floor(Math.random() * 3)];      // Datorns val slumpas från arrayen "choices"
                    const result = determineWinner(playerChoice, computerChoice);// Avgör vem som vann 
                    resultDisplay.textContent = result;         //visar vem som vann/resultatet
                    scoreDisplay.textContent = `Datorn: ${computerScore} | Du: ${userScore}`;        // Uppdatera och visa poängen för datorn och användaren
                });
            });

            function determineWinner(playerChoice, computerChoice) {       // Funktion för att avgöra vinnaren baserat på spelarens och datorns val
                if (playerChoice === computerChoice) {
                    return "Det är oavgjort!";   // Om spelarens val är samma som datorns val, är det oavgjort
                } else if ((playerChoice === 'sten' && computerChoice === 'sax') ||        
                           (playerChoice === 'papper' && computerChoice === 'sten') ||
                           (playerChoice === 'sax' && computerChoice === 'papper')) {
                    userScore++; // Om spelaren vinner, öka användarens poäng och visa "Du vann!"
                    return "Du vann!";
                } else {
                    computerScore++;// Om datorn vinner, öka datorns poäng och visa "Datorn vann!"
                    return "Datorn vann!";
                }
            }
        });
