(function(){

	var app = angular.module('quiz',[]);

	app.controller('QuizController',['$scope','$http','$sce',function($scope,$http,$sce){

		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswered = 0;
		$scope.percentage = 0;

		$http.get('../data/quiz_data.json').then(function(quizData){
			$scope.questions = quizData.data;
			$scope.totalQuestions = $scope.questions.length;
		});

		$scope.selectAnswer = function(qIndex,aIndex){

			var questionState = $scope.questions[qIndex].questionState;

			if(questionState != 'answered'){
				$scope.questions[qIndex].selectedAnswer = aIndex;
				var correctAnswer =  $scope.questions[qIndex].correct;
				$scope.questions[qIndex].correctAnswer = correctAnswer;

				if(aIndex === correctAnswer){
					$scope.questions[qIndex].correctness =  'correct';
					$scope.score += 1;
				}
				else{
					$scope.questions[qIndex].correctness =  'incorrect';

				}
				$scope.questions[qIndex].questionState = 'answered';
				$scope.activeQuestionAnswered += 1;
			}
		}

		$scope.isSelected = function(qIndex,aIndex) {
			return $scope.questions[qIndex].selectedAnswer === aIndex;
		}

		$scope.isCorrect = function(qIndex,aIndex) {
			return $scope.questions[qIndex].correctAnswer === aIndex;
		}		

		$scope.selectContinue = function(){
			return $scope.activeQuestion += 1;
		}

		$scope.restartQuiz = function(){
			$scope.score = 0;
			$scope.activeQuestion = -1;
			$scope.activeQuestionAnswered = 0;
			$scope.percentage = 0;

			$http.get('../data/quiz_data.json').then(function(quizData){
				$scope.questions = quizData.data;
				$scope.totalQuestions = $scope.questions.length;
			});
		}

	}]);

})();