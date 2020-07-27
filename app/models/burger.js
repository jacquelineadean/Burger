// Export Burger model
module.exports = function(sequelize, DataTypes) { 

    // Create a "Burger" model that matches up with DB
    const Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Burger;

};
