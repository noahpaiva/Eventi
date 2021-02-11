const eventList = document.querySelector('.events');

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
    let html = '';
    data.forEach(doc => {
        const event = doc.data();
        console.log(event);
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


document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
    /* if("serviceWorker" in navigator){
        navigator.serviceWorker.register(sw.js).then(registration => {
            console.log("SW Registered!");
            console.log(registration);
    }.catch(error){
            console.log("SW Registration failed!");
            console.log(error);
        } */
    
})
