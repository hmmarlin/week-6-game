// create an arary with sports

var allSports = ["baseball", "basketball", "soccer", "football", "gymnastics", "boxing", "curling", "hockey", "wrestling", "dog surfing"]

displayButtons();

$('#addSport').on('click', addSport);


// create functionality to access Giphy API on click of button

function displayGifs() {
    $('#display-gif').empty();

    var selection = $(this).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({ url: queryURL, method: 'GET' })

    .done(function(response) {

        var results = response.data;

        console.log(results.length);

        for (var i = 0; i < results.length; i++) {

            var rating = results[i].rating;
            var sportsDiv = $('<div class="item">');
            var p = $('<p>rating: ' + rating + '</p>');

            var sportsImage = $("<img>");
            sportsImage.attr('src', results[i].images.fixed_height_still.url);
            sportsImage.attr('data-animate', results[i].images.fixed_height.url)
            sportsImage.attr('data-still', results[i].images.fixed_height_still.url)
            sportsImage.attr('data-state', 'still')
            sportsImage.attr('alt', 'sports image');
            sportsImage.attr('class', 'pic-animate')

            sportsDiv.append(p)
            sportsDiv.append(sportsImage)
            $('#display-gif').prepend(sportsDiv);
        }
    });
};

// functionality to animate the gifs on click

function playGif() {
    $('.pic-animate').on('click', function() {

        var state = $(this).attr('data-state');

        var animate = $(this).attr('data-animate');
        var still = $(this).attr('data-still');

        if (state === 'still') {
            $(this).attr('src', animate)
            $(this).attr('data-state', 'animate')
            console.log('animate: ' + this.src);
        } else {
            $(this).attr('src', still)
            $(this).attr('data-state', 'still')
            console.log('still: ' + this.src);
        }
    });
}


// create function to make buttons show

function displayButtons() {

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

function addSport() {

    var newSport = $('#sport-input').val();

    allSports.push(newSport);

    displayButtons();
    return false;
}

$(document).on('click', '.sport', displayGifs);
$(document).on('click', '.pic-animate', playGif);
