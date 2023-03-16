(function(){
    'use strict';
    console.log('js is running');

    const startGame = document.getElementById('start');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');
    const nameForm = document.querySelector('#nameform');

    const plopAudio = document.getElementById('plopaudio');
    const tundraAudio = document.getElementById('tundraaudio');
    const beachAudio = document.getElementById('beachaudio');
    const jungleAudio = document.getElementById('jungleaudio');
    const coastalAudio = document.getElementById('coastalaudio');

    let selectedTheme = "";
    let currentAudio = tundraAudio;
    currentAudio.volume = 0.08;

    let playerOne = "";
    let playerTwo = "";

    const gameData = {
        dice: ['images/die1.png', 'images/die2.png', 'images/die3.png', 'images/die4.png', 'images/die5.png', 'images/die6.png'],
        players: ["player1","player2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 50
    }

    // collect user input for player names from the initial form page + set up the game once the user presses start
    nameForm.addEventListener('submit', function(event){
        event.preventDefault();

        // change gameData object so player names are assigned the user input
        playerOne = document.querySelector('#player1').value;
        playerTwo = document.querySelector('#player2').value;
        
        gameData.players[0] = playerOne;
        gameData.players[1] = playerTwo;


        // changes innerHTML of playernames on scoreboard
        // var playerOneName = document.querySelector('#playerOneName');
        // var playerTwoName = document.querySelector('#playerTwoName');

        // playerOneName.innerHTML = playerOne;
        // playerTwoName.innerHTML = playerTwo;

        // changes screen from the user input form to the actual game area
        document.querySelector('#gamestart').className = "hidden";
        document.querySelector('#maingame').className = "showing";
        gameData.index = Math.round(Math.random());
        gameControl.innerHTML += '<button id="quit">WANNA QUIT?</button>';
        // += adds on to whatever was already in the HTML

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });

        gameData.innerHTML = `<p>${gameData.players[gameData.index]}'s Turn</p>`;
       
        setUpTurn();
    });
  
    // sets up initial turn, clarifies which player's turn it is
    function setUpTurn(){
        game.innerHTML = `<p>${gameData.players[gameData.index]}'s Turn</p>`;
        actionArea.innerHTML = '<button id="roll">ROLL</button>';
        document.getElementById('roll').addEventListener('click', function(){
            // plop sound effect plays when 'roll is clicked' aka when dice are thrown
            plopAudio.volume = 0.3;
            plopAudio.play();
            throwDice();
        });
    }

    // randomize the dice throw
    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>${gameData.players[gameData.index]}'s Turn To Roll</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}" id=dice1>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}" id=dice2>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // if two 1's are rolled ...
        if(gameData.rollSum === 2) {
            game.innerHTML += '<p>oh snap! snake eyes!</p>'
            gameData.score[gameData.index] = 0;
            // ternary operator '?' if 1 (true) set it to 0 : if 0 (false) set it to 1
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2000);
            showCurrentScore();
        }
        // if one 1 is rolled ...
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }
        // any other roll
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">ROLL AGAIN</button> <button id="pass">PASS</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                setUpTurn();
            });

            document.getElementById('pass').addEventListener('click', function(){
                // ternary operator to switch players; if on 'player 1' switch to 'player 0', if on 'player 0' switch to 'player 1'
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            winningCondition();
        }
    };

    // checks if points have reached the winning point score; if so prints the winner, otherwise prints the current score
    function winningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "NEW GAME";
        }
        else {
            showCurrentScore(); 
        }
    }

    // displays current score
    function showCurrentScore(){
        score.innerHTML = `<p><strong>SCORE <br> ${gameData.players[0]} ${gameData.score[0]} - ${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
    }


    // menu control [top left icons]
    
    const rules = document.querySelector('#rulesicon');
    const customize = document.querySelector('#mapicon');
    const muted = document.querySelector('#mutedicon');
    const unmuted = document.querySelector('#unmutedicon');

    const gamerules = document.querySelector('#gamerules');
    const closerules = document.querySelector('#closerules');
    const gametheme = document.querySelector('#gametheme');
    const savetheme = document.querySelector('#savetheme');

    const themeForm = document.querySelector('#themeform');

    // let backgroundImage = document.querySelector('body').style.backgroundImage;
    let body = document.querySelector('body');


    rules.addEventListener('click', function() {
        gamerules.className = 'showing';
        // body.style.color = '#2222220';
    });

    closerules.addEventListener('click', function() {
        gamerules.className = 'hidden';
    });

    customize.addEventListener('click', function() {
        gametheme.className = 'showing';
    });

    themeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        gametheme.className = 'hidden';
        const previousAudio = currentAudio;
        selectedTheme = document.querySelector('input[name="theme"]:checked').value;
        body.style.backgroundImage = `url(images/${selectedTheme}back.png)`;
        const selectedThemeAudio = document.getElementById(`${selectedTheme}audio`);
        currentAudio = selectedThemeAudio;
        console.log(currentAudio);
        if(muted.className == "hidden") {
            previousAudio.pause();
            currentAudio.play();
        }
    });

    console.log(currentAudio);

    muted.addEventListener('click', function(){
        muted.className = 'hidden';
        // plays
        console.log(currentAudio);
        currentAudio.play();
    });

    unmuted.addEventListener('click', function(){
        muted.className = 'showing';
        // stops music
        currentAudio.pause();
    });

})();