var searchInput = 'edit_search_input';

$(document).ready(function() {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        // types: ['establishment']
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var near_place = autocomplete.getPlace();
        document.getElementById('edit_latitude_input').value = near_place.geometry.location.lat();
        document.getElementById('edit_longitude_input').value = near_place.geometry.location.lng();

        document.getElementById('edit_latitude_view').innerHTML = near_place.geometry.location.lat();
        document.getElementById('edit_longitude_view').innerHTML = near_place.geometry.location.lng();
    });
});

$(document).on('change', '#'+searchInput, function() {
    document.getElementById('edit_latitude_input').value = '';
    document.getElementById('edit_longitude_input').value = '';
    document.getElementById('edit_latitude_view').innerHTML = '';
    document.getElementById('edit_longitude_view').innerHTML = '';
});