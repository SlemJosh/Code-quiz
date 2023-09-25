// First we are going to list out our question as a variable array known as questions.  Each question is basically a card that has the question, options, and the answer, which will be hidden to the user at first.
// They are formated in a 3 line pattern.  This will allow us to use the same box on our HTML page to just plug in each line for each value.

var questions = [
    {
        question: "Javascript is an _______ language?",
        choices: ["1. Object-Oriented", "2. Object-Based", "3. Procedural", "4. None of the above"],
        answer: "1. Object-Oriented"
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["1. var", "2. let", "3. Both A and B", "4. None of the above"],
        answer: "3. Both A and B"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["1. getElementbyID()", "2. getElementsByClassName()", "3. Both A and B", "4. None of the above"],
        answer: "3. Both A and B"
    },
    {
        question: "The 3 basic object attributes in Javascript are:",
        choices: ["1. Class, prototype, object's parameters.", "2. Class, prototype, object's extensible flag.", "3. Class, parameters, object's extensible flag.", "4. Class, parameters, prototype."],
        answer: "2. Class, prototype, object's extensible flag."
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with _______.",
        choices: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"],
        answer: "3. Parenthesis"

    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        choices: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"],
        answer: "4. All of the Above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parenthesis"],
        answer: "4. Parenthesis"
    },
    {
        question: "A very useful tool used during development and debugging for print content to the debugger is:",
        choices: ["1. JavaScript", "2. Terminal/Bash", "3. For Loops", "4. Console Log"],
        answer: "4. Console Log"
    }

]

// Other variables we will be using, however they will be used more regularly and dependant on other factors, such as the timer or the score.
var answerOptions = document.querySelector("#answerOptions")
var showTime = document.querySelector("#timeLeft")
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Here's where we initiate the game after hitting our button on the page.  The button is already primed to start a function called start, so we need a function with that name.

function start() {
    // We first need to set the time limit. Based on the number of questions this will change.  
    timeLeft = 60;
    // Pushing that timer over to our HTML
    showTime.innerHTML = timeLeft
    // Need our timer to be counting down until 0.  At 0, we call a new function endGame.  As long as the timer is above 0, it will go onto another function nextQuestion.
    timer = setInterval(function () {
        timeLeft--;
        showTime.innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer)
            endGame() // When the timer runs out, start this function.
        }
    }, 1000)  
    nextQuestion()  // We want to initialize cycling through the questions
}

// This is the function that will run as long as there is time still running on the clock
function nextQuestion() {

    currentQuestion++;
    // We need to establish that once we hit the end of the quiz, regardless of what time remains, we need to call the endGame function to run.
    if (currentQuestion > questions.length - 1) {
        endGame()
        return;
    }
    // By uzing the quizContent, we are basically just replacing those 3 lines on our HTML page, and then we can fill them with the appropriate values.

    var quizContent = "<h2>" + questions[currentQuestion].question + "<h2>"
    
    //We have a loop to go throu gh our questions.  The only way this ends before it goes through all the questions is if the timer ends, which is called in the earlier function

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick='[ANS]'>[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);

        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "right()");  // Had to make sure that our input in the answer field was exactly the same or else we would get a wrong answer. It will run the right function.

        } else {
            buttonCode = buttonCode.replace("[ANS]", "wrong()");  // If that info does not match, it will be triggered as wrong. No need to set values for true and false or == or !=. It will run the wrong function.
        }
        quizContent += buttonCode
    }
    document.getElementById("quiz").innerHTML = quizContent;

}

// When the user is answering questions. They will be presented this if there answer is not the correct one.  We also need to penalize the timer as mentioned before the quiz begain.
// A couple things with these functions.  We needed to stylize the text, and decided that having some color would add to the nature of it.   
// A big thing was that we need that bottom text to dissapear at some point. Otherwise it will remain even when the game has ended.  
function wrong() {
    answerOptions.setAttribute("class", "border-top mt-3 pt-3")
    answerOptions.setAttribute("style", "font-size: 20px; color: red; font-weight: bold; text-align: center;");  
    answerOptions.textContent = "You got the answer wrong. -15 seconds!";   // Based on our criteria, we need a penalty.
    timeLeft -= 10;  //Pentalty
    nextQuestion()

    setTimeout(clearAnswerOptions, 2000);  // We want it to time out once you move onto the next question after a period of time.
}

