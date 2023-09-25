// First we are going to list out our question as a variable array known as questions.  Each question is basically a card that has the question, options, and the answer, which will be hidden to the user at first.

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed with _______.",
        choices: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"],
        answer: "3. Parenthesis"

    }
]

// Other variables we will be using, however they will be used more regularly and dependant on other factors, such as the timer or the score.

var answerOptions = docmument.querySelector("answerOptions")
var showTime = document.querySelector("timeLeft")
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Here's where we initiate the game after hitting our button on the page.  The button is already primed to start a function called start, so we need a function with that name.

function start() {
    // We first need to set the time limit. Based on the number of questions this will change.  But we are setting a base timer of 60 seconds to begin with.
    timeLeft = 60;
    // Pushing that timer over to our HTML
    showTime.innerHTML = timeLeft
    // Need our timer to be counting down until 0.  At 0, we call a new function endGame.  As long as the timer is above 0, it will go onto another function nextQuestion.
    timer = setInterval(function () {
        timeLeft--;
        showTime.innerHTML = timeLeft

        if (timeLeft <= 0) {
            clearInterval(timer)
            endGame()
        }
    }, 1000)
    nextQuestion()
}

// This is the function that will run as long as there is time still running on the clock
function nextQuestion() {

    currentQuestion++;
    // We need to establish that once we hit the end of the quiz, regardless of what time remains, we need to call the endGame function to run.
    if (currentQuestion > questions.length - 1) {
        endGame()
        return;
    }


    var quizContent = "<h2>" + questions[currentQuestion].title + "<h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick='[ANS]'>[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);

        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");

        } else {
            buttonCode = buttonCode.replace("[ANS]", "wrong!()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quiz").innerHTML = quizContent;

}

// If the timer runs out, or the user has completed all the questions we need that function endGame.

function endGame() {
    clearInterval(timer);

    var quizContent = `
        <h2>Game over!</h2>
        <h3>You got a ` + score + ` /50!</h3>
        <h3>That means you got ` + score / 10 + ` questions correct!</h3>
        <input type="text" id="name" placeholder="Please enter your initals">
        <button onclick="inputScore()">Set score!</button>`;

        document.getElementById("quiz").innerHTML = quizContent;
}