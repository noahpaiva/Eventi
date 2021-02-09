
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

function signUp() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

}

function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value).
        catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode === 'auth/wrong-password') {
                alert('Wrong Password.');
            }
            else {
                alert(errorMessage);
            }
        })

}

function signUserOut() {

    auth.signOut();
    alert("Signed Out");

}

function goToDash() {

    if (activeUser != null) {
        window.location="dash.html";
    }

}
auth.onAuthStateChanged(function(user) {

    if(user) {

        var email = user.email;
        alert("Active User: " + email);

    }else{

        alert("No Active User");

    }
})