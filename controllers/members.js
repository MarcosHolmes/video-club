const express = require('express');
const { Member } = require('../db');

function create (req, res, next) {
    const name = req.body.name;
    const last_name = req.body.last_name;
    const address = req.body.address;
    const phone = req.body.phone;
    const status = req.body.status;

    Member.create({
        name: name,
        last_name: last_name,
        address: address,
        phone: phone,
        status: status
    }).then((object) => res.json(object)).catch((err)=> res.send(err));

}

function list (req, res, next) {
    const id = req.params.id;
    Member.findByPk(id).then((objects)=>res.json(objects)).catch((err)=> res.send(err));
}

function index (req, res, next) {
    const id = req.params.id;
    Member.findByPk(id).then((object)=>res.json(object)).catch((err)=> res.send(err));
}
function replace (req, res, next) {
    const id = req.params.id;
    Genre.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : "";
        const last_name = req.body.last_name ? req.body.last_name : "";
        const address = req.body.address ? req.body.address : "";
        const phone = req.body.phone ? req.body.phone : "";
        const status = req.body.status ? req.body.status : "";
        object.update({name:name, last_name:last_name, address: address, phone:phone, status: status}).then(obj => res.json(obj)).catch(err => res.send(err));
    }).catch(err => res.send(err));
}
function update (req, res, next) {
    const id = req.params.id;
    Genre.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name : object.name;
        const last_name = req.body.last_name ? req.body.last_name : object.last_name;
        const address = req.body.address ? req.body.address : object.address;
        const phone = req.body.phone ? req.body.phone : object.phone;
        const status = req.body.status ? req.body.status : object.status;
        object.update({name:name, last_name:last_name, address: address, phone:phone, status: status}).then(obj => res.json(obj)).catch(err => res.send(err));
    }).catch(err => res.send(err));
}
function destroy (req, res, next) {
  const id = req.params.id;
  Member.destroy({where: {id: id}}).then(object => res.json(object)).catch((err) => res.send(err));
}

module.exports = {
    list, index, create, replace, update, destroy
  };