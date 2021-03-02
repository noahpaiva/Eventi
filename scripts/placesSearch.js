var searchInput = 'search_input';

$(document).ready(function() {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        // types: ['establishment']
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var near_place = autocomplete.getPlace();
        document.getElementById('latitude_input').value = near_place.geometry.location.lat();
        document.getElementById('longitude_input').value = near_place.geometry.location.lng();

        document.getElementById('latitude_view').innerHTML = near_place.geometry.location.lat();
        document.getElementById('longitude_view').innerHTML = near_place.geometry.location.lng();
    });
});

$(document).on('change', '#'+searchInput, function() {
    document.getElementById('latitude_input').value = '';
    document.getElementById('longitude_input').value = '';
    document.getElementById('latitude_view').innerHTML = '';
    document.getElementById('longitude_view').innerHTML = '';
});