// When user clicks button to add a new burger
$("#addBurger").on("click", function (event) {
    event.preventDefault();

    // Make a newBurger object
    let burgerName = $('#newBurger').val().trim();
    let routeName = burgerName.replace(/\s+/g, '').toLowerCase();
    let newBurger = {
        routeName: routeName,
        burger_name: burgerName,
        devoured: false
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
    // For loop to go through objects in table
    for (let i = 0; i < data.length; i++) {
        // Declare variable for devoured attribute
        const devoured = data[i].devoured;

        // Conditional for when the burger has not been devoured yet
        if (devoured === false) {
            // Append the undevoured burger object to the burgers-to-devour div and create a devoured button
            const row = $("<ul>");
            row.addClass("burger");

            row.append(`<li><h5>` + data[i].burger_name + `</h5><form action='' method=''><input type='hidden' name='devoured' value='true'><button type='submit' class="btn btn-default devourBtn" id="` + data[i].id + `">Devour it!</button></form></li>`);

            $("#burgers-to-devour").prepend(row);

        } else if (devoured === true) {
            // Append the devoured burger object to the devoured-burgers div 
            const row = $("<ul>");

            row.append(`<li><h5>` + data[i].burger_name + `</h5></li>`);

            $("#devoured-burgers").prepend(row);
        }
    }
});

// Event handler for the devour button
$(".devourBtn").on("click", function(event){
    event.preventDefault();

    let routeName = event.target.id.replace(/\s+/g, '').toLowerCase;

    $.ajax({
        method: "PUT",
        url: `/api/burgers/${routeName}`,
        data: {name: routeName},
        success: (data) => {
            location.assign('/');
        }
    })
    
})

