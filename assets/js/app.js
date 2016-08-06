// create an arary with sports


var allSports = ["baseball", "basketball", "soccer", "football", "gymnastics", "boxing", "curling", "hockey", "wrestling", "dog surfing"]

dispalyButtons();

// $('.sport').on('click', displayGifs);
$('#addSport').on('click', addSport);



// create functionality to access Giphy API on click of button

function displayGifs() {
	   $('#display-gif').empty();

    var selection = $(this).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ url: queryURL, method: 'GET' })

    .done(function(response) {

            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {

                var rating = results[i].rating;
                var sportsDiv = $('<div class="item">');
                var p = $('<p>rating: ' + rating + '</p>');

                var sportsImage = $("<img>");
                sportsImage.attr('src', results[i].images.fixed_height.url);
                sportsImage.attr('alt', 'sports image');
               
                sportsDiv.append(p)
                sportsDiv.append(sportsImage)

                $('#display-gif').prepend(sportsDiv);
            }
        });




};

// create function to make buttons show

function dispalyButtons() {

    $('#buttons-area').empty();

    for (var i = 0; i < allSports.length; i++) {

        var a = $('<button>')
        a.addClass('sport');
        a.attr('data-name', allSports[i]);
        a.text(allSports[i]);
        $('#buttons-area').append(a);
    }
};

// create functionality to add user input to array 

function addSport () {

		var newSport = $('#sport-input').val();

		allSports.push(newSport);
		
		dispalyButtons();

		return false;
}

$(document).on('click', '.sport', displayGifs);

// create functionality to stop / start the GIF on click of button
