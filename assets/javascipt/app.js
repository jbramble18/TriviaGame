//create a interval timer decreasing by seconds, starting at 120 seconds......
//create 4 different answers that the player can check....
//player can only check one.....
//correct answers are stored and added together
// incorrect answers are stored and added toegther
// unanswered questions are stored and added together
//either upon completion or time lapse, all questions are hidden and results shown
//if player runs out of time, the game stops, number of questions not answered listed
//upon game stop, number of correct answers and incorret answers are shown


$(document).ready(function () {

    $(".wrapper").hide();
    $(".jumbotron").hide();

    var trivia = {

        questions: [{
                question: "What is the most expensive spice in the world?",
                choices: ["Saffron", "Pepper", "Cardamom", "Mace"],
                id: "q1",
                correctAnswer: 0

            },

            {
                question: 'What spice is referred to as the "King of Spices"?"',
                choices: ["Cinnamon", "Tarragon", "Pepper", "Mustard Seeds"],
                id: "q2",
                correctAnswer: 2
            },

            {
                question: "The Dutch traded the island of Manhattan to the British for islands that grew which spice?",
                choices: ["Pepper", "Cinnamon", "Saffron", "Nutmeg"],
                id: "q3",
                correctAnswer: 3
            },
            {
                question: "What is consider to be the hottest chile pepper in the world?",
                choices: ["Carolina Reaper", "Habanero Pepper", "Ghost Chile", "Jalapeno Pepper"],
                id: "q4",
                correctAnswer: 0
            },
            {
                question: "Which spice is actually a berry, not a blend of spices?",
                choices: ["Juniper Berries", "Allspice", "Green Peppercorns", "Creole Seasoning"],
                id: "q5",
                correctAnswer: 1
            },
            {
                question: "The chemical from what spice, is a major component of Tamiflu?",
                choices: ["Turmeric", "Fennel Seeds", "Anise Star", "Foenegreek"],
                id: "q6",
                correctAnswer: 2
            },
            {
                question: "Ancient Romans believed eating or bathing in what spice would protect one from being poisoned?",
                choices: ["Caraway Seeds", "Pepper", "Savory Leaf", "Thyme"],
                id: "q7",
                correctAnswer: 3
            },
            {
                question: 'In Greek, what herb loosely translates to "Joy of the Mountains"?',
                choices: ["Basil", "Oregano", "Cumin", "Cinnamon"],
                id: "q8",
                correctAnswer: 1
            },
            {
                question: "Which herb was believed to have the ability to ward off bad spirits?",
                choices: ["Parsley", "Sage", "Frankencense", "Basil"],
                id: "q9",
                correctAnswer: 3
            },
            {
                question: 'What herb is also know as "French Parsley"?',
                choices: ["Chervil", "Rosemary", "Garlic", "Cilantro"],
                id: "q10",
                correctAnswer: 0

            }

        ]
    }




	var message = "Game Over!";
	


    $("#start").on("click", function (){

		$(".wrapper").show();
		console.log('hello');

		$(this).hide();
	

    
    var number = 61;
    $("#timeLeft").on('click', run);
 
    function decrement(){
        number--;
        $('#timer').html('<h2>' + number + " seconds"+'</h2>'); 
        if (number === 0){
        stop();
        $('#message').html('Thymes Up!');
        checkAnswers();
        $(".wrapper").hide();
        $(".jumbotron").show();
        }
    }
    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    function stop(){
            clearInterval(counter);
    }

    run();

});

function questionForm(data) {

	var questionString = "<br><form id='q1'>"+ data.question +"<br><br>";
    var choices = data.choices;
	for (var i = 0; i < choices.length; i++) {
		var choice = choices[i];
		// console.log(choice);
		questionString = questionString + "<input type='radio' name='"+data.id+"' value="+ i +">"+choice;

	}
	return questionString + "</form>";
}
window.questionForm = questionForm;


function buildQuiz(){
	var questionsShown = ''
	for (var i = 0; i < trivia.questions.length; i++) {
		questionsShown = questionsShown + questionForm(trivia.questions[i]);
	}
	$("#questions").append(questionsShown);

}

function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.correctAnswer);
	var isChecked = correct.is(':checked');
	return isChecked;
}


buildQuiz();


function resultsDisplay(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}


function checkAnswers (){

	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0


	for (var i = 0; i<trivia.questions.length; i++) {
		if (isCorrect(trivia.questions[i])) {
			correct++;
		} else {

			if (checkAnswered(trivia.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}

	$('#results').html('<br>Correct: '+correct+ "<br><br>" +'Incorrect: '+incorrect+ "<br><br>" +'Unanswered: '+unAnswered);
}


function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');

	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}

	return anyAnswered;

}


	$('#submit').on('click', function() {
	checkAnswers();
	stop();
    $("#message").html("Game Over!");
    $(".wrapper").hide();
    $(".jumbotron").show();
    })
    
});
