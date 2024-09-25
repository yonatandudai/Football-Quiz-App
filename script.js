const totalQuestions = [
    {
        question: "who is the top goalscorer of FIFA World Cup?",
        answers: [
            { text:"Pele", correct: false},
            { text:"Leo Messi", correct: false},
            { text:"Miroslav Klose", correct: true},
            { text:"Kylian Mbappe", correct: false}
        ]
    },
    {
        question: "Which footballer has scored in the most consecutive Premier League matches?",
        answers: [
            { text: "Thierry Henry", correct: false },
            { text: "Jamie Vardy", correct: true },
            { text: "Alan Shearer", correct: false },
            { text: "Ruud van Nistelrooy", correct: false }
        ]
    },
    {
        question: "Which club has the longest unbeaten run in top-flight European league football?",
        answers: [
            { text: "Juventus", correct: false },
            { text: "Arsenal", correct: false },
            { text: "Bayern Munich", correct: false },
            { text: "AC Milan", correct: true }
        ]
    },
    {
        question: "Who was the first player to score a hat-trick in a FIFA World Cup final?",
        answers: [
            { text: "Geoff Hurst", correct: true },
            { text: "Pele", correct: false },
            { text: "Ronaldo Nazário", correct: false },
            { text: "Gerd Müller", correct: false }
        ]
    },
    {
        question: "Who was the first African player to win the FIFA World Player of the Year award?",
        answers: [
            { text: "Didier Drogba", correct: false },
            { text: "Samuel Eto'o", correct: false },
            { text: "George Weah", correct: true },
            { text: "Yaya Touré", correct: false }
        ]
    },
    {
        question: "Which player scored the fastest goal in World Cup history?",
        answers: [
            { text: "David Villa", correct: false },
            { text: "Hakan Şükür", correct: true },
            { text: "Thomas Müller", correct: false },
            { text: "Ronaldo Nazário", correct: false }
        ]
    },
    {
        question: "Who was the first goalkeeper to win the Ballon d'Or?",
        answers: [
            { text: "Gianluigi Buffon", correct: false },
            { text: "Manuel Neuer", correct: false },
            { text: "Iker Casillas", correct: false },
            { text: "Lev Yashin", correct: true }
        ]
    },
    {
        question: "Which team has lost the most UEFA Champions League finals?",
        answers: [
            { text: "Juventus", correct: true },
            { text: "AC Milan", correct: false },
            { text: "Bayern Munich", correct: false },
            { text: "Real Madrid", correct: false }
        ]
    },
    {
        question: "Which manager has won the UEFA Champions League the most times?",
        answers: [
            { text: "Pep Guardiola", correct: false },
            { text: "Zinedine Zidane", correct: false },
            { text: "Carlo Ancelotti", correct: true },
            { text: "Sir Alex Ferguson", correct: false }
        ]
    },
    {
        question: "Which player has won the UEFA Champions League with three different clubs?",
        answers: [
            { text: "Cristiano Ronaldo", correct: false },
            { text: "Clarence Seedorf", correct: true },
            { text: "Zlatan Ibrahimović", correct: false },
            { text: "Samuel Eto'o", correct: false }
        ]
    },
    {
        question: "Which country has appeared in the most FIFA World Cup finals without winning?",
        answers: [
            { text: "Netherlands", correct: true },
            { text: "Argentina", correct: false },
            { text: "Spain", correct: false },
            { text: "Hungary", correct: false }
        ]
    },
    {
        question: "Which player has won the most UEFA Europa League titles?",
        answers: [
            { text: "Jesus Navas", correct: false }, 
            { text: "José Antonio Reyes", correct: true },
            { text: "Vitolo", correct: false }, 
            { text: "Kevin Gameiro", correct: false }
        ]
    },
    {
        question: "Which club was the first from these four clubs to win the treble?",
        answers: [
            { text: "Barcelona", correct: false},
            { text: "Manchester United", correct: true},
            { text: "Bayern Munich", correct: false },
            { text: "Inter Milan", correct: false }
        ]
    },
    {
        question: "Which player holds the record for the most goals scored in a single FIFA World Cup tournament?",
        answers: [
            { text: "Just Fontaine", correct: true },
            { text: "Ronaldo Nazário", correct: false },
            { text: "Gerd Müller", correct: false },
            { text: "Pele", correct: false }
        ]
    },
    {
        question: "Which African team was the first to reach the quarter-finals of a FIFA World Cup?",
        answers: [
            { text: "Senegal", correct: false },
            { text: "Cameroon", correct: true },
            { text: "Ghana", correct: false },
            { text: "Nigeria", correct: false }
        ]
    } 
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let randomQuestions = [];
let previousQuestions = [];

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    randomQuestions = getRandomQuestions();
    showQuestion();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomQuestions() {
    let availableQuestions = totalQuestions.filter(q => ! previousQuestions.includes(q));
    const shuffledQuestions = shuffle([...availableQuestions]);
    let newQuestions = shuffledQuestions.slice(0, 5);
    previousQuestions = newQuestions;
    return newQuestions;
}

function showQuestion(){
    resetState();
    var questions = getRandomQuestions();
    let currenrQuestion = randomQuestions [currentQuestionIndex];
    let questionNum = currentQuestionIndex +1;
    questionElement.innerHTML = questionNum + ". " + currenrQuestion.question;
    currenrQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${randomQuestions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < randomQuestions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex < randomQuestions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();