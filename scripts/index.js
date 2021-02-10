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
