// When user clicks button to add a new burger
$("#addBurger").on("click", function (event) {
    event.preventDefault();

    // Make a newBurger object
    const newInput = $("#newBurger");
    var newBurger = {
        burger_name: newInput.val().trim(),
    };

    function submitBurger(Burger) {
        $.post("/api/burgers", Burger, function () {
            window.location.href = "/";
        }).then(function () {

            var row = $("<ul>");
            row.addClass("burger");


            row.append("<h5>" + newBurger.burger_name + "</h5>");
            row.append(`<form action='' method=''><input type='hidden' name='devoured' value='true'><button type='submit' class="btn btn-default">Devour it!</button></form>`);

            $("#burgers-to-devour").prepend(row);

        });
    };

    submitBurger(newBurger);

    // Empty input box by replacing the value with an empty string
    $("#newBurger").val("");

});

// Function to grab all of the burgers
$.get("/api/burgers", function (data) {

    

    for (let i = 0; i < data.length; i++) {
        const devoured = data[i].devoured;

        if (devoured === false) {
            for (let i = 0; i < data.length; i++) {
    
                const row = $("<ul>");
                row.addClass("burger");
    
    
                row.append("<h5>" + data[i].burger_name + "</h5>");
                row.append(`<form action='' method=''><input type='hidden' name='devoured' value='true'><button type='submit' class="btn btn-default" id="devourBtn">Devour it!</button></form>`);
    
                $("#burgers-to-devour").prepend(row);
    
            }
        } else if (devoured === true) {
            for (let i = 0; i < data.length; i++) {
                const row = $("<ul>");
    
                row.append(`<h5>` + data[i].burger_name + `</h5>`);
    
                $("#devoured-burgers").prepend(row);
    
            }
        }

    }
});

// Initialize burgers
// getBurgers();

// $("#devourBtn").on("click", function(event){
//     event.preventDefault();

//     $.put("/api/burger/:id", function(data){

//     })


// })