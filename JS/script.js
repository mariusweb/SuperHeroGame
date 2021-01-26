(function () {
  // Declaring variables and selecting class names
  let main = document.querySelector(".container-main");
  let form = document.querySelector(".form");
  let formGroup = document.querySelector(".form-group");

  function ButtonCreate(buttonValue) {
    this.buttonValue = buttonValue;
    this.inputSubmit = document.createElement("input");
    this.inputClassName = ["btn", "btn-dark"];
    this.finishButton = function (className) {
      this.inputSubmit.setAttribute("type", "submit");
      this.inputSubmit.value = this.buttonValue;
      this.inputSubmit.classList.add(...this.inputClassName);
      this.inputSubmit.classList.add(className);
      return this.inputSubmit;
    };
  }
  let startTheGame = new ButtonCreate("Start the game");

  function CreateRadio(id, value, answer, questionNumber) {
    this.questionNumber = questionNumber;
    this.answer = answer;
    this.id = id;
    this.value = value;
    this.inputRadio = document.createElement("input");
    this.label = document.createElement("label");
    this.div = document.createElement("div");
    this.inputClassNameRadio = ["form-check-input"];
    this.inputClassNameLabel = ["form-check-label"];
    this.divClassName = ["form-check"];
    this.finishRadio = function () {
      this.inputRadio.setAttribute("type", "radio");
      this.inputRadio.setAttribute("required", "");
      this.inputRadio.setAttribute("name", `radio-${this.questionNumber}`);
      this.inputRadio.setAttribute("id", `${this.id}`);
      this.inputRadio.value = this.value;
      this.inputRadio.classList.add(...this.inputClassNameRadio);
      return this.inputRadio;
    };
    this.finishLabel = function () {
      this.label.setAttribute("for", `${this.id}`);
      this.label.value = this.value;
      this.label.classList.add(...this.inputClassNameLabel);
      this.label.textContent += `${this.answer}`;
      return this.label;
    };
    this.finishDivForRadio = function (classNameDiv) {
      this.div.classList.add(...this.divClassName);
      this.div.classList.add(classNameDiv);
      return this.div;
    };
  }
  function CreateH3AndImgTag(id, question, imageSorc) {
    // this.classNameForTag = classNameForTag;
    this.id = id;
    this.question = question;
    this.imageSorc = imageSorc;
    this.h3 = document.createElement("h3");
    this.img = document.createElement("img");
    this.finishH3 = function () {
      this.h3.classList.add(`question-${this.id}`);
      // this.h3.classList.add(`${classNameForTag}`);
      this.h3.textContent += `${this.question}`;
      return this.h3;
    };
    this.finishImg = function () {
      this.img.classList.add(`img-${this.id}`);
      this.img.setAttribute("src", `${this.imageSorc}`);
      this.img.setAttribute("alt", `${this.id}`);
      return this.img;
    };
  }

  // Fetching json file with questions and answers from git reposetory
  async function getQuestions() {
    let response = await fetch(
      "https://raw.githubusercontent.com/mariusweb/SuperHeroGame/main/JS/question.json"
    );
    if (!response.ok) {
      let message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    let data = await response.json();
    return data;
  }
  // Fetching json file with heros and there information from git reposetory
  async function getHeros() {
    let response = await fetch(
      "https://raw.githubusercontent.com/mariusweb/SuperHeroGame/main/JS/superhero.json"
    );
    if (!response.ok) {
      let message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    let data = await response.json();
    return data;
  }

  getQuestions().catch((error) => {
    error.message;
  });
  getHeros().catch((error) => {
    error.message;
  });

  // Add questions from api to localstorage

  function storeApiToLocalstorage() {
    getQuestions().then((arrayOfQuestions) => {
      localStorage.setItem(`question`, JSON.stringify(arrayOfQuestions));
    });
  }
  storeApiToLocalstorage();

  let finalyQuestionsArr = [];
  let redyQuestions = JSON.parse(localStorage.getItem(`question`));

  formGroup.appendChild(startTheGame.finishButton("start"));
  let nextQuestion = new ButtonCreate("Next");
  let startButton = document.querySelector(".start");

  console.log();
  function createQuiz(invok, side) {
    let arrOfNumbersRadio = [1, 2, 3, 4, 5];
    redyQuestions.map((questionWithAnswers) => {
      let newH3AndImg;
      if (invok == "Start the game" && questionWithAnswers.id == 1) {
        newH3AndImg = new CreateH3AndImgTag(
          questionWithAnswers.id,
          questionWithAnswers.question,
          questionWithAnswers.img
        );
        formGroup.prepend(newH3AndImg.finishH3());

        for (let [key, value] of Object.entries(questionWithAnswers)) {
          let newRadio;
          let divForRadio;
          if (!(key == "question" || key == "img" || key == "id")) {
            newRadio = new CreateRadio(
              `${questionWithAnswers.id}-${key}`,
              `${questionWithAnswers.id}-${key}`,
              value,
              questionWithAnswers.id
            );
            formGroup.appendChild(
              newRadio.finishDivForRadio(`div-${questionWithAnswers.id}-${key}`)
            );
            divForRadio = document.querySelector(
              `.div-${questionWithAnswers.id}-${key}`
            );
            divForRadio.appendChild(newRadio.finishRadio());
            divForRadio.appendChild(newRadio.finishLabel());
          }
        }

        formGroup.appendChild(
          nextQuestion.finishButton(`next-${questionWithAnswers.id}`)
        );
      } else if (+invok == questionWithAnswers.id && side == "next") {
        newH3AndImg = new CreateH3AndImgTag(
          questionWithAnswers.id,
          questionWithAnswers.question,
          questionWithAnswers.img
        );

        document
          .querySelector(`.question-${+questionWithAnswers.id - 1}`)
          .remove();
        formGroup.prepend(newH3AndImg.finishH3());

        for (let [key, value] of Object.entries(questionWithAnswers)) {
          let newRadio;
          let divForRadio;
          if (!(key == "question" || key == "img" || key == "id")) {
            newRadio = new CreateRadio(
              `${+questionWithAnswers.id}-${key}`,
              `${+questionWithAnswers.id}-${key}`,
              value,
              questionWithAnswers.id
            );
            arrOfNumbersRadio.forEach((numberRadio) => {
              let isSelected = document.querySelector(
                `.div-${+questionWithAnswers.id - 1}-${numberRadio}`
              );
              if (isSelected) {
                isSelected.remove();
              }
            });

            formGroup.appendChild(
              newRadio.finishDivForRadio(
                `div-${+questionWithAnswers.id}-${key}`
              )
            );

            divForRadio = document.querySelector(
              `.div-${+questionWithAnswers.id}-${key}`
            );
            divForRadio.appendChild(newRadio.finishRadio());
            divForRadio.appendChild(newRadio.finishLabel());
          }
        }

        formGroup.appendChild(
          nextQuestion.finishButton(`next-${+questionWithAnswers.id}`)
        );
        let remuveNextClass = document.querySelector(
          `.next-${+questionWithAnswers.id}`
        );
        remuveNextClass.classList.remove(`next-${+questionWithAnswers.id - 1}`);
      } else if (+invok == 16 && side == "answer") {
        formGroup.innerHTML = "";
      }
    });

    console.log(+invok);
    console.log(side);
  }

  let nextButton;
  startButton.addEventListener("click", (e) => {
    e.preventDefault();
    createQuiz(startButton.value, "start");
    startButton.remove();
    answersToQuestions();

    nextButtonClick();
  });
  function nextButtonClick() {
    redyQuestions.forEach((question) => {
      if (document.querySelector(`.next-${question.id}`)) {
        nextButton = document.querySelector(`.next-${question.id}`);
      }

      if (document.getElementsByName(`radio-${question.id}`).checked) {
        for (let key in question) {
          if (document.getElementById(`${question.id}-${key}`).checked) {
            checkIfSelected = document.getElementById(`${question.id}-${key}`);
          }
        }
      }
    });

    let nextButtonClassNumber = nextButton.className
      .split(" ")[2]
      .split("-")[1];
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (nextButtonClassNumber == 16) {
        createQuiz(nextButtonClassNumber, "answer");
        answersToQuestions();
      } else {
        createQuiz(++nextButtonClassNumber, "next");
        answersToQuestions();
      }
    });
  }

  function answersToQuestions() {
    let selectedRadio;
    let isSelectedRadio;
    redyQuestions.forEach((question) => {
      if (document.querySelector(`.next-${question.id}`)) {
        nextButton = document.querySelector(`.next-${question.id}`);
        isSelectedRadio = document.getElementsByName(`radio-${question.id}`);
        // If radio cheked then enable next button
        nextButton.disabled = true;
        isSelectedRadio.forEach((radio) =>
          radio.addEventListener("change", () => (nextButton.disabled = false))
        );
        nextButton.onclick = function () {
          for (let key in question) {
            if (!(key == "question" || key == "img" || key == "id")) {
              selectedRadio = document.getElementById(`${question.id}-${key}`);
              if (selectedRadio.checked) {
                finalyQuestionsArr.push(selectedRadio.value);
              }
            }
          }
        };
      }
    });

    console.log(finalyQuestionsArr);
  }

  window.addEventListener("DOMContentLoaded", (e) => {});
})();
