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
      $(".response").fadeIn(1000);
    } else {
       if (QandA[currentQuestion].explanation == "") {
        var answer = QandA[currentQuestion].answers[actualAnswerNumber];
        var explanation = "The correct answer to Question "+displayCurrentQuestion+" is '"+ answer + "'";
       } else {
        var explanation = "The correct answer to Question "+displayCurrentQuestion+" is "+ QandA[currentQuestion].explanation;
       }
       $(".response .text").html("<h3>Wrong!</h3>"+explanation);
       $(".response").fadeIn(1000);
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
	 var q = new Question(0, "What was the last voice communication from Malaysian Airlines Flight 370's cockpit?");
   q.answers = ["We'd like to declare an emergency!","All right, sleep tight.","All right, good night.","Where am I?","None of the above"];
   q.answer = 2;
   QandA[0] = q;
   q = new Question(1, "What kind of sound did the airplane's ACARS system make?");
   q.answers = ["A groaning sound","A pinging sound","A chirping sound",  "A yodeling sound","None of the above"];
   q.answer = 1;
   QandA[1] = q;
   q = new Question(2, "The oceans are full of ...?");
   q.answers = ["Floatsam","Airplanes","Pinging devices",  "CNN reporters","Black boxes"];
   q.answer = 0;
   QandA[2] = q;
   q = new Question(3, "What assertion was made by Malaysian authorities that was later contradicted by evidence?");
   q.answers = ["That the airplane had already landed when it pinged a satellite","That the ACARs was turned off before the co-pilot signed off",  "That the airplane's left turn had been pre-programmed, presumably by someone with nefarious intent","That texting news of a tragedy to affected family members is a good PR move","All of the above"];
   q.answer = 4;
   QandA[3] = q;
    q = new Question(4, "What was the cause of Malaysian Airlines Flight 370's disappearance?");
   q.answers = ["Crew interference with the transponders","A catastrophic electrical failure",
   "The emergence of a hidden parallel universe which sucked the airplane into its alternate space-time continuum",
    "It intentionally flew directly to heaven","All of the above"];
   q.answer = 2;
   QandA[4] = q;   
    q = new Question(5, "Where did Malaysian Airlines Flight 370 end up?");
   q.answers = ["On a remote island with a 5000-ft landing strip, a hangar to hide the plane in, and no cell phone service",
   "With a radical Ungiur group in a remote Chinese village","Swallowed by a black hole",  "In the Indian Ocean","None of the above"];
   q.answer = 4;
   QandA[5] = q;  

   /*
  q = new Question(6, "What kind of sound was the airplane's ACARS system making?");
   q.answers = ["A groaning sound","A pinging sound","A chirping sound",  "A yodeling sound","None of the above"];
   q.answer = 1;
   QandA[6] = q; 
   displayQuestion(0);
  q = new Question(7, "What kind of sound was the airplane's ACARS system making?");
   q.answers = ["A groaning sound","A pinging sound","A chirping sound",  "A yodeling sound","None of the above"];
   q.answer = 1;
   QandA[7] = q; 
*/
   newQuiz();
   $(".questions .button").on("click", function(evt){
      processAnswer(this);
   });
  /*--- Display response box ---*/
  	$(".what").click(function(){
    	$(".response").fadeIn(1000);
  	});
  	/*--- Hide response box ---*/
  	$(".response a.close").click(function(event){
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