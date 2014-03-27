var QandA = [];
var currentQuestion = 0;
var totalCorrect = 0;
function Question(number, question){
  this.number = number;
  this.question = question;
  this.explanation = "";
  this.answer = 0;
  this.answers = [];
}
var newQuiz = function() {
  currentQuestion = 0;
  totalCorrect = 0;
  $(".totals").hide();
  $(".response").hide();
  displayQuestion(0);   
}
var displayQuestion = function(qNum) {
  var q = QandA[qNum].question;
  var a = "";
  currentQuestion = qNum;
  $(".question .circle").html(qNum+1);
  $(".question .text").html(QandA[qNum].question);
  $(".questions").html("");
  for (var i=0; i < QandA[qNum].answers.length; i++) {
    a = QandA[qNum].answers[i];
    $(".questions").append('<input type="submit" onclick="processAnswer(this);" class="button" value="'+a+'" data-id="'+i+'"/>');
  }
  $(".guessBox").html(qNum+1 + " of " +QandA.length + " questions");
  $(".airplane > img").css('display', 'none');
  $(".airplane .airplane"+currentQuestion).css('display', 'block');
}
var processAnswer = function(elem) {
    var actualAnswerNumber =  QandA[currentQuestion].answer; 
    var answerNumber = $(elem).data("id");
    var displayCurrentQuestion = currentQuestion + 1;
    var totalQuestions = QandA.length; 
    $(".response").removeClass("ok");
    if (answerNumber == actualAnswerNumber){
      totalCorrect = totalCorrect + 1;
      $(".response").addClass("ok");
      $(".response .text").html("<h3>Correct!</h3><p>You answered Question "+displayCurrentQuestion+" correctly</p>");
      $(".response").fadeTo(1000, 0.7);
    } else {
       if (QandA[currentQuestion].explanation == "") {
        var answer = QandA[currentQuestion].answers[actualAnswerNumber];
        var explanation = "The correct answer to Question "+displayCurrentQuestion+" is '"+ answer + "'";
       } else {
        var explanation = "The correct answer to Question "+displayCurrentQuestion+" is "+ QandA[currentQuestion].explanation;
       }
       $(".response .text").html("<h3>Wrong!</h3>"+explanation);
       $(".response").fadeTo(1000, 0.7);
    }   
    if (currentQuestion == totalQuestions - 1){ // last question!
      $(".response").fadeOut(7000);
      var msg = "";
      var finalScore = Math.round((totalCorrect / totalQuestions) * 100);
      if (finalScore == 100) {
        var scoreMsg = "Congratulations!<p>You got a perfect score!</p>";
      } else {
        var scoreMsg = "Your Score: "+finalScore+"%";
      }
      $(".totals").show();
      $(".totals h3").html(scoreMsg);
      $(".totals .text").html(msg);
     $(".airplane > img").css('display', 'none');
      var displayQ = currentQuestion+1;
      $(".airplane .airplane"+displayQ).css('display', 'block');
      currentQuestion = 0;
    } else {
      currentQuestion = currentQuestion + 1;
      displayQuestion(currentQuestion);
    } 
}
$(document).ready(function(){
	 var q = new Question(0, "What was the last voice communication from Malaysian Airlines Flight 370?");
   q.answers = ["'We'd like to declare an emergency!'","'All right, sleep tight.'","'All right, good night.'","'Where am I?'","None of the above"];
   q.answer = 2;
   QandA[0] = q;
   q = new Question(1, "What kind of sound did the airplane's ACARS system make?");
   q.answers = ["Peeps","Pings","Chirps",  "Yodels","None of the above"];
   q.answer = 1;
   QandA[1] = q;
   q = new Question(2, "The oceans are full of ...?");
   q.answers = ["Flotsam","Airplanes","Transponders",  "CNN reporters","Black boxes"];
   q.answer = 0;
   QandA[2] = q;
   q = new Question(3, "What erroneous assertion was made by the Malaysian authorities?");
   q.answers = [ "That the Gulf of Thailand was a likely route",
                  "That the airplane pinged a satellite after landing",
                "That the pilot signed off after the ACARs was off", 
               "That the airplane's left turn had been preprogrammed with nefarious intent",
                "All of the above and more"];
   q.answer = 4;
   QandA[3] = q;
    q = new Question(4, "What was the cause of Malaysian Airlines Flight 370's disappearance?");
   q.answers = ["Crew interference with the transponders","A catastrophic electrical failure",
   "A parallel universe which sucked the airplane into an alternate space-time continuum",
    "It intentionally flew directly to heaven","All of the above"];
   q.answer = 2;
   QandA[4] = q;   
    q = new Question(5, "Where did Malaysian Airlines Flight 370 end up?");
   q.answers = ["On a remote island with a 5000-ft runway",
   "With a radical Uighur group in a remote Chinese village","Swallowed by a black hole",  "In the Indian Ocean","None of the above"];
   q.answer = 4;
   QandA[5] = q;  

   newQuiz();
   $(".questions .button").on("click", function(evt){
      processAnswer(this);
   });

  	/*--- Hide response box ---*/
  	$(".response a.close").click(function(event){
      event.preventDefault();
  		//$(".response").fadeOut(1000);
      $(this).closest("div").fadeOut(1000);
  	});
      $(".response").click(function(event){
      event.preventDefault();
      //$(".response").fadeOut(1000);
      $(this).closest("div").fadeOut(1000);
    });
    $(".totals a.close").click(function(event){
      event.preventDefault();
      $(this).closest("div").fadeOut(1000);      
      newQuiz();
    });

  	$("form").submit(function(event) {
    	event.preventDefault();
  	});
});