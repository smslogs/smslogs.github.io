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
	
  //Get Elements
  const txtEmail = document.getElementById('textEmail');
  const txtPassword = document.getElementById('textPassword');
  const btnSignUp = document.getElementById('sign');
  const btnLogOut = document.getElementById('out');
  
  // Add Sign Up Event
  btnSignUp.addEventListener('click', e => {
  		//Get email and password
	  const email = txtEmail.value;
	  const pass = txtPassword.value;
	  const auth = firebase.auth();
	 const promise = auth.createUserWithEmailAndPassword(email, pass);
	 promise.catch(e => console.log(e.message));
	  
	  alert("New Account Created");
	 // alert("New Account Created: \n\n You may Log Out\n                 or \nCreate another new User.");
	   });
  
   btnLogOut.addEventListener('click', e => {
   	firebase.auth().signOut();
   });
	  
	  // Add a realtime listener
	  firebase.auth().onAuthStateChanged(firebaseUser => {
	  	if(firebaseUser){
			console.log(firebaseUser);
		}
			else {
				console.log('Not logged in');
				window.location="Web Interface.html";
			}
		
	  });
  
  
}());