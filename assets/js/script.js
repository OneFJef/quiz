const startQuizBlockEL = $(".startQuiz");
const questionBlockEL = $(".question");
const questionEL = $("#question");

const startQuizEL = $("#startQuiz");
let btn1EL = $("#btn1");
let btn2EL = $("#btn2");
let btn3EL = $("#btn3");
let btn4EL = $("#btn4");

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

startQuizEL.on("click", function (event) {
  startQuizBlockEL.hide();
  questionBlockEL.show();
  questionEL.text(questions[0].question);
  btn1EL.append(questions[0].choices[0]);
  btn2EL.append(questions[0].choices[1]);
  btn3EL.append(questions[0].choices[2]);
  btn4EL.append(questions[0].choices[3]);
});

questionBlockEL.on("click", ".btn", function (event) {
  if ($(event.target).is(questions[0].answer)) {
    console.log("WAAAGH!!");
  } else {
    console.log(":(");
  }
});
