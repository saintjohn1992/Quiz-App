//Setting the dom selectors that work link the html id & classes to the js file
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

//Setting the variables and their scope for the games logic

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Setting the questions array

let questions = [{
        question: 'What is the capital of Iceland?',
        choice1: 'Canberra',
        choice2: 'Vienna',
        choice3: 'Reykjavik',
        choice4: 'Helsinki',
        answer: 3,
    },

    {
        question: 'What is the capital of New Zealand?',
        choice1: 'Cardiff',
        choice2: 'Edinburgh',
        choice3: 'Dublin',
        choice4: 'Wellington',
        answer: 4,
    },

    {
        question: 'What is the capital of Tunisia?',
        choice1: 'Tunis',
        choice2: 'Algiers',
        choice3: 'Kingston',
        choice4: 'San Juan',
        answer: 1,
    },

    {
        question: 'What is the capital of Azerbaijan?',
        choice1: 'Kinshasa',
        choice2: 'Baghdad',
        choice3: 'El Djazir',
        choice4: 'Baku',
        answer: 4,
    },

    {
        question: 'What is the capital of Dagestan?',
        choice1: 'Tbilisi',
        choice2: 'Makhachkala',
        choice3: 'Maputo',
        choice4: 'kyiv',
        answer: 2,
    },

    {
        question: 'What is the capital of Bosnia and Herzegovina?',
        choice1: 'Tirana',
        choice2: 'Skopje',
        choice3: 'Sarajevo',
        choice4: 'Zagreb',
        answer: 3,
    },

    {
        question: 'What is the capital of Nigeria?',
        choice1: 'Accra',
        choice2: 'Khartoum',
        choice3: 'Abuja',
        choice4: 'Cape Town',
        answer: 3,
    },

    {
        question: 'What is the capital of Khazakhstan?',
        choice1: 'Nur-Sultan',
        choice2: 'Minsk',
        choice3: 'Tallinn',
        choice4: 'Riga',
        answer: 1,
    },

    {
        question: 'What is the capital of Sweden?',
        choice1: 'Glasgow',
        choice2: 'Prague',
        choice3: 'Munich',
        choice4: 'Stockholm',
        answer: 4,
    },

    {
        question: 'What is the capital of The UAE?',
        choice1: 'Riyadh',
        choice2: 'Abu Dhabi',
        choice3: 'Amman',
        choice4: 'New Delhi',
        answer: 2,
    }
]

//these deal with the points in the max score and points in the game.

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

//sets the game's logic

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

//Stores the scores including the high scores

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    //Increments the questions & calculates what question we're on corresponding it with the percentage

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    //calculates the value of the question index

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()