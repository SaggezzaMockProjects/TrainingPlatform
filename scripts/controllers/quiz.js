'use strict';


function QuizController($scope,$http,$sce,$location,userService,courseService,fbRef) {
	$scope.score = 0;
	$scope.activeQuestion = -1;
	$scope.activeQuestionAnswered = 0;
	$scope.percentage = -1;

	$http.get('../data/quiz_data.json').then(function(quizData){
		$scope.questions = quizData.data;
		$scope.totalQuestions = $scope.questions.length;
	});

	$scope.selectAnswer = function(qIndex,aIndex){

		$scope.failedMessage = undefined;

		var questionState = $scope.questions[qIndex].questionState;

		
			$scope.questions[qIndex].selectedAnswer = aIndex;

			$scope.questions[qIndex].questionState = 'correct';
			$scope.activeQuestionAnswered += 1;
	};

	$scope.isSelected = function(qIndex,aIndex) {
		return $scope.questions[qIndex].selectedAnswer === aIndex;
	};

	$scope.isCorrect = function(qIndex,aIndex) {
		return $scope.questions[qIndex].correctAnswer === aIndex;
	};		

	$scope.selectContinue = function(){
		return $scope.activeQuestion += 1;
	};

	$scope.submitQuiz = function() {
		$scope.allQuestions = true;

		for (var i = 0; i < $scope.questions.length; i++) { 

			    if($scope.questions[i].selectedAnswer === undefined)
    			{
    				$scope.allQuestions = false;
    			}

    		if($scope.questions[i].selectedAnswer === $scope.questions[i].correct)
    		{
    			$scope.score += 1;
    		}
		}

		if($scope.allQuestions === false) {
			$scope.failedMessage = "Please answer all questions before submitting.";
		}
		else {

		$scope.percentage = $scope.score / $scope.questions.length * 100 ;

			if($scope.percentage >= 50) 
			{
				$scope.successMessage = "Congrats you passed!";
				var user = userService.getUserId();
				var courseRef = fbRef.getCoursesRef();
				courseRef.child(courseService.getCategory()).child(courseService.getCourseName()).child("users").child(user).set({
					score: $scope.percentage
				});
         		/*courseRef.once("value", function(snapshot) {
             	if(snapshot.child(courseService.getCategory()).child(courseService.getCourseName()).child("users").hasChild(userService.getUserId())) {
                	 $scope.failedMessage = "User quiz already taken";
                 	return false;
             	} else {
                 courseRef.child(courseService.getCategory()).child(courseService.getCourseName()).child("users").set({
                     user: percentage
                });*/
			}else {
				console.log('failed');
				$scope.failedQuiz = "You failed. Please retake the course.";
			}
			//$('html,body').scrollTop(0);

			$('html, body').animate({ scrollTop: 0 }, 'slow');

			/*	var courseRef = fbRef.getCoursesRef();
         		courseRef.once("value", function(snapshot) {
             	if(snapshot.child(courseService.getCategory()).child(courseService.getCourseName()).child("users").hasChild(authData.uid)) {
                	 $scope.failedMessage = "User quiz already taken";
                 	return false;
             	} else {
                 courseRef.child(courseService.getCategory()).child(courseService.getCourseName()).child("users").set({
                     user: percentage
                 });

                 $scope.successMessage = "Successfully created " + course.name;
            	 }
         	});*/
		}
	};

	$scope.redirectToDashboard = function() {
		$location.path('/dashboard');
	};

	$scope.redirectToQuiz= function() {
		$location.path('/quiz');
	};

	$scope.restartQuiz = function(){
		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswered = 0;
		$scope.percentage = -1;
		$scope.failedQuiz = undefined;
		$scope.successMessage = undefined;

		$http.get('../data/quiz_data.json').then(function(quizData){
			$scope.questions = quizData.data;
			$scope.totalQuestions = $scope.questions.length;
		});
	};

}

angular.module('trainingPlatformApp').component('quiz', {
	templateUrl: '/views/quizView.html',
	bindings: {
       courses: '=',
       hires: '=',
       general: '=',
       knowledge: '=',
       tech: '=',
       compliance: '='
     },
	controller: QuizController
});
	   

