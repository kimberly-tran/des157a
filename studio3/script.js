(function(){
    'use strict';
    console.log('js is running');

    const startGame = document.getElementById('start');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');

    const plopAudio = document.getElementById('plopaudio');
    const swirlAudio = document.getElementById('swirlaudio');
    let playerOne = "";
    let playerTwo = "";
    
    // console.log(gameData.players);
    const gameData = {
        dice: ['images/die1.png', 'images/die2.png', 'images/die3.png', 'images/die4.png', 'images/die5.png', 'images/die6.png'],
        players: ["player1","player2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30
    }

    const form = document.querySelector('form');

    form.addEventListener('submit', function(event){
        event.preventDefault();

        playerOne = document.querySelector('#player1').value;
        playerTwo = document.querySelector('#player2').value;
        gameData.players[0] = playerOne;
        gameData.players[1] = playerTwo;
// 
        document.querySelector('#gamestart').className = "hidden";
        document.querySelector('#maingame').className = "showing";
        gameData.index = Math.round(Math.random());
        // gameControl.innerHTML += '<h2>The game has started.</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';
        // += adds on to whatever was already in the HTML

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });

        gameData.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
       
        setUpTurn();
    });
  
    // sets up initial turn, clarifies which player's turn it is
    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll</button>';
        document.getElementById('roll').addEventListener('click', function(){
            // plop sound effect plays when 'roll is clicked' aka when dice are thrown
            plopAudio.volume = 0.3;
            plopAudio.play();
            throwDice();
        });
    }

    // throw dice to randomize the dice throw
    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
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
            swirlAudio.volume = 0.3;
            swirlAudio.play();
            showCurrentScore();
        }
        // if one 1 is rolled ...
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
            swirlAudio.volume = 0.3;
            swirlAudio.play();
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> <button id="pass">Pass</button>';

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
            document.getElementById('quit').innerHTML = "New Game";
        }
        else {
            showCurrentScore(); 
        }
    }

    function showCurrentScore(){
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
    }


})();