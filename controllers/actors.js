const express = require('express');
const { Actor } = require('../db');

function create (req, res, next) {
    const name = req.body.name;
    const last_name = req.body.last_name;

    Actor.create({
        name: name,
        last_name: last_name,
    }).then((object) => res.json(object)).catch((err) => res.send(err));
}

function list (req, res, next) {
    Actor.findAll().then((objects) => res.json(objects)).catch((err) => res.send(err));

    //TODO: addMovie
}

function index (req, res, next) {
    const id = req.params.id;
    Actor.findByPk(id).then(object => res.json(object)).catch(err => res.send(err));
}
function replace (req, res, next) {
    const id = req.params.id;
    Actor.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : "";
        const last_name = req.body.last_name ? req.body.last_name : "";
        object.update({name: name, last_name: last_name}).then(obj => res.json(obj)).catch(err => res.send(err));
    }).catch(err => res.send(err));
}
function update (req, res, next) {
    const id = req.params.id;
    Actor.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : object.name;
        const last_name = req.body.last_name ? req.body.last_name : object.last_name;
        object.update({name: name, last_name: last_name}).then(obj => res.json(obj)).catch(err => res.send(err));
    }).catch(err => res.send(err));
}
function destroy (req, res, next) {
    const id = req.params.id; //borrado fisico 
    Actor.destroy({ where: {id: id}}).then(object => res.json(object)).catch(err => res.send(err));   
}

module.exports = {
    list, index, create, replace, update, destroy
  };