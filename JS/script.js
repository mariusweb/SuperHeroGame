(function(){
    // Declaring variables and selecting class names
    let main = document.querySelector(".container-main");
    let form = document.querySelector(".form");
    let formGroup = document.querySelector(".form-group");
    function ButtonCreate(buttonValue) {
        this.buttonValue = buttonValue;
        this.inputSubmit = document.createElement("input");
        this.inputClassName = ["btn", "btn-dark"];
        this.finishButton = function(){
            this.inputSubmit.setAttribute("type", "submit");
            this.inputSubmit.value = this.buttonValue;
            this.inputSubmit.classList.add(...this.inputClassName);
            return this.inputSubmit;
        }
    }
    let startTheGame = new ButtonCreate("Start the game");
    let nextQuestion = new ButtonCreate("Next");
    let previousQuestion = new ButtonCreate("Previous");
    console.log(startTheGame.finishButton())
    form.insertBefore(startTheGame.finishButton(), form.formGroup);

    // Fetching json file with questions and answers from git reposetory
    async function getQuestions(){
        let response = await fetch(
            "https://raw.githubusercontent.com/mariusweb/SuperHeroGame/main/JS/question.json"
        );
        if(!response.ok){
            let message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        let data = await response.json();
        return data;
    }
    // Fetching json file with heros and there information from git reposetory
    async function getHeros(){
        let response = await fetch(
            "https://raw.githubusercontent.com/mariusweb/SuperHeroGame/main/JS/superhero.json"
        );
        if(!response.ok){
            let message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        let data = await response.json();
        return data;
    }
    getQuestions().catch(error => {
        error.message;
    });
    getHeros().catch(error => {
        error.message;
    })

    getQuestions().then((arrayOfQuestions) => {
        console.log(arrayOfQuestions);
    });
    getHeros().then((arrayOfHeros) => {
        console.log(arrayOfHeros);
    });
    window.addEventListener('DOMContentLoaded', (e) => {

    })
   
}());