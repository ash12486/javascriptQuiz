var currentQuestion = 0;
var timeLimit = 60;
var timeRemaining = timeLimit;
var finalScore = document.querySelector("#final-score");
var userInitials = document.querySelector("#initials");
var score = 0;
var startButton = document.querySelector("#start-button");
var saveBtn = document.querySelector("#save");
var counter;
var highScoreArr = [];

var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["javascript", "script", "body", "js"],
    correctAnswer: 1,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choices: [
      "alertBox('Hello World');",
      "msg('Hello World');",
      "msgBox('Hello World);",
      "alert('Hello World);",
    ],
    correctAnswer: 3,
  },
  {
    question: "What are the three phases of event propagation?",
    choices: ["Capturing > Target > Bubbling", "Bubbling > Target > Capturing", "Target > Bubbling > Capturing", "Target > Capturing > Bubbling"],
    correctAnswer: 0,
  },
  {
    question: "The JavaScript global execution context creates two things for you: the global object, and the 'this' keyword.",
    choices: ["True", "False"],
    correctAnswer: 0,
  },
];

//Start quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  document.getElementById("start-quiz-page").style.display = "none";
  updateTime();
  // Show questions
  displayCurrentQuestion();
}

//Function to display the current question and choices
function displayCurrentQuestion() {
  // Show the quiz
  var question = questions[currentQuestion].question;
  var choices = questions[currentQuestion].choices;

  // Display the question
  document.getElementById("question").innerHTML = question;

  // Clear any existing choices
  document.getElementById("choices").innerHTML = "";

  // Display the new choices
  for (var i = 0; i < choices.length; i++) {
    var choice = document.createElement("button");
    choice.innerHTML = choices[i];
    choice.setAttribute("value", i);
    choice.addEventListener("click", checkAnswer);
    document.getElementById("choices").appendChild(choice);
  }
}

// Function to check if the user's answer is correct
function checkAnswer(event) {
  // Get the user's answer
  var userAnswer = event.target.value;

  // Check if it's the correct answer
  if (userAnswer == questions[currentQuestion].correctAnswer) {
    score++;
    alert("Correct! 👍");
  } else {
    alert("Incorrect 😕 Penalty 5 seconds.");
    timeRemaining = timeRemaining - 10;
  }

  // Move on to the next question
  currentQuestion++;

  // If there are no more questions, end the quiz
  if (currentQuestion == questions.length) {
    alert(
      "Quiz complete! Your score is " +
        score +
        " out of " +
        questions.length +
        "."
    );
    document.getElementById("question").style.display = "none";
    document.getElementById("choices").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    clearInterval(counter);
  } else displayCurrentQuestion();
}

// Function to update the time remaining every second
function updateTime() {

counter = setInterval(function() {
  timeRemaining--;

  document.getElementById("quiz-timer").innerHTML = timeRemaining;

  if (timeRemaining == 0) {
    alert("Time's up!");
    document.getElementById("end-screen").style.display = "block";
  }

},1000)}


saveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = userInitials.value;
  if(userInitials !== "") {
    highScoreArr = JSON.parse(localStorage.getItem("HighScore")) || []
    var userDetails = {
      initials: initials,
      score: score,
      }
      highScoreArr.push(userDetails);
      localStorage.setItem("HighScore",JSON.stringify(highScoreArr));
  }

});


