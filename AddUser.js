var userID;
var usernames = [];
var questions = [];

var Str1 = 'Users/';
var Str2 = 'Users/';

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
  
  var ref1 = database.ref('Questions/');
  var ref2 = database.ref('Users/');
  ref1.on('value',gotData, errData);
  ref2.on('value',gotUsers, errData);
  

function gotData(data){
    var user = data.val();
    var keys = Object.keys(user);
    
	var element = document.getElementById("list");
	element.innerHTML = '';
    for(var i = 0; i < keys.length; i++){
		var k = keys[i];
        questions[i] = k;
		
        	var para = document.createElement("p");
		var node = document.createTextNode((i+1) + ". " + k);
		para.appendChild(node);
		element.appendChild(para);
			
    }
    
}

function gotUsers(data) {
	var user = data.val();
    var keys = Object.keys(user);
	
	usernames = keys;
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
	  });
  
	  // Add a realtime listener
	 //firebase.auth().onAuthStateChanged(firebaseUser => {
	  	//if(firebaseUser){
			//console.log(firebaseUser);
		//}
			//else {
				//console.log('Not logged in');
				//window.location="Web Interface.html";
			//}
		
	//  });
  
  
}());


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
	if(document.getElementById("select").value.toString() == "specific"){
    		document.getElementById("userID").removeAttribute('disabled');
	}
	else
		document.getElementById("userID").setAttribute('disabled', true);
}

function submit(){

	var updates1 = {};
	var updates2 = {};
	var numQuestion = document.getElementById('num').value;
	var type = document.getElementById('select').value;
	
	if(numQuestion < 1 || numQuestion > questions.length){
		alert("The number of the question selected does not exist.");
	} else {
		if(type == "specific"){
			userID = document.getElementById('userID').value;
			Str1 = Str1 + userID + '/questions/';
			Str2 = Str2 + userID + '/answers/';
			updates1[questions[numQuestion - 1]] = false;
			updates2[questions[numQuestion - 1]] = "";
			firebase.database().ref().child(Str1).update(updates1);
			firebase.database().ref().child(Str2).update(updates2);
			alert("Updated Successfully.");
		} else {
		
			for(var i = 0; i < usernames.length; i++){
				Str1 = Str1 + usernames[i] + '/questions/';
				Str2 = Str2 + usernames[i] + '/answers/';
				updates1[questions[numQuestion - 1]] = false;
				updates2[questions[numQuestion - 1]] = "";
				firebase.database().ref().child(Str1).update(updates1);
				firebase.database().ref().child(Str2).update(updates2);
				
				Str1 = 'Users/';
				Str2 = 'Users/';
				updates1 = {};
				updates2 = {};
			}
		alert("Updated Successfully.");
	}
	}
}

function getData(){
	
	for(var i = 0; i < usernames.length;  i++){
	Str1 = Str1 + usernames[i] + '/answers/';
  	var ref3 = database.ref('Users/');
  	re3.on('value',gotDatas, errData);
  }
}