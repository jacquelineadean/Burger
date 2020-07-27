// When user clicks button to add a new burger
$("#addBurger").on("click", function (event) {
    event.preventDefault();

    // Make a newBurger object
    var newBurger = {
        burger_name: $("#newBurger").val().trim()
    };

    console.log(newBurger);

    // Send an AJAX POST-request with jQuery
    $.post("/api/burgers", newBurger)
        // On success, run the following code
        .then(function () {

            var row = $("<ul>");
            row.addClass("burger");


            row.append("<h5>" + newBurger.burger_name + "</h5>");
            row.append(`<form action='' method=''><input type='hidden' name='devoured' value='true'><button type='submit' class="btn btn-default">Devour it!</button></form>`);

            $("#burgers-to-devour").prepend(row);

        });

    // Empty input box by replacing the value with an empty string
    $("#newBurger").val("");

});

// Function to grab all of the burgers
function getBurgers(Burger) {

    const devoured = Burger.devoured;

    if (devoured === false) {
        $.get("/api/burgers", function(data){
            for (var i = 0; i < data.length; i++) {
    
                var row = $("<ul>");
                row.addClass("burger");
    
    
                row.append("<h5>" + data[i].burger_name + "</h5>");
                row.append(`<form action='' method=''><input type='hidden' name='devoured' value='true'><button type='submit' class="btn btn-default" id="devourBtn">Devour it!</button></form>`);
    
                $("#burgers-to-devour").prepend(row);

            }
        })
    } else {
        $.get("/api/burgers", function(data){
            for (var i = 0; i < data.length; i++) {
                var row = $("<ul>");
    
                row.append(`<h5 class="text-muted" id="devoured-burgers">` + data[i].burger_name + `</h5>`);
    
                $("#devoured-burgers").prepend(row);
    
            }
        })
    }
       

};

// Initialize burgers
getBurgers();

// $("#devourBtn").on("click", function(event){
//     event.preventDefault();

//     $.put("/api/burger/:id", function(data){

//     })


// })