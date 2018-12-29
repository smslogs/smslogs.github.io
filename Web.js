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
  const btnLogin = document.getElementById('btnLog');
  const btnLogout = document.getElementById('out');
  
  // Add Login Event
  btnLogin.addEventListener('click', e => {
  		//Get email and password
	  const email = txtEmail.value;
	  const pass = txtPassword.value;
	  const auth = firebase.auth();
	 const promise = auth.signInWithEmailAndPassword(email, pass);
	 promise.catch(e => console.log(e.message));
	  
	  
	   });
	  
	  // logout
	  btnLogout.addEventListener('click', e => {
	  	firebase.auth().signOut();
		window.location="Web Interface.html";
	  });
	  
	  // Add a realtime listener
	  firebase.auth().onAuthStateChanged(firebaseUser => {
	  	if(firebaseUser){
			console.log(firebaseUser);
			window.location="Menu.html";
		}
			else {
				console.log('Not logged in');
			}
		
	  });
  
  
}());