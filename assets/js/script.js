const startQuizBlockEL = $(".startQuiz");
const questionBlockEL = $(".question");
const questionEL = $("#question");

const startQuizEL = $("#startQuiz");
let btn1EL = $("#btn1");
let btn2EL = $("#btn2");
let btn3EL = $("#btn3");
let btn4EL = $("#btn4");

let questionIndex = 0;

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
  questionEL.text(questions[questionIndex].question);
  btn1EL.text(questions[questionIndex].choices[0]);
  btn2EL.text(questions[questionIndex].choices[1]);
  btn3EL.text(questions[questionIndex].choices[2]);
  btn4EL.text(questions[questionIndex].choices[3]);
}

startQuizEL.on("click", function (event) {
  startQuizBlockEL.hide();
  questionBlockEL.show();
  questionTemplate();
});

questionBlockEL.on("click", ".btn", function (event) {
  if ($(event.target).is(questions[questionIndex].answer)) {
    console.log("WAAAGH!!");
    if (questionIndex < questions.length - 1) {
      questionIndex++;
    }
    questionTemplate();
  } else {
    console.log(":(");
    if (questionIndex < questions.length - 1) {
      questionIndex++;
    }
    questionTemplate();
  }
});