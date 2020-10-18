// global variables
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
];

// allows get(x) to be used in place of getElementById()
function get(x) {
  return document.getElementById(x);
}

// hides the bootstrap initial form field and 'save results' button during the quiz
get("input-initials").setAttribute("style", "display: none");
get("save-results").setAttribute("style", "display: none");

// starts the quiz, timer, and score keeper
function start() {
  get("quiz-title").setAttribute("style", "display: none"); //hides quiz title
  get("quiz-inst").setAttribute("style", "display: none"); //hides quiz instructions
  get("start-button").setAttribute("style", "display: none"); //hides start quiz button
  get("show-quiz").setAttribute("style", "display: block !important"); //shows the quiz
  // quiz timer
  setInterval(function () {
    if (quizTimer <= 0) {
      clearInterval(quizTimer);
      get("test-progress").innerHTML = "<h2>quiz score</h2>";
      test.innerHTML =
        Math.round((100 * correctAnswers) / questions.length) + "%";
      get("timer").setAttribute("style", "display: none"); //hides timer
      get("input-initials").setAttribute("style", "text-align: center");
      get("save-results").setAttribute("style", "text-align: center");
      return false;
    } else {
      get("timer").innerHTML = quizTimer;
    }
    quizTimer -= 1;
  }, 1000);
  renderQuestion();
}

// shows the quiz questions, choices, and score
function renderQuestion() {
  test = get("test");
  if (testPosition >= questions.length) {
    test.innerHTML =
      Math.round((100 * correctAnswers) / questions.length) + "%";
    get("timer").setAttribute("style", "display: none");
    get("input-initials").setAttribute("style", "text-align: center");
    get("save-results").setAttribute("style", "text-align: center");
    quizTimer = 0;
    return false;
  }
  get("test-progress").innerHTML =
    "question " + (testPosition + 1) + " of " + questions.length;
  question = questions[testPosition].question;
  choiceA = questions[testPosition].a;
  choiceB = questions[testPosition].b;
  choiceC = questions[testPosition].c;
  test.innerHTML = "<h3>" + question + "</h3>";
  test.innerHTML +=
    "<label><input type='radio' name='choicesPossible' value='a'> " +
    choiceA +
    "</label><br>";
  test.innerHTML +=
    "<label><input type='radio' name='choicesPossible' value='b'> " +
    choiceB +
    "</label><br>";
  test.innerHTML +=
    "<label><input type='radio' name='choicesPossible' value='c'> " +
    choiceC +
    "</label><br><br>";
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
  } else {
    quizTimer -= 10;
  }
  testPosition++;
  renderQuestion();
}

get("start-button").addEventListener("click", start);
