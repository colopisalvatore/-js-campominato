/*
Consegna:
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.
Bonus:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/ 

"use strict"


//Funzione per prendere il bottone Start
const startButton = document.getElementById('start');
const finalMsg = document.getElementById('finalMsg');

function start() {
    console.log('Inizio gioco...')

    const NUM_BOMB = 16;
    const bombsPosition = [];

    //  variabile SCORE
    let score = 0;

    const displayNoneH1 = document.getElementById('title2');
    displayNoneH1.className = 'd-none';

    let numCell;
    const fieldGame = document.getElementById('field');
    field.innerHTML = '';
    finalMsg.innerHTML = ``

    // seleziona livello
    const levelHtml = document.getElementById('level');
    const level = levelHtml.value;
    switch (level) {
        case 'easy':
        default: numCell = 100;
            break;
        case 'hard': numCell = 81;
            break;
        case 'crazy': numCell = 49;
            break;
    }

    // Max Tentativi
    const MAX_ATTEMPT = numCell - NUM_BOMB;

    // generiamo le bombe
    while(bombsPosition.length < NUM_BOMB) {
        const bomb = randomNumber(1, numCell);
        if (!bombsPosition.includes(bomb)) {
            bombsPosition.push(bomb);
        }
    }
    console.log(bombsPosition);


    function listenStart() {
        const num = parseInt(this.querySelector('span').innerText);
        console.log(num)

        // Blocca la possibilità di cliccare sulla stessa cella
        this.removeEventListener('click', listenStart);

        // Attiviamo un evento quando clicchiamo su un quadrato
        if (!bombsPosition.includes(num)) {
            this.classList.add('green');
            console.log('Clicca un altro')

            // Calcolo dello Score
            score++;
            console.log(score);
            finalMsg.innerHTML = `Il tuo attuale punteggio è di : ` + score + ` <br>Continua cosi!`

            if (score === MAX_ATTEMPT) {
                finalMsg.innerHTML = `Hai vinto! Sei stato bravissimo`
                endGame();
            }
        } else {
            this.classList.add('red');
            finalMsg.innerHTML = `Hai perso! Riprova, sarai più fortunato!`
            endGame();
        }
    }

    //funzione che genera la cella 
    function drawCell(num) {
        const cellPerSide = Math.sqrt(numCell)
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide})`;
        cell.style.height = `calc(100% / ${cellPerSide})`;
        cell.innerHTML = ` <span>${num}</span> `;
        cell.addEventListener('click', listenStart)
        return cell;
    }

    //funzione che genera il campo di gioco
    function drawGrid() {        
        const grid = document.createElement('div');
        grid.className = "grid";
        for (let i = 1; i <= numCell; i++) {
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        fieldGame.appendChild(grid);
    }
    //chiamo la funzione
    drawGrid();

    function endGame() {
        console.log('endGame');
        //prendo tutti i quadratini

        const squares = document.getElementsByClassName('square');
        console.log(squares);
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', listenStart);
            let num = i + 1;
            if (bombsPosition.includes(num)) {
                squares[i].classList.add('red');
            }
        }

        if (score === MAX_ATTEMPT) {            
            console.log('hai vinto');
        } else {            
            console.log('hai perso');
        }
    }
}

//attacco l'event listener
startButton.addEventListener('click',start);