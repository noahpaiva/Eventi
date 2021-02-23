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
<<<<<<< Updated upstream
=======
                    <li>
>>>>>>> Stashed changes
                        <div class="collapsible-header orange lighten-4">${event.Title}</div>
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
<<<<<<< Updated upstream
        <li><div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                  
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                      <div class="item active">
                        <img src="event.jpg" alt="Plan extravagant events with Eventi!">
                      </div>
                  
                      <div class="item">
                        <img src="event2.jpg" alt="Your next event has never been this easy!">
                      </div>
                  
                      <div class="item">
                        <img src="event3.jpg" alt="Enjoy an adventure or a relaxing day, it's all up to you!">
                      </div>
                    </div>
                  
                    <!-- Left and right controls -->
                    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                      <span class="glyphicon glyphicon-chevron-left"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#myCarousel" data-slide="next">
                      <span class="glyphicon glyphicon-chevron-right"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
=======
>>>>>>> Stashed changes
        eventList.innerHTML = '<h5 class="center-align">Please login to view your events!</h5>';
        
    }   
}


// Allows for events to be collapsible modals
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
  
})
