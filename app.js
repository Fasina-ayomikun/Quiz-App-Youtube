const quizData = [
  {
    subject: "Mathematics",
    questions: [
      {
        question: "Find the sum of 111 + 222 + 333",
        options: [700, 666, 10, 100],
        correctOption: 666,
      },
      {
        question: "Subtract 357 from 932",
        options: [10, 68, 575, 765],
        correctOption: 575,
      },
      {
        question: " 70 times 5 is equal to",
        options: [350, 686, 12, 705],
        correctOption: 350,
      },
      {
        question: "Simplify: 26 + 182 - 12",
        options: [70, 196, 190, 140],
        correctOption: 196,
      },
      {
        question: " Solve : 24 + 4 ÷ 4",
        options: [25, 6, 28, 10],
        correctOption: 25,
      },
    ],
  },
  {
    subject: "Coding",
    questions: [
      {
        question: "What is Html?",
        options: [
          "Hypertext Markup Language",
          "Hypotext Markup Language",
          "Hypertext Makeup Language",

          "Hypertext Mockup Language",
        ],
        correctOption: "Hypertext Markup Language",
      },
      {
        question: "Is CSS a programming Language",
        options: ["Yes", "No", "Maybe", "I don't know"],
        correctOption: "No",
      },
      {
        question: "Javascript is the same as Java",
        options: ["True", "False", "Maybe", "I don't know"],
        correctOption: "False",
      },
      {
        question: "Javascript can only be used for Web development",
        options: ["True", "False", "Maybe", "I don't know"],
        correctOption: "True",
      },
      {
        question: "What is '2' + '2'",
        options: [4, 22, 5, 10],
        correctOption: 22,
      },
    ],
  },
  {
    subject: "English",
    questions: [
      {
        question: "What is correct?",
        options: [
          "Circumstance",
          "Circummstance",
          "Circcumstance",

          "Circumstanse",
        ],
        correctOption: "Circumstance",
      },
      {
        question: "Which is wrong?",
        options: ["Communicate", "Circumstance", "Counterfeit", "Contantment"],
        correctOption: "Contantment",
      },
      {
        question: "Which is a noun?",
        options: ["Advice", "Advise", "Coming", "feeling"],
        correctOption: "Advice",
      },
      {
        question: "Which is odd?",
        options: ["Country", "City", "Town", "People"],
        correctOption: "People",
      },
      {
        question: "What is odd?",
        options: ["Apple", "Orange", "Green", "Red"],
        correctOption: "Apple",
      },
    ],
  },
];

const subjectsList = document.querySelector(".subjects");
const subjectsContainer = document.querySelector(".subjects-container");
const questionsContainer = document.querySelector(".questions-container");
const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".answers");
const nextBtn = document.querySelector(".next-btn");
const scoreContainer = document.querySelector(".score");
const finalScore = document.querySelector(".final-score");
const resultContainer = document.querySelector(".result-container");
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart-btn");
const quitBtns = document.querySelectorAll(".quit-btn");

// Global Variables
let subject = "";
let score = 0;
let index = 0;
let acceptingAnswers = true;
// Sound Effects
const audio1 = new Audio();
const audio2 = new Audio();
const audio3 = new Audio();
const audio4 = new Audio();
audio1.src = "error.wav";
audio2.src = "win.wav";
audio3.src = "success.mp3";
audio4.src = "lose.mp3";

const getSubjects = () => {
  // Get the subjects in the data
  const subjects = quizData
    .map((data) => {
      return `  <li class="subject" id='${data.subject.toLowerCase()}'>
              ${data.subject} <i class="fa-solid fa-chevron-right"></i>
            </li>`;
    })
    .join("");
  subjectsList.innerHTML = subjects;

  // Get all the single subject
  const subjectContainers = document.querySelectorAll(".subject");
  subjectContainers.forEach((container) => {
    container.addEventListener("click", (e) => {
      subject = e.currentTarget.id;
      subjectsContainer.classList.remove("show");
      questionsContainer.classList.add("show");
      getQuestions();
    });
  });
};

const getQuestions = () => {
  scoreContainer.innerHTML = `<strong>Score:</strong> ${score}/5`;
  // Find the questions related to the chosen subject
  const subjectQuestions = quizData.find((data) => {
    if (data.subject.toLowerCase() === subject) {
      return data;
    }
    return;
  });
  // Destructure the questions
  let { questions } = subjectQuestions;
  let { question, options, correctOption } = questions[index];
  questionContainer.innerHTML = `<strong>Question:</strong> ${question}`;

  const optionsList = options
    .map((option) => {
      return `<li class="answer">${option}</li>`;
    })
    .join("");
  optionsContainer.innerHTML = optionsList;

  const answersList = document.querySelectorAll(".answer");
  answersList.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      handleClick(e, correctOption);
    });
  });
};
// HandleClick Function
const handleClick = (e, correctOption) => {
  nextBtn.classList.add("show");

  const infoContainer = e.currentTarget;

  if (index == 4) {
    nextBtn.textContent = `Show Result`;
  }

  if (!acceptingAnswers) {
    return;
  }

  acceptingAnswers = false;

  if (infoContainer.textContent === correctOption.toString()) {
    infoContainer.classList.remove("lose");
    infoContainer.classList.add("win");
    score++;
    scoreContainer.innerHTML = `<strong>Score:</strong> ${score}/5`;
    audio2.play();
  } else {
    audio1.play();
    infoContainer.classList.remove("win");
    infoContainer.classList.add("lose");
  }
};

nextBtn.addEventListener("click", () => {
  index++;
  nextBtn.classList.remove("show");
  acceptingAnswers = true;

  if (index > 4) {
    index = 4;

    resultContainer.classList.add("show");
    questionsContainer.classList.remove("show");
    finalScore.textContent = score.toString();
    if (score > 2) {
      result.classList.remove("lose");
      result.classList.add("win");
      audio3.play();
    } else {
      audio4.play();
      result.classList.remove("win");
      result.classList.add("lose");
    }
  }
  getQuestions();
});

restartBtn.addEventListener("click", () => {
  resultContainer.classList.remove("show");
  questionsContainer.classList.add("show");
  score = 0;
  acceptingAnswers = true;
  index = 0;
  getQuestions();
  audio2.play();
});

quitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    resultContainer.classList.remove("show");
    subjectsContainer.classList.add("show");
    questionsContainer.classList.remove("show");
    score = 0;
    acceptingAnswers = true;
    index = 0;
    audio1.play();
  });
});
getSubjects();
