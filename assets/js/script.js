const headerBlock$ = $(".header");
const highScoreBtn$ = $(".highScoreBtn");
const highScoreBlock$ = $(".highScore");

let highScoreList$ = $("#list");

const highScoreBack$ = $("#highScoreBack");
const highScoreClear$ = $("#highScoreClear");
let timeCount$ = $("#timeCount");

const startQuizBlock$ = $(".startQuiz");
const questionBlock$ = $(".question");
const question$ = $("#question");

const startQuiz$ = $("#startQuiz");
let btn1$ = $("#btn1");
let btn2$ = $("#btn2");
let btn3$ = $("#btn3");
let btn4$ = $("#btn4");

let gradeText$ = $("#gradeText");

const endScoreBlock$ = $(".endScore");
let score$ = $("#score");

let secondsLeft = 75;
let timerInterval;
let questionIndex = 0;

// Object of questions and answers.
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "#btn3",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within _____.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "#btn2",
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: ["Numbers", "Strings", "Booleans", "All of the Above"],
    answer: "#btn4",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["Quotes", "Commas", "Parentheses", "Curly Brackets"],
    answer: "#btn1",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is?",
    choices: ["JavaScript", "Terminal/Bash", "For Loops", "Console.log"],
    answer: "#btn4",
  },
];

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Creates list of highscores.
function highScoreTable() {
  for (i = 0; i < highScores.length; i++) {
    let scoreArray = highScores[i];
    highScoreList$.append(
      "<li>" + scoreArray.initials + " - " + scoreArray.score + "</li>"
    );
  }
}

// Clear listed highscores
function highScoreTableClear() {
  highScoreList$.remove();
  localStorage.clear();
}

// Sets question content.
function questionTemplate() {
  question$.text(questions[questionIndex].question);
  btn1$.text(questions[questionIndex].choices[0]);
  btn2$.text(questions[questionIndex].choices[1]);
  btn3$.text(questions[questionIndex].choices[2]);
  btn4$.text(questions[questionIndex].choices[3]);
}

// Timer that starts when you start the quiz.
function timer() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeCount$.text(secondsLeft);
    if (secondsLeft === 0) {
      doesQuizEnd();
    }
  }, 1000);
}

// Action taken when the quiz is finished.
function doesQuizEnd() {
  clearInterval(timerInterval);
  timeCount$.text(secondsLeft);
  questionBlock$.hide();
  score$.text(secondsLeft);
  endScoreBlock$.show();
}

// Shows highscore "page".
function highScorePage() {
  highScoreTable();
  headerBlock$.hide();
  startQuizBlock$.hide();
  questionBlock$.hide();
  highScoreBlock$.show();
  endScoreBlock$.hide();
}

// Button to start the quiz.
startQuiz$.on("click", function (event) {
  startQuizBlock$.hide();
  questionBlock$.show();
  questionTemplate();
  timer();
});

// Quiz choices and logic to determine right or wrong answers with timer penalty.
questionBlock$.on("click", ".btn", function (event) {
  if ($(event.target).is(questions[questionIndex].answer)) {
    gradeText$.text("Correct");
    if (questionIndex < questions.length - 1) {
      questionIndex++;
    } else {
      doesQuizEnd();
    }
  } else {
    gradeText$.text("Wrong");
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      secondsLeft -= 10;
    } else {
      doesQuizEnd();
    }
  }
  questionTemplate();
  $("#grade").fadeIn("fast");
});

// Enter initials for your highscore, save to local storage, and sort the scores.
endScoreBlock$.on("click", ".btn", function (event) {
  const score = {
    initials: $("#initials").val().toUpperCase(),
    score: secondsLeft,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  highScorePage();
});

// Link to the highscore page.
headerBlock$.on("click", ".highScoreBtn", function (event) {
  highScorePage();
});

// Button to go back to the quiz start page.
highScoreBlock$.on("click", "#highScoreBack", function (event) {
  window.location.reload();
});

// Button to clear the highscores.
highScoreBlock$.on("click", "#highScoreClear", function (event) {
  highScoreTableClear();
});
