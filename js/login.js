
var firebaseConfig = {
apiKey: "AIzaSyAPLTMBWmsRhIGYZc7w6UfEMdRKtnoOLOY",
authDomain: "eventilogin.firebaseapp.com",
projectId: "eventilogin",
storageBucket: "eventilogin.appspot.com",
messagingSenderId: "151926697410",
appId: "1:151926697410:web:7cd44669d6aa9becf37a5b",
measurementId: "G-LFX33NZ12L"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
var loggedIn = false;

function signUp() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed Up");

}

function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    
}

function signOut() {

    if(window.location = "dash.html")
    {
        window.location = "index.html";
    }

    auth.signOut();
    alert("Signed Out");

}

function goToDash() {

    if (loggedIn) {
        window.location="dash.html";
    }

}
auth.onAuthStateChanged(function(user) {

    if (user) {

        //is signed in
        var checkEmail = user.email
        alert("Active User: " + checkEmail);
        loggedIn = true;

    }
    else {

        //no user is signed in
        alert("No Active User");
        loggedIn = false;

    }
})