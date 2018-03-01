const animals = ['whale', 'shark', 'dog', 'cephalopod']

//Change gif load to static

//Funtion to add buttons
function addButtons() {

    //Prevent repeat
    $('#animalButtons').empty();

    //Loop through array
    for (let i = 0; i < animals.length; i++) {
        //Add buttons from the array

        let addButton = $('<button>');
        //Add classes to the button
        addButton.addClass('animal-btn btn btn-info');
        //Add data attribute
        addButton.attr('data-animal', animals[i]);
        //Add text to button
        addButton.text(animals[i]);
        //Add the button to div with id animalButtons
        $('#animalButtons').append(addButton);
    }
    callAndReturn()
}

//Addomg on click event lsitner to buttons
$('#addAnimal').on('click', function (event) {
    event.preventDefault();
    let animal = $('#animal-input').val().trim();
    animals.push(animal);
    //Call the first function
    addButtons();
});

//Call addbuttons function
addButtons();

console.log($('.animal-btn'))

function callAndReturn() {
    $('.animal-btn').on('click', function () {
        let animal = $(this).attr('data-animal')

        //Set search url to a variable
        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
            animal + '&api_key=mmgdoUW4uX0iFXnEO4XsrwJbO2lStDPC&limit=10';

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            //Use the return data in a function
            .then(function (outcome) {
                let gifReturn = outcome.data

                //Loop through array and do things
                for (let i = 0; i < gifReturn.length; i++) {

                    //Checking for certain ratings before using gif
                    if (gifReturn[i].rating !== 'r' && gifReturn[i].rating !== 'pg-13') {
                        //
                        let gifDiv = $('<div class="item">')

                        //Variable for rating
                        let rating = gifReturn[i].rating

                        //Add paragraph for rating
                        let p = $('<p>').text('Rating: ' + rating)

                        //Add image tag
                        let animalImage = $('<img class="rounded">')

                        let still = gifReturn[i].images.fixed_height_still.url
                        let animated = gifReturn[i].images.fixed_height.url

                        animalImage.attr('data-animated', animated)
                        animalImage.attr('data-still', still)

                        animalImage.attr('src', still)


                        //Appending the image and description
                        gifDiv.append(animalImage)
                        gifDiv.append(p)

                        //Add the gif to the div with id display-animals
                        $('#display-animals').prepend(gifDiv)
                    }
                }
            })
    })
}

$('#addAnimal').on('click', function (event) {
    event.preventDefault();
    let animal = $('#animal-input').val().trim();
    animals.push(animal);
    //Call the first function
    addButtons();
});