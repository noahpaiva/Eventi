




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


// Changes nav bar buttons depending on log in status
const setupUI = (user) => {
    
    if(user) {

        // Toggle nav bar elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else {

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

//setup events
const setupEvents = (data) => {

    // Checks if data exists for an event
    if(data.length) {
        let html = '';
        data.forEach(doc => {
            const event = doc.data();
            // console.log(event); - only used for debugging
            if(userEmail == event.admin) {
                var thisDate = event.Date.toDate();
                var loc = event.Location.replace(/\s/g, '+');
                loc.replace(/,/g, '%2C');
                const li = `
                    <li>
                        <div class="collapsible-header grey lighten-4">${event.Title}</div>
                        <div class="collapsible-body white">
                            ${event.Desc} <br />
                            ${thisDate} <br />
                            <a href="https://www.google.com/maps/search/?api=1&query=${loc}">${event.Location}</a> <br />
                        </div>
                    </li>
                `;
                html += li;
            }
        });
        eventList.innerHTML = html;
    }
    else {
        eventList.innerHTML = '<h5 class="center-align">Please login to view your events!</h5>'
    }

    

    
}


// Allows for events to be collapsible modals
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
  
})
