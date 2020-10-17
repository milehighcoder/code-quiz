var testPosition = 0;
var correctAnswers = 0;
var test;
var testProgress;
var question;
var userAnswer;
var choicesPossible;
var choiceA;
var choiceB;
var choiceC;
var quizTimer = 45;

// quiz questions, choices, and answers
var questions = [
  {
    question: "Inside which HTML element do we place the JavaScript?",
    a: "&lt;script&gt;",
    b: "&lt;js&gt;",
    c: "&lt;javascript&gt;",
    answer: "a",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    a: "The head section",
    b: "The body section",
    c: "Both A and B",
    answer: "c",
  },
  {
    question:
      "Is it necessary for the external script file to contain a &lt;script&gt; tag?",
    a: "Yes",
    b: "No",
    c: "Sometimes",
    answer: "b",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'script.js'?",
    a: "&lt;script name='script.js'&gt;",
    b: "&lt;script href='script.js'&gt;",
    c: "&lt;script src='script.js'&gt;",
    answer: "c",
  },
]

// declares global 'getElementById' function to minimize code
function get(x) {
  return document.getElementById(x);
}

// hides the intro page and shows the quiz when you click 'start quiz'
function start() {
  get("quiz-title").setAttribute("style", "display: none");
  get("quiz-inst").setAttribute("style", "display: none");
  get("start-button").setAttribute("style", "display: none");
  get("show-quiz").setAttribute("style", "display: block !important");
  setInterval(function () {
    if (quizTimer <= 0) {
      clearInterval(quizTimer);
      get("timer").innerHTML = "time expired";
    } else {
      get("timer").innerHTML = quizTimer;
    }
    quizTimer -= 1;
  }, 1000);
  renderQuestion();
}

// shows the quiz questions and choices
function renderQuestion() {
  test = get("test");
  if (testPosition >= questions.length) {
    get("test-progress").innerHTML = "<h2>test score</h2>";
    test.innerHTML = Math.round(100 * correctAnswers/questions.length) + "%";
    testPosition = 0;
    correctAnswers = 0;
    return false;
  }
  get("test-progress").innerHTML = "question " + (testPosition + 1) + " of " + questions.length;
  question = questions[testPosition].question;
  choiceA = questions[testPosition].a;
  choiceB = questions[testPosition].b;
  choiceC = questions[testPosition].c;
  test.innerHTML = "<h3>" + question + "</h3>";
  test.innerHTML += "<label><input type='radio' name='choicesPossible' value='a'> " + choiceA + "</label><br>";
  test.innerHTML += "<label><input type='radio' name='choicesPossible' value='b'> " + choiceB + "</label><br>";
  test.innerHTML += "<label><input type='radio' name='choicesPossible' value='c'> " + choiceC + "</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>submit answer</button>";
  get("timer").innerHTML = quizTimer;
}

// checks if the user's answer is correct
function checkAnswer() {
  choicesPossible = document.getElementsByName("choicesPossible");
  for (var i = 0; i < choicesPossible.length; i++) {
    if (choicesPossible[i].checked) {
      userAnswer = choicesPossible[i].value;
    }
  }
  if (userAnswer == questions[testPosition].answer) {
    correctAnswers++;
  }
  testPosition++;
  renderQuestion();
}

get("start-button").addEventListener("click", start);
