var questions = [];
var element = document.getElementById("list");

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
  ref1.on('value',gotData, errData);
  

function gotData(data){
    var user = data.val();
    var keys = Object.keys(user);
    //console.log(user);
	//console.log(keys);
	
	element.innerHTML = '';
    for(var i = 0; i < keys.length; i++){
		var k = keys[i];
        questions[i] = k;
		
        	var para = document.createElement("p");
		var node = document.createTextNode(k);
		para.appendChild(node);
		element.appendChild(para);
			
    }
    
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
