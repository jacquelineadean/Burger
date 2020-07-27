// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Create a "Burger" model that matches up with DB
const Burger = sequelize.define("burger", {
    burger_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    devoured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

// Syncs with DB
Burger.sync();

// Makes the Burger model avaiable for the other files
module.exports = Burger;