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

let scoreboard = [];  // Initialize the scoreboard array
let username = "";  // Declare username globally

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve scoreboard from localStorage
    const savedScoreboard = localStorage.getItem('scoreboard');
    if (savedScoreboard) {
        scoreboard = JSON.parse(savedScoreboard);  // Parse the saved scoreboard
        displayScoreboard(true);  // Only display it on demand, not immediately
    }

    // Event listener for Start Game button
    document.getElementById('start-btn').addEventListener('click', function() {
        username = document.getElementById('username').value;
        if (username === "") {
            alert("Please enter your name to start the quiz!");
            return;  // Stop the quiz from starting if no name is entered
        }

        document.getElementById('start-container').style.display = 'none'; // Hide start container
        document.getElementById('clear-scoreboard-btn').style.display = 'none';  // Show the quiz container
        document.getElementById('switch-username-btn').style.display = 'none';
        displayScoreboard(false); // Hide the scoreboard when the quiz starts
        document.getElementById('quiz-container').style.display = 'block';
        startQuiz(); // Start the quiz
    });

    // Event listener for Clear Scoreboard button
    document.getElementById('clear-scoreboard-btn').addEventListener('click', function() {
        clearScoreboard();  // Call the function to clear the scoreboard
    });

    document.getElementById('switch-username-btn').addEventListener('click', function() {
        switchUsername();  // Call the function to switch the username
    });
});

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let timerInterval;  // To store the interval for the countdown
let timeLeft = 30;
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
    let availableQuestions = totalQuestions.filter(q => !previousQuestions.includes(q));
    const shuffledQuestions = shuffle([...availableQuestions]);
    let newQuestions = shuffledQuestions.slice(0, 5);
    previousQuestions = newQuestions;
    return newQuestions;
}

function showQuestion(){
    resetState();
    startTimer();
    let currentQuestion = randomQuestions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    clearInterval(timerInterval);
    nextButton.style.display = "none";
    document.getElementById('timer').innerText = '';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    timeLeft = 30;  // Reset the time to 30 seconds
    document.getElementById('timer').innerText = `Time left: ${timeLeft}`;  // Display the initial time

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();  // Automatically move to the next question when time is up
        }
    }, 1000);  // Update the timer every second
}

function handleTimeOut() {
    // Automatically move to the next question
    if (currentQuestionIndex < randomQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();  // Show the next question
    } else {
        showScore();  // Show the final score when the quiz is over
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score += 170 +timeLeft;  // 2 points per second left, and 100 points for the correct answer
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score}!`;
    
    // Check if the user already exists in the scoreboard
    let existingUser = scoreboard.find(entry => entry.name === username);
    if (existingUser) {
        // Update the score only if the new score is higher
        if (score > existingUser.score) {
            existingUser.score = score;
        }
    } else {
        // Add the new user to the scoreboard
        scoreboard.push({ name: username, score: score });
    }
    // Save the updated scoreboard to localStorage
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));

    // Show the scoreboard after the quiz ends
    displayScoreboard(true);

    // Show the Clear Scoreboard button again after the quiz ends
    document.getElementById('clear-scoreboard-btn').style.display = 'block';
    document.getElementById('switch-username-btn').style.display = 'block';  // Show Switch Username button

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function switchUsername() {
    // Reset the quiz and go back to the start page
    document.getElementById('quiz-container').style.display = 'none';  // Hide the quiz container
    document.getElementById('start-container').style.display = 'block';  // Show the start container

    // Clear the username input field
    document.getElementById('username').value = '';

    // Hide the Switch Username button again until the next session ends
    document.getElementById('switch-username-btn').style.display = 'none';
}


function displayScoreboard(isVisible) {
    const scoreboardElement = document.getElementById('scoreboard');

    if (isVisible) {
        scoreboardElement.style.display = 'block';
        scoreboardElement.innerHTML = "<h2>Scoreboard</h2>"; // Clear old content
        if (scoreboard.length === 0) {
            scoreboardElement.innerHTML += "<p>No scores yet!</p>";
        } else {
            // Sort and display scoreboard entries
            scoreboard.sort((a, b) => b.score - a.score);  // Sort by score descending
            scoreboard.forEach((entry, index) => {
                scoreboardElement.innerHTML += `<p>${index + 1}. ${entry.name}: ${entry.score} points</p>`;
            });
        }
    } else {
        scoreboardElement.style.display = 'none';
    }
}

function clearScoreboard(){
    scoreboard = [];  // Clear the scoreboard array
    localStorage.removeItem('scoreboard');  // Remove scoreboard from localStorage
    displayScoreboard(true);  // Update the display
}

function handleNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < randomQuestions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < randomQuestions.length){
        handleNextBtn();
    } else {
        startQuiz();
    }
});