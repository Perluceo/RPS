//Options array (Rock, Paper, or Scissors).
var computerChoices = ["r", "p", "s"];

//Declaration
var wins = 0;
var losses = 0;
var ties = 0;

//Variables that hold references to the places in the HTML for display.
var instructionsText = document.getElementById("instructions");
var userChoiceText = document.getElementById("userchoice");
var computerChoiceText = document.getElementById("computerchoice");
var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var tiesText = document.getElementById("ties");

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

    // Determines keys r,p, or s pressed
    var userGuess = event.key;

    //Computer's guess.
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];


    // Keeping score
    if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

        if ((userGuess === "r" && computerGuess === "s") ||
            (userGuess === "p" && computerGuess === "r") ||
            (userGuess === "s" && computerGuess === "p")) {
            wins++;
        } else if (userGuess === computerGuess) {
            ties++;
        } else {
            losses++;
        }

        // Hide directions
        instructionsText.innerHTML = "";

        // Displays user/computer guesses and wins/losses/ties.
        userChoiceText.innerHTML = "You chose: " + userGuess;
        computerChoiceText.innerHTML = "The computer chose: " + computerGuess;
        winsText.innerHTML = "wins: " + wins;
        lossesText.innerHTML = "losses: " + losses;
        tiesText.innerHTML = "ties: " + ties;
    }
};