// Service worker implementation
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered!");
        console.log(registration);
}).catch(error => {
        console.log("SW Registration failed!");
        console.log(error);
    });
}





// Pulls data from Firestore 'events' database
const eventList = document.querySelector('.events');



// Finds which nav bar items should be shown to the user depending on log in status
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');



// Changes nav bar buttons depending on log in status
const setupUI = (user) => {
    
    if(user) {
        // Show Account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <div>Logged in as ${user.email}</div>
                <div>${doc.data().bio}</div>
                <div>Email Verified: ${user.emailVerified}</div>
            `;
            accountDetails.innerHTML = html;
        })
        // Toggle nav bar elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else {
        // Hide account info
        accountDetails.innerHTML - '';

        // Toggle nav bar elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}



// Sets userEmail variable for firebase searching and event setup
var userEmail;
var userVerif;
auth.onAuthStateChanged(user => {

    if (user) {
        userEmail = user.email;
        userVerif = user.emailVerified;
    }
    else {

    }

});



// Allows user to delete events, no confirmation is offered to user, might add in the future
function deleteEvent(ev) {
    db.collection('events').doc(ev).delete();
    window.alert("Event successfully deleted.")
}

var currentEventID;


// Sets contents of edit event modal
function getEvent(ev) {

    // Sets global var currentEventID to event Id to use when update event button is pressed
    currentEventID = ev;
    var docRef = db.collection("events").doc(ev);

    docRef.get().then((doc) => {

        if (doc.exists) {

            //Fills Edit Event modal with current event information
            // console.log("Document data: ", doc.data());
            var thisEvent = doc.data();
            document.getElementById('edit-Title').value = thisEvent.Title;
            document.getElementById('edit-Category').value = thisEvent.Category;
            document.getElementById('edit-Desc').value = thisEvent.Desc;
            document.getElementById("edit_search_input").value = thisEvent.Location;

            var evDate = thisEvent.Date.toDate().toISOString();
            document.getElementById("edit-Date").value = evDate.substring(0,evDate.length-1);
        }
        else {
            console.log("no such document");
        }
    }).catch((error) => {
        console.log("Error getting document: ", error);
    });
}


// Allows for users to edit their events
const editForm = document.querySelector('#edit-form');
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var newEventDate = new Date(editForm['edit-Date'].value);

    var eventsRef = db.collection("events");

    // Pulls current event and sets values to users new inputted data
    eventsRef.doc(currentEventID).set({
        Date: newEventDate,
        Desc: editForm['edit-Desc'].value,
        Location: editForm['edit_search_input'].value,
        Title: editForm['edit-Title'].value,
        Category: editForm['edit-Category'].value,
        admin: userEmail
    }).then(() => {
        const modal = document.querySelector('#modal-edit');
        M.Modal.getInstance(modal).close();
        editForm.reset();
    }).catch(err => {
        console.log(err.message)
    });
});



// Sends user a verification email upon button press
function send_verification() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // Email sent

        window.alert("verification Sent!");

    }).catch(function(error) {
        // An error has occured

        window.alert("Error: " + error.message);
    });
}



//setup events
const setupEvents = (data) => {

    // Checks if data exists for an event
    if(data.length) {
        document.getElementById("logged-out-content").style.display = "none";
        let html = '';
        data.forEach(doc => {
            const event = doc.data();
            let eventId = doc.id;
            // console.log(event); - only used for debugging
            if(userEmail == event.admin) {
                var thisDate = event.Date.toDate();
                var loc = event.Location.replace(/\s/g, '+');
                loc.replace(/,/g, '%2C');
                var cat;
                if(event.Category == "outdoor") {
                    cat = "Outdoor Activity";
                } else if (event.Category == "dining") {
                    cat = "Dining Out";
                } else if (event.Category == "drinks") {
                    cat = "Drinks";
                } else if (event.Category == "business") {
                    cat = "Business";
                } else if (event.Category == "family") {
                    cat = "Family Gathering";
                } else if (event.Category == "personal") {
                    cat = "Personal Event";
                } else {
                    cat = "Other";
                }

                // BUILDING USER EVENTS INTO HTML
                let li = `
                    <li>
                        <div class="collapsible-header orange lighten-4"><strong id="event-title">${event.Title}</strong></div>
                        <div class="collapsible-body light orange lighten-5" id="event-content">
                            Category: ${cat} <br />
                            ${event.Desc} <br />
                            ${thisDate} <br />
                            <a href="https://www.google.com/maps/search/?api=1&query=${loc}" target="_blank">${event.Location}</a> <br />
                            <br />
                            <button class="btn grey darken-3 z-depth-0" onclick="deleteEvent('${eventId}')">Delete Event</button>
                            <button class="btn grey darken-3 z-depth-0 modal-trigger" href="#" data-target="modal-edit" onclick="getEvent('${eventId}')">Edit Event</button>
                        </div>
                    </li>
                `;
                
                html += li;
                
            }
        });

        // IF USER EMAIL IS NOT VERIFIED, SHOW BUTTON TO SEND VERIFICATION EMAIL
        if(!userVerif) {
            let emailButton = `
                <div>
                    <button class="btn grey darken-3 z-depth-0" id="verifButton" onclick="send_verification()">Verify Email</button>
                </div>
            `;
        html += emailButton;
        }
        
        eventList.innerHTML = html;
    }
    // IF NO USER IS LOGGED IN
    else {
        let li = `
        
        <h5>Please log in to view your events.</h5>
        `;
        document.getElementById("logged-out-content").style.display = "block";
        eventList.innerHTML = li;
        
    }   
}



// Allows for events to be collapsible modals
document.addEventListener('DOMContentLoaded', function() {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});

$(document).ready(function(){
    $('.carousel').carousel();
});

$(document).ready(function(){
    $('select').formSelect();
});


