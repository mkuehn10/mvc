var QUESTIONS = [
  {
    text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 0
  },
  {
    text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 1
  },
  {
    text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 2
  },
  {
    text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 3
  }
];

// var questionsPageElement = $('.questions-page');
// var questionCurrentElement = $('.question-current');
// var questionsTotalElement = $('.questions-total');
// var questionElement = $('.question');
// var answersElement = $('.answers');
//
// var resultsPageElement = $('.results-page');
// var scoreElement = $('.score');
// var restartButtonElement = $('.restart-button');
//
// var showResults = function() {
//   questionsPageElement.hide();
//   resultsPageElement.show();
// };
//
// var showQuestions = function() {
//   resultsPageElement.hide();
//   questionsPageElement.show();
// };
//
// var resetScore = function() {
//   scoreElement.text(0);
// };
//
// var increaseScore = function() {
//   var score = parseInt(scoreElement.text(), 10);
//   scoreElement.text(score + 1);
// };
//
// var setQuestion = function(questionIndex) {
//   var question = QUESTIONS[questionIndex];
//   questionCurrentElement.text(questionIndex);
//   questionElement.text(question.text);
//   answersElement.empty();
//   for (var i=0; i<question.answers.length; i++) {
//     var answer = question.answers[i];
//     answersElement.append('<li><button type="button">' + answer + '</button></li>');
//   }
// };
//
// answersElement.on('click', 'button', function() {
//   var choice = $(this).parent().index();
//   var questionIndex = parseInt(questionCurrentElement.text(), 10);
//   var question = QUESTIONS[questionIndex];
//   if (question.correct === choice) {
//     increaseScore();
//   }
//
//   if (questionIndex + 1 < QUESTIONS.length) {
//     setQuestion(questionIndex + 1);
//   }
//   else {
//     showResults();
//   }
// });
//
// restartButtonElement.click(function() {
//   setQuestion(0);
//   resetScore();
//   showQuestions();
// });



var Model = function() {
  this.questionText = '';
  this.answers = [];
  this.correct = 0;

  this.onChange = null;
};

Model.prototype.setQuestionText = function(value) {
  this.questionText = value;
  if (this.onChange) {
    this.onChange(this.questionText);
  }
};

Model.prototype.setAnswers = function(value) {
  this.answers = value;
  if(this.onChange) {
    this.onChange(this.answers);
  }
};

Model.prototype.setCorrectAnswer = function(value) {
  this.correct = value;
  if (this.onChange) {
    this.onChange(this.correct);
  }
};

var View = function(questionSelector, questionInitial, answerSelector, answerInitial) {
  var self = this;
  this.question = $(questionSelector);
  this.setQuestion(questionInitial || '');

  this.answer = $(answerSelector);
  this.setAnswer(answerInitial || []);

  $.each($(this.answer.children()), function(index, value) {
    // console.log(value);
    $(value).on('click', function() {
      self.onClick(this, self);
    });
  });

  this.onChange = null;
};

View.prototype.setQuestion = function(text) {
  this.question.html(text);
};

View.prototype.setAnswer = function(answers) {
  var self = this;
  var element = this.answer;
  answers.forEach(function(answer, n) {
    element.append('<li><button type="button" class="btn-' + n + '">' + answer + '</button></li>');
  });
};

View.prototype.onClick = function(dis, self) {
  var value = $(dis).index();
  // console.log(value);
  // console.log(event.target);
  // console.log(this.onChange);
  if (this.onChange) {
    current++;
    this.onChange(QUESTIONS[current].text);
  }
};

var Controller = function(model, view) {
  view.onChange = model.setQuestionText.bind(model);
  model.onChange = view.setQuestion.bind(view);
};

var current = 0;



$(document).ready(function() {
  // questionsTotalElement.text(QUESTIONS.length);
  // setQuestion(0);

  var model = new Model();
  var view = new View('.question', QUESTIONS[current].text, '.answers', QUESTIONS[current].answers);
  var controller = new Controller(model, view);
  // console.log(view.onChange);
  // console.log(model.onChange);

  // view.onChange(QUESTIONS[3].text);

  // view.setQuestion(QUESTIONS[1].text);
  // view.setAnswer(QUESTIONS[3].answers);

  // view.setQuestion();
  // var questionView = new QuestionView('.question');
  // var answerView = new AnswerView('.answers', QUESTIONS[0].answers);

  // questionView.setQuestion(QUESTIONS[0].text);
  // answerView.setAnswers(QUESTIONS[0].answers);
  // QUESTIONS.forEach(function(question) {
  // console.log(question);
  //   view.setQuestion(question.text);
  //   console.log(view.question);
  // });

});
