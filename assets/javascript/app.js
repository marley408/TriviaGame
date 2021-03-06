$(document).ready(function() {
    const $startButton = $('#start');
    const $quizContainer = $('#quiz-container');
    const $timeLeft = $('#timeLeft');
    const $quiz = $('#quiz');
    const $startPage = $('#startPage')


    // above are the const variables that hold the elements of the html page

    let timeAllowed = 60; // 1 minute
    let timer;
    let correctAmount = 0;
    let incorrectAmount = 0;
    let unAnsweredAmount = 0;


    // here we create an object holding each question and their correct answers. this is used for the comparison function
    const correctAnswers = { 
        "question_1": "Azkaban",
        "question_2": "Bill",
        "question_3": "Crookshanks" 
    };

    // Set initial text of time left paragraph
    $timeLeft.text(timeAllowed);


    // here we wrtie the function that runs once the start button is clicked. we prevent default browser behavior so page does not refresh 
    $startButton.on('click', function(e) {
        e.preventDefault();

        $startButton.hide();
        $startPage.hide()
        $quizContainer.css({ display: 'block' });

        timer = setInterval(function() {
            timeAllowed--;
            $timeLeft.text(timeAllowed);

            if (timeAllowed === 0) {
                clearInterval(timer);                
            }
        }, 1000);
    });

    // here is the function that runs once the quiz is submitted.  
    $quiz.on('submit', function(e) {
        e.preventDefault();
        clearInterval(timer);
        $timeLeft.parent().remove();
        $quiz.hide();

        // Get users answers from quiz
        const results = $quiz.serializeArray();
        
    
        unAnsweredAmount = ( results.length > 0 && results.length === 3 ) ? 0 : 3 - results.length;

        console.log(unAnsweredAmount);

        console.log(results);

        // Loop through all answers the user has provided
        $.each(results, function(index, question) {
            // Select specific question from object of correct answers and compare its paired value
            // to the questions that user answered
            if (question.value === correctAnswers[question.name]) {
                correctAmount++;
                
            }
            else {
                incorrectAmount++
            }
            
        });
    
    
        $('<div><h1>Results</h1></div>').appendTo($quizContainer);

        let $correctAmountElement = $('<div class="correctAmount">');
        let $incorrectAmountElement = $('<div class="correctAmount">');
        let $unansweredAmountElement = $('<div class="correctAmount">');

        $correctAmountElement.text('Correct Answers: ' + correctAmount);
        $correctAmountElement.appendTo($quizContainer);

        $incorrectAmountElement.text('Incorrect Answers: ' + incorrectAmount);
        $incorrectAmountElement.appendTo($quizContainer);

        $unansweredAmountElement.text('Unanswered: ' + unAnsweredAmount);
        $unansweredAmountElement.appendTo($quizContainer);

        


        console.log('submitted');
    });
});


// need ajax call to get users answers when sumbit is clicked. pass data into function which will then compare users answers with correct answers. display # of correct/ incorrect answers on results page