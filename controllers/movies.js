const express = require('express');
const { Movie, Actor } = require('../db');

function create(req, res, next) {
    const title = req.params.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    Movie.create({
        title: title,
        genreId: genreId,
        directorId: directorId
    }).then(object => res.json(object)).catch((err)=> res.send(err));
};

function list(req, res, next) {
    Movie.findAll({include:['genre','director','actors']})
    .then(object => res.json(object))
    .catch((err) => res.send(err));
};

function index(req, res, next){
    
};

function destroy(req, res, next){

}
function replace(req, res, next){

}

function addActor(req, res, next){
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;
    
    Movie.findByPk(idMovie).then(movie =>{
        Actor.findByPk(idActor).then(actor =>{
            movie.addActor(actor);
            res.json(movie);
        }).catch((err) => res.send(err))
    }).catch((err) => res.send(err));
}


module.exports = {
    create, list, addActor
}