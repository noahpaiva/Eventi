

// listen for auth status changes
auth.onAuthStateChanged(user => {

    if (user) {

        console.log('user logged in: ', user);
        // get data
        db.collection('events').onSnapshot(snapshot => {
            setupEvents(snapshot.docs);
            setupUI(user);
        });
    }
    else {
        console.log('user logged out');
        setupUI();
        setupEvents([]);
    }

});


//Event Creation
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // var date = new Date(document.getElementById("Date").value);
    // var timeStamp = date.getTime();
    var eventDate = new Date(createForm['Date'].value);

    db.collection('events').add({
        Date: eventDate,
        Desc: createForm['Desc'].value,
        Location: createForm['Location'].value,
        Title: createForm['Title'].value,
        admin: userEmail
    }).then(() => {
        //Close and clear modal form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();

    }).catch(err => {
        console.log(err.message);
    })
});



// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up user, asynchronous task, takes time to complete, requires promise to function correctly
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
})



const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});


const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});