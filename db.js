const Sequelize = require('sequelize');

const directorModel  = require('./models/director');
const genreModel = require('./models/genre');
const memberModel = require('./models/member');
const actorModel = require('./models/actor');
const movieModel = require('./models/movie');
const movieActorModel = require('./models/movieActor');

/*
    CONEXION A DATABASE

    1) Nombre de la DB
    2) Usuario
    3) Password
    4) Objeto de configuración ORM

*/

const sequelize = new Sequelize('video-club','root','353223',{
    host: '127.0.0.1',
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);

//relations:
// un genero puede tener muchas peliculas 
Genre.hasMany(Movie,{as:'movies'});
//una pelicula tiene un o
Movie.belongsTo(Genre,{as: 'genre'});

//Un director puede tener muchas peliculas
Director.hasMany(Movie,{as:'movie'});
//Una pelicula tiene un director 
Movie.belongsTo(Director,{as: 'director'});

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey:'movieId'});
//En una pelicula participan muchos actores
Movie.belongsTo(Actor,{foreignKey:'actorId'});

Movie.belongsToMany(Actor, {
    foreignKey:'actorId',
    as:'actors',
    through:'moovies_actors'
});

Actor.belongsToMany(Movie, {
    foreignKey:'movieId',
    as: 'movies',
    through: 'movies_actors'
});

sequelize.sync({
    force:true
}).then(()=>{
    console.log('Base de datos sincronizada')
});

module.exports = {Director, Genre, Movie, Member, Actor, MovieActor};    