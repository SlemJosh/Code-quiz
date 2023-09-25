// First we are going to list out our question as a variable array known as questions.  Each question is basically a card that has the question, options, and the answer, which will be hidden to the user at first.

var questions = [
    {
        title: "Javascript is an _______ language?",
        choices: ["1. Object-Oriented", "2. Object-Based", "3. Procedural", "4. None of the above"],
        answer: "1. Object-Oriented"
    },
    {
        title: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["1. var", "2. let", "3. Both A and B", "4. None of the above"],
        answer: "3. Both A and B"
    },
    {
        title: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["1. getElementbyID()","2. getElementsByClassName()", "3. Both A and B", "4. None of the above"],
        answer: "3. Both A and B"
    },
    {
        title: "The 3 basic object attributes in Javascript are:",
        choices: ["1. Class, prototype, object's parameters.", "2. Class, prototype, object's extensible flag.", "3. Class, parameters, object's extensible flag.", "4. Class, parameters, prototype."],
        anser: "2. Class, prototype, object's extesnsible flag."
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed with _______.",
        choices: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"],
        answer: "3. Parenthesis"

    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        choices:["1. Numbers and Strings","2. Other Arrays","3. Booleans","4. All of the Above"],
        answer:"4. All of the Above"
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        choices:["1. Commas", "2. Curly Brackets", "3. Quotes","4. Parenthesis"],
        answer: "4. Parenthisis"
    },
    {
        title: "A very useful tool used during development and debugging for print content to the debugger is:",
        choices: ["1. JavaScript", "2. Terminal/Bash", "3. For Loops", "4. Console Log"],
        answer: "4. Console log"
    }
        
]

// Other variables we will be using, however they will be used more regularly and dependant on other factors, such as the timer or the score.

var answerOptions = document.querySelector("answerOptions")
var showTime = document.querySelector("timeLeft")
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Here's where we initiate the game after hitting our button on the page.  The button is already primed to start a function called start, so we need a function with that name.

function start() {
	countdown();
	displayquestion();
}

function countdown() {
	var interval = setInterval(function () {
		if (questionindex < 4 && timeLeft > 0) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else if (timeLeft === 1) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else {
			timerElement.textContent = 'Time: ' + timeLeft;
			clearInterval(interval);
			score();
		}
	}, 1000);
}

function displayquestion() {
	if (questionindex < 4) {
		document.getElementById('main').innerHTML = '';

		var current = questions[questionindex];

		var question = document.createElement('h2');
		question.textContent = current.question;
		questionElement.appendChild(question);

		var a = document.createElement('p');
		a.textContent = current.a;
		questionElement.appendChild(a);

		var b = document.createElement('p');
		b.textContent = current.b;
		questionElement.appendChild(b);

		var c = document.createElement('p');
		c.textContent = current.c;
		questionElement.appendChild(c);

		var d = document.createElement('p');
		d.textContent = current.d;
		questionElement.appendChild(d);

		a.addEventListener('click', anwserCheck);
		b.addEventListener('click', anwserCheck);
		c.addEventListener('click', anwserCheck);
		d.addEventListener('click', anwserCheck);
	} else {
		score();
	}
}

function displayHighScores() {}

function anwserCheck() {
	console.log(this);
	if (questions[questionindex].answer === this.textContent) {
		console.log('correct');
		questionindex++;
		console.log(questionindex);
		displayquestion();
	} else {
		console.log('incorrect');
		questionindex++;
		console.log(questionindex);
		timeLeft -= 10;
		displayquestion();
	}
}

function score() {
	document.getElementById('main').innerHTML = '';

	var scoreText = document.createElement('h3');
	scoreText.innerHTML = 'Score: ' + timeLeft;
	scoreElement.appendChild(scoreText);
	if (timeLeft < 0) {
		scoreText.innerHTML = 'Score: 0';
		timeLeft = 0;
	}

	initial = document.createElement('input');
	scoreElement.appendChild(initial);

	var submit = document.createElement('button');
	submit.innerHTML = 'Submit';
	scoreElement.appendChild(submit);

	submit.onclick = saveScore;
}

function saveScore() {
	var userscore = {
		name: initial.value,
		fs: timeLeft,
	};
	highscores.push(userscore);
	window.localStorage.setItem('highscores', JSON.stringify(highscores));
	console.log('This is saved!');
	console.log(initial, timeLeft);
	document.getElementById('main').innerHTML = '';
	timeLeft = 55;
	questionindex = 0;
}

var viewscore = document.querySelector('.highScore');
viewscore.addEventListener('click', loadScore);
function loadScore() {
	for (var i = 0; i < highscores.length; i++) {
		var n = document.createElement('h4');

		var currentHighscore = highscores[i];

		n.textContent = currentHighscore.name + ' - ' + currentHighscore.fs;

		scoreElement.appendChild(n);
	}
}

var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

startButton.onclick = startQuiz;