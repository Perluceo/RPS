(function () {

	/*
	 * Rock, paper, scissors  
	 * 
	 * The classic game recreated in Javascript for playing in the browser.
	 * 
	 */

    window.onload = init;


    function init() {

        // get the game area and get access to all the buttons

        var userChoices = document.getElementById('user').getElementsByTagName('button');

        var comp = document.getElementById('computer');
        var compChoices = comp.getElementsByTagName('div');

        // get the results element and hide it initially
        var results = document.getElementById('results');

        //hide(results);
        results.style.display = 'none';

        // the gameover screen and final results
        var gameOver = document.getElementById('gameOver');
        //hide(gameOver);
        gameOver.style.display = 'none';
        var gameResults = document.getElementById('gameResults');
        var gameResultsText = document.getElementById('gameResultsText');

        // get the intro element and the buttons for choosing a game type
        var intro = document.getElementById('intro');
        var bestOf5 = document.getElementById('bestOf5');
        var bestOf7 = document.getElementById('bestOf7');

        // score elements and score variables
        var userScoreElement = document.getElementById('score');
        var computerScoreElement = document.getElementById('computerScore');
        var score;
        var computerScore;

        // prepare a variable to hold the game type
        // best of 5 or best of 7
        var gameType;

        // start the best of 5 game
        bestOf5.onclick = function () {
            enableGame();
            gameType = 5;
        }

        bestOf7.onclick = function () {
            enableGame();
            gameType = 7;
        }

        getScore();

        // create the choices
        var choices = [
            'rock',
            'paper',
            'scissors'
        ];

        // create the text for winning or drawing
        var USER_WINS = "You win!";
        var COMP_WINS = "Computer wins";
        var TIE = "TIE"

        var DRAW = '<i class="fab fa-black-tie"></i>';
        var TROPHY = '<i class="fas fa-trophy"></i>';
        var BAN = '<i class="fas fa-ban"></i>';

        // add an onclick event to each button and disable them initially
        for (var i = 0; i < userChoices.length; i++) {
            userChoices[i].onclick = selection;
            userChoices[i].disabled = true;
        }

        function enableGame() {
            enable(userChoices);
            //hide intro/gameOver
            intro.style.display = 'none';
            gameOver.style.display = 'none';
            getScore();
        }

        function getScore() {
            score = 0;
            userScoreElement.textContent = score;
            computerScore = 0;
            computerScoreElement.textContent = computerScore;

        }

        function computerSelection() {
            var randomIndex = Math.floor(Math.random() * CHOICES_LENGTH);
            var compChoice = choices[randomIndex];
            return compChoice;
        }

        function selection() {
            // get user/computer choice 
            var chosen = this.id;
            var comp = computerSelection();

            // get the users chosen item
            var chosenItem = document.getElementById(chosen);

            // prepare the chosenCompItem for dynamic id assignment
            var chosenCompItem;

            if (comp === 'rock') {
                chosenCompItem = document.getElementById('computerRock');
            }
            else if (comp === 'paper') {
                chosenCompItem = document.getElementById('computerPaper');
            }
            else if (comp === 'scissors') {
                chosenCompItem = document.getElementById('computerScissors');
            }

			/* show results and disable all choices so no more can 
			 be made while waiting for the pop up to fade out*/
            results.style.display = 'block';
            results.className = "reappear";
            disable(userChoices);
            disable(compChoices);


            // make the selected item stand out from the rest
            chosenItem.classList.add('selected');
            chosenCompItem.classList.add('selected');

            // determine winner
            if (chosen === comp) {
                results.textContent = TIE;
                results.innerHTML += DRAW;
                timeout();
            }
            else if ((chosen === 'rock' && comp === 'scissors') || (chosen === 'paper' && comp === 'rock') || (chosen === 'scissors' && comp === 'paper')) {

                results.textContent = USER_WINS;
                results.innerHTML += TROPHY;

                score += 1;
                userScoreElement.textContent = score;
                timeout();

            }
            else {

                results.textContent = COMP_WINS;
                results.innerHTML += BAN;

                computerScore += 1;
                computerScoreElement.textContent = computerScore;
                timeout();

            }

        }

        // functions

        function disable(elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].disabled = true;
                elements[i].classList.add('unselected');
            }
        }

        function enable(elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].disabled = false;
                elements[i].classList.add('default');
                elements[i].classList.remove('selected', 'unselected');
            }
        }

        function endGame() {
            gameOver.style.display = 'block';
            if (score > computerScore) {
                gameResultsText.textContent = "You won " + score + " - " + computerScore + "!";
            }
            else {
                gameResultsText.textContent = "You lost " + computerScore + " - " + score;
            }

            gameResults.appendChild(bestOf5);
            gameResults.appendChild(bestOf7);
        }

        function timeout() {
            setTimeout(function () {
                results.className = 'disappear';
                enable(userChoices);
                enable(compChoices);
                if (score + computerScore == gameType) {
                    endGame();
                }
            }, 1000)
        }
    }

})();