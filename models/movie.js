const { sequelize } = require("sequelize");

module.exports = (sequelize, type) =>{
    const Movie = sequelize.define('movies',{
        id: {type: type.INTEGER, primaryKey:true, autoincrement: true},
        title:type.STRING
    });
    return Movie;
}