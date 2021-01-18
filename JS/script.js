(function(){
    let arrQuestion = [];
    let arrHeros = [];
    // Fetching json file with questions and answers from git reposetory
    async function getQuestions(){
        let response = await fetch(
            "https://raw.githubusercontent.com/mariusweb/SuperHeroGame/main/JS/question.json"
        );
        let data = await response.json();
        return data;
    }
    // Fetching json file with heros and there information from git reposetory
    async function getHeros(){
        let response = await fetch(
            "https://raw.githubusercontent.com/mariusweb/SuperHeroGame/main/JS/superhero.json"
        );
        let data = await response.json();
        return data;
    }
    getQuestions().then((arrayOfQuestions) => {
        arrQuestion.push(arrayOfQuestions);
    });
    getHeros().then((arrayOfHeros) => {
        arrHeros.push(arrayOfHeros);
    });
    console.log(arrQuestion);
    console.log(arrHeros);
    // getQuestions().then((questionsWithChoices) =>{
    //     console.log(questionsWithChoices);
    // });
}());