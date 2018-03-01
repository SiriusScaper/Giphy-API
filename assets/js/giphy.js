const animals = ['whale', 'shark', 'dog', 'cephalopod']



$('.animal-btn').on('click', function () {
    // In this case, the 'this' keyword refers to the button that was clicked
    let animal = $(this).attr('data-animal');
    console.log(animal)
    // Constructing a URL to search Giphy for the name of the person who said the quote
    let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
        animal + '&api_key=mmgdoUW4uX0iFXnEO4XsrwJbO2lStDPC&limit=10';

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        // After the data comes back from the API
        .then(function (response) {
            let results = response.data;

            // Looping over every result item
            for (let i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== 'r' && results[i].rating !== 'pg-13') {
                    // Creating a div with the class 'item'
                    let gifDiv = $('<div class="item">');

                    // Storing the result item's rating
                    let rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    let p = $('<p>').text('Rating: ' + rating);

                    // Creating an image tag
                    let animalImage = $('<img>');

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    animalImage.attr('src', results[i].images.fixed_height.url);

                    // Appending the paragraph and animalImage we created to the 'gifDiv' div we created
                    gifDiv.append(p);
                    gifDiv.append(animalImage);

                    // Prepending the gifDiv to the '#gifs-appear-here' div in the HTML
                    $('#display-animals').prepend(gifDiv);
                }
            }
        });
});

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $('#animalButtons').empty();

    // Looping through the array of movies
    for (let i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        let addButton = $('<button>');
        // Adding a class of movie-btn to our button
        addButton.addClass('animal-btn');
        // Adding a data-attribute
        addButton.attr('data-animal', animals[i]);
        // Providing the initial button text
        addButton.text(animals[i]);
        // Adding the button to the buttons-view div
        $('#animalButtons').append(addButton);
    }
}

// This function handles events where a movie button is clicked
$('#addAnimal').on('click', function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    let animal = $('#animal-input').val().trim();

    // Adding movie from the textbox to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();