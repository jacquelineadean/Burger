// *********************************************************************************
// This file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// ===========================================================
const express = require("express");
const app = express();
const Burger = require("../models/burger");

// Routes
// =============================================================
// Default route
app.get("/", function(req, res) {
    // Redirect to home page
    res.redirect("/index");
});

// GET route for getting all of the burgers
app.get("/index", function(req, res){
    // Run Burger to show all burgers
    Burger.selectAll(data => {
        const allBurgers = {burgers: data};
        // Send json response to user
        res.render("index", allBurgers);
    });
});

// POST route for saving a new burger using the data on req.body
app.post("/api/new", function(req, res) {
    // Run Burger to add new burger
    Burger.insertOne("burger_name", req.body, () => {
        // Redirect to home page
        res.redirect("/index");
    })
})

// PUT route for updating burgers
app.put("/burgers/updateOne/:id", (req, res) => {
    // Define id as the selected id
    const id = "id = " + req.params.id;
    // Run Burger to update the status of devoured
    Burger.updateOne({devoured: req.body.devoured}, id, () => {
        // Redirect to home page
        res.redirect("/index");
    })
})

// Export router
// ===========================================================
module.exports = app;