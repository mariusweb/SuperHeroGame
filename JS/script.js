(function () {
  // Declaring variable and selecting div inside forum
  let formGroup = document.querySelector(".form-group");

  // Creating button object constructor function
  function ButtonCreate(buttonValue) {
    // Declaring and creating values for button
    this.buttonValue = buttonValue;
    this.inputSubmit = document.createElement("input");
    this.inputClassName = ["btn", "btn-dark"];
    this.finishButton = function (className) {
      // Constructing button
      this.inputSubmit.setAttribute("type", "submit");
      this.inputSubmit.value = this.buttonValue;
      this.inputSubmit.classList.add(...this.inputClassName);
      this.inputSubmit.classList.add(className);
      return this.inputSubmit;
    };
  }
  let startTheGame = new ButtonCreate("Start the game");
  let playAgain = new ButtonCreate("Play again");

  // Creating radio input and label object constructor function
  function CreateRadio(id, value, answer, questionNumber) {
    // Declaring and creating values for radio input and label
    this.questionNumber = questionNumber;
    this.answer = answer;
    this.id = id;
    this.value = value;
    this.inputRadio = document.createElement("input");
    this.label = document.createElement("label");
    this.div = document.createElement("div");
    this.inputClassNameRadio = ["form-check-input"];
    this.inputClassNameLabel = ["form-check-label", "h3", "p-2"];
    this.divClassName = ["form-check"];
    // Constructing radio input
    this.finishRadio = function () {
      this.inputRadio.setAttribute("type", "radio");
      this.inputRadio.setAttribute("required", "");
      this.inputRadio.setAttribute("name", `radio-${this.questionNumber}`);
      this.inputRadio.setAttribute("id", `${this.id}`);
      this.inputRadio.value = this.value;
      this.inputRadio.classList.add(...this.inputClassNameRadio);
      return this.inputRadio;
    };
    // Constructing label
    this.finishLabel = function () {
      this.label.setAttribute("for", `${this.id}`);
      this.label.value = this.value;
      this.label.classList.add(...this.inputClassNameLabel);
      this.label.textContent += `${this.answer}`;
      return this.label;
    };
    // Constructing a div for radio input and label
    this.finishDivForRadio = function (classNameDiv) {
      this.div.classList.add(...this.divClassName);
      this.div.classList.add(classNameDiv);
      return this.div;
    };
  }

  // Creating h2 and img tag object constructor function
  function CreateH2AndImgTag(id, question, imageSorc) {
    // Declaring and creating values for h2 and img tag
    this.id = id;
    this.question = question;
    this.imageSorc = imageSorc;
    this.h2 = document.createElement("h2");
    this.img = document.createElement("img");
    // Constructing h2 tag
    this.finishH2 = function () {
      this.h2.classList.add(`question-${this.id}`, `my-3`);
      this.h2.textContent += `${this.question}`;
      return this.h2;
    };
    // Constructing img tag
    this.finishImg = function () {
      this.img.classList.add(
        `img-${this.id}`,
        `img-thumbnail`,
        `rounded`,
        `d-block`,
        `mx-auto`
      );
      this.img.setAttribute("src", `${this.imageSorc}`);
      this.img.setAttribute("alt", `${this.id}`);
      return this.img;
    };
  }

  // Fetching json file with questions and answers from git reposetory asynchronous
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

  // Fetching json file with heros and there information from git reposetory asynchronous
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

  // Catching errors of fetched quostions and heros
  getQuestions().catch((error) => {
    error.message;
  });
  getHeros().catch((error) => {
    error.message;
  });

  // Declaring vareable for storing answers
  let finalyQuestionsArr = [];

  // Creating main image and main question of the game
  let mainImageAndQuestion = new CreateH2AndImgTag(
    "startGame",
    "Which superhero are you?",
    "./IMG/heros.jpg"
  );

  // Creating loading spiner for image using bootstrap
  let spinner = document.createElement("div");
  spinner.classList.add("spinner-border", "text-light", "align-self-center");
  spinner.innerHTML = `<span class="sr-only">Loading...</span>`;

  // Adding spiner to form
  formGroup.appendChild(spinner);

  // Calling asynchronous quostions and hero arrays of objects
  getQuestions().then((redyQuestions) => {
    getHeros().then((redyHeros) => {
      // When image is fully loaded then remove loading spinner
      //and add main question with main image inside form
      mainImageAndQuestion.finishImg().addEventListener("load", () => {
        document.querySelector(".spinner-border").remove();

        formGroup.prepend(mainImageAndQuestion.finishImg());
        formGroup.prepend(mainImageAndQuestion.finishH2());
      });

      // Adding start button into form
      formGroup.appendChild(startTheGame.finishButton("start"));

      // Creating button for next question
      let nextQuestion = new ButtonCreate("Next");

      // Selecting start button
      let startButton = document.querySelector(".start");

      // Function that create the quiz
      function createQuiz(invok, side) {
        // Everytime createQuiz is called, scroller gose up smoothly
        window.scroll({
          top: 0,
          behavior: "smooth",
        });

        // Everytime createQuiz is called, spiner is added to form
        formGroup.appendChild(spinner);

        // Array is used for selecting radio answers for every question
        let arrOfNumbersRadio = [1, 2, 3, 4, 5];

        // Mapping through array of objects with questions, answers, id and image src
        redyQuestions.map((questionWithAnswers) => {
          // Declaring vareable that will be used for printing questions images and
          //for the last answer
          let newH2AndImg;
          // Declaring vareable for radio with label
          //and for inserting them inside div that is used for bootstrap
          let newRadio;
          let divForRadio;
          // If statmen for when start button is clicked
          //and choosing first object
          if (invok == "Start the game" && questionWithAnswers.id == 1) {
            // Creating img and h2 tag for first question and image
            newH2AndImg = new CreateH2AndImgTag(
              questionWithAnswers.id,
              questionWithAnswers.question,
              questionWithAnswers.img
            );

            // When image is fully loaded then remove loading spinner
            //and add question with image inside form
            newH2AndImg.finishImg().addEventListener("load", () => {
              document.querySelector(".spinner-border").remove();
              formGroup.prepend(newH2AndImg.finishImg());
              formGroup.prepend(newH2AndImg.finishH2());
            });

            // Looping through first object of answer quostion and id
            for (let [key, value] of Object.entries(questionWithAnswers)) {
              // Filtering answers out of first object
              if (!(key == "question" || key == "img" || key == "id")) {
                // Creating radio and label tags for answers
                newRadio = new CreateRadio(
                  `${questionWithAnswers.id}-${key}`,
                  `${questionWithAnswers.id}-${key}`,
                  value,
                  questionWithAnswers.id
                );

                // Adding div for every separated radio with label
                formGroup.appendChild(
                  newRadio.finishDivForRadio(
                    `div-${questionWithAnswers.id}-${key}`
                  )
                );

                // Selecting div for every separated radio with label
                divForRadio = document.querySelector(
                  `.div-${questionWithAnswers.id}-${key}`
                );

                // Adding radio and label to their div
                divForRadio.appendChild(newRadio.finishRadio());
                divForRadio.appendChild(newRadio.finishLabel());
              }
            }

            // Adding next button for the question
            formGroup.appendChild(
              nextQuestion.finishButton(`next-${questionWithAnswers.id}`)
            );

            // If statmen for when next button is clicked,
            //checking given number with id of object for getting whanted object
          } else if (+invok == questionWithAnswers.id && side == "next") {
            // Creating img and h2 tag for question and image
            newH2AndImg = new CreateH2AndImgTag(
              questionWithAnswers.id,
              questionWithAnswers.question,
              questionWithAnswers.img
            );

            // Remove previous img and h2 tag
            document
              .querySelector(`.question-${+questionWithAnswers.id - 1}`)
              .remove();
            document
              .querySelector(`.img-${+questionWithAnswers.id - 1}`)
              .remove();

            // When image is fully loaded then remove loading spinner
            //and add question with image inside form
            newH2AndImg.finishImg().addEventListener("load", () => {
              document.querySelector(".spinner-border").remove();
              formGroup.prepend(newH2AndImg.finishImg());
              formGroup.prepend(newH2AndImg.finishH2());
            });

            // Looping through object of answer quostion and id
            for (let [key, value] of Object.entries(questionWithAnswers)) {
              // Filtering answers out of every object
              if (!(key == "question" || key == "img" || key == "id")) {
                // Creating radio and label tags for answers
                newRadio = new CreateRadio(
                  `${+questionWithAnswers.id}-${key}`,
                  `${+questionWithAnswers.id}-${key}`,
                  value,
                  questionWithAnswers.id
                );

                // After next click removing all radios that can be selected
                //from html document
                arrOfNumbersRadio.forEach((numberRadio) => {
                  let isSelected = document.querySelector(
                    `.div-${+questionWithAnswers.id - 1}-${numberRadio}`
                  );
                  // Checking if radio div is selected
                  if (isSelected) {
                    isSelected.remove();
                  }
                });

                // Adding div for every separated radio with label
                formGroup.appendChild(
                  newRadio.finishDivForRadio(
                    `div-${+questionWithAnswers.id}-${key}`
                  )
                );
                // Selecting div for every separated radio with label
                divForRadio = document.querySelector(
                  `.div-${+questionWithAnswers.id}-${key}`
                );
                // Adding radio and label to their div
                divForRadio.appendChild(newRadio.finishRadio());
                divForRadio.appendChild(newRadio.finishLabel());
              }
            }
            // Adding next button for the question
            formGroup.appendChild(
              nextQuestion.finishButton(`next-${+questionWithAnswers.id}`)
            );
            // Selecting next button that was just added
            let remuveNextClass = document.querySelector(
              `.next-${+questionWithAnswers.id}`
            );
            // Removing className that was previous added
            remuveNextClass.classList.remove(
              `next-${+questionWithAnswers.id - 1}`
            );
            // Checking if last question was clicked
          } else if (
            +invok == 16 &&
            side == "answer" &&
            +invok == +questionWithAnswers.id
          ) {
            // Clearing everything inside form div
            formGroup.innerHTML = "";
            // Adding spinner
            formGroup.appendChild(spinner);
            // Getting hero object from function that is most accurate by
            //giving array of answers from the quiz
            let myHero = printTheHero(finalyQuestionsArr);
            // Creating img and h2 tag for printing superhero
            newH2AndImg = new CreateH2AndImgTag(
              myHero.id,
              `You are ${myHero.name}`,
              myHero.img
            );
            // When image is fully loaded then remove loading spinner
            //and add superhero with image inside form
            newH2AndImg.finishImg().addEventListener("load", () => {
              document.querySelector(".spinner-border").remove();
              formGroup.prepend(newH2AndImg.finishImg());
              formGroup.prepend(newH2AndImg.finishH2());
            });
            // Adding play again button
            formGroup.appendChild(playAgain.finishButton("start"));
          }
        });
      }

      // Declaring vareable for later selecting next button
      let nextButton;

      // Event for sart button click
      startButton.addEventListener("click", (e) => {
        e.preventDefault();
        // Adding to createQuiz function two strings
        //for checking what to do with it and calling it
        createQuiz(startButton.value, "start");
        // Removing everything from start form
        document.querySelector(".img-startGame").remove();
        document.querySelector(".question-startGame").remove();
        startButton.remove();
        // Calling function to add selected answer to array
        // and to make next button desabled until radio is clicked
        answersToQuestions();
        // Function for cheking what next question shold be created
        nextButtonClick();
      });
      // function for next button click
      function nextButtonClick() {
        // Selecting which button is now
        redyQuestions.forEach((question) => {
          if (document.querySelector(`.next-${question.id}`)) {
            nextButton = document.querySelector(`.next-${question.id}`);
          }
        });
        // Selecting last digit of a next button class to use it
        // for creating new question or printing answer
        let nextButtonClassNumber = nextButton.className
          .split(" ")[2]
          .split("-")[1];
        nextButton.addEventListener("click", (e) => {
          e.preventDefault();
          if (nextButtonClassNumber == 16) {
            createQuiz(nextButtonClassNumber, "answer");
            // Calling function to add selected answer to array
            // and to make next button desabled until radio is clicked
            answersToQuestions();
          } else {
            createQuiz(++nextButtonClassNumber, "next");
            // Calling function to add selected answer to array
            // and to make next button desabled until radio is clicked
            answersToQuestions();
          }
        });
      }
      // Function for adding selected answers and desable button until
      // radio is selected
      function answersToQuestions() {
        let selectedRadio;
        let isSelectedRadio;
        // Selecting radiuos
        redyQuestions.forEach((question) => {
          if (document.querySelector(`.next-${question.id}`)) {
            nextButton = document.querySelector(`.next-${question.id}`);
            isSelectedRadio = document.getElementsByName(
              `radio-${question.id}`
            );
            // If radio cheked then enable next button
            nextButton.disabled = true;
            isSelectedRadio.forEach((radio) =>
              radio.addEventListener(
                "change",
                () => (nextButton.disabled = false)
              )
            );
            // Adding selected answer to array on next button click
            nextButton.onclick = function () {
              for (let key in question) {
                if (!(key == "question" || key == "img" || key == "id")) {
                  selectedRadio = document.getElementById(
                    `${question.id}-${key}`
                  );
                  if (selectedRadio.checked) {
                    finalyQuestionsArr.push(selectedRadio.value);
                  }
                }
              }
            };
          }
        });
      }
      // Selecting hero that best describets a person by its answers
      function printTheHero(arrayOfAnswers) {
        let isTrue;
        let countTrue;
        let checkLength = 0;
        // Checking players gender chosen
        let isMale = arrayOfAnswers.some(
          (answerToQuestion) => answerToQuestion == "2-1"
        );
        let isFemale = arrayOfAnswers.some(
          (answerToQuestion) => answerToQuestion == "2-2"
        );
        let both = arrayOfAnswers.some(
          (answerToQuestion) => answerToQuestion == "2-3"
        );
        let maleHeros;
        let femaleHeros;
        let bothHeros;
        // Getting array of most aqurate heros last one is most aqurate
        let theHeroIs = redyHeros.filter((heroObject) => {
          // male heros
          if (isMale) {
            maleHeros = heroObject.gender;
            isTrue = Object.entries(heroObject).map(([key, value]) => {
              if (
                Array.isArray(value) &&
                maleHeros.some((checkIfMale) => checkIfMale == "2-1")
              ) {
                return value.some((heroAnswer) =>
                  arrayOfAnswers.includes(heroAnswer)
                );
              } else if (!Array.isArray(value)) {
                return value;
              }
            });
            // Female heros
          } else if (isFemale) {
            femaleHeros = heroObject.gender;
            isTrue = Object.entries(heroObject).map(([key, value]) => {
              if (
                Array.isArray(value) &&
                femaleHeros.some((checkIfFemale) => checkIfFemale == "2-2")
              ) {
                return value.some((heroAnswer) =>
                  arrayOfAnswers.includes(heroAnswer)
                );
              } else if (!Array.isArray(value)) {
                return value;
              }
            });
            // both heros
          } else if (both) {
            bothHeros = heroObject.gender;
            isTrue = Object.entries(heroObject).map(([key, value]) => {
              if (
                Array.isArray(value) &&
                bothHeros.some((checkIfBoth) => checkIfBoth == "2-3")
              ) {
                return value.some((heroAnswer) =>
                  arrayOfAnswers.includes(heroAnswer)
                );
              } else if (!Array.isArray(value)) {
                return value;
              }
            });
          }
          // Counting true answers of every hero
          countTrue = isTrue.filter((valueBollen) => valueBollen == true)
            .length;
          // Checking witck hero has most true
          if (countTrue > checkLength) {
            checkLength = countTrue;
            // Returning hero objects last returned has most true
            return isTrue;
          }
        });
        // Returning last hero of the array
        return theHeroIs.slice(-1)[0];
      }
    });
  });
})();
