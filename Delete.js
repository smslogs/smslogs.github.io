var usernames =[];

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

function submit(){

  var ref1 =  database.ref('Users/');
  ref1.on('value',getUsers, errData);
  var ref2 = database.ref('Questions/');
  ref2.on('value',getData, errData);
	
	
}

function getData(data){
	var question = document.getElementById('que').value;
	var flag = false;
	var ques = data.val();
    var keys = Object.keys(ques);
	questions = keys;
	
	for(var i = 0; i < questions.length; i++){
		if(question == questions[i]){
			flag = true;
		}
		console.log(question + " | " + questions[i]);
	}
	
	if(flag == false){
		//alert("The question that you entered does not exist.");
	} else {
		var String1 = 'Questions/' + question + '/';
		var String2 = 'Users/';
		var String3 = 'Users/';
		
		
		for(var i = 0; i < usernames.length; i++){
			String2 = String2 + usernames[i] + '/questions/' + question + '/';
			String3 = String3 + usernames[i] + '/answers/' + question + '/';
			try {
				database.ref(String2).remove();
				database.ref(String3).remove();
			} catch(error){
				console.log(error);
			}
			String2 = 'Users/';
			String3 = 'Users/';
		}
		database.ref(String1).set(null);
		alert("The question was deleted.");
		document.location.reload();
		
		
		//database.ref('Users/1e43ed65c8f867edc73779eb5be7a820d13a804329a73e6670afb622676b5db3/questions/Question5');
		//database.ref('Users/1e43ed65c8f867edc73779eb5be7a820d13a804329a73e6670afb622676b5db3/answers/Question5');
	}
}

function errData(err){
    console.log("ERROR")
    console.log(err)
}

function getUsers(data){
	var user = data.val();
    var users = Object.keys(user);
	usernames = users;
}