// When the user is answering questions. They will get points if the answer is correct. So we need to tell them they got it right, in addition adding points to their total score.
function right() {
    answerOptions.setAttribute("class", "border-top mt-3 pt-3")
    answerOptions.setAttribute("style", "font-size: 20px; color: green; font-weight: bold; text-align: center;");
    answerOptions.textContent = "You got the answer right! +10 points!"; // Based on our criteria, we need a reward.
    score += 10; //Reward
    nextQuestion();

    setTimeout(clearAnswerOptions, 2000);  // We want it to time out once you move onto the next question after a period of time.
}

//We needed a function to just make those value blank and invisible again. This will trigger upon a timer, but also we will have it present itself upon the game ending as well.
function clearAnswerOptions() {
    answerOptions.textContent = "";
}

// End Game
// The Game ends when either the timer runs out, or if the user manages to get through all the questions. Our earlier function with the timer will automatically trigger this one.
// We however also want to clear that timer once we hit this point.  We don't need a timer running down forever and ever.   

function endGame() {
    clearInterval(timer);  // Clears the timer.  It may show a negative number based on wrong answers given previously, but only briefly.

    // Once again we are able to use our container and just plug in some values and text on those 3 lines.   
    // We want to show the user their score, and give them a place to enter some initials which we will store upon them hitting a button.
    var quizContent = `
        <h2>Game over!</h2>
        <h3>You got a ` + score + ` /90!</h3>
        <h3>You got ` + score / 10 + ` questions correct!</h3>
        <input type="text" id="initials" placeholder="Please enter your initals">
        <button onclick="inputScore()">Save Your Score!</button>`;

    document.getElementById("quiz").innerHTML = quizContent;
    clearAnswerOptions();
}

// In the previous function we had the user input some information.  We need to put that somewhere, and the previous function will call this next one to run.
// Here we are taking the intials and the score and adding them to a string to which we can use to populate our high scores page.

function inputScore() {
    var initials = document.getElementById("initials").value;
    var scoreEntry = {name: initials, score: score};

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.push(scoreEntry);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.setItem("initials", initials);
    

    getScore();
    
}

// We need to calculate the score that the user got.  
function getScore() {
    var storedInitials = localStorage.getItem("initials");
    var highScore = localStorage.getItem("highScores");

    var quizContent =
    `<h2>` + ` Thanks for Playing!</h2>
    <h1>` + 'Dont Forget to Check out the High Scores' + `</h1><br>
    <button onclick="clearGame()">Play again!</button> `;

    document.getElementById("quiz").innerHTML = quizContent;
}



//Chat GPT helping save those scores

function saveHighscores(initials, score) {
    var highScores = getHighscores();
    highScores.push({ name: initials, score: score });
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
}



// We want to be able to clear the high scores
function clearHighscores() {
    var highScoreslist = document.getElementById("highScoreslist");
    highScoreslist.innerHTML = ""; // This removes all the list items
    localStorage.removeItem("highScores");
}

// Attach this function to the button's click event in your HTML
//document.querySelector("#clearHighscoresbutton").addEventListener("click", clearHighscores);



// Do we want to play again.  We can start over.
function clearGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>Coding Quiz Challenge</h1>
    <h4>Try to answer the following code-related questiones within the time limit.<br>
        Keep in mind that incorrect answers will penalize your time by ten seconds!<br>
        Good luck! Hit Start to begin!</h4>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quiz").innerHTML = quizContent;
}

// Chat GPT helping me get those high scores displayed


function getHighscores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    return highScores;
}

function displayHighscores() {
    var highScoreslist = document.getElementById("highScoreslist");
    var highScores = getHighscores();

    // Loop through high scores and add them to the list
    for (var i = 0; i < highScores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = highScores[i].name + " - " + highScores[i].score;
        highScoreslist.appendChild(listItem);
    }
}


    //  CHAT GPT clear answer options section after each question.

    function clearAnswerOptions() {
        answerOptions.textContent = "";
    }
    