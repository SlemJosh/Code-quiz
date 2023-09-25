// First we are going to list out our question as a variable array known as questions.  Each question is basically a card that has the question, options, and the answer, which will be hidden to the user at first.

var questions = [
    {
        title:"Commonly used data types DO NOT include:",
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },
    {
        title:"The condition in an if / else statement is enclosed with _______.",
        choices:["1. Quotes","2. Curly Brackets","3. Parenthesis","4. Square Brackets"],
        answer: "3. Parenthesis"
        
    }
]

// Other variables we will be using, however they will be used more regularly and dependant on other factors, such as the timer or the score.

var answerOptions = docmument.querySelector("answerOptions")
var showTime = document.querySelector("timeLeft")
var score = 0;
var currentQuestiopn = -1;
var timeLeft = 0;
var timer;

// Here's where we initiate the game after hitting our button on the page.  The button is already primed to start a function called start, so we need a function with that name.

function start(){
    
}