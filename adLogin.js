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
  const txtEmail = document.getElementById('adminEmail');
  const txtPassword = document.getElementById('adminPassword');
  const btnLogin = document.getElementById('logIn');
  
  // Add Login Event
  	  btnLogin.addEventListener('click', e => {
  		//Get email and password
	  const email = txtEmail.value;
	  const pass = txtPassword.value;
	  const auth = firebase.auth();
	 const promise = auth.signInWithEmailAndPassword(email, pass);
	 promise.catch(e => console.log(e.message));
	  
	  
	   });
	  
	  // Add a realtime listener
	  firebase.auth().onAuthStateChanged(firebaseUser => {
	  	if(firebaseUser){
			console.log(firebaseUser);
			window.location="SignUp.html";
		}
			else {
				console.log('Not logged in');
			}
		
	  });
  
  
}());