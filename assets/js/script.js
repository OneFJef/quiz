const header$ = $(".header");
const highScore$ = $(".highScore");
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

const endScore$ = $(".endScore");
let score$ = $("#score");

let secondsLeft = 75;
let timerInterval;
let questionIndex = 0;

// Object of questions and answers.
const questions = [
  {
    question: "When a gun fires what does an Ork hear?",
    choices: ["Pew Pew", "BANG!", "Dakka", "Pow Pow"],
    answer: "#btn3",
  },
  {
    question: "What color is the sky?",
    choices: ["Green", "Blue", "Black", "White"],
    answer: "#btn2",
  },
  {
    question: "What color is the green?",
    choices: ["Green", "Blue", "Black", "White"],
    answer: "#btn1",
  },
];

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
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Action taken when the quiz is finished.
function doesQuizEnd() {
  clearInterval(timerInterval);
  timeCount$.text(secondsLeft);
  questionBlock$.hide();
  score$.text(secondsLeft);
  endScore$.show();
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
