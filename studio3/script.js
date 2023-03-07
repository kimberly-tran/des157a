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
    var playerOne = "";
    var playerTwo = "";
    
    // console.log(gameData.players);

    const form = document.querySelector('form');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        // getFormData();

        // let playerOneName = document.getElementById('playerOneName');
        // //console.log(playerOneName.innerHTML);
        // let playerTwoName = document.getElementById('playerTwoName');

        playerOne = document.querySelector('#player1').value;// Correct Value.
        console.log(playerOneName);

        playerTwo = document.querySelector('#player2').value; //Correc Value
        // const winningPoints = document.querySelector('#winningpoints').value;

        // playerOneName.innerHTML = playerOne;
        // playerTwoName.innerHTML = playerTwo;
    
    });

    const gameData = {
        dice: ['images/die1.png', 'images/die2.png', 'images/die3.png', 'images/die4.png', 'images/die5.png', 'images/die6.png'],
        players: ["player1", "player2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30
    }

    // function getFormData() {
    //     const playerOne = document.querySelector('#player1').value;
    //     const playerTwo = document.querySelector('#player2').value;
    //     const winningPoints = document.querySelector('#winningpoints').value;
    //     // console.log(`hello ${playerOne}`);
    //     // console.log(playerOne, playerTwo, winningPoints)

    //     return playerOne;
    // }

    // let values = getFormData();
    // console.log(values);

    // const playerOne = values[0];
    // const playerTwo = values[1];
    // const winningPoints = values[2];

    // 

    // after user clicks start, page switches from form to the game area
    startGame.addEventListener('click', function(){
        document.querySelector('#gamestart').className = "hidden";
        document.querySelector('#maingame').className = "showing";
        gameData.index = Math.round(Math.random());
        // gameControl.innerHTML += '<h2>The game has started.</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';
        // += adds on to whatever was already in the HTML

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });

        // console.log(gameData.index);
        // console.log('set up the turn');
        setUpTurn();
    });
//beverage = age >= 21 ? "Beer" : "Juice";
    // sets up initial turn, clarifies which player's turn it is
    function setUpTurn(){
        console.log(gameData.index);
        if(gameData.index)
        {
            game.innerHTML = `<p>Roll the dice for the ${playerOne}</p>`;
            console.log(gameData.index);
            
        }
        else
        {
            game.innerHTML = `<p>Roll the dice for the ${playerTwo}</p>`;
            console.log(gameData.index);
        }
        //game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
       // game.innerHTML = `<p>Roll the dice for the ${"FGH"}</p>`;
        // ${gameData.players[gameData.index]} is the current player whose turn it is
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