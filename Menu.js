var usernames = [];
var questions = [];
var userQuestions = [];
var answers = [];
var position;
var answer;

(function() {
	
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEFORVjZqTZ7A-4iWq2h39umcfzpwKBLM",
    authDomain: "smslogs-1c6f9.firebaseapp.com",
    databaseURL: "https://smslogs-1c6f9.firebaseio.com",
    projectId: "smslogs-1c6f9",
    storageBucket: "smslogs-1c6f9.appspot.com",
    messagingSenderId: "834347819530"
  };
  firebase.initializeApp(config);
  database = firebase.database();

  var ref = database.ref();
  ref.on('value',gotData, errData);
  
function gotData(data) {
    var users = data.val().Users;
	var question = data.val().Questions;
    var user = Object.keys(users);
	var ques = Object.keys(question);
    usernames = user;
	questions = ques;
    //console.log(usernames);
	//console.log(questions);
}

function errData(err){
    console.log("ERROR")
    console.log(err)
}
  
  	  // Elements
  		const btnLogout = document.getElementById('out');
		  
  
	  // logout
	  btnLogout.addEventListener('click', e=> {
	  	firebase.auth().signOut();
		window.location="Web Interface.html";
	  });
	  
	  // Add a realtime listener
	//  firebase.auth().onAuthStateChanged(firebaseUser => {
	  //	if(firebaseUser){
			//console.log(firebaseUser);
		//}
			//else {
				//console.log('Not logged in');
				//window.location="Web Interface.html";
			//}
		
	  //});
  
  
}());

function download(content, fileName, contentType) {
	var a = document.createElement("a");
	var file = new Blob([content], {type: contentType});
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}

function getCSV() {
	console.log("Something")
	database.ref('Users').once('value', function(snap){
		//console.log(JSON.stringify(snap.val()))
		download(JSON.stringify(snap.val()), 'json.txt', 'text/plain');
	})
}



function submit() {
	var id = document.getElementById("id").value;
	var que = document.getElementById("question").value;
	var element = document.getElementById("text");
	
	//Erases the previous output
	element.innerHTML = '';
	
	if(id != "" && que == ""){
		 var refe = database.ref('Users/' + id + '/questions/');
 		 refe.on('value',getDatas, errorData);
		for(var i = 0; i < userQuestions.length; i++){
			position = i;
			var refe1 = database.ref('Users/' + id + '/answers/' + userQuestions[i]);
			refe1.on('value',getData, errorData);
		}
		
		var text = ("User: " + id + ": " );
		display(text);
		for(var i = 0; i < userQuestions.length; i++) {
			var content = (i+1) + ". " + userQuestions[i] + ": " + answers[i]; 
			display(content);
		}
		
	}
	if(id == "" && que != ""){
		display(que);
		for(var i = 0; i < usernames.length; i++) {
			position = i;
			var refe = database.ref('Users/' + usernames[i] + '/answers/' + que);
 			refe.on('value',getAnswers, errorData);
		}
		
		for(var i = 0; i < usernames.length; i++) {
			var text = usernames[i] + ": " + "Answer: " + answers[i];
			display(text);
		}
	}
	if(id != "" && que != ""){
		var refe = database.ref('Users/' + id + '/answers/' + que);
 		refe.on('value',getAnswer, errorData);
		var u = "User ID: " + id;
		var q = "Question: " + que;
		var a = "Answer: " + answer;
		display(u);
		display(q);
		display(a);
	}
}

function getDatas(data) {
	var user = data.val();
    var q = Object.keys(user);
    userQuestions = q;
	//console.log(userQuestions);
}

function getData(data) {
	var answer = data.val();
	answers[position] = answer
	//console.log(answers[position]);
}

function getAnswers(data){
	var a = data.val();
    answers[position] = a;
}

function getAnswer(data) {
	var a = data.val();
    answer = a;
}

function errorData() {
	console.log("ERROR")
    console.log(err)
}

function display(data) {
		var para = document.createElement("p");
		var node = document.createTextNode(data);
		para.appendChild(node);
		var element = document.getElementById("text");
		element.appendChild(para);
}
