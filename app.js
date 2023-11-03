const ques = [
	{
		que: 'Who is the director of Film Black?',
		answers: [
			{
				text: 'Sanjay Leela Bhanshali',
				correct: 'true',
			},
			{ text: 'Madhur Bhandarkar', correct: 'false' },
			{ text: 'Rohit Shetty', correct: 'false' },
			{ text: 'Farhan Akhtar', correct: 'false' },
		],
	},
	{
		que: 'In which year Satyjit Ray did receive the Oscar?',
		answers: [
			{ text: '1989', correct: 'false' },
			{ text: '1993', correct: 'false' },
			{ text: '1992', correct: 'true' },
			{ text: '1997', correct: 'false' },
		],
	},
	{
		que: "What is the name of Sahrukh Khan's house?",
		answers: [
			{ text: 'Fursat', correct: 'false' },
			{ text: 'Hairat', correct: 'false' },
			{ text: 'Jannat', correct: 'false' },
			{ text: 'Mannat', correct: 'true' },
		],
	},
	{
		que: 'Who is known as father of Computer?',
		answers: [
			{ text: 'Fursat', correct: 'false' },
			{ text: 'Charle Babbage', correct: 'true' },
			{ text: 'Jannat', correct: 'false' },
			{ text: 'Mannat', correct: 'false' },
		],
	},
	{
		que: "Who is India's current National Security Adviser?",
		answers: [
			{ text: 'Mr. S. Jaysankar', correct: 'false' },
			{ text: 'Mr. Narayan Murti', correct: 'false' },
			{ text: 'Mr. Ajit Doval', correct: 'true' },
			{ text: 'Mr. Rajnath Singh', correct: 'false' },
		],
	},
];

const questionElement = document.getElementById('question');

const answerBox = document.getElementById('answer');

let score = 0;
let index = 0;

function startQuiz() {
	index = 0;
	score = 0;
	showQuestion();
}

function showQuestion() {
	resetState();
	let current = ques[index];
	let qNo = index + 1;
	questionElement.firstElementChild.innerHTML = qNo + '.' + current.que;

	current.answers.forEach((ans) => {
		const ansBtn = document.createElement('button');
		ansBtn.innerText = ans.text;
		ansBtn.classList.add('btn');
		answerBox.appendChild(ansBtn); 
		if(ans.correct){
			ansBtn.dataset.correct=ans.correct;
		}
		ansBtn.addEventListener('click',selectAnswer);
	});
}


function resetState(){
	document.getElementById('next').style.display ='none';
	while(answerBox.firstChild){
		answerBox.removeChild(answerBox.firstChild);
	}
} 
function selectAnswer(e){
	const selectedBtn=e.target;
	const isCorrect= selectedBtn.dataset.correct==="true";
	if(isCorrect){

		selectedBtn.classList.add("correct");
		score++;
	}else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerBox.children).forEach(b=>{
		if(b.dataset.correct === "true"){
			b.classList.add("correct");
		}
		b.disabled=true;
	});
	document.getElementById('next').style.display='block'; 
	
}
function showScore(){
	resetState();
	questionElement.innerHTML=`<h4>You scored ${score} out of ${ques.length}!</h4>`;
	document.getElementById('next').innerHTML="Play Again";
	//document.getElementById('next').style.display="block"; 
	
}


function handleNext(){
	index++;
	if(index<ques.length){
		showQuestion();
	}else{
		showScore();
	}
}

document.getElementById('next').addEventListener('click',()=>{
	if(index<ques.length){
		handleNext();
	}
	else{
		startQuiz();
	}
});
startQuiz();
