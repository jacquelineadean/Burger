// *********************************************************************************
// This file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// ===========================================================
const db = require("../models");
const path = require("path");
const { truncate } = require("fs");

// Routes
// =============================================================
module.exports = function(app) {

    // Default route
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // GET route for getting all of the burgers
    app.get("/api/burgers", function (req, res) {
    
        db.Burger.findAll({}).then(function (dbBurger) {
            res.json(dbBurger);
        });

    });

    // POST route for saving a new burger
    app.post("/api/burgers", function(req, res) {
        console.log(req.body);
        db.Burger.create({
            routeName: req.body.routeName,
            burger_name: req.body.burger_name,
            devoured: false
        }).then(function(dbBurger) {
            res.json(dbBurger);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // Put route for updating burgers
    app.put("/api/burgers/:routeName", function(req, res) {
        db.Burger.update({
            devoured: true
        },{
            where: {
                routeName: req.params.routeName
            }
        }).then(function(dbBurger) {
            res.json(dbBurger);
        });
    });

};

