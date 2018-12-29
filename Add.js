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
		
	  //});
  
  
}());

function dropOptions(){
	if(document.getElementById("selection").value.toString() == "picker"){
			document.getElementById("view_scale").style.display = "none";
			document.getElementById("view_message").style.display = "block";
			document.getElementById("view_multiple").style.display = "none";
	}
	
	else if(document.getElementById("selection").value.toString() == "emoji"){
		document.getElementById("view_scale").style.display = "none";
		document.getElementById("view_message").style.display = "none";
		document.getElementById("view_multiple").style.display = "none";
	}
	
	else if(document.getElementById("selection").value.toString() == "open"){
		document.getElementById("view_scale").style.display = "none";
		document.getElementById("view_message").style.display = "none";
		document.getElementById("view_multiple").style.display = "none";
	}
	
	else if(document.getElementById("selection").value.toString() == "multiple"){
		document.getElementById("view_scale").style.display = "none";
		document.getElementById("view_message").style.display = "none";
		document.getElementById("view_multiple").style.display = "block";
	} 
	else if(document.getElementById("selection").value.toString() == "scale"){
		document.getElementById("view_scale").style.display = "block";
		document.getElementById("view_message").style.display = "none";
		document.getElementById("view_multiple").style.display = "none";
	}

}

function submit(){
	
	var question = document.getElementById("question").value;
	var question_name = document.getElementById("question_name").value;
	var select = document.getElementById("selection").value;
	var sensitiveness = 'N';
	console.log(document.getElementById("sensitive").value);
	if(document.getElementById("sensitive").value == "sen"){
		sensitiveness = 'S';
	}
	//console.log(document.getElementById("selection").value);
	//console.log(select);
	var multiple;
	var startDate;
	var endDate;
	var scale;
	var value;
	var updates = {};

	
	switch(select){
		case "multiple":
			multiple = document.getElementById("answers").value.split("/");
			value = 'M&&' + question + '&&' + multiple.length + '&&';
			for(var i = 0; i < multiple.length; i++)
				value = value + multiple[i] + '&&';
  			updates[question_name] = value + sensitiveness + '&&';
			alert("The question was successfully uploaded");
			return firebase.database().ref().child('Questions').update(updates);
			break;
		case "scale":	
			scale = document.getElementById("size").value;
			value = 'L&&' + question + '&&' + scale + '&&' + sensitiveness + '&&';
			updates[question_name] = value;
			alert("The question was successfully uploaded");
			return firebase.database().ref().child('Questions').update(updates);
			break;
		case "open":	
			value = 'O&&' + question + '&&' + sensitiveness + '&&';
			updates[question_name] = value;
			alert("The question was successfully uploaded");
			return firebase.database().ref().child('Questions').update(updates);
			break;
		case "emoji":	
			console.log(select);
			value = 'EMOJI&&' + question + '&&' + sensitiveness + '&&';
			updates[question_name] = value;
			alert("The question was successfully uploaded");
			return firebase.database().ref().child('Questions').update(updates);
			break;
		case "picker"	:
			startDate = document.getElementById("start").value;
			endDate = document.getElementById("end").value;
			value = 'MP&&' + question + '&&' + startDate  + '&&' + endDate + '&&' + sensitiveness + '&&';
			updates[question_name] = value;
			alert("The question was successfully uploaded");
			return firebase.database().ref().child('Questions').update(updates);
			break;
	}
	
	
}

