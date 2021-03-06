// DOM elements
let startQuizBtn = document.querySelector("#start-quiz");
let blockDiv = document.querySelector("#block");
let startDiv = document.querySelector("#start-div");
let scoresDiv = document.querySelector("#high-scores");
let scoreItem=document.querySelector("#score-item");
let submitScoreBtn = document.querySelector("#submitScore");
let questionsDiv = document.querySelector("#questions-div");
let wrongDiv = document.querySelector("#wrong");
let correctDiv = document.querySelector("#correct");
let resultDiv = document.querySelector("#result-div");
let showTimer = document.querySelector('#timer-span');
let showScore= document.querySelector('#score');
let initialsInput=document.querySelector('#initials');
let goBackBtn = document.querySelector('#goBack');
let clearScoresBtn =document.querySelector('#clearScores');
let viewHighScores=document.querySelector('#view-scores');
let questionNumber = 0;
resultDiv.style.display = "none";
scoresDiv.style.display="none";
wrongDiv.style.display = "none";
correctDiv.style.display = "none";
// variables
let checkAnswer=0;
let time=0;
let score=0;
let getQuestion={};
let timerInterval;
let questionArray = [
  {
    question: 'Why is it important to be careful of the source when embedding an <iframe>?',
    options: ['Copyright infringement', 'Security risks from “bad” websites', 'All of the above'],
    answer: 3
  },
  {
    question: 'I wish to align an element to the top of its container, which CSS property should I use?',
    options: ['text-align: top;', 'margin-align: top;', 'overflow: top;', 'vertical-align: top;'],
    answer: 4
  },
  {
    question: 'The main purpose of the <head> element is that it contains information that helps the browser understand what the page is about, what it should look like, and any other behind-the-scenes information.',
    options: ['true', 'false'],
    answer: 1
  },
  {
    question: "The main purpose of the <body> element is to hold all of the document's actual content that is meant to be seen or interacted with by the page's visitor",
    options: ['true', 'false'],
    answer: 1
  },
  {
    question: "Which of the following is NOT a good reason for version control?",
    options: ['Version control allows the codebase to be modified and tested without interrupting the user experience.', 'Version control allows changes to the codebase to be tested individually.',
      'Version control allows teams to work on individual features synchronously.', 'Version control allows features to ship directly to the main branch.'],
    answer: 4
  },
  {
    question: "We are currently on the develop branch. Which of the following commands does NOT switch to a new branch?",
    options: ['git checkout main', 'git checkout -b feature/header', 'git branch feature/header'],
    answer: 3
  },
  {
    question: "After you’re done creating and testing a new feature in a feature branch, what is the next step?",
    options: ['Merge the feature branch into the main branch.', 'Merge the feature branch into the develop branch.', 'Create a new feature branch.'],
    answer: 2
  },
  {
    question: "How do you create a flexbox?",
    options: ['display: flex;', 'display: flexbox;', 'display: box;'],
    answer: 1
  },
  {
    question: "By default, in which direction does a flexbox lay out its items?",
    options: ['A row (horizontal), with all of the child elements laid out side by side.', 'A column (vertical), with all of the child elements laid out on top of one another.'],
    answer: 1
  },
  {
    question: "What do media queries allow us to do?",
    options: ['Play videos on our page.', 'Create responsive designs.', 'Change CSS at different browser widths.'],
    answer: 3
  },
  {
    question: "Which one of these is NOT a valid media type for media queries?",
    options: ['all', 'screen', 'speech', 'tablet'],
    answer: 4
  }
]
// quis starts
function StartQuiz() {
   time=75;
   score=0;
  scoresDiv.style.display="none";
  questionsDiv.style.display="block";
  startDiv.style.display = "none";
  showTimer.textContent = time;
// start timer
  timerInterval = setInterval(function () {
    if (time <= 0) {
      ShowScore();
    } else {
      time--;
      showTimer.textContent = time;
    } 
  }, 1000);
  AskQuestion();
  }

