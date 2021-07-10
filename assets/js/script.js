let startQuizBtn = document.querySelector("#start-quiz");
let startDiv=document.querySelector("#start-div");
let questionsDiv=document.querySelector("#questions-div");

let optionDiv=document.querySelector("#options");
let resultDiv=document.querySelector("#result-div");
let showTimer=document.querySelector('#timer-span');
let questionNumber=0;
resultDiv.style.display="none";
let time=5;
let questionArray = [
    {question: 'Why is it important to be careful of the source when embedding an <iframe>?',
    options: ['Copyright infringement','Security risks from “bad” websites', 'All of the above'],
    answer:3
    },
    {question: 'I wish to align an element to the top of its container, which CSS property should I use?',
    options: ['text-align: top;','margin-align: top;', 'overflow: top;','vertical-align: top;'],
    answer:4
    },
    {question: 'The main purpose of the <head> element is that it contains information that helps the browser understand what the page is about, what it should look like, and any other behind-the-scenes information.',
    options: ['true','false'],
    answer:1
    },
    {question: "The main purpose of the <body> element is to hold all of the document's actual content that is meant to be seen or interacted with by the page's visitor",
    options: ['true','false'],
    answer:1
    },
    {question: "Which of the following is NOT a good reason for version control?",
    options: ['Version control allows the codebase to be modified and tested without interrupting the user experience.','Version control allows changes to the codebase to be tested individually.', 
    'Version control allows teams to work on individual features synchronously.', 'Version control allows features to ship directly to the main branch.'],
    answer:4
    },
    {question: "We are currently on the develop branch. Which of the following commands does NOT switch to a new branch?",
    options: ['git checkout main','git checkout -b feature/header', 'git branch feature/header'],
    answer:3
    },
    {question: "After you’re done creating and testing a new feature in a feature branch, what is the next step?",
    options: ['Merge the feature branch into the main branch.','Merge the feature branch into the develop branch.', 'Create a new feature branch.'],
    answer:2
    },
    {question: "How do you create a flexbox?",
    options: ['display: flex;','display: flexbox;', 'display: box;'],
    answer:1
    },
    {question: "By default, in which direction does a flexbox lay out its items?",
    options: ['A row (horizontal), with all of the child elements laid out side by side.','A column (vertical), with all of the child elements laid out on top of one another.'],
    answer:1
    },
    {question: "What do media queries allow us to do?",
    options: ['Play videos on our page.','Create responsive designs.', 'Change CSS at different browser widths.'],
    answer:3
    },
    {question: "Which one of these is NOT a valid media type for media queries?",
    options: ['all','screen', 'speech','tablet'],
    answer:4
    }
]
function StartQuiz(){
  startDiv.style.display = "none";
questionsDiv.style.display='block';
showTimer.textContent = time;
let timerInterval = setInterval(function(){
    time--;
    showTimer.textContent = time;
    if (time===0){
        clearInterval(timerInterval);}
}, 1000);
AskQuestion(); 
}
function AskQuestion(){

  let getQuestion = questionArray[questionNumber];
  let questionH2=document.createElement("h2");
  questionH2.textContent=getQuestion.question;
  questionsDiv.appendChild(questionH2);
 console.log(getQuestion.options.length);
 for (i=0;i < getQuestion.options.length;i++){
  let optionDiv=document.createElement("div");
   let optionButton= document.createElement("button");
   optionButton.textContent = getQuestion.options[i];
   optionButton.setAttribute("data-answ-id", i+1);
   optionDiv.appendChild(optionButton);
   questionsDiv.appendChild(optionDiv);
   
 }
 console.log(questionsDiv)
}

startQuizBtn.addEventListener("click", StartQuiz);




  
