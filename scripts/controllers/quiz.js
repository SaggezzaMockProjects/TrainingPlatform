/**
 * @name quiz.js
 * @description Controller for the quiz.
 */

'use strict';

/**
 * @name QuizController
 * @param 
 *  $scope - application model
 *  $http - Allows access to json file
 *  $location - redirection
 *  userService - Cookies that store user information
 *  courseService - Cookies that store course information
 *  fbRef - Reference to the Firebase DB
 * @description
 * 	
 */
function QuizCtrl($scope,$http,$sce,$location,userService,courseService,fbRef) {
	$scope.score = 0;
	$scope.activeQuestion = -1;
	$scope.activeQuestionAnswered = 0;
	$scope.percentage = -1;

    var courseRef = fbRef.getCoursesRef();
      courseRef.once("value", function(snapshot) {
           $scope.test = snapshot.child("Compliance").child("Rules and Regulations").child("questions").child("0").child("correct");
           $scope.failedMessage = "Course name already taken";
             });
    

	//Read data from json file
	$http.get('../data/quiz_data.json').then(function(quizData){
		$scope.questions = quizData.data;
		$scope.totalQuestions = $scope.questions.length;
	});

	//
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
			//Add to total score
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
				//Save quiz score in the DB under the course node
				$scope.successMessage = "Congrats you passed!";
				var user = userService.getUserId();
				var courseRef = fbRef.getCoursesRef();
				courseRef.child(courseService.getCategory()).child(courseService.getCourseName()).child("users").child(user).set({
					score: $scope.percentage
				});
			}else {
				console.log('failed');
				$scope.failedQuiz = "You failed. Please retake the course.";
			}
			//$('html,body').scrollTop(0);


			//Scroll page to top after user submits quiz
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
	};

	$scope.redirectToDashboard = function() {
		$location.path('/dashboard');
	};

	$scope.redirectToQuiz= function() {
		$location.path('/quiz');
	};


	//Reinitialize variables
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
       quiz: '=',
     },
	controller: QuizCtrl
}).service('courseService',function($cookies) {
      /*Stores course information as cookies. Will need to fix this to ensure data isn't lost
      during refresh*/

      this.getCourseId = function() {
        return $cookies.get('courseId');
      };

      this.setCourseId = function(value) {
        $cookies.put('courseId',value, {expires:new Date(2017, 1, 1)})
      };

      this.getCategory = function() {
        return $cookies.get('category');
      };

      this.setCategory = function(value) {
        $cookies.put('category',value, {expires:new Date(2017, 1, 1)})
      };

      this.getCourseName = function() {
        return $cookies.get('courseName');
      };

      this.setCourseName = function(value) {
        $cookies.put('courseName',value,  {expires:new Date(2017, 1, 1)})
      };
   });
	   