function AskQuestion() {
// get current question from array of questions and update page
  let getQuestion = questionArray[questionNumber];
  let questionH2 = document.createElement("h2");
  questionH2.textContent = getQuestion.question;
  questionsDiv.appendChild(questionH2);
// create options buttons and add event listener on each button
  for (i = 0; i < getQuestion.options.length; i++) {
    let optionDiv = document.createElement("div");
    let optionButton = document.createElement("button");
    optionButton.textContent = getQuestion.options[i];
    optionButton.setAttribute("class","btn");
    optionButton.setAttribute("data-answ-id", i + 1);
    optionButton.addEventListener("click", OptionClicked);
    optionDiv.appendChild(optionButton);
    questionsDiv.appendChild(optionDiv);
  }

}
// Get and check the answer
function OptionClicked(){
  let getQuestion = questionArray[questionNumber];
  let checkAnswer= getQuestion.answer - this.getAttribute("data-answ-id");
  if (checkAnswer===0){ 
    score++;
    // show feedback if correct
    correctDiv.style.display = "block";
    setTimeout(function(){
      correctDiv.style.display = "none";
    }, 1000); 
  } else{
    // punishment
    time -= 10;
    if (time <= 0) {
     
      time= 0;
      showTimer.textContent = time;

    }
    // show feedback if wrong
    wrongDiv.style.display = "block";
    setTimeout(function(){wrongDiv.style.display = "none";}, 1000); 
  }
// ask next question if we have more or else show result
      questionNumber++;
      questionsDiv.innerHTML = "";
      if ((questionNumber<questionArray.length)&&(time>0)){
        
        AskQuestion();
      } else {
        ShowScore();
      }


}
  function ShowScore(){
    //hide elements
    wrongDiv.style.display = "none";
    correctDiv.style.display = "none";
    // stop the timer
    clearInterval(timerInterval);
    showTimer.textContent =0;
    questionsDiv.innerHTML = "";
    resultDiv.style.display = 'block';
    showScore.textContent=score;  
  }
  // show high scores and update localStorege
 function SubmitScore(){
  let initials = initialsInput.value.trim().toUpperCase();
  let scoreAdded=0;
  let scoresList=[];
  if (initials !== "") {
    initialsInput.value="";
    blockDiv.style.display = "none";
    resultDiv.style.display="none";
    scoresDiv.style.display='block';
   let scoresString= window.localStorage.getItem("scores") || '';
   if (scoresString!==""){
    scoresList=scoresString.split(',');
   }
   // check if we already have this user
      for (let i = 0; i < scoresList.length; i=i+2) {
        if (scoresList[i]===initials){
          //update user score if new score is higher
          if (parseInt(scoresList[i+1])<=score){
            scoresList[i+1]=score;      
          }
           scoreAdded=1;
        }
      }
      // add new user score
      if (scoreAdded===0){
        scoresList.push(initials);
        scoresList.push(score);
      }
      // update localStorege
      window.localStorage.setItem("scores", scoresList.toString());
      // show high scores
      for (let i = 0; i < scoresList.length; i+=2) {
        let newDiv = document.createElement("div");
        newDiv.textContent= (i/2+1) +". " + scoresList[i]+" - "+scoresList[i+1];
        scoreItem.appendChild(newDiv);
      }
  }else{
    alert("Erorr! Input initials.");}
 }
 function StartAgain() {
  // getQuestion = 0;
  // hide/show elements
  scoresDiv.style.display = 'none';
  blockDiv.style.display = "none";
  scoreItem.innerHTML = "";
  startDiv.style.display = "block";
  blockDiv.style.display = "block";
  questionNumber=0;
  StartQuiz;

}
function ClearScores(){
  localStorage.removeItem("scores");
  scoreItem.innerHTML="";
}
// if the user clicks View High Scores (at any time)
function ViewHighScores(){
  clearInterval(timerInterval);
  showTimer.textContent = 0;
  time=0;
  
  scoresDiv.style.display='block';
  questionsDiv.style.display = 'none';
  questionsDiv.innerHTML='';
  blockDiv.style.display = "none";
  scoreItem.innerHTML = "";
  startDiv.style.display = "none";
  blockDiv.style.display = "none";
  resultDiv.style.display='none';
  initialsInput.value="";
  let scoresString= window.localStorage.getItem("scores") || '';
  if (scoresString!==""){
    scoresList=scoresString.split(',');
    for (let i = 0; i < scoresList.length; i+=2) {
      let newDiv = document.createElement("div");
      newDiv.textContent= (i/2+1) +". " + scoresList[i]+" - "+scoresList[i+1];
      scoreItem.appendChild(newDiv);
    }

  }

}
// event listeners
viewHighScores.addEventListener("click", ViewHighScores);
clearScoresBtn.addEventListener("click", ClearScores);
goBackBtn.addEventListener("click", StartAgain);
 submitScoreBtn.addEventListener("click", SubmitScore);
startQuizBtn.addEventListener("click", StartQuiz);