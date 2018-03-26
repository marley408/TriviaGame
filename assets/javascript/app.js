$(document).ready(function() {
    const $startButton = $('#start');
    const $quizContainer = $('#quiz-container');
    const $timeLeft = $('#timeLeft');
    const $quiz = $('#quiz');

    let timeAllowed = 60; // 1 minute
    let timer;

    // Set initial text of time left paragraph
    $timeLeft.text(timeAllowed);

    $startButton.on('click', function(e) {
        e.preventDefault();

        $startButton.hide();
        $quizContainer.css({ display: 'block' });

        timer = setInterval(function() {
            timeAllowed--;
            $timeLeft.text(timeAllowed);

            if (timer === 0) {
                clearInterval(timer);
            }
        }, 1000);
    });

    $quiz.on('submit', function(e) {
        e.preventDefault();
        clearInterval(timer);
        $timeLeft.parent().remove();
        $quiz.hide();


        $('<div><h1>Results</h1></div>').appendTo($quizContainer);
        console.log('submitted');
    });
});