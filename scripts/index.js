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
auth.onAuthStateChanged(user => {

    if (user) {
        userEmail = user.email;
    }
    else {

    }

});



// Allows user to delete events, not confirmation is offered to user, might add in the future
function deleteEvent(ev) {
    db.collection('events').doc(ev).delete();
}



//setup events
const setupEvents = (data) => {

    // Checks if data exists for an event
    if(data.length) {
        let html = '';
        data.forEach(doc => {
            const event = doc.data();
            let eventId = doc.id;
            // console.log(event); - only used for debugging
            if(userEmail == event.admin) {
                var thisDate = event.Date.toDate();
                var loc = event.Location.replace(/\s/g, '+');
                loc.replace(/,/g, '%2C');
                let li = `
                    <li>
                        <div class="collapsible-header orange lighten-4"><strong>${event.Title}</strong></div>
                        <div class="collapsible-body light orange lighten-5">
                            ${event.Desc} <br />
                            ${thisDate} <br />
                            <a href="https://www.google.com/maps/search/?api=1&query=${loc}" target="_blank">${event.Location}</a> <br />
                            <br />
                            <button class="btn grey darken-3 z-depth-0" onclick="deleteEvent('${eventId}')">Delete Event</button>
                        </div>
                    </li>
                `;
                html += li;
            }
        });
        eventList.innerHTML = html;
    }
    else {
        let html = '';
        let li = `
            <h5 class="right-align">Welcome to Eventi! Meet the next generation of event planning and organization right here at the tips of your fingers.</h5>
            <h5 class="left-align">Eventi was created by developers trying to solve the problem of unorganization and difficulty planning among different social groups of people. Most important categories of social life are covered in the Eventi planning application. Enjoy!</h5>
            <h5 class="right-align">Please login or create an account to begin event planning!</h5>
        `;
        html += li;
        eventList.innerHTML = html;
    }   
}


// Allows for events to be collapsible modals
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
  
})
