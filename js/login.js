
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

    alert("Signed Up");

}

function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed In " + email.value);

}

function signOut() {

    auth.signOut();
    alert("Signed Out");

}