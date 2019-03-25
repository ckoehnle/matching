/*
 * Create a list that holds all of your cards
 */
var cds = ['fa-diamond', 'fa-diamond',
			'fa-paper-plane-o', 'fa-paper-plane-o',
			'fa-anchor', 'fa-anchor',
			'fa-bolt', 'fa-bolt',
			'fa-bomb', 'fa-bomb',
			'fa-cube', 'fa-cube',
			'fa-bicycle', 'fa-bicycle',
			'fa-leaf', 'fa-leaf',
		];
//setup all vars		
var moves = 0;
var matches = 0;
var stars = 3;
var mMatches = document.querySelector('.matches');
var mCounter = document.querySelector('.moves');
var mTimer = document.querySelector('.timer');
var mScore1 = document.querySelector('.one');
var mScore2 = document.querySelector('.two');
var mScore3 = document.querySelector('.three');
var TheDate = new Date();
var TheTime = TheDate.getTime();
var startTime = TheTime;
var tm=0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var timerInterval

//the function that creates the innerHTML for each <li><i> card.
function CardGen(card){		
	return `<li class="card"  title="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
 //this is the reset button function
function reloadpage(){
	//initGame()
	location.reload()
}

//this is the timer function
function uTimer(){
  TheDate = new Date();
  TheTime = TheDate.getTime();
  var currentTime = TheTime;  
  tm = (currentTime-startTime); 
  hours = Math.floor(tm / 1000 / 60 / 60);
  minutes = Math.floor(tm / 60000) % 60;
  seconds =  ((tm / 1000) % 60);
  seconds = seconds.toString().match(/^-?\d+(?:\.\d{0,-1})?/)[0];
  minutes = (minutes < 10 ? '0' : '') + minutes;
  seconds = (seconds < 10 ? '0' : '') + seconds;
  hours = hours + (hours > 0 ? ':' : '');
  if (hours==0){
    hours='';
  }
	mTimer.innerHTML = hours + minutes + ':' + seconds;
} 

function initGame(){
	Starter = true;
	deckHTML = document.querySelector('.deck');
	var cardHTML = shuffle(cds).map(function(card){
		return CardGen(card);
	});
	deckHTML.innerHTML = cardHTML.join('');
	moves = 0;
	stars = 3;
	mCounter.innerHTML = moves;
	
	resetBTN = document.querySelector('.fa-repeat');
	resetBTN.addEventListener('click', reloadpage);	
}

function GameOver(){
	clearInterval(timerInterval);
	if (moves < 13){
		if(confirm("Outstanding. "+stars+" Stars! \n"+ moves+" moves in "+minutes+' Minutes and ' +seconds+" Seconds! \n Would you like to restart the game?")){
			reloadpage()
		}
	}
	if (moves > 12 && moves < 32){
		if(confirm("Not Bad. "+stars+" Stars! \n"+ moves+" moves in "+minutes+' Minutes and '+seconds+" Seconds! \n Would you like to restart the game?")){
			reloadpage()
		}
	}
	if (moves > 31){
		if(confirm("How Old Are You! "+stars+" Star! \n"+ moves+" moves in "+minutes+' Minutes and '+seconds+" Seconds! \n Would you like to restart the game?")){
			reloadpage()
		}
	}
}

initGame();

//continue setting up the vars
var theDeck = document.querySelectorAll('.card');
var theCards = Array.from(theDeck);
var selCards = [];
var Starter = true;
	
theCards.forEach(function(card){
	card.addEventListener('click',function(e){
		if (Starter){
			Starter = false;
			TheDate = new Date();
			TheTime = TheDate.getTime();
			startTime = TheTime;
			timerInterval = setInterval(uTimer, 1000);
		}
		if (card.classList.contains('match') || card.classList.contains('open')){
			return
		}
		if (selCards.length <2){
			selCards.push(card);
			card.classList.add('open', 'show');
		}
		if (selCards.length >=2){				
			if (selCards[0].title == selCards[1].title){
				selCards.forEach(function(card){
					card.classList.add('match');
					matches +=.5;
					mMatches.innerHTML = matches;
				})
			}		
			setTimeout(function(){
				selCards.forEach(function(card){
					card.classList.remove('open', 'show');
					selCards = [];
				})
			},250);	
		moves +=1;
		mCounter.innerHTML = moves;	
		if (moves == 12){
			mScore1.classList.remove('fa-star');
			stars = 2;
		}
		if (moves == 16){
			mScore2.classList.remove('fa-star');
			stars = 1;
		}
		if (moves == 32){
			mScore3.classList.remove('fa-star');
			stars = 0;
		}
		if(matches ==8){
			GameOver()
		}			
	}
			
	});
});